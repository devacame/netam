import Link from 'next/link'
import { useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { getHeadings } from '@/lib/toc'

export default function ToC({}) {
    let headings = getHeadings()
    const [open, setOpen] = useState(false)
    const toggleDropdown = () => {
        setOpen(!open)
    }
    const moveHeading = (e) => {
        e.preventDefault()
        setOpen(false)
        document
            .querySelector(
                '#' +
                    e.target.outerText
                        .replace(/[\[\]$&+,:;=?@#| '<>.^*()%!-]/g, '-')
                        .toLowerCase()
            )
            .scrollIntoView()
    }
    return (
        <div
            className={`z-50 fixed right-0 top-20 flex flex-row justify-center items-center rounded-lg bg-light dark:bg-dark
            ${open ? 'w-auto h-auto' : 'w-5 h-36'}`}
        >
            <button className='w-5' onClick={toggleDropdown}>
                {!open && <RiArrowLeftSLine />}
                {open && <RiArrowRightSLine />}
            </button>
            {open && (
                <div className='toc dark:bg-dark bg-light'>
                    <ul className='toc-list'>
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <Link href={`#${heading.id}`}>
                                    <a
                                        className='toc-item'
                                        onClick={moveHeading}
                                    >
                                        {heading.title}
                                    </a>
                                </Link>
                                {heading.items.length > 0 && (
                                    <ul className='toc-list ml-5'>
                                        {heading.items.map((child) => (
                                            <li key={child.id}>
                                                <Link href={`#${child.id}`}>
                                                    <a
                                                        className='toc-item'
                                                        onClick={moveHeading}
                                                    >
                                                        {child.title}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

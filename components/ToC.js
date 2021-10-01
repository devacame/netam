import Link from 'next/link'
import { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { getHeadings } from '@/lib/toc'

export default function ToC({}) {
  let headers = getHeadings()
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
            .replace(/ /g, '-')
            .replace(/\./g, '-')
            .toLowerCase()
      )
      .scrollIntoView()
  }
  return (
    <div className='dropdown sticky flex flex-col justify-center top-0 w-full bg-light dark:bg-dark'>
      <button
        className='flex flex-row gap-x-2 justify-center items-center'
        onClick={toggleDropdown}
      >
        <h3 className='text-black dark:text-white'>Table of Contents</h3>
        {!open && <RiArrowDownSLine />}
        {open && <RiArrowUpSLine />}
      </button>
      {open && (
        <div className='toc dark:bg-dark bg-light'>
          <ul className='toc-list'>
            {headers.map((heading) => (
              <li key={heading.id}>
                <Link href={`#${heading.id}`}>
                  <a className='toc-item' onClick={moveHeading}>
                    {heading.title}
                  </a>
                </Link>
                {heading.items.length > 0 && (
                  <ul className='toc-list ml-5'>
                    {heading.items.map((child) => (
                      <li key={child.id}>
                        <Link href={`#${child.id}`}>
                          <a className='toc-item' onClick={moveHeading}>
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

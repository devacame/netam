import { MDXRemote as MDX, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { FiCopy } from 'react-icons/fi'

interface ImageProps {
    src: string
    alt: string
}
function CustomImg({ src, alt }: ImageProps) {
    return (
        <div className='relative w-full h-[60vh]'>
            <Image
                src={process.env.NEXT_PUBLIC_IMAGE_LOADER_URL + src}
                alt={alt}
                layout='fill'
                objectFit='contain'
            />
        </div>
    )
}

interface MDXContent {
    content: MDXRemoteSerializeResult<Record<string, unknown>>
}
export default function MDXRemote({ content }: MDXContent) {
    return (
        <MDX
            {...content}
            components={{
                a: (props) => {
                    const href = props.href
                    const isInternalLink =
                        href && (href.startsWith('/') || href.startsWith('#'))

                    if (isInternalLink) {
                        return (
                            <Link href={href}>
                                <a {...props}>{props.children}</a>
                            </Link>
                        )
                    }

                    return (
                        <a
                            target='_blank'
                            rel='noopener noreferrer'
                            {...props}
                        />
                    )
                },
                h2: ({ children }) => {
                    const id = children
                        ?.toString()
                        .replace(/[\[\]$&+,:;=?@#| '<>.^*()%!-]/g, '-')
                        .toLowerCase()

                    return (
                        <h2 id={id} className='h2'>
                            {children}
                        </h2>
                    )
                },
                h3: ({ children }) => {
                    const id = children
                        ?.toString()
                        .replace(/[\[\]$&+,:;=?@#| '<>.^*()%!-]/g, '-')
                        .toLowerCase()

                    return (
                        <h3 id={id} className='h3'>
                            {children}
                        </h3>
                    )
                },
                img: ({ src, alt }) => {
                    return <CustomImg src={src!} alt={alt!} />
                },
                code: ({ children }) => {
                    const id = Date.now().toString()
                    const copyCode = () => {
                        const code = document.getElementById(id)!.innerText
                        navigator.clipboard.writeText(code)
                    }
                    return (
                        <div id={id}>
                            <button
                                className='absolute w-7 h-7 top-5 right-5 border-2 border-gray-700 active:border-green-200 rounded-md'
                                onClick={copyCode}
                            >
                                <FiCopy className='w-5 h-5 mx-auto my-auto' />
                            </button>
                            {children}
                        </div>
                    )
                },
            }}
        />
    )
}

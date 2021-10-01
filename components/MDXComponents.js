import Image from 'next/image'
import Link from 'next/link'

const Anchor = (props) => {
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

    return <a target='_blank' rel='noopener noreferrer' {...props} />
}

const Heading2 = ({ children }) => {
    const id = children.replace(/ /g, '-').replace(/\./g, '-').toLowerCase()

    return <h2 id={id}>{children}</h2>
}

const Heading3 = ({ children }) => {
    const id = children.replace(/ /g, '-').replace(/\./g, '-').toLowerCase()

    return <h3 id={id}>{children}</h3>
}

const CustomImage = ({ src, alt, children }) => {
    return (
        <div className='unset-img border-2 border-gray-700 dark:border-gray-300 rounded-sm'>
            <Image src={src} alt={alt} layout='fill' className='custom-img'>
                {children}
            </Image>
        </div>
    )
}

export const components = {
    a: Anchor,
    img: CustomImage,
    h2: Heading2,
    h3: Heading3,
}

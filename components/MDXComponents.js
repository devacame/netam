'use strict'

import Image from 'next/image'
import Link from 'next/link'

const Anchor = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link id='hi' href={href}>
        <a className='text-xl' {...props}>
          {props.children}
        </a>
      </Link>
    )
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

const Heading2 = ({ children }) => {
  const id = children.replace(/ /g, '_').toLowerCase()

  return <h2 id={id}>{children}</h2>
}

const Heading3 = ({ children }) => {
  const id = children.replace(/ /g, '_').toLowerCase()

  return <h3 id={id}>{children}</h3>
}
export const components = {
  a: Anchor,
  Image,
  h2: Heading2,
  h3: Heading3,
}

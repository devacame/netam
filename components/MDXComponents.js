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

export const components = {
  a: Anchor,
  Image,
}

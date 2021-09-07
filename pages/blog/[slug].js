'use strict'

import Container from '@/components/Container'
import { getPosts, getPostbySlug } from '@/lib/markdown'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '@/components/MDXComponents'
import { useEffect } from 'react'

export default function BlogPost({ meta, content }) {
  useEffect(() => {
    let headers = document.querySelectorAll('h2')
    let list = document.getElementById('table-of-contents')
    headers.forEach((item) => {
      let li = document.createElement('li')
      let anchor = document.createElement('a')
      anchor.href = '#' + item.id
      anchor.appendChild(document.createTextNode(item.innerHTML))
      li.appendChild(anchor)
      list.appendChild(li)
    })
  }, [])

  return (
    <Container>
      <h1>{meta.title}</h1>
      <ul id='table-of-contents'></ul>
      <article className='text-left'>
        <MDXRemote {...content} components={components} />
      </article>
    </Container>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map((file) => ({
    params: {
      slug: file.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const { meta, content } = await getPostbySlug(slug)

  return {
    props: {
      meta,
      content,
    },
  }
}

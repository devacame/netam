'use strict'

import Container from '@/components/Container'
import { getPosts, getPost } from '@/lib/markdown'
import { getHeadings } from '@/lib/toc'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '@/components/MDXComponents'
import ToC from '@/components/ToC'
import { useEffect, useState, useRef } from 'react'

export default function Post({ meta, content }) {
  const [renderToC, setRenderToC] = useState(false)
  let headers = useRef([])
  useEffect(() => {
    headers.current = getHeadings()
    setRenderToC(true)
  }, [])
  return (
    <>
      {renderToC && <ToC headings={headers.current} />}
      <Container meta={meta}>
        <header>
          <h1>{meta.title}</h1>
          <p className='text-center text-black dark:text-white'>
            {new Date(meta.date).toLocaleDateString()} | {meta.readingTime}분
          </p>
        </header>
        <MDXRemote {...content} components={components} />
      </Container>
    </>
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
  const { meta, content } = await getPost(slug)
  return {
    props: {
      meta,
      content,
    },
  }
}

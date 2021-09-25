'use strict'

import BlogLayout from '@/components/BlogLayout'
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
    <BlogLayout meta={meta}>
      <h1>{meta.title}</h1>
      <p className='text-center text-black dark:text-white'>
        {meta.date} | {meta.readingTime}분
      </p>
      {renderToC && <ToC headings={headers.current} />}
      <MDXRemote {...content} components={components} />
    </BlogLayout>
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

'use strict'

import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkPrism from 'remark-prism'

export async function getPosts() {
  return readdirSync(join(process.cwd(), 'posts'))
}

export async function getPost(slug) {
  const source = readFileSync(
    join(process.cwd(), 'posts', `${slug}.mdx`),
    'utf8'
  )
  const { data, content: markdown } = matter(source)
  const content = await serialize(markdown, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath, remarkPrism],
      rehypePlugins: [rehypeKatex],
    },
  })
  const readingTime = Math.ceil(source.match(/ /g).length / 200)
  return {
    meta: {
      ...data,
      readingTime,
      slug,
    },
    content,
  }
}

export function getPostsData() {
  const posts = getPosts()
  let metaData = []
  posts.map((post) => {
    let source = readFileSync(join(process.cwd(), 'posts', post))
    let data = matter(source)
    metaData.push(data)
  })
  return metaData
}

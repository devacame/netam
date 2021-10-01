'use strict'

import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkPrism from 'remark-prism'
import remarkUnwrapImages from 'remark-unwrap-images'

export async function getPosts() {
  const posts = readdirSync(join(process.cwd(), 'posts'))
  const paths = posts.map((file) => file.replace('.mdx', ''))
  return paths
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
      remarkPlugins: [remarkGfm, remarkMath, remarkPrism, remarkUnwrapImages],
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

'use strict'

import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { toc } from 'remark-toc'
import { slug as hypeSlug } from 'rehype-slug'
import { remarkSlug } from 'remark-slug'

export async function getPosts() {
  return readdirSync(join(process.cwd(), 'posts'))
}

export async function getPostbySlug(slug) {
  const source = readFileSync(
    join(process.cwd(), 'posts', `${slug}.mdx`),
    'utf8'
  )
  const { data, content: markdown } = matter(source)
  const content = await serialize(markdown, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [
        require('remark-prism'),
        require('remark-math'),
        toc,
        remarkSlug,
      ],
      rehypePlugins: [require('rehype-katex')],
    },
  })
  const readTime = Math.ceil(content.length / 200)
  return {
    meta: {
      ...data,
      readingTime: readTime,
      slug,
    },
    content,
  }
}

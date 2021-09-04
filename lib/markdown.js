import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function getPosts() {
  return readdirSync(join(process.cwd(), 'posts'))
}

export async function getPostbySlug(slug) {
  const source = readFileSync(
    join(process.cwd(), 'posts', `${slug}.mdx`),
    'utf8'
  )
  const { frontmatter, content } = matter(source)
  const markdown = await serialize(content, {
    scope: frontmatter,
    mdxOptions: {
      remarkPlugins: [require('remark-prism'), require('remark-math')],
      rehypePlugins: [require('rehype-katex')],
    },
  })
  const readTime = Math.ceil(content.length / 200)
  return {
    frontmatter: {
      ...frontmatter,
      readingTime: readTime,
      slug,
    },
    markdown,
  }
}

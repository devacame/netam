'use strict'

import Container from '@/components/Container'
import { getPosts, getPostbySlug } from '@/lib/markdown'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '@/components/MDXComponents'

export default function BlogPost({ frontmatter, markdown }) {
  return (
    <Container>
      <h1>Post</h1>
      <MDXRemote {...markdown} components={components} />
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
  const { frontmatter, markdown } = await getPostbySlug(slug)

  return {
    props: {
      frontmatter,
      markdown,
    },
  }
}

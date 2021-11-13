import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkPrism from 'remark-prism'
import remarkUnwrapImages from 'remark-unwrap-images'

export async function postContent(content) {
    const serializedContent = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                remarkGfm,
                remarkMath,
                remarkPrism,
                remarkUnwrapImages,
            ],
            rehypePlugins: [rehypeKatex],
        },
    })
    return {
        serializedContent,
    }
}

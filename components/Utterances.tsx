import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Utterances() {
    const { resolvedTheme } = useTheme()
    const currentColor =
        resolvedTheme === 'dark' ? 'github-dark' : 'github-light'
    useEffect(() => {
        const elem = document.getElementById('utterances')
        const scriptElem = document.createElement('script')
        scriptElem.src = 'https://utteranc.es/client.js'
        scriptElem.async = true
        scriptElem.setAttribute('repo', 'VESOC/vesoc-blog-comments')
        scriptElem.setAttribute('issue-term', 'title')
        scriptElem.setAttribute('theme', currentColor)
        scriptElem.crossOrigin = 'anonymous'
        elem!.appendChild(scriptElem)
    })
    return <section id='utterances' className='w-full' />
}

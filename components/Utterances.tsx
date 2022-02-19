import { useEffect } from 'react'

export default function Utterances() {
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        const elem = document.getElementById('utterances')
        const scriptElem = document.createElement('script')
        scriptElem.src = 'https://utteranc.es/client.js'
        scriptElem.async = true
        scriptElem.setAttribute('repo', 'VESOC/vesoc-blog-comments')
        scriptElem.setAttribute('issue-term', 'title')
        scriptElem.setAttribute(
            'theme',
            theme === 'dark' ? 'github-dark' : 'github-light'
        )
        scriptElem.crossOrigin = 'anonymous'
        elem!.appendChild(scriptElem)
    }, [])
    return <section id='utterances' className='w-full' />
}

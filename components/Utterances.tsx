import React from 'react'

const Utterances: React.FC = () => (
    <section
        ref={(elem) => {
            if (!elem) {
                return
            }
            const scriptElem = document.createElement('script')
            scriptElem.src = 'https://utteranc.es/client.js'
            scriptElem.async = true
            scriptElem.setAttribute('repo', 'VESOC/vesoc-blog-comments')
            scriptElem.setAttribute('issue-term', 'title')
            scriptElem.setAttribute('theme', 'github-dark')
            scriptElem.crossOrigin = 'anonymous'
            elem.appendChild(scriptElem)
        }}
    />
)

export default Utterances

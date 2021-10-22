interface headingInfo {
    title: string,
    id: string,
}

interface nestedHeadingInfo extends headingInfo {
    items: headingInfo[]
}

export const getHeadings = () => {
    const headingElements: HTMLHeadingElement[] = Array.from(document.querySelectorAll('.h2, .h3'))
    const nestedHeadings: nestedHeadingInfo[] = []

    headingElements.forEach((heading) => {
        const title:string = heading.innerText
        const id:string = heading.id

        if (heading.nodeName === 'H2') {
            nestedHeadings.push({ id, title, items: [] })
        } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({
                id,
                title,
            })
        }
    })

    return nestedHeadings
}

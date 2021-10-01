export const getHeadings = () => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'))
    const nestedHeadings = getNestedHeadings(headingElements)

    return nestedHeadings
}

const getNestedHeadings = (headingElements) => {
    const nestedHeadings = []

    headingElements.forEach((heading) => {
        const { innerText: title, id } = heading

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

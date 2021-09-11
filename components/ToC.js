import Link from 'next/link'

export default function ToC({ headings }) {
  return (
    <div className='toc'>
      <ul className='flex flex-col list-none toc-list'>
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link href={`#${heading.id}`}>
              <a
                className='toc-item'
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${heading.id}`).scrollIntoView()
                }}
              >
                {heading.title}
              </a>
            </Link>
            {heading.items.length > 0 && (
              <ul className='toc-list flex flex-col ml-5 list-none'>
                {heading.items.map((child) => (
                  <li key={child.id}>
                    <Link href={`#${child.id}`}>
                      <a
                        className='toc-item'
                        onClick={(e) => {
                          e.preventDefault()
                          document
                            .querySelector(`#${child.id}`)
                            .scrollIntoView()
                        }}
                      >
                        {child.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

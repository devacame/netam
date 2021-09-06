'use strict'

import Container from '@/components/Container'

export default function Home() {
  const meta = {
    title: 'Coder38611 | Student Developer/학생 개발자',
    description:
      '노드, 플러터, 파이썬, 알고리즘 공부 | Studying NodeJS, Flutter, Python, Algorithm',
    image: `${process.env.BASE_URL}/icons/coder38611.png`,
  }
  return (
    <Container meta={meta}>
      <div>
        <h1>Netam</h1>
      </div>
    </Container>
  )
}

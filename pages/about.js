import { useState } from 'react'
import {
  SiC,
  SiFlutter,
  SiPython,
  SiJavascript,
  SiNextDotJs,
  SiNodeDotJs,
} from 'react-icons/si'
import Container from '@/components/Container'

export default function About() {
  const [isKo, setIsKo] = useState(true)
  const meta = {
    title: 'About Coder38611 | Coder38611은?',
    description:
      'About Coder38611, who am I, what can I do, what I want to do | Coder38611에 대하여, 누구인지, 무엇을 할 수 있는지',
    image: `${process.env.BASE_URL}/icons/coder38611.png`,
  }
  return (
    <Container meta={meta}>
      <div className='flex flex-col w-4/5 text-center items-center bg-gray-100 dark:bg-darkPoint rounded-lg py-5 mx-auto my-10'>
        {isKo && (
          <div>
            <h1 className='text-center'>
              안녕하세요! 저는 💻Coder38611입니다.
            </h1>
            <p>저는 프로그래밍 전반에 관심이 있는 학생입니다.</p>
            <h2 className='text-center'>프로그래밍 스택:</h2>
            <h3>언어:</h3>
            <div className='flex flex-row justify-evenly px-5'>
              <div className='px-10 py-3'>
                <SiC size='40' color='#01589C' />
              </div>
              <div className='px-10 py-3'>
                <SiPython size='40' color='#3A73A5' />
              </div>
              <div className='px-10 py-3'>
                <SiJavascript size='40' color='yellow' />
              </div>
            </div>
            <h3>기술:</h3>
            <div className='flex flex-row justify-evenly px-5'>
              <div className='px-10 py-3'>
                <SiNodeDotJs size='40' color='#73BF4F' />
              </div>
              <div className='px-10 py-3'>
                <SiNextDotJs size='40' color='black' />
              </div>
              <div className='px-10 py-3'>
                <SiFlutter size='40' color='#4ECFFC' />
              </div>
            </div>
            <p>
              현재는 <b>Go</b>를 배우고 있으며 최대한 다양한 언어와 기술을
              접해보고 언젠가 완벽한 언어를 만들고 싶습니다.
            </p>
          </div>
        )}
        {!isKo && (
          <div>
            <h1 className='text-center'>Hello there! I am 💻Coder38611.</h1>
            <p>
              I am a student who is interested in everything about programming.
            </p>
            <h2>Programming Skills:</h2>
            <div className='px-5'>
              <h3>Languages:</h3>
              <div className='flex flex-row justify-evenly px-5'>
                <div className='px-10 py-3'>
                  <SiC size='40' color='#01589C' />
                </div>
                <div className='px-10 py-3'>
                  <SiPython size='40' color='#3A73A5' />
                </div>
                <div className='px-10 py-3'>
                  <SiJavascript size='40' color='yellow' />
                </div>
              </div>
              <h3>Frameworks/Libraries:</h3>
              <div className='flex flex-row justify-evenly px-5'>
                <div className='px-10 py-3'>
                  <SiNodeDotJs size='40' color='#73BF4F' />
                </div>
                <div className='px-10 py-3'>
                  <SiNextDotJs size='40' color='black' />
                </div>
                <div className='px-10 py-3'>
                  <SiFlutter size='40' color='#4ECFFC' />
                </div>
              </div>
              <p>
                I am currently learning <b>Go</b> and I like to tinker around
                with various frameworks/libraries.
              </p>
              <p>
                One day, I want to create the <b>Ultimate</b> programming
                language.
              </p>
            </div>
          </div>
        )}
        <p className='text-dark'>coder38611@pm.me</p>
        <button
          className='w-28 my-3 px-3 py-2 text-eerie bg-dark rounded-lg'
          onClick={() => setIsKo(!isKo)}
        >
          {isKo ? 'English' : '한국어'}
        </button>
      </div>
    </Container>
  )
}

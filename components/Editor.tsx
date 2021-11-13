import { useState, FormEvent } from 'react'
import { createPost, updatePost } from '@/lib/PostData'
import { validateForm } from '@/lib/validate'
import Link from 'next/link'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { PostFormData } from '@/lib/types'

interface Props {
    editorType: 'new' | 'edit'
    post?: PostFormData
}

export default function Editor({
    editorType,
    post = {
        id: '',
        title: '',
        description: '',
        coverImage: '',
        category: [''],
        date: '',
        series: '',
        readingTime: 0,
        content: '',
        published: false,
    },
}: Props) {
    const [formData, setFormData] = useState(post)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let dateOBJ = new Date()
        let dateStr =
            dateOBJ.getFullYear() +
            '-' +
            (dateOBJ.getMonth() + 1) +
            '-' +
            dateOBJ.getDate()
        formData.readingTime = Math.ceil(
            formData.content.split(' ').length / 200
        )
        formData.date = dateStr
        try {
            let err = validateForm(formData)
            console.log(err)
            if (err) {
                throw new Error(err)
            }
            if (editorType === 'new') {
                await createPost(formData)
            } else {
                await updatePost(formData)
            }
        } catch (e) {
            console.log(e)
        } finally {
            // window.location = '/admin'
        }
    }
    return (
        <div className='flex flex-col'>
            <Link href='/admin'>
                <a className='text-green-100 w-10 h-10 ml-4 mt-4'>
                    <BsArrowLeftSquare className='w-7 h-7' />
                </a>
            </Link>
            <form className='w-full' onSubmit={handleSubmit}>
                <fieldset className='flex flex-col justify-evenly w-[95%] h-auto mx-auto p-5 border-2 rounded-lg gap-y-3'>
                    <legend className='text-xl'>
                        {editorType === 'new' ? 'New Post' : 'Edit Post'}
                    </legend>
                    <div className='flex lg:flex-row md:flex-col justify-evenly w-[95%] h-auto mx-auto lg:gap-x-3'>
                        <div className='flex flex-col gap-y-2 w-1/2'>
                            <label htmlFor='id'>Id</label>
                            <input
                                type='text'
                                id='id'
                                name='id'
                                value={formData.id}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        id: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={formData.title}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor='description'>Description</label>
                            <input
                                type='text'
                                id='description'
                                name='description'
                                value={formData.description}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor='category'>Category</label>
                            <input
                                type='text'
                                id='category'
                                name='category'
                                value={formData.category
                                    .toString()
                                    .replace(',', ', ')}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        category: e.target.value
                                            .replace(',', ', ')
                                            .split(', '),
                                    })
                                }}
                            />
                            <label htmlFor='coverImage'>Cover Image Path</label>
                            <input
                                type='text'
                                id='coverImage'
                                name='coverImage'
                                value={formData.coverImage}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        coverImage: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor='series'>Series</label>
                            <input
                                type='text'
                                id='series'
                                name='series'
                                value={formData.series}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        series: e.target.value,
                                    })
                                }}
                            />
                            <div className='flex flex-row w-1/2 ml-0 items-center'>
                                <label htmlFor='published' className=''>
                                    Publish
                                </label>
                                <input
                                    type='checkbox'
                                    id='published'
                                    name='published'
                                    checked={formData.published}
                                    className='w-10 mx-0'
                                    onChange={() => {
                                        setFormData({
                                            ...formData,
                                            published: !formData.published,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-2 w-1/2'>
                            <label htmlFor='content'>Content</label>
                            <textarea
                                id='content'
                                name='content'
                                className='w-[90%] h-full mx-auto p-1'
                                value={formData.content}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <button
                        className='bg-lightBlue rounded-md w-1/3 mx-auto'
                        type='submit'
                    >
                        Submit
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

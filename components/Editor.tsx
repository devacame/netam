import { useState, FormEvent } from 'react'
import { createPost, updatePost } from '@/lib/PostData'
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
    const [formData, setFormData] = useState({
        ...post,
        category: post.category.toString(),
    })
    let err: any
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let dateOBJ = new Date()
        let dateStr =
            dateOBJ.getFullYear() +
            '-' +
            (dateOBJ.getMonth() + 1) +
            '-' +
            dateOBJ.getDate()
        const form = {
            ...formData,
            date: dateStr,
            readingTime: Math.ceil(formData.content.split(' ').length / 200),
            category: formData.category
                .replace(', ', ',')
                .replace(' ', '-')
                .split(','),
        }
        try {
            if (editorType === 'new') {
                await createPost(form)
            } else {
                await updatePost(form)
            }
            window.location.href = '/admin'
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='flex flex-col'>
            <Link href='/admin'>
                <a className='text-green-100 w-10 h-10 ml-4 mt-4'>
                    <BsArrowLeftSquare className='w-7 h-7' />
                </a>
            </Link>
            {err && (
                <div className='absolute top-1 right-1'>
                    <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
                        <div className='flex items-center justify-center w-12 bg-red-500'>
                            <svg
                                className='w-6 h-6 text-white fill-current'
                                viewBox='0 0 40 40'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z' />
                            </svg>
                        </div>

                        <div className='px-4 py-2 -mx-3'>
                            <div className='mx-3'>
                                <span className='font-semibold text-red-500 dark:text-red-400'>
                                    Error
                                </span>
                                <p className='text-sm text-gray-600 dark:text-gray-200'>
                                    {err}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <form className='w-full' onSubmit={handleSubmit}>
                <fieldset className='flex flex-col justify-evenly w-[95%] h-auto mx-auto p-5 border-2 rounded-lg gap-y-3'>
                    <legend className='text-xl'>
                        {editorType === 'new' ? 'New Post' : 'Edit Post'}
                    </legend>
                    <div className='flex lg:flex-row md:sm:flex-col justify-evenly w-[95%] h-auto mx-auto lg:gap-x-3'>
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
                                        id: e.target.value.trim(),
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
                                        title: e.target.value.trim(),
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
                                        description: e.target.value.trim(),
                                    })
                                }}
                            />
                            <label htmlFor='category'>Category</label>
                            <input
                                type='text'
                                id='category'
                                name='category'
                                value={formData.category}
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        category: e.target.value.trim(),
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
                                        coverImage: e.target.value.trim(),
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
                                        series: e.target.value.trim(),
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
                                        content: e.target.value.trim(),
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

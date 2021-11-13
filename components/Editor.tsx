import { useState, FormEvent } from 'react'
import { createPost, updatePost } from '@/lib/PostData'

export default function Editor({ editorType }: { editorType: 'new' | 'edit' }) {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        coverImage: '',
        category: [''],
        series: '',
        readingTime: 0,
        content: '',
        published: false,
    })
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        formData.readingTime = formData.content.split(' ').length / 200
        if (editorType === 'new') {
            createPost(formData)
        } else {
            updatePost(formData)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset className='flex flex-row justify-evenly w-[95%] h-auto mx-auto p-7 border-2 rounded-lg'>
                <legend className='text-xl'>
                    {editorType === 'new' ? 'New Post' : 'Edit Post'}
                </legend>
                <div className='flex flex-col gap-y-2 w-1/2'>
                    <label htmlFor='id'>Id</label>
                    <input
                        type='text'
                        id='id'
                        name='id'
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
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                category: e.target.value.split('#'),
                            })
                        }}
                    />
                    <label htmlFor='coverImage'>Cover Image Path</label>
                    <input
                        type='text'
                        id='coverImage'
                        name='coverImage'
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
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                series: e.target.value,
                            })
                        }}
                    />
                    <div className='flex flex-row'>
                        <input
                            type='radio'
                            id='draft'
                            name='published'
                            value='false'
                            required
                            onChange={() => {
                                setFormData({
                                    ...formData,
                                    published: false,
                                })
                            }}
                        />
                        <label htmlFor='draft'>Draft</label>
                        <input
                            type='radio'
                            id='publish'
                            name='published'
                            value='true'
                            required
                            onChange={() => {
                                setFormData({
                                    ...formData,
                                    published: true,
                                })
                            }}
                        />
                        <label htmlFor='publish'>Publish</label>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 w-1/2'>
                    <label htmlFor='content'>Content</label>
                    <textarea
                        id='content'
                        name='content'
                        className='h-full'
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                content: e.target.value,
                            })
                        }}
                    />
                </div>
            </fieldset>
            <button type='submit'>Submit</button>
        </form>
    )
}

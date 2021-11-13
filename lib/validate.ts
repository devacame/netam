import { PostFormData } from '@/lib/types'

export function validateForm(formData: PostFormData): string {
    const {
        id,
        title,
        description,
        date,
        series,
        category,
        content,
        readingTime,
        coverImage,
    } = formData
    let errorMessage = ''
    if (!id) errorMessage += 'ID is required'
    if (!title) errorMessage += '\nTitle is required'
    if (!description) errorMessage += '\nDescription is required'
    if (!date) errorMessage += '\nDate is required'
    if (!series) errorMessage += '\nSeries is required'
    if (!category.length) errorMessage += '\nCategory is required'
    if (!content) errorMessage += '\nContent is required'
    if (!readingTime) errorMessage += '\nReading time is required'
    if (!coverImage) errorMessage += '\nCover image is required'
    return errorMessage
}

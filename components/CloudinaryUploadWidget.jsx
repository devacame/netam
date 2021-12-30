// https://support.cloudinary.com/hc/en-us/articles/360020451819-How-to-integrate-the-Upload-Widget-in-your-React-app-
import { useEffect } from 'react'

export default function CloudinaryUploadWidget() {
    useEffect(() => {
        let myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: process.env.CLOUDINARY_NAME,
                uploadPreset: process.env.CLOUDINARY_PRESET,
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log('Done! Here is the image info: ', result.info)
                }
            }
        )
        document.getElementById('upload_widget').addEventListener(
            'click',
            function () {
                myWidget.open()
            },
            false
        )
    }, [])
    return (
        <button id='upload_widget' className='cloudinary-button'>
            Upload
        </button>
    )
}

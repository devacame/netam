import Editor from '@/components/Editor'
import Script from 'next/script'

export default function Create() {
    return (
        <div>
            <Script
                src='https://upload-widget.cloudinary.com/global/all.js'
                strategy='afterInteractive'
            />
            <Editor editorType='new' />
        </div>
    )
}

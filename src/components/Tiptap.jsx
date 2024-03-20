'use client'

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import Paragraph from "@tiptap/extension-paragraph"
import Bold from "@tiptap/extension-bold"

const MenuBar = ({ editor }) => {
    if (!editor) {
      return null
    }
  
    return (
      <div className="flex gap-8 justify-center py-2 border-b-2">
        <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
            H1
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
            H2
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
            H3
        </button>
        <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        >
            toggleBold
        </button>
      </div>
    )
  }

export default function Tiptap() {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            Highlight,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            Bold.configure({
                HTMLAttributes: {
                  class: 'my-custom-class',
                },
            })
        ],
        content: '<p>Hello</p>'
    })

    return (
        <div className="bg-white rounded-md">
            <MenuBar editor={editor} />
            <EditorContent className="bg-white text-black px-3 py-2 rounded" editor={editor} />
            
        </div>
    )
}
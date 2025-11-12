'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'

interface TipTapEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = 'Comece a escrever seu artigo...',
}: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#9b7b6b] underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL da imagem:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[#9b7b6b] text-white'
              : 'bg-white text-gray-700'
          }`}
          title="Título H2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-[#9b7b6b] text-white'
              : 'bg-white text-gray-700'
          }`}
          title="Título H3"
        >
          H3
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 text-sm font-bold rounded hover:bg-gray-200 ${
            editor.isActive('bold') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Negrito"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 text-sm italic rounded hover:bg-gray-200 ${
            editor.isActive('italic') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Itálico"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1.5 text-sm underline rounded hover:bg-gray-200 ${
            editor.isActive('underline') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Sublinhado"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 text-sm line-through rounded hover:bg-gray-200 ${
            editor.isActive('strike') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Riscado"
        >
          S
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive('bulletList') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Lista com marcadores"
        >
          • Lista
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive('orderedList') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Lista numerada"
        >
          1. Lista
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        {/* Quote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive('blockquote') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Citação"
        >
          " "
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        {/* Link & Image */}
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive('link') ? 'bg-[#9b7b6b] text-white' : 'bg-white text-gray-700'
          }`}
          title="Adicionar link"
        >
          🔗 Link
        </button>
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1.5 text-sm rounded hover:bg-gray-200 bg-white text-gray-700"
          title="Adicionar imagem"
        >
          🖼️ Imagem
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'left' })
              ? 'bg-[#9b7b6b] text-white'
              : 'bg-white text-gray-700'
          }`}
          title="Alinhar à esquerda"
        >
          ⬅
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'center' })
              ? 'bg-[#9b7b6b] text-white'
              : 'bg-white text-gray-700'
          }`}
          title="Centralizar"
        >
          ↔
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'right' })
              ? 'bg-[#9b7b6b] text-white'
              : 'bg-white text-gray-700'
          }`}
          title="Alinhar à direita"
        >
          ➡
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1.5 text-sm rounded hover:bg-gray-200 bg-white text-gray-700 disabled:opacity-50"
          title="Desfazer"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1.5 text-sm rounded hover:bg-gray-200 bg-white text-gray-700 disabled:opacity-50"
          title="Refazer"
        >
          ↷
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}

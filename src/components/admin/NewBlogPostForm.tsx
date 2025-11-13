'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BlogEditor from '@/components/editor/BlogEditor'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default function NewBlogPostForm() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Function to convert text to slug format
  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
  }

  // Handle title change and auto-generate slug
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const titleValue = e.target.value
    
    // Only auto-generate slug if user hasn't manually edited it
    if (!slugManuallyEdited) {
      setSlug(generateSlug(titleValue))
    }
  }

  // Handle manual slug editing
  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugManuallyEdited(true)
    setSlug(generateSlug(e.target.value))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set('content', content)
    formData.set('slug', slug) // Use the state value for slug

    try {
      const response = await fetch('/api/admin/blog/create', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin/blog')
        router.refresh()
      } else {
        console.error('Error response:', data)
        alert(`Erro ao criar post: ${data.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert(`Erro ao criar post: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog" className="text-gray-600 hover:text-gray-900">
              ← Voltar
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Novo Artigo</h1>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b7b6b] focus:border-transparent"
              placeholder="Ex: Tendências em Construção Civil para 2025"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={handleSlugChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b7b6b] focus:border-transparent"
              placeholder="Ex: tendencias-construcao-civil-2025"
            />
            <p className="mt-1 text-sm text-gray-500">
              Use apenas letras minúsculas, números e hífens
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Resumo *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b7b6b] focus:border-transparent"
              placeholder="Breve descrição do post (aparece na listagem)"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 mb-2">
              URL da Imagem de Capa
            </label>
            <input
              type="url"
              id="cover_image"
              name="cover_image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b7b6b] focus:border-transparent"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <p className="mt-1 text-sm text-gray-500">
              Sugestão: Use Unsplash (1200x630px)
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b7b6b] focus:border-transparent"
              placeholder="Ex: Engenharia, Projetos, Sustentabilidade"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b7b6b] focus:border-transparent"
              placeholder="Ex: Construção, Tecnologia, Inovação"
            />
            <p className="mt-1 text-sm text-gray-500">Separe as tags por vírgula</p>
          </div>

          {/* Content - TipTap Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <BlogEditor content={content} onChange={setContent} />
          </div>

          {/* Published */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              className="w-4 h-4 text-[#9b7b6b] border-gray-300 rounded focus:ring-[#9b7b6b]"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publicar imediatamente
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#9b7b6b] hover:bg-[#8a6a5b]"
            >
              {loading ? 'Criando...' : 'Criar Post'}
            </Button>
            <Link href="/admin/blog">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

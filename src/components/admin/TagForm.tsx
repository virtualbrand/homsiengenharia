'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

type Props = {
  tag?: {
    id: string
    name: string
    slug: string
    description: string | null
    featured_image: string | null
    meta_title: string | null
    meta_description: string | null
  }
  mode: 'create' | 'edit'
}

export function TagForm({ tag, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: tag?.name || '',
    slug: tag?.slug || '',
    description: tag?.description || '',
    featured_image: tag?.featured_image || '',
    meta_title: tag?.meta_title || '',
    meta_description: tag?.meta_description || '',
  })

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  const handleSlugChange = (slug: string) => {
    setFormData(prev => ({
      ...prev,
      slug: generateSlug(slug)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = mode === 'create' 
        ? '/api/admin/tags/create'
        : '/api/admin/tags/update'

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'edit' ? { ...formData, id: tag?.id } : formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar tag')
      }

      toast.success(mode === 'create' ? 'Tag criada com sucesso!' : 'Tag atualizada com sucesso!')
      router.push('/admin/artigos/tags')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar tag')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!tag?.id) return
    
    if (!confirm('Tem certeza que deseja excluir esta tag?')) return

    setLoading(true)

    try {
      const response = await fetch(`/api/admin/tags/delete?id=${tag.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao excluir tag')
      }

      toast.success('Tag excluída com sucesso!')
      router.push('/admin/artigos/tags')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao excluir tag')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Header with action buttons */}
      <div className="flex justify-between items-center mt-10 mb-6">
        <h1 className="text-3xl font-bold !text-white">
          {mode === 'create' ? 'Nova Tag' : 'Editar Tag'}
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/artigos/tags">
            <button
              type="button"
              className="btn-secondary rounded-xl text-lg font-semibold group flex items-center justify-center gap-2 h-[47px] px-4 py-2"
            >
              ← VOLTAR
            </button>
          </Link>
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="btn-secondary rounded-xl text-lg font-semibold group flex items-center justify-center gap-2 h-[47px] px-4 py-2 !bg-red-500/20 hover:!bg-red-500/30 !text-red-300 !border-red-500/30"
            >
              🗑️ EXCLUIR
            </button>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary rounded-xl text-lg shadow-lg flex items-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed h-[47px] px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            {loading ? 'SALVANDO...' : 'SALVAR'}
          </button>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
            {/* Left Column */}
            <div className="flex flex-col lg:w-2/3 w-full space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold !text-white mb-2">
                  Nome da Tag *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Ex: Sustentabilidade"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold !text-white mb-2">
                  URL (Slug) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white/60 placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all font-mono text-sm"
                  placeholder="sustentabilidade"
                />
              </div>

              {/* Description */}
              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-semibold !text-white mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full flex-1 px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all resize-none min-h-[120px]"
                  placeholder="Descrição da tag..."
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="flex flex-col lg:w-1/3 w-full">
              <label className="block text-sm font-semibold !text-white mb-2">
                Imagem Destacada
              </label>
              <div className="flex-1 flex flex-col">
                <div className="relative h-full">
                  <label className="flex flex-col items-center justify-center w-full h-full aspect-video rounded-lg border-2 border-dashed cursor-pointer transition-all border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 !text-white/50 mb-3">
                        <path d="M12 3v12"></path>
                        <path d="m17 8-5-5-5 5"></path>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      </svg>
                      <p className="mb-2 text-sm !text-white/90 font-medium text-center">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                      </p>
                      <p className="text-xs !text-white/60 text-center">
                        PNG, JPG, GIF até 10MB (1200x630px)
                      </p>
                    </div>
                    <input
                      className="hidden"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // TODO: Implement image upload
                          console.log('File selected:', file)
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.featured_image && (
                  <div className="mt-2">
                    <input
                      type="url"
                      value={formData.featured_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="URL da imagem"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold !text-white mb-4">Otimização SEO</h3>
            
            {/* Meta Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium !text-white mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Título otimizado para SEO (50-60 caracteres)"
                maxLength={60}
              />
              <p className="mt-2 text-xs !text-white/50">
                {formData.meta_title.length}/60 caracteres
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium !text-white mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Descrição otimizada para SEO (150-160 caracteres)"
                maxLength={160}
              />
              <p className="mt-2 text-xs !text-white/50">
                {formData.meta_description.length}/160 caracteres
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatBrazilianDateTime } from '@/lib/date-utils'

type Post = {
  id: string
  title: string
  excerpt: string | null
  published: boolean
  created_at: string
  updated_at: string
  category: string | null
  tags: string[] | null
  cover_image: string | null
}

type Props = {
  posts: Post[]
}

export function BlogAdminContent({ posts }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [tagFilter, setTagFilter] = useState<string>('all')

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = posts
      .map(post => post.category)
      .filter((cat): cat is string => !!cat)
    return Array.from(new Set(cats))
  }, [posts])

  const tags = useMemo(() => {
    const allTags = posts
      .flatMap(post => post.tags || [])
      .filter(Boolean)
    return Array.from(new Set(allTags))
  }, [posts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search filter - search in title and excerpt
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const titleMatch = post.title.toLowerCase().includes(searchLower)
        const excerptMatch = post.excerpt?.toLowerCase().includes(searchLower)
        
        if (!titleMatch && !excerptMatch) {
          return false
        }
      }

      // Status filter
      if (statusFilter === 'published' && !post.published) return false
      if (statusFilter === 'draft' && post.published) return false

      // Category filter
      if (categoryFilter !== 'all' && post.category !== categoryFilter) return false

      // Tag filter
      if (tagFilter !== 'all' && !post.tags?.includes(tagFilter)) return false

      return true
    })
  }, [posts, searchTerm, statusFilter, categoryFilter, tagFilter])

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        {/* Header */}
        <div className="flex justify-between items-center mt-10 mb-6">
          <h1 className="text-3xl font-bold text-white">Artigos</h1>
          <Link href="/admin/blog/new">
            <button className="btn-primary rounded-xl px-6 py-2 shadow-lg flex items-center gap-2">
              + Artigo
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-1">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[180px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
            >
              <option value="all" className="bg-gray-800 text-white">Status</option>
              <option value="published" className="bg-gray-800 text-white">Publicados</option>
              <option value="draft" className="bg-gray-800 text-white">Rascunhos</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="relative min-w-[180px]">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="all" className="bg-gray-800 text-white">Categoria</option>
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800 text-white">
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          {/* Tag Filter */}
          {tags.length > 0 && (
            <div className="relative min-w-[180px]">
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="all" className="bg-gray-800 text-white">Tag</option>
                {tags.map(tag => (
                  <option key={tag} value={tag} className="bg-gray-800 text-white">
                    {tag}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">
              {posts.length === 0 ? 'Nenhum artigo' : 'Nenhum resultado encontrado'}
            </h3>
            <p className="mt-1 text-sm text-white/70">
              {posts.length === 0
                ? 'Comece criando um novo artigo.'
                : 'Tente ajustar os filtros ou a busca.'}
            </p>
            {posts.length === 0 && (
              <div className="mt-6">
                <Link href="/admin/blog/new">
                  <Button>+ Novo Artigo</Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="block backdrop-blur-md bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white mb-1">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-white/80 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Status */}
                    <div className="mb-3">
                      <StatusBadge 
                        status={post.published ? 'published' : 'draft'} 
                        size="sm"
                      />
                    </div>

                    {/* Data de criação ou última alteração */}
                    <div>
                      <span className="text-xs text-white/60">
                        {post.updated_at && post.updated_at !== post.created_at
                          ? `Alterado em ${formatBrazilianDateTime(post.updated_at)}`
                          : `Criado em ${formatBrazilianDateTime(post.created_at)}`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Imagem */}
                  {post.cover_image && (
                    <div className="w-40 h-28 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

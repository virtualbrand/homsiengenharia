'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatBrazilianDateTime } from '@/lib/date-utils'

type Tag = {
  id: string
  name: string
  slug: string
  description: string | null
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

type Props = {
  tags: Tag[]
}

export function TagsAdminContent({ tags }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter tags
  const filteredTags = useMemo(() => {
    return tags.filter(tag => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const nameMatch = tag.name.toLowerCase().includes(searchLower)
        const slugMatch = tag.slug.toLowerCase().includes(searchLower)
        
        if (!nameMatch && !slugMatch) {
          return false
        }
      }

      return true
    })
  }, [tags, searchTerm])

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        {/* Header */}
        <div className="flex justify-between items-center mt-10 mb-6">
          <h1 className="text-3xl font-bold !text-white">Tags</h1>
          <Link href="/admin/artigos/tags/new">
            <button className="btn-primary rounded-xl px-6 py-2 shadow-lg flex items-center gap-2">
              + Tag
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 !text-white/60"
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

        {/* Tags Grid */}
        {filteredTags.length === 0 ? (
          <div className="text-center py-20">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-8 max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 !text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <p className="mt-4 text-lg !text-white/80">
                {searchTerm ? 'Nenhuma tag encontrada' : 'Nenhuma tag criada ainda'}
              </p>
              <p className="mt-2 text-sm !text-white/60">
                {searchTerm ? 'Tente outro termo de busca' : 'Crie sua primeira tag para começar'}
              </p>
              {!searchTerm && (
                <Link href="/admin/artigos/tags/new" className="mt-6 inline-block">
                  <button className="btn-primary rounded-xl px-6 py-2 shadow-lg">
                    + Nova Tag
                  </button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTags.map((tag) => (
              <Link
                key={tag.id}
                href={`/admin/artigos/tags/${tag.id}`}
                className="group block backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all p-6"
              >
                {/* Featured Image */}
                {tag.featured_image && (
                  <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={tag.featured_image}
                      alt={tag.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Tag Name */}
                <h3 className="text-xl font-bold !text-white mb-2 group-hover:!text-[#D6BDAA] transition-colors">
                  {tag.name}
                </h3>

                {/* Slug with View Link */}
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm !text-white/60 font-mono">
                    /{tag.slug}
                  </p>
                  <a
                    href={`/artigos/tag/${tag.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs !text-white/70 hover:!text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Ver no site
                  </a>
                </div>

                {/* Description */}
                {tag.description && (
                  <p className="text-sm !text-white/70 mb-4 line-clamp-2">
                    {tag.description}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs !text-white/50 pt-4 border-t border-white/10">
                  <span>Criado em {formatBrazilianDateTime(tag.created_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TagFilterProps {
  allTags: Array<{ name: string; slug: string }> | string[]
}

export default function TagFilter({ allTags }: TagFilterProps) {
  const pathname = usePathname()
  
  // Normalize tags to have slug
  const normalizedTags = allTags.map(tag => {
    if (typeof tag === 'string') {
      return {
        name: tag,
        slug: tag.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      }
    }
    return tag
  })

  // Check if we're on a tag page
  const currentTagSlug = pathname.startsWith('/artigos/tag/') 
    ? pathname.replace('/artigos/tag/', '')
    : null

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {normalizedTags.map((tag) => {
          const isSelected = currentTagSlug === tag.slug
          
          return (
            <Link
              key={tag.slug}
              href={isSelected ? '/artigos' : `/artigos/tag/${tag.slug}`}
              className={`inline-flex items-center gap-2 px-3 py-0.5 text-xs rounded-md border transition-colors ${
                isSelected
                  ? 'bg-[#9b7b6b] [color:white!important] border-[#9b7b6b] hover:bg-[#8a6a5a] hover:[color:white!important]'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-[#9b7b6b] hover:text-[#9b7b6b]'
              }`}
            >
              {tag.name}
              {isSelected && (
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

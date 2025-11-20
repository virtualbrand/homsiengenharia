'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface TagFilterProps {
  allTags: string[]
}

export default function TagFilter({ allTags }: TagFilterProps) {
  const searchParams = useSearchParams()
  const selectedTagsParam = searchParams.get('tag')
  const selectedTags = selectedTagsParam 
    ? (selectedTagsParam.includes(',') ? selectedTagsParam.split(',') : [selectedTagsParam])
    : []

  const buildTagUrl = (tag: string, isSelected: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (isSelected) {
      // Remover tag
      const newTags = selectedTags.filter(t => t !== tag)
      if (newTags.length === 0) {
        params.delete('tag')
      } else {
        params.set('tag', newTags.join(','))
      }
    } else {
      // Adicionar tag
      const newTags = [...selectedTags, tag]
      params.set('tag', newTags.join(','))
    }
    
    return `/artigos?${params.toString()}`
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          
          return (
            <Link
              key={tag}
              href={buildTagUrl(tag, isSelected)}
              className={`inline-flex items-center gap-2 px-3 py-0.5 text-xs rounded-md border transition-colors ${
                isSelected
                  ? 'bg-[#9b7b6b] text-white border-[#9b7b6b] hover:bg-[#8a6a5a] hover:text-white'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-[#9b7b6b] hover:text-[#9b7b6b]'
              }`}
            >
              {tag}
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

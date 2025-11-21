'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    // Listener para clicks em links e elementos clicáveis
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Verifica se é um link
      const link = target.closest('a')
      if (link && link.href && !link.href.startsWith('#') && !link.target) {
        const url = new URL(link.href)
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          handleStart()
        }
      }

      // Verifica se é um botão com texto "VOLTAR" ou "voltar"
      const button = target.closest('button')
      if (button) {
        const buttonText = button.textContent?.toLowerCase() || ''
        if (buttonText.includes('voltar')) {
          handleStart()
        }
      }

      // Verifica se clicou em um card de artigo (div com cursor-pointer ou article dentro de div)
      const clickableDiv = target.closest('div[class*="cursor-pointer"]')
      if (clickableDiv) {
        handleStart()
      }

      // Verifica se clicou em um article dentro de link
      const article = target.closest('article')
      if (article && article.closest('a')) {
        handleStart()
      }
    }

    document.addEventListener('click', handleClick, true) // Use capture phase
    
    // Timeout de segurança - remove loading após 3 segundos
    let timeout: NodeJS.Timeout
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false)
      }, 3000)
    }

    return () => {
      document.removeEventListener('click', handleClick, true)
      if (timeout) clearTimeout(timeout)
    }
  }, [loading, pathname])

  if (!loading) return null

  return (
    <>
      {/* Loading Bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
        <div className="h-full bg-gradient-to-r from-[#9b7b6b] via-[#d4af37] to-[#9b7b6b] animate-loading-bar" />
      </div>

      {/* Loading Spinner */}
      <div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
          <div className="w-8 h-8 border-4 border-[#9b7b6b] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

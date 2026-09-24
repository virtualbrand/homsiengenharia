'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'

export const AdminHeader = () => {
  const pathname = usePathname()
  const [artigosDropdownOpen, setArtigosDropdownOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setArtigosDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setArtigosDropdownOpen(false)
    }, 200)
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 max-w-[1280px]">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/admin" className="flex items-center space-x-3 flex-shrink-0">
              <img 
                src="/images/icon-white.svg"
                alt="Homsi Engenharia" 
                className="w-8 h-8"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold !text-white">
                  Homsi Engenharia
                </h1>
              </div>
            </Link>

            {/* Ver Site Link */}
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-xs !text-white/70 hover:!text-white transition-colors"
            >
              <svg 
                className="w-3.5 h-3.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Ver site
            </a>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex flex-1 justify-center" aria-label="Menu administrativo">
              <ul className="flex items-center space-x-6 lg:space-x-8">
                <li 
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`px-4 py-2 text-base font-black transition-all duration-300 uppercase flex items-center gap-1 ${
                      isActive('/admin/artigos')
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Artigos
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${artigosDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {artigosDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 pt-2"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-48 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-xl overflow-hidden">
                        <Link
                          href="/admin/artigos"
                          className="block px-4 py-3 text-sm font-semibold uppercase text-white/90 hover:bg-white/10 hover:text-white transition-all"
                        >
                          Todos os Artigos
                        </Link>
                        <Link
                          href="/admin/artigos/categorias"
                          className="block px-4 py-3 text-sm font-semibold uppercase text-white/90 hover:bg-white/10 hover:text-white transition-all border-t border-white/10"
                        >
                          Categorias
                        </Link>
                        <Link
                          href="/admin/artigos/tags"
                          className="block px-4 py-3 text-sm font-semibold uppercase text-white/90 hover:bg-white/10 hover:text-white transition-all border-t border-white/10"
                        >
                          Tags
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    href="/admin/projetos"
                    className={`px-4 py-2 text-base font-black transition-all duration-300 uppercase ${
                      isActive('/admin/projetos')
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Projetos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/depoimentos"
                    className={`px-4 py-2 text-base font-black transition-all duration-300 uppercase ${
                      isActive('/admin/depoimentos')
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Depoimentos
                  </Link>
                </li>
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <form action="/api/auth/signout" method="post">
                <button 
                  type="submit"
                  className="btn-secondary rounded-xl text-lg font-semibold group flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

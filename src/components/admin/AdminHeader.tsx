'use client';

import Link from 'next/link'

export const AdminHeader = () => {
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
                <h1 className="text-2xl font-bold text-white">
                  Homsi Engenharia
                </h1>
              </div>
            </Link>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
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

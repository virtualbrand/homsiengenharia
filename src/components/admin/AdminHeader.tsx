'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const AdminHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="backdrop-blur-xl bg-white/10 border-b border-gray-200 shadow-2xl">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 max-w-[1280px]">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/admin" className="flex items-center space-x-3 flex-shrink-0">
              <img 
                src="/images/icon-white.svg"
                alt="Homsi Engenharia" 
                className="w-8 h-8 brightness-0"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900">
                  Homsi Engenharia
                </h1>
              </div>
            </Link>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <form action="/api/auth/signout" method="post">
                <Button 
                  variant="outline" 
                  type="submit"
                  className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase transition-all duration-300"
                >
                  Sair
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

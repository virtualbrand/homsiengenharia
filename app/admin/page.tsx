import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin - Homsi Engenharia',
  description: 'Painel administrativo da Homsi Engenharia',
  robots: 'noindex, nofollow',
}

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image - Fixed */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/blog-admin-bg.webp)' }}
      />
      
      {/* Dark Overlay - Fixed */}
      <div className="fixed inset-0 bg-black/80" />
      
      <div className="relative">
        <AdminHeader />
        
        {/* Main Content */}
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 max-w-[1280px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blog Admin Card */}
                <Link
                  href="/admin/artigos"
                  className="block p-6 backdrop-blur-xl bg-white/10 rounded-lg border border-white/20 shadow-lg hover:bg-white/15 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#9b7b6b] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
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
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Blog</h2>
                      <p className="text-sm text-gray-300">Gerenciar artigos</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm">
                    Crie, edite e publique artigos do blog da Homsi Engenharia.
                  </p>
                </Link>

                {/* Future modules can be added here */}
            </div>

            {/* User Info */}
            <div className="mt-8 p-4 backdrop-blur-xl bg-white/10 rounded-lg border border-white/20 shadow-lg">
              <p className="text-sm text-gray-200">
                Logado como: <span className="font-medium text-white">{user.email}</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

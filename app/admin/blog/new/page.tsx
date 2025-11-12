import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BlogMultistepForm from '@/components/admin/BlogMultistepForm'
import { AdminHeader } from '@/components/admin/AdminHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Novo Post - Admin - HOMSI Engenharia',
  description: 'Criar novo post no blog',
  robots: 'noindex, nofollow',
}

export default async function NewBlogPostPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blog" className="text-gray-600 hover:text-gray-900">
            ← Voltar
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
        </div>
      </div>

      <main className="pb-12">
        <BlogMultistepForm />
      </main>
    </div>
  )
}

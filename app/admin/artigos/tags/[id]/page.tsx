import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { TagForm } from '@/components/admin/TagForm'

export const metadata: Metadata = {
  title: 'Editar Tag - Homsi Engenharia',
  description: 'Editar tag',
  robots: 'noindex, nofollow',
}

export default async function EditTagPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch tag
  const { data: tag, error } = await supabase
    .from('blog_tags')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !tag) {
    notFound()
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
        <main className="pt-24 pb-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 max-w-[1280px]">
            <TagForm tag={tag} mode="edit" />
          </div>
        </main>
      </div>
    </div>
  )
}

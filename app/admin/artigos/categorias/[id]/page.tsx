import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { CategoryForm } from '@/components/admin/CategoryForm'

export const metadata: Metadata = {
  title: 'Editar Categoria - Homsi Engenharia',
  description: 'Editar categoria',
  robots: 'noindex, nofollow',
}

export default async function EditCategoryPage({
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

  // Fetch category
  const { data: category, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !category) {
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
            <CategoryForm category={category} mode="edit" />
          </div>
        </main>
      </div>
    </div>
  )
}

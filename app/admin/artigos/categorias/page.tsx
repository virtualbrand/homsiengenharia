import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { CategoriesAdminContent } from '@/components/admin/CategoriesAdminContent'

export const metadata: Metadata = {
  title: 'Categorias - Homsi Engenharia',
  description: 'Gerencie as categorias do blog',
  robots: 'noindex, nofollow',
}

export default async function CategoriesAdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('blog_categories')
    .select('*')
    .order('created_at', { ascending: false })

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
        <CategoriesAdminContent categories={categories || []} />
      </div>
    </div>
  )
}

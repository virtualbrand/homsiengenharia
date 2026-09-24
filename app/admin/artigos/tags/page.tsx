import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { TagsAdminContent } from '@/components/admin/TagsAdminContent'

export const metadata: Metadata = {
  title: 'Tags - Homsi Engenharia',
  description: 'Gerencie as tags do blog',
  robots: 'noindex, nofollow',
}

export default async function TagsAdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch tags
  const { data: tags } = await supabase
    .from('blog_tags')
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
        <TagsAdminContent tags={tags || []} />
      </div>
    </div>
  )
}

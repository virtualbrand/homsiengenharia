import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Admin - HOMSI Engenharia',
  description: 'Painel administrativo da HOMSI Engenharia',
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

  // Redirect to blog admin
  redirect('/admin/blog')
}

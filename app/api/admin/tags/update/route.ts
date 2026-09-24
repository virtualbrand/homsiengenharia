import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, name, slug, description, featured_image, meta_title, meta_description } = body

    // Validate required fields
    if (!id || !name || !slug) {
      return NextResponse.json(
        { error: 'ID, nome e slug são obrigatórios' },
        { status: 400 }
      )
    }

    // Update tag
    const { data, error } = await supabase
      .from('blog_tags')
      .update({
        name,
        slug,
        description: description || null,
        featured_image: featured_image || null,
        meta_title: meta_title || null,
        meta_description: meta_description || null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating tag:', error)
      return NextResponse.json(
        { error: error.message || 'Erro ao atualizar tag' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in update tag API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

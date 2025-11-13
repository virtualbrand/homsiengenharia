import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    
    // Get post ID
    const id = formData.get('id') as string
    if (!id) {
      return NextResponse.json(
        { error: 'ID do post não fornecido' },
        { status: 400 }
      )
    }

    // Extract and validate required fields
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando: título, slug ou conteúdo' },
        { status: 400 }
      )
    }

    // Extract optional fields
    const cover_image = formData.get('cover_image') as string
    const category = formData.get('category') as string
    const tagsString = formData.get('tags') as string
    const publishedString = formData.get('published') as string
    const published = publishedString === 'true'

    // SEO fields
    const meta_title = formData.get('meta_title') as string
    const meta_description = formData.get('meta_description') as string
    const og_image = formData.get('og_image') as string

    // Parse tags
    const tags = tagsString
      ? tagsString.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : []

    // Check if post exists and user is the author
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('author_id, slug, old_slug')
      .eq('id', id)
      .single()

    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      )
    }

    if (existingPost.author_id !== user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar este post' },
        { status: 403 }
      )
    }

    // Se o slug mudou, salva o slug anterior como old_slug
    let oldSlug: string | null = null
    if (existingPost.slug !== slug) {
      // Salva apenas o slug atual como old_slug
      oldSlug = existingPost.slug
      console.log(`Slug alterado de "${existingPost.slug}" para "${slug}"`)
      console.log(`Old slug atualizado para: "${oldSlug}"`)
    } else {
      // Se o slug não mudou, mantém o old_slug existente
      oldSlug = existingPost.old_slug || null
    }

    // Update post
    const updateData: any = {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      cover_image: cover_image || null,
      category: category || null,
      tags: tags.length > 0 ? tags : null,
      published,
      published_at: published ? new Date().toISOString() : null,
      old_slug: oldSlug,
    }

    // Add SEO fields if provided
    if (meta_title) updateData.meta_title = meta_title
    if (meta_description) updateData.meta_description = meta_description
    if (og_image) updateData.og_image = og_image

    const { data: post, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Database update error:', updateError)
      return NextResponse.json(
        { error: `Erro ao atualizar post no banco de dados: ${updateError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, post }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

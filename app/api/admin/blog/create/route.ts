import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log('User:', user)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const coverImage = formData.get('cover_image') as string
    const category = formData.get('category') as string
    const tagsString = formData.get('tags') as string
    const published = formData.get('published') === 'on'

    console.log('Form data:', { title, slug, excerpt, category, tagsString, published })
    console.log('Content length:', content?.length)

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando: título, slug, resumo e conteúdo são necessários' },
        { status: 400 }
      )
    }

    // Parse tags
    const tags = tagsString
      ? tagsString.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const postData = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage || null,
      category: category || null,
      tags: tags.length > 0 ? tags : null,
      published,
      published_at: published ? new Date().toISOString() : null,
      author_id: user.id,
    }

    console.log('Inserting post:', postData)

    // Insert post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `Erro no banco de dados: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('Post created successfully:', data)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: `Erro interno: ${error instanceof Error ? error.message : 'Erro desconhecido'}` },
      { status: 500 }
    )
  }
}

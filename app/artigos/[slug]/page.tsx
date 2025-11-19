import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../article-content.css'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    return {
      title: 'Artigo não encontrado - Homsi Engenharia',
    }
  }

  const publishedTime = post.created_at ? new Date(post.created_at).toISOString() : undefined
  const modifiedTime = post.updated_at ? new Date(post.updated_at).toISOString() : undefined

  return {
    title: `${post.title} - Artigos - Homsi Engenharia`,
    description: post.excerpt || post.meta_description || undefined,
    keywords: post.tags?.join(', ') || undefined,
    authors: [{ name: post.author || 'Homsi Engenharia' }],
    alternates: {
      canonical: `https://homsiengenharia.com.br/artigos/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || post.meta_description || undefined,
      url: `https://homsiengenharia.com.br/artigos/${post.slug}`,
      siteName: 'Homsi Engenharia',
      images: post.cover_image ? [{
        url: post.cover_image,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [],
      publishedTime,
      modifiedTime,
      authors: [post.author || 'Homsi Engenharia'],
      section: post.category || undefined,
      tags: post.tags || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.meta_description || undefined,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  
  // Primeiro tenta encontrar o post pelo slug atual
  let { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  // Se não encontrar, verifica se existe algum post que tenha esse slug como old_slug
  if (!post) {
    // Tenta buscar como TEXT simples (old_slug)
    let { data: postWithOldSlug } = await supabase
      .from('blog_posts')
      .select('slug, old_slug')
      .eq('old_slug', slug)
      .eq('published', true)
      .maybeSingle()

    // Se não encontrar, tenta buscar como ARRAY (old_slugs) - fallback
    if (!postWithOldSlug) {
      const { data: allPosts } = await supabase
        .from('blog_posts')
        .select('slug, old_slugs')
        .eq('published', true)

      postWithOldSlug = allPosts?.find(p => 
        p.old_slugs && Array.isArray(p.old_slugs) && p.old_slugs.includes(slug)
      ) as any
    }

    // Se encontrou, redireciona para o slug atual com 301 permanente
    if (postWithOldSlug) {
      permanentRedirect(`/artigos/${postWithOldSlug.slug}`)
    }
    
    // Se não encontrou nem pelo slug atual nem pelo antigo, mostra 404
    notFound()
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .limit(3)

  // Remove título duplicado do conteúdo se existir
  let content = post.content
  if (content) {
    // Remove primeiro h1 ou p que contenha o título
    const tempDiv = content.replace(/<h1[^>]*>.*?<\/h1>/i, '')
    content = tempDiv.replace(new RegExp(`<p[^>]*>${post.title}<\\/p>`, 'i'), '')
    
    // Se o conteúdo não tem tags HTML, converte quebras de linha em parágrafos
    if (!content.includes('<p>') && !content.includes('<h2>')) {
      // Divide por quebras de linha duplas e envolve em <p>
      content = content
        .split(/\n\n+/)
        .map((paragraph: string) => paragraph.trim())
        .filter((p: string) => p.length > 0)
        .map((p: string) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('\n')
    }
  }

  // Structured Data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.meta_description,
    "image": post.cover_image,
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Organization",
      "name": post.author || "Homsi Engenharia",
      "url": "https://homsiengenharia.com.br"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Homsi Engenharia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://homsiengenharia.com.br/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://homsiengenharia.com.br/artigos/${post.slug}`
    },
    "keywords": post.tags?.join(', '),
    "articleSection": post.category,
    "inLanguage": "pt-BR"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Background Image */}
        <div className="relative h-[300px] flex items-center overflow-hidden bg-[#1a2332]">
          <Image
            src="/images/hero-blog.webp"
            alt="Blog Homsi Engenharia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl md:text-2xl font-bold mt-16 leading-tight" style={{ color: '#FFFFFF' }}>
              {post.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Main Content */}
            <article className="w-full">
              {/* Header */}
              <header className="mb-8">
                {post.category && (
                  <div className="mb-4">
                    <Link
                      href={`/artigos?category=${post.category}`}
                      className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#9b7b6b] rounded-full hover:bg-[#8a6a5b] transition-colors"
                    >
                      {post.category}
                    </Link>
                  </div>
                )}
              </header>

              {/* Cover Image */}
              {post.cover_image && (
                <div className="relative aspect-video mb-12 rounded-xl overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/artigos?tag=${tag}`}
                        className="inline-block px-3 py-0.5 text-xs bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:border-[#9b7b6b] hover:text-[#9b7b6b] transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar - Artigos Relacionados */}
            {relatedPosts && relatedPosts.length > 0 && (
              <aside className="w-full">
                <div className="sticky top-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Artigos Relacionados
                  </h2>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/artigos/${relatedPost.slug}`}
                        className="group block"
                      >
                        <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                          {relatedPost.cover_image && (
                            <div className="relative aspect-video bg-gray-200">
                              <Image
                                src={relatedPost.cover_image}
                                alt={relatedPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#9b7b6b] transition-colors line-clamp-2 mb-2">
                              {relatedPost.title}
                            </h3>
                            {relatedPost.excerpt && (
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {relatedPost.excerpt}
                              </p>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

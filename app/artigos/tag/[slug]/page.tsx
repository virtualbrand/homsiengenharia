import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBox from '@/components/blog/SearchBox'
import TagFilter from '@/components/blog/TagFilter'

type Props = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ search?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: tag } = await supabase
    .from('blog_tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tag) {
    return {
      title: 'Tag não encontrada - Homsi Engenharia',
    }
  }

  return {
    title: tag.meta_title || `${tag.name} - Homsi Engenharia`,
    description: tag.meta_description || tag.description || `Artigos sobre ${tag.name}`,
    alternates: {
      canonical: `https://homsiengenharia.com.br/artigos/tag/${slug}`,
    },
    openGraph: {
      type: 'website',
      title: tag.meta_title || `${tag.name} - Homsi Engenharia`,
      description: tag.meta_description || tag.description || `Artigos sobre ${tag.name}`,
      url: `https://homsiengenharia.com.br/artigos/tag/${slug}`,
      siteName: 'Homsi Engenharia',
      images: tag.featured_image ? [{
        url: tag.featured_image,
        width: 1200,
        height: 630,
        alt: tag.name,
      }] : [{
        url: '/images/hero-blog.webp',
        width: 1200,
        height: 630,
        alt: tag.name,
      }],
    },
  }
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params
  const filters = await searchParams
  const supabase = await createClient()

  // Get tag
  const { data: tag } = await supabase
    .from('blog_tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tag) {
    notFound()
  }

  // Build query - busca posts que contenham essa tag
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .contains('tags', [tag.name])
    .order('published_at', { ascending: false })

  // Apply search filter
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
    )
  }

  const { data: posts } = await query

  // Get all unique categories and tags from posts
  const { data: allCategories } = await supabase
    .from('blog_categories')
    .select('name, slug')
    .order('name')
  
  // Get all tags from database
  const { data: allTags } = await supabase
    .from('blog_tags')
    .select('name, slug')
    .order('name')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Background Image */}
        <div className="relative h-[300px] flex items-center overflow-hidden bg-[#1a2332]">
          <Image
            src={tag.featured_image || '/images/hero-blog.webp'}
            alt={tag.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl md:text-2xl font-bold mt-16 leading-tight" style={{ color: '#FFFFFF' }}>
              {tag.name}
            </h1>
            {tag.description && (
              <p className="text-white/80 mt-2 max-w-2xl">
                {tag.description}
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Main Content - Posts Grid */}
            <div>
              {!posts || posts.length === 0 ? (
                <div className="text-center py-20">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-2 text-gray-900">
                    Nenhum artigo encontrado com esta tag
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/artigos/${post.slug}`}
                      className="group block"
                    >
                      <article className="bg-white rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(155,123,107,0.3)] transition-all duration-300 h-full flex flex-col">
                        {/* Image */}
                        {post.cover_image && (
                          <div className="relative w-full h-48 bg-gray-200">
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          {/* Category */}
                          {post.category && (
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#9b7b6b] rounded-full">
                                {post.category}
                              </span>
                            </div>
                          )}
                          
                          {/* Title */}
                          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9b7b6b] transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          
                          {/* Excerpt */}
                          {post.excerpt && (
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Search */}
              <SearchBox />

              {/* Categories */}
              {allCategories && allCategories.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categorias
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/artigos"
                        className="block text-sm hover:text-[#9b7b6b] transition-colors text-gray-600"
                      >
                        Todas
                      </Link>
                    </li>
                    {allCategories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/artigos/categoria/${cat.slug}`}
                          className="block text-sm hover:text-[#9b7b6b] transition-colors text-gray-600"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {allTags && allTags.length > 0 && (
                <TagFilter allTags={allTags} />
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

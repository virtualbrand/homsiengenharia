import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBox from '@/components/blog/SearchBox'

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Artigos e insights sobre engenharia, construção e design',
}

export default async function ArtigosPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; search?: string }
}) {
  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  // Apply filters
  if (searchParams.search) {
    query = query.or(
      `title.ilike.%${searchParams.search}%,excerpt.ilike.%${searchParams.search}%,content.ilike.%${searchParams.search}%`
    )
  }

  if (searchParams.category) {
    query = query.eq('category', searchParams.category)
  }

  if (searchParams.tag) {
    query = query.contains('tags', [searchParams.tag])
  }

  const { data: posts } = await query

  // Get all unique categories and tags from posts
  const categories = posts
    ? Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))
    : []
  
  const allTags = posts
    ? Array.from(
        new Set(
          posts
            .flatMap((p) => p.tags || [])
            .filter(Boolean)
        )
      )
    : []

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Background Image */}
        <div className="relative h-[300px] flex items-center overflow-hidden bg-[#1a2332]">
          <Image
            src="/images/hero-blog.webp"
            alt="Blog Homsi Engenharia"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl md:text-2xl font-bold text-white mt-16 leading-tight">
              Artigos
            </h1>
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
                    Nenhum artigo encontrado
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/artigos/${post.slug}`}
                      className="group block"
                    >
                      <article className="bg-white rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(155,123,107,0.3)] transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          {/* Content - Lado Esquerdo */}
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            {/* Category */}
                            {post.category && (
                              <div className="mb-3">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#9b7b6b] rounded-full">
                                  {post.category}
                                </span>
                              </div>
                            )}
                            
                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#9b7b6b] transition-colors line-clamp-2">
                              {post.title}
                            </h2>
                            
                            {/* Excerpt */}
                            {post.excerpt && (
                              <p className="text-gray-600 text-base line-clamp-3 mb-4 flex-1">
                                {post.excerpt}
                              </p>
                            )}
                            
                            {/* Date */}
                            <div className="flex items-center text-sm text-gray-500">
                              <time dateTime={post.published_at}>
                                Criado em {new Date(post.published_at).toLocaleDateString(
                                  'pt-BR',
                                  {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  }
                                )}
                              </time>
                            </div>
                          </div>

                          {/* Image - Lado Direito */}
                          {post.cover_image && (
                            <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0 bg-gray-200">
                              <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
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
              {categories.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categorias
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/artigos"
                        className={`block text-sm hover:text-[#9b7b6b] transition-colors ${
                          !searchParams.category
                            ? 'text-[#9b7b6b] font-semibold'
                            : 'text-gray-600'
                        }`}
                      >
                        Todas
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/artigos?category=${category}`}
                          className={`block text-sm hover:text-[#9b7b6b] transition-colors ${
                            searchParams.category === category
                              ? 'text-[#9b7b6b] font-semibold'
                              : 'text-gray-600'
                          }`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {allTags.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/artigos?tag=${tag}`}
                        className={`inline-block px-3 py-1 text-xs rounded-full border transition-colors ${
                          searchParams.tag === tag
                            ? 'bg-[#9b7b6b] text-white border-[#9b7b6b]'
                            : 'bg-[#1a2332] text-gray-400 border-gray-700 hover:border-[#9b7b6b] hover:text-[#9b7b6b]'
                        }`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

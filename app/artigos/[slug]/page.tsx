import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) {
    return {
      title: 'Post não encontrado - Homsi Engenharia',
    }
  }

  return {
    title: `${post.title} - Artigos - Homsi Engenharia`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function ArtigoPage({ params }: Props) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) {
    notFound()
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .limit(3)

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
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </header>

            {/* Cover Image */}
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
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-[#9b7b6b] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-li:text-gray-700
                prose-blockquote:border-l-[#9b7b6b] prose-blockquote:text-gray-600
                prose-code:text-[#9b7b6b] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
                      className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 border border-gray-300 rounded-full hover:border-[#9b7b6b] hover:text-[#9b7b6b] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Artigos Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/artigos/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#9b7b6b] transition-all shadow-sm">
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
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#9b7b6b] transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.excerpt && (
                            <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </article>
      </main>
      <Footer />
    </>
  )
}

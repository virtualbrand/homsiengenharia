'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string
  category: string
  published_at: string
}

const BlogSection = () => {
  useScrollAnimation()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, cover_image, category, published_at')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3)
        
        if (data) {
          setPosts(data)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section id="blog" className="relative py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="fade-in text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Tendências e Insights
          </h2>
          <p className="fade-in text-lg text-gray-700 leading-relaxed">
            Acompanhe nossos artigos com dicas, tendências e insights sobre engenharia, 
            construção civil e projetos que transformam sonhos em realidade.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/artigos/${post.slug}`}
                  className="fade-in bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <article>
                    {/* Post Image */}
                    {post.cover_image && (
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {post.category && (
                          <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <span className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] transition-colors duration-300">
                        Ler mais
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Ver Mais Button */}
            <div className="text-center fade-in">
              <Link 
                href="/artigos"
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
              >
                Ver mais artigos
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum post publicado ainda.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogSection
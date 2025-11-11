'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const BlogSection = () => {
  useScrollAnimation()

  const blogPosts = [
    {
      id: 1,
      category: "Engenharia",
      title: "Tendências em Construção Civil para 2024",
      excerpt: "Descubra as principais inovações e tecnologias que estão transformando o setor da construção civil.",
      image: "/images/blog/blog-1.jpg",
    },
    {
      id: 2,
      category: "Projetos",
      title: "Como Escolher os Melhores Materiais para sua Obra",
      excerpt: "Um guia completo para selecionar materiais de qualidade que garantem durabilidade e economia.",
      image: "/images/blog/blog-2.jpg",
    },
    {
      id: 3,
      category: "Dicas",
      title: "Sustentabilidade na Construção: O Futuro é Verde",
      excerpt: "Entenda como implementar práticas sustentáveis em projetos de construção e reforma.",
      image: "/images/blog/blog-3.jpg",
    }
  ]

  return (
    <section id="blog" className="relative py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="fade-in font-bold text-sm uppercase tracking-wider block text-[var(--color-secondary-700)] mb-4">
            Blog & Artigos
          </span>
          <h2 className="fade-in text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Conhecimento e Inspiração
          </h2>
          <p className="fade-in text-lg text-gray-700 leading-relaxed">
            Acompanhe nossos artigos com dicas, tendências e insights sobre engenharia, 
            construção civil e projetos que transformam sonhos em realidade.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="fade-in bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Post Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <button className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] transition-colors duration-300">
                  Ler mais
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Ver Mais Button */}
        <div className="text-center fade-in">
          <button className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Ver mais artigos
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
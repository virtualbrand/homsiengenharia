import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#1a2332] flex items-center justify-center py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Artigo não encontrado
          </h2>
          <p className="text-gray-400 mb-8">
            Desculpe, o artigo que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/artigos"
            className="inline-block px-6 py-3 bg-[#9b7b6b] text-white rounded-lg hover:bg-[#8a6a5b] transition-colors"
          >
            Voltar para Artigos
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

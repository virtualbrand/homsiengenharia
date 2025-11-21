import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen relative flex items-center justify-center py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/404-bg.webp"
            alt="404 Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold !text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold !text-white mb-4">
            PÁGINA NÃO ENCONTRADA
          </h2>
          <p className="!text-white/80 mb-8">
            Desculpe, a página que você está procurando não existe ou foi removida.
          </p>
          <Link
            href="/"
            className="btn-secondary rounded-xl px-8 py-4 text-lg font-semibold group flex items-center justify-center"
          >
            Voltar para Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

import { motion } from 'framer-motion'
import { MessageCircle, Star, Youtube, Music } from 'lucide-react'

const HeroSection = () => {
  const links = [
    {
      title: 'Dúvidas/informações/financeiro - chame aqui!',
      icon: MessageCircle,
      url: 'https://wa.me/5511999999999', // Substitua pelo número real do WhatsApp
    },
    {
      title: 'Fale com o Engenheiro',
      icon: MessageCircle,
      url: 'https://wa.me/5511999999999', // Substitua pelo número real do WhatsApp
    },
    {
      title: 'Google meu negócio - feedbacks',
      icon: Star,
      url: 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review', // Substitua pelo link real do Google
    },
    {
      title: 'Canal Youtube',
      icon: Youtube,
      url: 'https://youtube.com/@your-channel', // Substitua pelo canal real
    },
    {
      title: 'Canal no Tiktok',
      icon: Music,
      url: 'https://tiktok.com/@your-profile', // Substitua pelo perfil real
    },
  ]

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-links.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
            Soluções em{' '}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Engenharia
            </span>
          </h1>
          
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            {links.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="btn-secondary rounded-xl px-6 py-4 text-base font-semibold group flex items-center justify-center gap-3 w-full hover:scale-105 transition-transform"
                >
                  <Icon className="h-5 w-5" />
                  {link.title}
                </motion.a>
              )
            })}
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

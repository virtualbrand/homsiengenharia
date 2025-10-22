import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      // Get Lenis instance from window
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(target, {
          offset: -80, // 80px offset for header
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback if Lenis is not available
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-home.mp4" type="video/mp4" />
        <source src="/videos/hero-home.webm" type="video/webm" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Soluções em Engenharia
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Transformamos ideias em realidade com projetos de engenharia inovadores, 
            seguros e sustentáveis.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              className="btn-primary rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl group flex items-center justify-center"
            >
              Ver projetos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="#sobre"
              onClick={(e) => handleAnchorClick(e, '#sobre')}
              className="btn-secondary rounded-xl px-8 py-4 text-lg font-semibold group flex items-center justify-center"
            >
              Sobre
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

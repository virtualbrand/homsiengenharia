import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    const video = videoRef.current
    if (video && !iOS) {
      // Try autoplay for non-iOS devices
      const playVideo = async () => {
        try {
          await video.play()
          setIsVideoPlaying(true)
        } catch (error) {
          console.log('Autoplay prevented:', error)
        }
      }
      
      if (video.readyState >= 3) {
        playVideo()
      } else {
        video.addEventListener('canplay', playVideo)
      }
    }

    // iOS-specific behavior: play on scroll or click
    if (iOS && video) {
      const playVideoOnInteraction = async () => {
        if (!isVideoPlaying) {
          try {
            await video.play()
            setIsVideoPlaying(true)
          } catch (error) {
            console.log('Video play failed:', error)
          }
        }
      }

      // Play on scroll
      const handleScroll = () => {
        if (window.scrollY > 50) { // After scrolling 50px
          playVideoOnInteraction()
          window.removeEventListener('scroll', handleScroll)
        }
      }

      // Play on click anywhere in hero section
      const handleHeroClick = () => {
        playVideoOnInteraction()
        if (sectionRef.current) {
          sectionRef.current.removeEventListener('click', handleHeroClick)
          sectionRef.current.removeEventListener('touchstart', handleHeroClick)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      
      if (sectionRef.current) {
        sectionRef.current.addEventListener('click', handleHeroClick)
        sectionRef.current.addEventListener('touchstart', handleHeroClick)
      }

      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (sectionRef.current) {
          sectionRef.current.removeEventListener('click', handleHeroClick)
          sectionRef.current.removeEventListener('touchstart', handleHeroClick)
        }
      }
    }
  }, [isVideoPlaying])
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      // Get Lenis instance from window
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0, // Sem offset para aparecer no topo exato - igual ao header
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback if Lenis is not available
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
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
            <a 
              href="#projetos"
              onClick={(e) => handleAnchorClick(e, '#projetos')}
              className="btn-primary rounded-xl text-lg font-semibold shadow-2xl group flex items-center justify-center w-full max-w-[200px] sm:w-auto sm:max-w-none"
              style={{ padding: '0.67rem 1.5rem' }}
            >
              Ver projetos
            </a>
            
            <a 
              href="#sobre"
              onClick={(e) => handleAnchorClick(e, '#sobre')}
              className="btn-secondary rounded-xl px-8 py-4 text-lg font-semibold group flex items-center justify-center w-full max-w-[200px] sm:w-auto sm:max-w-none"
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

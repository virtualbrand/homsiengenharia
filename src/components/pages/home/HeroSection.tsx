'use client';

import { useEffect, useRef, useState } from 'react'

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    // Lazy load video after page load
    const loadVideoTimer = setTimeout(() => {
      setShouldLoadVideo(true)
    }, 100)

    return () => clearTimeout(loadVideoTimer)
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo) return

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
      
      const section = sectionRef.current
      if (section) {
        section.addEventListener('click', handleHeroClick)
        section.addEventListener('touchstart', handleHeroClick)
      }

      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (section) {
          section.removeEventListener('click', handleHeroClick)
          section.removeEventListener('touchstart', handleHeroClick)
        }
      }
    }
  }, [isVideoPlaying, shouldLoadVideo])
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId) as HTMLElement
    if (target) {
      // Get Lenis instance from window
      const lenis = window.lenis
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden isolate"
      style={{ position: 'relative', zIndex: 0 }}
    >
      {/* Background container - garante que absolute fique contido */}
      <div className="absolute inset-0 -z-10">
        {/* Poster Image - sempre visível até o vídeo carregar */}
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="/images/hero-home-mobile.webp?v=2"
          />
          <img
            src="/images/hero-home.webp?v=2"
            alt="Homsi Engenharia"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: isVideoPlaying ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        </picture>
        
        {/* Video Background - lazy loaded */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/images/hero-home.webp?v=2"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: isVideoPlaying ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            <source src="/videos/hero-home.webm?v=2" type="video/webm" />
            <source src="/videos/hero-home.mp4?v=2" type="video/mp4" />
            <track kind="captions" />
          </video>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div>
          <h2 
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in"
            style={{ color: '#FFFFFF' }}
          >
            Soluções em Engenharia
          </h2>
          
          <p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay-1"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Transformamos ideias em realidade com projetos de engenharia inovadores, 
            seguros e sustentáveis.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2"
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

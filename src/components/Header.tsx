import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      // Get Lenis instance from window
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0, // Sem offset para aparecer no topo exato
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
    setIsMenuOpen(false)
  }

  const handleCtaClick = () => {
    const target = document.querySelector('#contato')
    if (target) {
      // Get Lenis instance from window
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0, // Sem offset para aparecer no topo exato
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
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
      
      // Get all sections
      const aboutSection = document.querySelector('#sobre')
      const testimonialsSection = document.querySelector('#depoimentos')
      
      if (aboutSection || testimonialsSection) {
        const aboutRect = aboutSection?.getBoundingClientRect()
        const testimonialsRect = testimonialsSection?.getBoundingClientRect()
        
        // Check if we're in the about section (light background)
        const isInAboutSection = aboutRect && aboutRect.top <= 100 && aboutRect.bottom >= 100
        
        // Check if we're in the testimonials section (light background)
        const isInTestimonialsSection = testimonialsRect && testimonialsRect.top <= 100 && testimonialsRect.bottom >= 100
        
        // Projects section has dark background, so we keep it as dark section
        setIsDarkSection(!isInAboutSection && !isInTestimonialsSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={cn(
      "fixed top-0 left-0 z-50 w-full transition-transform duration-300 ease-in-out",
      isVisible ? "translate-y-0" : "-translate-y-full",
      !isDarkSection && "light-section"
    )}>
      <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src="/images/icon-white.svg"
              alt="Homsi Engenharia" 
              className={cn(
                "w-8 h-8 transition-all duration-300",
                !isDarkSection && "brightness-0"
              )}
            />
            <div className="hidden sm:block">
              <h1 className={cn(
                "text-2xl font-bold transition-colors duration-300",
                isDarkSection ? "text-white" : "text-gray-900"
              )}>Homsi Engenharia</h1>
            </div>
          </div>
          
          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center" aria-label="Menu principal">
            <ul className="flex items-center space-x-6 lg:space-x-8">
               <li>
                <a 
                  href="#sobre" 
                  title="Sobre a Homsi Engenharia"
                  onClick={(e) => handleAnchorClick(e, '#sobre')}
                  className={cn(
                    "px-4 py-2 text-base font-black transition-all duration-300 uppercase hover:text-[#f3ede1]",
                    isDarkSection 
                      ? "text-white" 
                      : "text-gray-900"
                  )}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#servicos" 
                  title="Serviços de engenharia civil"
                  onClick={(e) => handleAnchorClick(e, '#servicos')}
                  className={cn(
                    "px-4 py-2 text-base font-black transition-all duration-300 uppercase hover:text-[#f3ede1]",
                    isDarkSection 
                      ? "text-white" 
                      : "text-gray-900"
                  )}
                >
                  Serviços
                </a>
              </li>
              <li>
                <a 
                  href="#projetos" 
                  title="Projetos de engenharia realizados pela Homsi Engenharia"
                  onClick={(e) => handleAnchorClick(e, '#projetos')}
                  className={cn(
                    "px-4 py-2 text-base font-black transition-all duration-300 uppercase hover:text-[#f3ede1]",
                    isDarkSection 
                      ? "text-white" 
                      : "text-gray-900"
                  )}
                >
                  Projetos
                </a>
              </li>
            </ul>
          </nav>
          
          {/* CTA Button - Desktop only */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button 
              onClick={handleCtaClick}
              className="hidden lg:flex btn-primary rounded-xl px-6 py-2 shadow-lg items-center justify-center"
            >
              Solicitar orçamento
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className={cn(
                "lg:hidden hover:opacity-80 transition-all duration-300 p-2 rounded-lg",
                isDarkSection ? "text-white" : "text-gray-900"
              )}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pt-4 border-t border-white/20"
            aria-label="Menu principal mobile"
          >
            <ul className="flex flex-col space-y-2">
             <li>
                <a 
                  href="#sobre" 
                  title="Sobre a Homsi Engenharia"
                  onClick={(e) => handleAnchorClick(e, '#sobre')}
                  className={cn(
                    "hover:text-[#f3ede1] transition-all duration-300 block py-3 px-4 rounded-xl font-black uppercase",
                    isDarkSection ? "text-white" : "text-gray-900"
                  )}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#servicos" 
                  title="Serviços de engenharia civil"
                  onClick={(e) => handleAnchorClick(e, '#servicos')}
                  className={cn(
                    "hover:text-[#f3ede1] transition-all duration-300 block py-3 px-4 rounded-xl font-black uppercase",
                    isDarkSection ? "text-white" : "text-gray-900"
                  )}
                >
                  Serviços
                </a>
              </li>
              <li>
                <a 
                  href="#projetos" 
                  title="Projetos de engenharia realizados pela Homsi Engenharia"
                  onClick={(e) => handleAnchorClick(e, '#projetos')}
                  className={cn(
                    "hover:text-[#D6BDAA] transition-all duration-300 block py-3 px-4 rounded-xl font-black uppercase",
                    isDarkSection ? "text-white" : "text-gray-900"
                  )}
                >
                  Projetos
                </a>
              </li>
              <li>
                <button 
                  onClick={handleCtaClick}
                  className="btn-primary rounded-xl px-6 py-3 shadow-lg mt-4 w-full"
                >
                  Solicitar orçamento
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
        </div>
      </div>
    </header>
  )
}

export default Header

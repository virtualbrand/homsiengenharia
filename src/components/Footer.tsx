"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ServiceAreaMap } from "@/components/ui/footer-map"

function Footer() {
  const lottieRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animation: any = null
    
    const loadLottie = async () => {
      try {
        const lottie = await import('lottie-web')
        if (lottieRef.current) {
          // Limpa completamente o container
          lottieRef.current.innerHTML = ''
          
          animation = lottie.default.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/icons/whatsapp-icon.json',
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet'
            }
          })
          
          // Torna a animação mais lenta (50% da velocidade original)
          if (animation) {
            animation.setSpeed(0.5)
          }
          
          // Remove qualquer SVG duplicado após carregar
          setTimeout(() => {
            if (lottieRef.current) {
              const svgs = lottieRef.current.querySelectorAll('svg')
              if (svgs.length > 1) {
                for (let i = 1; i < svgs.length; i++) {
                  svgs[i].remove()
                }
              }
            }
          }, 100)
        }
      } catch (error) {
        console.error('Erro ao carregar Lottie:', error)
      }
    }
    
    loadLottie()
    
    return () => {
      if (animation) {
        animation.destroy()
      }
      if (lottieRef.current) {
        lottieRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-5 right-2 z-50">
        <a 
          href="https://wa.me/5531992261911" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div 
            ref={lottieRef}
            className="w-18 h-18"
          />
        </a>
      </div>

      <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative border-t border-gray-800 bg-[var(--color-primary-800)] text-white transition-colors duration-300"
    >
      <div className="container mx-auto px-4 pt-20 pb-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-[2fr_3fr]">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Homsi Engenharia</h2>
            <p className="mb-6 text-lg text-gray-300 leading-relaxed">
              A Homsi Engenharia é uma empresa especializada em construção e reformas de alto padrão, atuando com excelência em Belo Horizonte, Nova Lima e Lagoa Santa / MG.
            </p>
            
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-white">Contato</h3>
              <address className="space-y-2 text-lg text-gray-300 leading-relaxed mb-6">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p>Rua Tenente Brito Melo - Barro Preto</p>
                      <p>Belo Horizonte - MG, 30180-072</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p>(31) 99226-1911</p>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p>contato@homsiengenharia.com</p>
                  </li>
                  <li className="flex items-center pt-2">
                    <svg className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <p>Segunda à Sexta - 8h30 às 17h30</p>
                  </li>
                </ul>
              </address>
              <div>
                <div className="flex space-x-4">
                    <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href="https://www.instagram.com/kemel_homsiengenharia" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-[var(--color-primary-800)] border border-white/30 hover:bg-[#D6BDAA] hover:border-[#D6BDAA] hover:scale-110 transition-all duration-500 group"
                        >
                          <img src="/icons/instagram.svg" alt="" className="h-4 w-4 brightness-0 invert opacity-50 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />
                          <span className="sr-only">Instagram</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Siga-nos no Instagram</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href="https://www.youtube.com/@HomsiEngenharia?sub_confirmation=1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-[var(--color-primary-800)] border border-white/30 hover:bg-[#D6BDAA] hover:border-[#D6BDAA] hover:scale-110 transition-all duration-500 group"
                        >
                          <img src="/icons/youtube.svg" alt="" className="h-4 w-4 brightness-0 invert opacity-50 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />
                          <span className="sr-only">YouTube</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Inscreva-se no YouTube</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href="https://www.tiktok.com/@homsiengenharia" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-[var(--color-primary-800)] border border-white/30 hover:bg-[#D6BDAA] hover:border-[#D6BDAA] hover:scale-110 transition-all duration-500 group"
                        >
                          <img src="/icons/tiktok.svg" alt="" className="h-4 w-4 brightness-0 invert opacity-50 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />
                          <span className="sr-only">TikTok</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Siga-nos no TikTok</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Áreas de Atendimento</h3>
            <div className="mb-4">
              <ServiceAreaMap />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Homsi Engenharia. Todos os direitos reservados | 55.155.900/0001-08
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors text-gray-400 hover:text-[#D6BDAA]">
              Política de Privacidade
            </a>
          </nav>
        </div>
      </div>
    </motion.footer>
    </>
  )
}

export { Footer }
export default Footer

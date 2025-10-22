"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function Footer() {
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
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 pt-20 pb-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Homsi Engenharia</h2>
            <p className="mb-6 text-lg text-gray-700 leading-relaxed">
              A Homsi Engenharia é uma empresa especializada em construção e reformas de alto padrão, atuando com excelência em Belo Horizonte e na região metropolitana.
            </p>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
            <nav className="space-y-2 text-lg text-gray-700 leading-relaxed">
              <a 
                href="#sobre" 
                onClick={(e) => handleAnchorClick(e, '#sobre')}
                className="block transition-colors hover:text-primary"
              >
                Sobre Nós
              </a>
              <a 
                href="#servicos" 
                onClick={(e) => handleAnchorClick(e, '#servicos')}
                className="block transition-colors hover:text-primary"
              >
                Serviços
              </a>
              <a 
                href="#projetos" 
                onClick={(e) => handleAnchorClick(e, '#projetos')}
                className="block transition-colors hover:text-primary"
              >
                Projetos
              </a>
              <a 
                href="#contato" 
                onClick={(e) => handleAnchorClick(e, '#contato')}
                className="block transition-colors hover:text-primary"
              >
                Contato
              </a>
            </nav>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Contato</h3>
            <address className="space-y-2 text-lg text-gray-700 leading-relaxed mb-6">
              <p>Rua Tenente Brito Melo - Barro Preto</p>
              <p>Belo Horizonte - MG, 30180-072</p>
              <p>Telefone: (11) 1234-5678</p>
              <p>E-mail: contato@homsiengenharia.com</p>
              <p className="pt-2">Segunda à Sexta - 8h30 às 17h30</p>
            </address>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Acompanhe</h4>
              <div className="flex space-x-4">
                  <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="https://www.instagram.com/kemel_homsiengenharia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-900 hover:bg-[#D6BDAA] hover:border-[#D6BDAA] hover:scale-110 transition-all duration-500"
                      >
                        <img src="/icons/instagram.svg" alt="" className="h-4 w-4" />
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
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-900 hover:bg-[#D6BDAA] hover:border-[#D6BDAA] hover:scale-110 transition-all duration-00"
                      >
                        <img src="/icons/youtube.svg" alt="" className="h-4 w-4" />
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
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-900 hover:bg-[#D6BDAA] hover:border-[#D6BDAA] hover:scale-110 transition-all duration-500"
                      >
                        <img src="/icons/tiktok.svg" alt="" className="h-4 w-4" />
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
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t !border-[var(--color-text-600)] pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Homsi Engenharia. Todos os direitos reservados | 55.155.900/0001-08
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors text-muted-foreground hover:text-primary">
              Política de Privacidade
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
export default Footer

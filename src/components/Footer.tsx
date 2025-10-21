"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function Footer() {
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Homsi Engenharia</h2>
            <p className="mb-6 text-muted-foreground">
              A Homsi Engenharia é uma empresa especializada em construção e reformas de alto padrão, atuando com excelência em Belo Horizonte e na região metropolitana.
            </p>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-primary">
                Sobre Nós
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Serviços
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Projetos
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Contato
              </a>
            </nav>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Contato</h3>
            <address className="space-y-2 text-sm not-italic mb-6">
              <p>Rua Tenente Brito Melo - Barro Preto</p>
              <p>Belo Horizonte - MG, 30180-072</p>
              <p>Telefone: (11) 1234-5678</p>
              <p>E-mail: contato@homsiengenharia.com</p>
              <p className="pt-2">Segunda à Sexta - 8h30 às 17h30</p>
            </address>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Siga-nos</h4>
              <div className="flex space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Conecte-se no LinkedIn</p>
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

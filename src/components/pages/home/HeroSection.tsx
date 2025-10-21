import { Button } from '../../ui/button'

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 h-screen flex items-center">
        <div className="max-w-4xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Soluções em{' '}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Engenharia
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
                Transformamos ideias em realidade com projetos de engenharia inovadores, 
                seguros e sustentáveis.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Nossos Serviços
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Ver Projetos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-white/70">Projetos Realizados</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-white/70">Anos de Experiência</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/70">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  )
}

export default HeroSection

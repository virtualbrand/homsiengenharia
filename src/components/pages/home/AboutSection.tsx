import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const AboutSection = () => {
  useScrollAnimation()

  return (
    <section id="sobre" className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Content Side - 5 colunas */}
          <div className="col-span-12 md:col-start-2 md:col-span-5">
            <div>
              <span className="fade-in font-bold text-sm uppercase tracking-wider block text-[var(--color-secondary-700)]">
                Sobre o Fundador
              </span>
              <h2 className="fade-in text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Kemel Homsi
              </h2>
              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-gray-900">A Homsi Engenharia</span> é uma empresa especializada em{' '}
                <span className="font-bold text-gray-900">construção e reformas de alto padrão</span>, 
                atuando com excelência em Belo Horizonte e na região metropolitana.
              </p>
              
              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-6">
                Com mais de 15 anos de experiência no mercado, Kemel Homsi construiu uma trajetória 
                marcada pela dedicação, profissionalismo e compromisso com a qualidade. Cada projeto 
                é tratado com atenção aos mínimos detalhes, garantindo que o resultado supere as 
                expectativas dos clientes.
              </p>

              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-8">
                Nossa missão é transformar sonhos em realidade, oferecendo soluções personalizadas 
                que aliam técnica, inovação e sustentabilidade. Da concepção à entrega final, 
                trabalhamos com transparência e excelência em cada etapa.
              </p>
            </div>
          </div>

          {/* Image Side - 5 colunas com 1 coluna de espaçamento à esquerda */}
          <div className="col-span-12 md:col-start-8 md:col-span-4 relative">
            <div className="fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-2xl opacity-20 blur-2xl" />
              <img
                src="/images/kemel-homsi-sobre.webp"
                alt="Kemel Homsi - Engenheiro Civil"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

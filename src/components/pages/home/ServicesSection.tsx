import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Data for construction/engineering services
const servicesData = [
  {
    id: "construction",
    title: "Construção Completa",
    subtitle: "Da terraplanagem à entrega das chaves",
    description: "Cuidamos de toda a jornada da sua obra com gestão integrada e acompanhamento profissional em cada etapa:",
    features: [
      "Aprovações legais e alvarás",
      "Execução estrutural e acabamentos",
      "Coordenação de todos os profissionais",
      "Entrega \"chave na mão\" com garantia"
    ],
    footer: "Sua obra em boas mãos, do começo ao fim."
  },
  {
    id: "renovation",
    title: "Reformas e Modernizações",
    subtitle: "Residencial e Comercial",
    description: "Transformamos espaços com inteligência e cuidado artesanal:",
    features: [
      "Ampliações e mudanças de layout",
      "Modernização de ambientes (cozinhas, banheiros, áreas gourmet)",
      "Adequação a normas técnicas e acessibilidade",
      "Automação e sistemas sustentáveis"
    ],
    footer: "Renovamos com propósito, respeitando sua história."
  },
  {
    id: "maintenance",
    title: "Manutenção Preventiva",
    subtitle: "Pacotes mensais de cuidado contínuo",
    description: "Protegemos seu patrimônio com assistência permanente:",
    features: [
      "Sistema hidráulico e elétrico",
      "Estrutura e acabamentos",
      "Acompanhamento de sistemas especiais (piscina, energia solar, poço artesiano)",
      "Resposta rápida para emergências"
    ],
    footer: "Tranquilidade garantida, mês a mês."
  },
];

export default function ServicesSection() {
  useScrollAnimation();
  
  return (
    <section id="servicos" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services-bg.webp)' }}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full">
          <div className="flex flex-col gap-8 py-8 md:py-12 lg:py-16">
            {/* Section Header */}
            <div className="text-center mb-2 fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Serviços
              </h2>
              <p className="fade-in text-xl leading-relaxed text-white">
                Transformamos projetos em realidade, do início ao fim, com a segurança de quem conhece cada detalhe da construção
              </p>
            </div>
            
            {/* Services Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesData.map((service) => (
                <div key={service.id} className="relative scroll-bottom">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-2xl opacity-50" />
                  
                  <div 
                    className="relative backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 h-full"
                    style={{ backgroundColor: 'rgba(19, 20, 24, 0.85)' }}
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/10 to-transparent rounded-2xl" />
                    
                    <div className="relative space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                          {service.title}
                        </h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-2" />
                        <p className="text-white text-base md:text-lg mt-2">
                          {service.subtitle}
                        </p>
                      </div>
                      
                      {service.description && (
                        <p className="text-white/90 text-base leading-relaxed">
                          {service.description}
                        </p>
                      )}
                      
                      {service.features && (
                        <ul className="space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-white/90 text-base">
                              <span className="text-white mr-2 mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {service.footer && (
                        <p className="text-white text-base font-medium italic pt-2 border-t border-white/20">
                          {service.footer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

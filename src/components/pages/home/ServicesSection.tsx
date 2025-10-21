import BackgroundShader from "@/components/ui/background-shader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Data for construction/engineering services
const servicesData = [
  {
    id: "construction",
    title: "Construção Completa",
    subtitle: "Da terraplanagem à entrega das chaves",
  },
  {
    id: "renovation",
    title: "Reformas e Modernizações",
    subtitle: "Residencial e Comercial",
  },
  {
    id: "maintenance",
    title: "Manutenção Preventiva",
    subtitle: "Pacotes mensais de cuidado contínuo",
  },
];

export default function ServicesSection() {
  useScrollAnimation();
  
  return (
    <section id="servicos">
    <BackgroundShader 
      className="w-full"
      colors={[
        "hsl(0, 0%, 7%)",       // Very dark gray
        "hsl(0, 0%, 15%)",      // Dark gray
        "hsl(0, 0%, 20%)",      // Medium gray
        "hsl(0, 0%, 25%)",      // Medium dark gray
      ]}
      distortion={0.6}
      swirl={0.15}
      speed={0.8}
    >
      {/* Two Columns Layout - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column - Video Full Width (5 columns) */}
        <div className="relative overflow-hidden h-full min-h-[400px] lg:min-h-[700px] lg:col-span-5">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-home.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
          {/* Video overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Right Column - Services Cards respecting container (7 columns) */}
        <div className="lg:col-span-7 flex items-center justify-start">
          {/* Wrapper que simula o container do header */}
          <div className="w-full">
            <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-[1280px]">
              <div className="flex flex-col gap-6 py-8 md:py-12 lg:py-16">
            {/* Section Header */}
            <div className="text-left mb-8 fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Serviços
              </h2>
              <p className="text-gray-300 text-lg md:text-xl">
                Transformamos projetos em realidade, do início ao fim, com a segurança de quem conhece cada detalhe da construção.
              </p>
            </div>
            
            {servicesData.map((service) => (
              <div 
                key={service.id} 
                className="relative scroll-bottom"
              >
                <div className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl p-6 md:p-8">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-transparent opacity-50" />
                  
                  {/* Glass content */}
                  <div className="relative text-left space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                      {service.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                    <p className="text-white/90 text-sm md:text-base drop-shadow-md">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundShader>
    </section>
  );
}

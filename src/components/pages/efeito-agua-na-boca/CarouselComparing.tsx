import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";
import { presetsComparisons } from "@/data/presets-images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

// Componente carousel usando CSS scroll-snap com comparação de imagens reais
export const CarouselComparing = () => {
  // Usando todos os presets disponíveis no carousel
  // Duplicamos os items para criar o efeito de loop infinito
  const originalPresets = presetsComparisons;
  const featuredPresets = [...originalPresets, ...originalPresets, ...originalPresets];

  const scrollLeft = () => {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      const cardWidth = 320;
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      
      // Reposiciona se necessário após o scroll
      setTimeout(() => {
        const currentScroll = container.scrollLeft;
        const totalWidth = container.scrollWidth;
        const oneSetWidth = totalWidth / 3; // Temos 3 conjuntos duplicados
        
        if (currentScroll <= 0) {
          // Se chegou ao início, move para o conjunto do meio
          container.scrollTo({ left: oneSetWidth, behavior: 'auto' });
        }
      }, 300);
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      const cardWidth = 320;
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      
      // Reposiciona se necessário após o scroll
      setTimeout(() => {
        const currentScroll = container.scrollLeft;
        const totalWidth = container.scrollWidth;
        const oneSetWidth = totalWidth / 3; // Temos 3 conjuntos duplicados
        const maxScroll = totalWidth - container.clientWidth;
        
        if (currentScroll >= maxScroll) {
          // Se chegou ao final, move para o conjunto do meio
          container.scrollTo({ left: oneSetWidth, behavior: 'auto' });
        }
      }, 300);
    }
  };

  // Inicializa o carrossel no meio dos itens duplicados
  useEffect(() => {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      const totalWidth = container.scrollWidth;
      const oneSetWidth = totalWidth / 3;
      // Posiciona o primeiro card alinhado com a margem esquerda
      container.scrollTo({ left: oneSetWidth, behavior: 'auto' });
    }
  }, []);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="relative px-4 md:px-8">
          <div 
            className="carousel-container flex overflow-x-auto gap-3 md:gap-4 pb-4 scroll-smooth scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              paddingRight: '64px',
              marginRight: '-256px'
            }}
        >
          {featuredPresets.map((preset, index) => (
            <div 
              key={preset.id}
              className={`flex-none w-72 sm:w-80 md:w-64 lg:w-72 xl:w-80 2xl:w-96 ${index === 0 ? '' : ''}`}
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="relative" style={{ aspectRatio: '4/5' }}>
                  <ImageComparisonSlider
                    leftImage={preset.beforeImage}
                    rightImage={preset.afterImage}
                    altLeft={`${preset.title} - Antes`}
                    altRight={`${preset.title} - Depois`}
                    initialPosition={50}
                    className="w-full h-full rounded-t-2xl"
                  />
                </div>
                <div className="p-4 text-center">
                  {/* <h3 className="text-3xl md:text-4xl font-bold text-primary-700">{preset.title}</h3> */}
                  <p className="text-sm text-chocolate-600 mt-2">{preset.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            style={{ borderRadius: '50%', padding: '2px' }}
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={scrollRight}
            className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            style={{ borderRadius: '50%', padding: '2px' }}
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CarouselComparing

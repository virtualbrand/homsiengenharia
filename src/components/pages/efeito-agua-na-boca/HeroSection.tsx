import { motion } from "framer-motion"
// ...existing code...

import { ImageComparisonSlider } from "../../ui/image-comparison-slider-horizontal"

export const HeroSection = () => {
  // ...existing code...

  // Atualiza o estado corretamente ao interagir com o slider
  const handleSliderInteraction = () => {
    // Se quiser atualizar a posição do slider, use o callback do próprio slider
  };
  return (
    <section className="h-screen w-full relative overflow-hidden">
      <div className="h-full w-full relative">
        <ImageComparisonSlider
          leftImage="/images/presets-hero-before.webp"
          rightImage="/images/presets-hero-after.webp"
          altLeft="Foto original do bolo - antes dos presets"
          altRight="Foto transformada com presets profissionais - depois"
          initialPosition={60}
          className="h-full w-full"
          onInteractionStart={handleSliderInteraction}
        />

        <div className="absolute inset-0 flex items-center pointer-events-none z-10">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="backdrop-blur-md rounded-2xl p-8 md:p-10 md:pb-10 lg:p-12 max-w-xl lg:max-w-2xl text-white shadow-2xl pointer-events-auto bg-[var(--color-primary-500)]"
            >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold !text-white"
            >
              Foto que dá água na boca vende mais!
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white mb-6 leading-relaxed text-base md:text-lg"
            >
              <p className="mb-3">
                Não basta a comida <strong className="text-white">ser gostosa</strong>, ela precisa <strong className="text-white">parecer gostosa!</strong>
              </p>
              <p className="mb-3">
                Antes dos seus clientes comprarem o seu produto, eles saboreiam com os olhos. E pra <strong className="text-white">vender mais</strong>, as suas fotos precisam ativar o <strong className="text-white">Efeito Água na Boca</strong> - a única técnica que faz qualquer pessoa sentir vontade de comer só de olhar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 w-full text-base md:text-lg"
                onClick={() => {
                  const el = document.getElementById('investimento');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Quero despertar o Efeito Água na Boca
              </motion.button>
              
              {/* Texto "Arraste para comparar" absolutamente posicionado próximo ao botão do slider
              {showCompareText && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showCompareText ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none"
                  style={{ left: `calc(${sliderPosition}% - 60px)` }} // Ajustado para alinhar à esquerda do slider
                >
                  <span
                    className="absolute z-30 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-md backdrop-blur-md"
                    style={{ minWidth: 0 }}
                  >
                    ↔️ Arraste para comparar
                  </span>
                </motion.div>
              )} */}
            </motion.div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

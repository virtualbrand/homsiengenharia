import { motion } from "framer-motion"
// ...existing code...

export const HeroSection = () => {
  // ...existing code...

  return (
    <section
      className="h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/presets-hero-after.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-full w-full relative">
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
            </motion.div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

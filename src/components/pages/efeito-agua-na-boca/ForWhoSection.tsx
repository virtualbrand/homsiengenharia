import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { CarouselComparing } from "./CarouselComparing"

export const ForWhoSection = () => {
  const targetAudience = [
    {
      title: "Cupcakes"
    },
    {
      title: "Biscoitos e Cookies"
    },
    {
      title: "Doces e Sobremesas"
    },
    {
      title: "Tortas, Mousses e Cremes"
    },
    {
      title: "Salgados"
    }
  ]

  return (
    <>
      <section className="w-full py-20 lg:py-24 bg-gradient-to-br from-neutral-50 to-accent-50">
  <div className="container w-[86%] mx-auto md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Coluna Esquerda - Título, Descrição e Lista */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 text-left"
            >              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold text-primary-700"
              >
                Como ativar o Efeito Água na Boca em qualquer doce?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-chocolate-600"
              >
                Qualquer comida que você queira fazer alguém ficar com desejo só de olhar:
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col gap-4 pt-4"
              >
                {targetAudience.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex flex-row gap-4 items-center"
                  >
                    <Check className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <p className="!font-bold text-primary-700">{item.title}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Coluna Direita - Box Branco com Shadow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl px-8 py-12 lg:px-10 lg:py-16 flex flex-col gap-6"
            >
              <p className="text-lg text-primary-700 leading-relaxed">
                Páscoa, Natal, Dia das Crianças, Dia da Mulher e qualquer outra data comemorativa na qual você queira{" "}
                <strong className="text-bold">multiplicar suas vendas!</strong>
                <br /><br />
                <span className="text-chocolate-600">
                  O <strong className="text-accent-600">Efeito Água na Boca</strong> funciona com qualquer tipo de doce, transformando fotos comuns em imagens que despertam vontade instantânea.
                </span>
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <button 
                  className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold text-base px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full lg:w-auto"
                  onClick={() => {
                    const el = document.getElementById('investimento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Quero ativar o efeito nos meus doces
                </button>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

    <div className="w-full bg-gradient-to-br from-neutral-50 to-accent-50 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <CarouselComparing />
      </motion.div>
    </div>
    </>
  )
}

export default ForWhoSection


import { useState } from "react";
import { motion } from "framer-motion";
import { GradientBackground } from "../../ui/gradient-background";
import PresetAccessModal from "./PresetAccessModal";

const FinalCTASection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <GradientBackground
      gradients={[ 
        "linear-gradient(135deg, #CC4C31 0%, #8D412A 100%)",
        "linear-gradient(135deg, #8D412A 0%, #CC4C31 100%)"
      ]}
      animationDuration={8}
      animationDelay={0.5}
      className="py-16 md:py-24"
    >
  <div className="w-[90%] max-w-[800px] mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold !text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Pronta para ativar o Efeito Água na Boca e multiplicar suas vendas?
        </motion.h2>
        <motion.p
          className="text-lg text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Pare de perder vendas por causa de fotos sem impacto. Domine o Efeito Água na Boca e transforme cada foto em uma oportunidade de venda.
        </motion.p>
        <motion.button
          className="bg-[#CC8A3A] hover:bg-[#b8772d] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg font-kumbh text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          onClick={handleOpenModal}
        >
          Quero dominar o efeito água na boca agora
        </motion.button>
        <PresetAccessModal open={showModal} onClose={handleCloseModal} />
      </div>
    </GradientBackground>
  );
};

export default FinalCTASection;

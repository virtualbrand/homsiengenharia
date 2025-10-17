
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { InteractiveHoverButton } from "../../ui/interactive-hover-button";
import { Progress } from "@/components/ui/progress";
import { getPrimaryButtonText, getHoverButtonText, getProgressText, getCurrentLot, getInstallmentPrice } from "@/data/workshop-config";
import PresetAccessModal from "./PresetAccessModal";

// Declarações de tipo para Vanta.js
declare global {
  interface Window {
    THREE: any;
    VANTA: {
      FOG: (options: any) => any;
    };
  }
}

const PricingSection = () => {
  const [showModal, setShowModal] = useState(false)
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      // Carrega os scripts do Vanta.js dinamicamente
      const loadVanta = async () => {
        // Carrega Three.js primeiro
        if (!window.THREE) {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
          document.head.appendChild(threeScript);
          await new Promise(resolve => threeScript.onload = resolve);
        }

        // Carrega Vanta FOG
        if (!window.VANTA?.FOG) {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js';
          document.head.appendChild(vantaScript);
          await new Promise(resolve => vantaScript.onload = resolve);
        }

        // Inicializa o efeito Vanta FOG
        if (window.VANTA?.FOG && vantaRef.current) {
          vantaEffect.current = window.VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x800F2F,
            midtoneColor: 0xFFB3C1,
            lowlightColor: 0xA4133C,
            baseColor: 0x23060E,
            blurFactor: 0.61,
            speed: 1.5,
            zoom: 1
          });
        }
      };

      loadVanta();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section 
      ref={vantaRef}
      className="w-full py-16 md:py-24 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div id="investimento" className="mx-auto max-w-5xl px-6 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center !text-white font-kumbh"
            >
              Quanto você vai investir para adquirir todo esse conhecimento?
            </motion.h2>
          </div>
          <div className="bg-white/80 rounded-3xl shadow-2xl shadow-zinc-950/5">
            <div className="grid items-center gap-12 divide-y p-8 md:grid-cols-2 md:divide-x md:divide-y-0">
              {/* Box de preço */}
              <div className="pb-12 text-center md:pb-0 md:pr-12">
                {/* <h3 className="text-2xl md:text-2xl font-bold !text-[var(--color-amaranth-500)] font-kumbh">Efeito Água na Boca</h3> */}
                {/* <p className="text-lg text-foreground font-kumbh font-normal">O efeito que faz seus doces parecerem irresistíveis</p> */}
                <span className="mb-6 mt-6 inline-block text-5xl font-bold">
                  <span className="block text-sm md:text-base text-gray-700 line-through font-kumbh" style={{ opacity: 0.7 }}>R$ {getCurrentLot().originalPrice}</span>
                  <span className="block text-4xl md:text-5xl font-bold !text-[var(--color-amaranth-500)] font-kumbh">R$ {getCurrentLot().currentPrice}</span>
                  <span className="block text-lg md:text-xl font-bold !text-[var(--color-amaranth-500)] font-kumbh">ou {getInstallmentPrice()}</span>
                </span>
                <div className="flex flex-col gap-4 max-w-[360px]">
                  <InteractiveHoverButton
                    text={getPrimaryButtonText()}
                    hoverText={getHoverButtonText()}
                    className="w-full"
                    onClick={handleOpenModal}
                  />
                  <div className="flex flex-col gap-2">
                    <Progress
                      value={getCurrentLot().soldPercentage}
                      className="w-full h-2 bg-white/10 rounded-full"
                      barClassName="bg-[#996b74] rounded-full transition-all"
                    />
                    <span className="text-sm text-grey-700">{getProgressText()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-4">
                    <img 
                      src="/images/formas-pagamento.svg" 
                      alt="Formas de pagamento aceitas: Visa, Mastercard, American Express, Elo, Hipercard, Diners, PIX" 
                      className="h-7 md:h-8 rounded-md px-2 py-1 filter grayscale contrast-80 brightness-10"
                    />
                </div>
              </div>
              {/* Lista de vantagens */}
              <div className="relative">
                <ul role="list" className="space-y-2 text-foreground text-base md:text-lg font-kumbh font-normal">
                  {[
                    'Planilha de precificação',
                    'Template de pesquisa de mercado',
                    'Scripts de atendimento no WhatsApp prontos',
                    'Checklist dos primeiros 30 dias'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-4 text-[#C9184A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-foreground mt-6 text-sm font-kumbh font-normal">Ideal para confeiteiras que, assim como eu em 2020, têm mão pra bolo mas ainda não descobriram como transformar esse talento em um negócio lucrativo e organizado.</p>
              </div>
            </div>
          </div>
        </div>
        <PresetAccessModal open={showModal} onClose={handleCloseModal} />
      </div>
    </section>
  )
}

export default PricingSection;

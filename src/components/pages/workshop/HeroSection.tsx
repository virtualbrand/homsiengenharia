import { Progress } from "@/components/ui/progress";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useEffect, useRef } from "react";
import { workshopConfig, getPrimaryButtonText, getHoverButtonText, getProgressText, getCurrentLot } from "@/data/workshop-config";

// Declarações de tipo para Vanta.js
declare global {
  interface Window {
    THREE: any;
    VANTA: {
      FOG: (options: any) => any;
    };
  }
}

export const HeroSection = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

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
      className="min-h-screen w-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 py-8">
            <img src="/images/workshop-duda-logo.svg" alt="Logo" className="w-45 h-45" />
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm">
              {workshopConfig.event.edition}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative h-screen w-full flex items-center z-10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-8">
              {workshopConfig.event.date}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Do ZERO aos R$ 5.000 /mês trabalhando de casa com Confeitaria
            </h1>
            <div className="text-white mb-8 text-lg md:text-xl">
              <p>
                2 dias com o passo a passo completo para faturar da sua cozinha:
              </p>
              <p>
                <strong>PRODUTO + LUCRO + VENDA</strong>
              </p>
            </div>
                          <div className="mt-10">
              <div className="flex flex-col gap-4 max-w-[360px]">
                <InteractiveHoverButton
                  text={getPrimaryButtonText()}
                  hoverText={getHoverButtonText()}
                  className="w-full"
                  onClick={() => {
                    const el = document.getElementById('investimento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Progress
                    value={getCurrentLot().soldPercentage}
                    className="w-full h-2 bg-white/10 rounded-full"
                    barClassName="bg-[#FFB3C1] rounded-full transition-all"
                  />
                  <span className="text-sm text-white/90">{getProgressText()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

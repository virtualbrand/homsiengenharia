import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger, Observer);

// ========================================
// TYPES & INTERFACES
// ========================================

interface ModuloData {
  title: string;
  day: number;
  description: string;
}

interface CardProps {
  title: string;
  day: number;
  description: string;
}

// ========================================
// CONSTANTS
// ========================================

const ANIMATION_DURATION = 0.5;
const CARD_OFFSET = 20;
const SCROLL_DISTANCE_PER_CARD = 800;
const INITIAL_SCALE = 0.85;
const SCALE_INCREMENT = 0.03;

const modulosWorkshop: ModuloData[] = [
  {
    title: "Produto - O que vender primeiro",
    day: 1,
    description: "Descubra o erro fatal que 90% das confeiteiras iniciantes cometem ao escolher o que vender. Vou te mostrar por que bolos de aniversário são estratégicos e como posicionar seu produto para vender desde o início - mesmo sem portfólio ou seguidores.",
  },
  {
    title: "Lucro - Precificação que gera resultado",
    day: 1,
    description: "O método exato para calcular preços que garantem lucro real em cada venda. Você vai descobrir onde está perdendo dinheiro agora e como corrigir isso imediatamente - sem ficar mais cara que a concorrência nem trabalhar de graça.",
  },
  {
    title: "Venda - Onde encontrar clientes",
    day: 1,
    description: "As 3 estratégias práticas que me geraram os primeiros 16 pedidos numa cidade onde não conhecia ninguém. Você vai aprender exatamente onde estar, o que falar e como atrair clientes qualificados - sem depender de seguidores ou networking.",
  },
  {
    title: "Cardápio + primeiras vendas",
    day: 2,
    description: "Monte seu cardápio inicial com sabores, tamanhos e preços definidos. Você vai sair com mensagens prontas, locais mapeados e ações específicas para conseguir seus 10 primeiros pedidos em 30 dias - tudo pronto para aplicar na segunda-feira seguinte.",
  },
  {
    title: "Rotina de produção caseira",
    day: 2,
    description: "Organize sua agenda de produção adaptada à sua realidade - com filhos, outro trabalho ou tempo limitado. Você vai estruturar compras, preparos e entregas num cronograma simples que evita desperdício, caos e estresse.",
  },
  {
    title: "Plano de crescimento",
    day: 2,
    description: "O mapa completo com metas semanais e mensais para escalar de forma sustentável. Você vai saber exatamente o que fazer em cada fase do crescimento - com lista de equipamentos essenciais por etapa e quando investir em cada melhoria.",
  }
];

// ========================================
// COMPONENTS
// ========================================

export const Card = ({ title, day, description }: CardProps) => {
  return (
    <div
      className='card flex flex-col w-full rounded-2xl shadow-2xl border border-gray-200 bg-white'
      style={{ gridArea: '1 / 1 / 2 / 2' }}
    >
      <div className="flex items-center justify-between mb-4 md:mb-4">
        <span className="text-xs md:text-sm font-semibold text-[var(--color-amaranth-500)] bg-[var(--color-amaranth-500)]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
          Dia {day}
        </span>
      </div>
      
      <h2 className='text-lg md:text-xl lg:text-2xl font-bold !text-[var(--color-amaranth-500)] mb-4 md:mb-3 leading-tight text-left'>
        {title}
      </h2>
      
      <div className='flex-1'>
        <p className='text-base md:text-lg text-gray-600 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Cria as animações de empilhamento dos cards na timeline
 */
const createCardStackTimeline = (cards: HTMLElement[]) => {
  const tl = gsap.timeline({ paused: true });
  
  // Posicionamento inicial com offset progressivo
  gsap.set(cards, {
    y: (index) => CARD_OFFSET * index,
    transformOrigin: 'center top',
  });

  // Criar animação para cada card (exceto o primeiro)
  cards.forEach((card, index) => {
    if (index === 0) return; // Pular o primeiro card
    
    const previousCard = cards[index - 1];
    const scale = INITIAL_SCALE + (SCALE_INCREMENT * (index - 1));
    
    tl.add(`card${index + 1}`);
    tl.to(previousCard, {
      scale,
      duration: ANIMATION_DURATION,
    });
    tl.from(
      card,
      {
        y: () => window.innerHeight,
        duration: ANIMATION_DURATION,
      },
      '<'
    );
  });

  tl.add('end');
  return tl;
};

/**
 * Cria o observer de scroll para controlar a animação dos cards
 */
const createScrollObserver = (
  timeline: gsap.core.Timeline,
  animatingRef: React.MutableRefObject<boolean>
) => {
  const tweenToLabel = (direction: string | null, isScrollingDown: boolean) => {
    const hasNoNextLabel = !timeline.nextLabel() && isScrollingDown;
    const hasNoPreviousLabel = !timeline.previousLabel() && !isScrollingDown;
    
    if (hasNoNextLabel || hasNoPreviousLabel) return;
    
    if (!animatingRef.current && direction) {
      animatingRef.current = true;
      timeline.tweenTo(direction, {
        onComplete: () => {
          animatingRef.current = false;
        },
      });
    }
  };

  return Observer.create({
    wheelSpeed: -1,
    onDown: () => tweenToLabel(timeline.previousLabel(), false),
    onUp: () => tweenToLabel(timeline.nextLabel(), true),
    tolerance: 10,
    preventDefault: true,
    onEnable(self: any) {
      const savedScroll = self.scrollY();
      (self as any)._restoreScroll = () => self.scrollY(savedScroll);
      document.addEventListener('scroll', (self as any)._restoreScroll, {
        passive: false,
      });
    },
    onDisable: (self: any) => {
      document.removeEventListener('scroll', (self as any)._restoreScroll);
    },
  });
};

/**
 * Configura o ScrollTrigger para controlar quando o observer está ativo
 */
const createScrollTrigger = (cardsObserver: any, cardsCount: number) => {
  const scrollDistance = (cardsCount - 1) * SCROLL_DISTANCE_PER_CARD;
  
  ScrollTrigger.create({
    trigger: '.cards-section',
    pin: true,
    start: 'top 20%',
    end: `+=${scrollDistance}`,
    scrub: true,
    onEnter: () => !cardsObserver.isEnabled && cardsObserver.enable(),
    onEnterBack: () => !cardsObserver.isEnabled && cardsObserver.enable(),
    onLeave: () => cardsObserver.disable(),
    onLeaveBack: () => cardsObserver.disable(),
  });
};

// ========================================
// MAIN COMPONENT
// ========================================

function ConteudoEventoSection() {
  useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<any>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = gsap.utils.toArray('.card') as HTMLElement[];

    // Criar timeline com animações dos cards
    const timeline = createCardStackTimeline(cards);
    timelineRef.current = timeline;

    // Criar observer de scroll
    const cardsObserver = createScrollObserver(timeline, animatingRef);
    observerRef.current = cardsObserver;
    cardsObserver.disable();

    // Criar ScrollTrigger para controlar o observer
    createScrollTrigger(cardsObserver, cards.length);

    // Cleanup
    return () => {
      observerRef.current?.kill();
      timelineRef.current?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className='bg-white relative z-0' ref={containerRef}>
      <section className='w-full bg-white h-[30vh] grid place-content-center'>
        <div className="text-center">
          {/* Espaço antes da seção de cards */}
        </div>
      </section>

      <section className='cards-section w-full bg-white min-h-screen py-20 relative z-0'>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Coluna da esquerda - Título fixo */}
            <div className="lg:col-span-5 sticky-title">
              <div className="lg:sticky lg:top-32">
                <h2 className='fade-in text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-[120%] !text-[var(--color-amaranth-500)] mb-4'>
                  O que você vai aprender no Workshop Do ZERO aos R$ 5.000 /mês
                </h2>
                <p className="fade-in text-lg text-gray-600 leading-relaxed">
                  Tudo que você precisa saber sobre produto, precificação e vendas para faturar da sua cozinha
                </p>
              </div>
            </div>

            {/* Coluna da direita - Cards empilhados */}
            <div className="lg:col-span-7">
              <div ref={cardsRef} className='cards grid' style={{ gridTemplateColumns: '1fr' }}>
                {modulosWorkshop.map((modulo, i) => (
                  <Card
                    key={`modulo_${i}`}
                    title={modulo.title}
                    day={modulo.day}
                    description={modulo.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ConteudoEventoSection;

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    // Não inicializa Lenis nas rotas de admin
    if (isAdminRoute) {
      // Garante scroll nativo no admin
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      return;
    }

    // Inicializa o Lenis para smooth scroll apenas fora do admin
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      prevent: (node) => {
        // Previne Lenis em elementos específicos se necessário
        return node.classList.contains('no-lenis');
      },
    });

    // Expõe o Lenis no window para acesso global
    window.lenis = lenis;

    // Conecta Lenis com GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Força o Lenis a recalcular quando o conteúdo muda
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(document.body);

    // Recalcula após carregamento de imagens
    window.addEventListener('load', () => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    // Recalcula em mudanças de orientação
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      delete window.lenis;
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [isAdminRoute, pathname]);

  return <>{children}</>;
}

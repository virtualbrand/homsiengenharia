"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

// Definir os projetos com suas galerias
const projectGalleries = {
  "apto-felipe": [
    "/images/apto-felipe/1-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/2-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/3-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/4-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/5-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/6-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/7-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/8-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/9-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/10-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/11-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/12-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/13-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/14-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/15-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/16-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/17-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/18-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/19-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/20-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/21-apto-felipe-homsiengenharia.webp",
    "/images/apto-felipe/22-apto-felipe-homsiengenharia.webp",
  ],
  "casa-herbert-roberta": [
    "/images/casa-herbert-roberta/1-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/2-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/3-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/4-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/5-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/6-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/7-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/8-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/9-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/10-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/11-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/12-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/13-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/14-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/15-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/16-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/17-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/18-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/19-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/20-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/21-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/22-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/23-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/24-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/25-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/26-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/27-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/28-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/29-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/30-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/31-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/32-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/33-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/34-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/35-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/36-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/37-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/38-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/39-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/40-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/41-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/42-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/43-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/44-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/45-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/46-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/47-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/48-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/49-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/50-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/51-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/52-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/53-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/54-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/55-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/56-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/57-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/58-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/59-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/60-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/61-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/62-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/63-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/64-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/65-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/66-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/67-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/68-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/69-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/70-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/71-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/72-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/73-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/74-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/75-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/76-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/77-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/78-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/79-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/80-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/81-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/82-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/83-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/84-casa-herbert-roberta-homsiengenharia.webp",
    "/images/casa-herbert-roberta/85-casa-herbert-roberta-homsiengenharia.webp",
  ],
  "clinica-raissa": [
    "/images/clinica-raissa/1-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/2-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/3-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/4-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/5-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/6-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/7-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/8-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/9-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/10-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/11-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/12-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/14-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/15-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/16-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/17-medplex.homsiengenharia.webp",
    "/images/clinica-raissa/18-medplex.homsiengenharia.webp",
  ],
  "clinica-marcos": [
    "/images/clinica-marcos/1-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/2-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/3-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/4-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/5-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/6-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/7-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/8-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/9-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/10-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/11-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/12-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/13-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/14-vianello.homsiengenharia.webp",
    "/images/clinica-marcos/15-vianello.homsiengenharia.webp",
  ],
};

// Função para gerar os produtos dinamicamente baseado nas galerias
const generateProducts = (): Array<{
  title: string;
  link: string;
  thumbnail: string;
  projectId: string;
}> => {
  const allProducts: Array<{
    title: string;
    link: string;
    thumbnail: string;
    projectId: string;
  }> = [];
  
  // Mapeia títulos para cada projeto
  const projectTitles: Record<string, string> = {
    "casa-herbert-roberta": "Casa",
    "apto-felipe": "Apartamento", 
    "clinica-marcos": "Clínica",
    "clinica-raissa": "Clínica",
  };

  // Para cada projeto na galeria, adiciona todas as suas imagens
  Object.entries(projectGalleries).forEach(([projectId, images]) => {
    images.forEach((imagePath) => {
      allProducts.push({
        title: projectTitles[projectId as keyof typeof projectTitles] || "Projeto",
        link: "#",
        thumbnail: imagePath,
        projectId: projectId,
      });
    });
  });

  return allProducts;
};

const Header = () => {
  return (
    <div className="container mx-auto py-5 md:py-5 lg:py-20 px-4 md:px-6 lg:px-8">
      <h2 className="fade-in text-3xl md:text-5xl text-white font-bold leading-tight">
        Nossos Projetos
      </h2>
      <p className="fade-in max-w-2xl leading-relaxed text-xl mt-2 text-white">
        Conheça alguns dos principais projetos executados pela Homsi Engenharia. Nossa experiência abrange obras residenciais, comerciais e industriais com excelência e qualidade garantidas.
      </p>
    </div>
  );
};

// Componente de Galeria (Lightbox) com Embla Carousel
const GalleryModal = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0,
  projectTitle 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  images: string[]; 
  initialIndex?: number;
  projectTitle: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    startIndex: initialIndex 
  });
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const onThumbClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(initialIndex, true);
  }, [emblaApi, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !emblaApi) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, emblaApi, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <div className="text-white">
              <h3 className="text-xl font-bold">{projectTitle}</h3>
              <p className="text-sm text-gray-300">{selectedIndex + 1} / {images.length}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Fechar galeria"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Carousel Principal */}
          <div className="relative w-full max-w-7xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex items-center justify-center h-[70vh]">
                      <img
                        src={image}
                        alt={`${projectTitle} - Imagem ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões de Navegação */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm z-10"
                  aria-label="Imagem anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm z-10"
                  aria-label="Próxima imagem"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Carousel */}
          <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-8" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md p-3 shadow-2xl" ref={emblaThumbsRef}>
              <div className="flex gap-3 items-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => onThumbClick(index)}
                    className={`group relative flex-[0_0_auto] min-w-0 overflow-hidden transition-all duration-300 ${
                      index === selectedIndex 
                        ? "rounded-[10px] scale-110 shadow-2xl opacity-100" 
                        : "rounded-[5px] opacity-50 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                    />
                    {/* Overlay de hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                      index === selectedIndex ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({
  product,
  translate,
  onOpenGallery,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    projectId: string | null;
  };
  translate: MotionValue<number>;
  onOpenGallery: (projectId: string | null, thumbnail: string) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenGallery(product.projectId, product.thumbnail);
  };

  return (
    <motion.div
      style={{
        x: translate,
      }}
      key={product.title}
      className="group/product h-32 w-40 md:h-40 md:w-52 lg:h-40 lg:w-52 relative flex-shrink-0"
    >
      <a
        href={product.link}
        onClick={handleClick}
        className="block group-hover/product:shadow-2xl rounded-xl overflow-hidden relative h-full w-full cursor-pointer"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-300 group-hover/product:scale-105"
          alt={product.title}
        />
        {/* Gradiente escuro de baixo para cima - aparece apenas no hover */}
        <div className="absolute inset-0 h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300" />
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-base !md:text-sm opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
          {product.title}
        </h3>
      </a>
    </motion.div>
  );
};

export default function ProjectsSection() {
  // Estado da galeria
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    projectId: string | null;
    initialIndex: number;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: null,
    initialIndex: 0,
    projectTitle: "",
  });

  // Função para abrir a galeria
  const handleOpenGallery = (projectId: string | null, clickedThumbnail: string) => {
    if (!projectId || !projectGalleries[projectId as keyof typeof projectGalleries]) {
      return;
    }

    const gallery = projectGalleries[projectId as keyof typeof projectGalleries];
    const initialIndex = gallery.findIndex(img => img === clickedThumbnail);
    
    // Encontrar o título do projeto usando generateProducts()
    const allProducts = generateProducts();
    const product = allProducts.find(p => p.thumbnail === clickedThumbnail);
    const projectTitle = product?.title || "Projeto";

    setGalleryState({
      isOpen: true,
      projectId,
      initialIndex: initialIndex >= 0 ? initialIndex : 0,
      projectTitle,
    });
  };

  const handleCloseGallery = () => {
    setGalleryState({
      isOpen: false,
      projectId: null,
      initialIndex: 0,
      projectTitle: "",
    });
  };

  // Embaralha o array de produtos uma vez quando o componente monta
  const shuffledProducts = React.useMemo(() => {
    const allProducts = generateProducts();
    const shuffled = [...allProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Desktop: 12 fotos por linha (7 linhas)
  const firstRow = shuffledProducts.slice(0, 12);
  const secondRow = shuffledProducts.slice(12, 24);
  const thirdRow = shuffledProducts.slice(24, 36);
  const fourthRow = shuffledProducts.slice(36, 48);
  const fifthRow = shuffledProducts.slice(48, 60);
  const sixthRow = shuffledProducts.slice(60, 72);
  const seventhRow = shuffledProducts.slice(72, 84);
  
  // Tablet: 8 fotos por linha (7 linhas)
  const firstRowTablet = shuffledProducts.slice(0, 8);
  const secondRowTablet = shuffledProducts.slice(8, 16);
  const thirdRowTablet = shuffledProducts.slice(16, 24);
  const fourthRowTablet = shuffledProducts.slice(24, 32);
  const fifthRowTablet = shuffledProducts.slice(32, 40);
  const sixthRowTablet = shuffledProducts.slice(40, 48);
  const seventhRowTablet = shuffledProducts.slice(48, 56);
  
  // Mobile: 4 fotos por linha (7 linhas)
  const firstRowMobile = shuffledProducts.slice(0, 4);
  const secondRowMobile = shuffledProducts.slice(4, 8);
  const thirdRowMobile = shuffledProducts.slice(8, 12);
  const fourthRowMobile = shuffledProducts.slice(12, 16);
  const fifthRowMobile = shuffledProducts.slice(16, 20);
  const sixthRowMobile = shuffledProducts.slice(20, 24);
  const seventhRowMobile = shuffledProducts.slice(24, 28);
  
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 50, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-200, 200]),
    springConfig
  );

  return (
    <div id="projetos" className="bg-black w-full">
      {/* Modal de Galeria */}
      {galleryState.projectId && (
        <GalleryModal
          isOpen={galleryState.isOpen}
          onClose={handleCloseGallery}
          images={projectGalleries[galleryState.projectId as keyof typeof projectGalleries]}
          initialIndex={galleryState.initialIndex}
          projectTitle={galleryState.projectTitle}
        />
      )}

      <div
        ref={ref}
        className="h-[200vh] md:h-[210vh] lg:h-[190vh] py-20 overflow-hidden antialiased relative flex flex-col justify-center self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
        <Header />
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className=""
        >
          {/* Desktop: 12 fotos - hidden on tablet/mobile */}
          <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-2 mb-2">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row mb-2 space-x-2">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-2 mb-2">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row space-x-2 mb-2">
            {fourthRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-2 mb-2">
            {fifthRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row space-x-2 mb-2">
            {sixthRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-2 mb-2">
            {seventhRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>

          {/* Tablet: 8 fotos - hidden on desktop/mobile */}
          <motion.div className="hidden md:flex lg:hidden flex-row-reverse space-x-reverse space-x-3 mb-3">
            {firstRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row mb-3 space-x-3">
            {secondRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row-reverse space-x-reverse space-x-3 mb-3">
            {thirdRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row space-x-3 mb-3">
            {fourthRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row-reverse space-x-reverse space-x-3 mb-3">
            {fifthRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row space-x-3 mb-3">
            {sixthRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row-reverse space-x-reverse space-x-3 mb-3">
            {seventhRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>

          {/* Mobile: 4 fotos - hidden on tablet/desktop */}
          <motion.div className="flex md:hidden flex-row-reverse space-x-reverse space-x-2 mb-2">
            {firstRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row mb-2 space-x-2">
            {secondRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row-reverse space-x-reverse space-x-2 mb-2">
            {thirdRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row space-x-2 mb-2">
            {fourthRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row-reverse space-x-reverse space-x-2 mb-2">
            {fifthRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row space-x-2 mb-2">
            {sixthRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row-reverse space-x-reverse space-x-2 mb-2">
            {seventhRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

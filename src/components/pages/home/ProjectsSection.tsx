"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

type ProjectId = keyof typeof projectGalleries;
type Category = "clinica" | "casa" | "apartamento";

const FILTERS: { id: Category; label: string }[] = [
  { id: "clinica", label: "Clínica" },
  { id: "casa", label: "Casa" },
  { id: "apartamento", label: "Apartamento" },
];

const projectCategories: Record<ProjectId, Category> = {
  "clinica-raissa": "clinica",
  "clinica-marcos": "clinica",
  "casa-herbert-roberta": "casa",
  "apto-felipe": "apartamento",
};

// Quantidade de fotos exibidas por vez (múltiplo de 4, 3 e 2 para fechar as linhas)
const PAGE_SIZE = 12;

type Photo = { src: string; projectId: ProjectId; index: number };

// Fotos de cada categoria, intercalando os projetos para variar o grid
const photosByCategory = FILTERS.reduce((acc, { id }) => {
  const galleries = (Object.keys(projectGalleries) as ProjectId[])
    .filter((projectId) => projectCategories[projectId] === id)
    .map((projectId) =>
      projectGalleries[projectId].map((src, index) => ({ src, projectId, index }))
    );
  const longest = Math.max(0, ...galleries.map((g) => g.length));
  const photos: Photo[] = [];
  for (let i = 0; i < longest; i++) {
    galleries.forEach((gallery) => {
      if (gallery[i]) photos.push(gallery[i]);
    });
  }
  acc[id] = photos;
  return acc;
}, {} as Record<Category, Photo[]>);

const categoryLabel = (category: Category) =>
  FILTERS.find((filter) => filter.id === category)?.label ?? "Projeto";

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

  // Reinicializar carousel quando abrir no mobile (fix iOS)
  useEffect(() => {
    if (!emblaApi || !isOpen) return;
    
    const timer = setTimeout(() => {
      emblaApi.reInit();
      emblaApi.scrollTo(initialIndex, true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isOpen, emblaApi, initialIndex]);

  // Prevenir scroll do body quando modal estiver aberto (fix iOS)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

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
                    <div className="flex items-center justify-center h-[70vh] relative select-none">
                      <Image
                        src={image}
                        alt={`${projectTitle} - Imagem ${index + 1}`}
                        fill
                        quality={85}
                        className="object-contain pointer-events-none"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        unselectable="on"
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
                    <div className="relative h-20 w-24">
                      <Image 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        quality={60}
                        loading="lazy"
                        className="object-contain transition-transform duration-300 group-hover:scale-110 pointer-events-none select-none"
                        sizes="100px"
                        draggable={false}
                        unselectable="on"
                      />
                    </div>
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

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>(FILTERS[0].id);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [gallery, setGallery] = useState<{
    projectId: ProjectId;
    initialIndex: number;
  } | null>(null);

  const photos = photosByCategory[activeCategory];
  const visiblePhotos = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount]);
  const remaining = photos.length - visiblePhotos.length;

  const handleFilterChange = (category: Category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCloseGallery = useCallback(() => setGallery(null), []);

  return (
    <section id="projetos" className="bg-black w-full py-20 md:py-32">
      {/* Modal de Galeria */}
      {gallery && (
        <GalleryModal
          isOpen
          onClose={handleCloseGallery}
          images={projectGalleries[gallery.projectId]}
          initialIndex={gallery.initialIndex}
          projectTitle={categoryLabel(projectCategories[gallery.projectId])}
        />
      )}

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="fade-in text-3xl md:text-5xl font-bold leading-tight" style={{ color: '#FFFFFF' }}>
          Nossos Projetos
        </h2>
        <p className="fade-in max-w-2xl leading-relaxed text-xl mt-2" style={{ color: '#FFFFFF' }}>
          Conheça alguns dos principais projetos executados pela Homsi Engenharia. Nossa experiência abrange obras residenciais, comerciais e industriais com excelência e qualidade garantidas.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-8 md:mt-10" role="group" aria-label="Filtrar projetos">
          {FILTERS.map((filter) => {
            const isActive = filter.id === activeCategory;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleFilterChange(filter.id)}
                aria-pressed={isActive}
                className={`rounded-[5px] px-4 md:px-5 py-2 text-sm font-black uppercase tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-[#B8906A] to-[#D6BDAA] text-[var(--color-primary-500)] border border-transparent"
                    : "border border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: um pouco mais largo que o conteúdo em telas grandes */}
      <div className="mx-auto w-full max-w-[1440px] 2xl:max-w-[1696px] px-4 md:px-6 lg:px-8 mt-8 md:mt-10">
        <div
          key={activeCategory}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4"
        >
          {visiblePhotos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setGallery({ projectId: photo.projectId, initialIndex: photo.index })}
              aria-label={`Abrir galeria: ${categoryLabel(activeCategory)}, foto ${photo.index + 1}`}
              className="animate-fade-in group relative aspect-[4/3] overflow-hidden rounded-xl bg-white/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BDAA]"
            >
              <Image
                src={photo.src}
                alt={`${categoryLabel(activeCategory)} - Homsi Engenharia`}
                fill
                quality={75}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1695px) 25vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-sm md:text-base font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {categoryLabel(activeCategory)}
              </span>
            </button>
          ))}
        </div>

        {remaining > 0 && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="btn-secondary text-sm md:text-base"
            >
              Ver mais fotos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

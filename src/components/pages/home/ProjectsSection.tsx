"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const products = [
  {
    title: "Apartamento Residencial",
    link: "#",
    thumbnail: "/images/apto-felipe-cover.jpg",
  },
  {
    title: "Casa",
    link: "#",
    thumbnail: "/images/casa-herbert-cover.jpg",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos-cover.jpg",
  },
  {
    title: "Clínica Odontológica",
    link: "#",
    thumbnail: "/images/clinica-raissa-cover.jpg",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/1-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/2-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/3-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/4-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/5-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/6-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/7-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/8-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/9-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/10-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/11-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/12-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/13-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/14-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/15-vianello.homsiengenharia.webp",
  },
  {
    title: "Apartamento Residencial",
    link: "#",
    thumbnail: "/images/apto-felipe-cover.jpg",
  },
  {
    title: "Casa",
    link: "#",
    thumbnail: "/images/casa-herbert-cover.jpg",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos-cover.jpg",
  },
  {
    title: "Clínica Odontológica",
    link: "#",
    thumbnail: "/images/clinica-raissa-cover.jpg",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/1-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/2-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/3-vianello.homsiengenharia.webp",
  },
  {
    title: "Clínica Médica",
    link: "#",
    thumbnail: "/images/clinica-marcos/4-vianello.homsiengenharia.webp",
  },
];

const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0">
      <h2 className="fade-in text-3xl md:text-5xl text-white font-bold leading-tight">
        Nossos Projetos
      </h2>
      <p className="fade-in max-w-2xl text-base md:text-xl mt-2 text-white">
        Conheça alguns dos principais projetos executados pela Homsi Engenharia. Nossa experiência abrange obras residenciais, comerciais e industriais com excelência e qualidade garantidas.
      </p>
    </div>
  );
};

const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      key={product.title}
      className="group/product h-40 w-52 md:h-48 md:w-64 lg:h-52 lg:w-72 relative flex-shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl rounded-xl overflow-hidden relative h-full w-full"
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
        <h2 className="absolute bottom-4 left-4 text-white font-bold text-xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
          {product.title}
        </h2>
      </a>
    </motion.div>
  );
};

export default function ProjectsSection() {
  // Embaralha o array de produtos uma vez quando o componente monta
  const shuffledProducts = React.useMemo(() => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Desktop: 9 fotos por linha
  const firstRow = shuffledProducts.slice(0, 9);
  const secondRow = shuffledProducts.slice(9, 18);
  const thirdRow = shuffledProducts.slice(18, 27);
  
  // Tablet: 6 fotos por linha
  const firstRowTablet = shuffledProducts.slice(0, 6);
  const secondRowTablet = shuffledProducts.slice(6, 12);
  const thirdRowTablet = shuffledProducts.slice(12, 18);
  
  // Mobile: 3 fotos por linha
  const firstRowMobile = shuffledProducts.slice(0, 3);
  const secondRowMobile = shuffledProducts.slice(3, 6);
  const thirdRowMobile = shuffledProducts.slice(6, 9);
  
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-200, 200]),
    springConfig
  );

  return (
    <div className="bg-black w-full">
      <div
        ref={ref}
        className="h-[141vh] py-40 overflow-hidden antialiased relative flex flex-col justify-center self-auto [perspective:1000px] [transform-style:preserve-3d]"
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
          {/* Desktop: 9 fotos - hidden on tablet/mobile */}
          <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-2 mb-2">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row mb-2 space-x-2">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-2">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>

          {/* Tablet: 6 fotos - hidden on desktop/mobile */}
          <motion.div className="hidden md:flex lg:hidden flex-row-reverse space-x-reverse space-x-3 mb-3">
            {firstRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row mb-3 space-x-3">
            {secondRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="hidden md:flex lg:hidden flex-row-reverse space-x-reverse space-x-3">
            {thirdRowTablet.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>

          {/* Mobile: 3 fotos - hidden on tablet/desktop */}
          <motion.div className="flex md:hidden flex-row-reverse space-x-reverse space-x-4 mb-4">
            {firstRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row mb-4 space-x-4">
            {secondRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex md:hidden flex-row-reverse space-x-reverse space-x-4">
            {thirdRowMobile.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

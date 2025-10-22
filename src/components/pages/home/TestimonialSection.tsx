"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "A HomsiEngenharia transformou nosso projeto em realidade com excelência técnica e atenção aos detalhes. Superaram nossas expectativas em todos os aspectos.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Mariana Santos",
    role: "Diretora de Operações",
  },
  {
    text: "Profissionais extremamente competentes e dedicados. A qualidade do projeto estrutural foi impecável e entregue dentro do prazo estabelecido.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Carlos Eduardo",
    role: "Gerente de Projetos",
  },
  {
    text: "Equipe técnica de altíssimo nível. O acompanhamento durante toda a obra nos trouxe segurança e tranquilidade para seguir com o empreendimento.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Ana Paula Oliveira",
    role: "Arquiteta",
  },
  {
    text: "A HomsiEngenharia entregou soluções inovadoras e sustentáveis para nosso projeto. Recomendo fortemente pelos resultados excepcionais.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "Roberto Ferreira",
    role: "Empresário",
  },
  {
    text: "Excelente custo-benefício aliado a um trabalho de primeira qualidade. A consultoria técnica foi fundamental para o sucesso do nosso projeto.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    name: "Juliana Costa",
    role: "Engenheira Civil",
  },
  {
    text: "Impressionante como conseguiram otimizar nosso projeto, reduzindo custos sem comprometer a qualidade. Parceria de confiança.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    name: "Fernando Almeida",
    role: "Investidor Imobiliário",
  },
  {
    text: "Atendimento personalizado e soluções sob medida. A HomsiEngenharia entende as necessidades do cliente e entrega além do esperado.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    name: "Patrícia Rodrigues",
    role: "Construtora",
  },
  {
    text: "Profissionalismo exemplar em todas as etapas do projeto. A expertise técnica da equipe fez toda a diferença no resultado final.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    name: "Ricardo Mendes",
    role: "Diretor Técnico",
  },
  {
    text: "Superaram todos os desafios do nosso projeto complexo. A capacidade de resolver problemas e propor soluções criativas é admirável.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    name: "Camila Souza",
    role: "Coordenadora de Obras",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const TestimonialSection = () => {
  return (
    <section className="bg-background my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            O que nossos clientes dizem
          </h2>
          <p className="text-center mt-5 opacity-75">
            Veja o que nossos clientes têm a dizer sobre nossos serviços.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

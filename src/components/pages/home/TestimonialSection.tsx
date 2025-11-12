"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    text: "Excelente profissional, com alta capacidade de gestão de prazos e obras complexas, fazendo com naturalidade uma obra acontecer sem trazer para o cliente a dor de cabeça das dificuldades que existem no caminho.",
    name: "Gustavo Duarte",
  },
  {
    text: "Profissional compromissado e competente. Além de ser fiel aos prazos e muito atencioso aos detalhes. Super indico!!!",
    name: "Marianna Matoso",
  },
  {
    text: "Muito feliz com a experiência do começo ao fim. Atendimento exemplar com excelentes soluções, acompanhamento responsável e entrega no prazo combinado!",
    name: "Ju Yokomizo",
  },
  {
    text: "Tivemos uma excelente experiência com a HOMSI na reforma da nossa empresa. Profissionalismo, compromisso nos prazos e atenção aos detalhes. Recomendamos com total confiança!",
    name: "João Victor Fagundes",
  },
  {
    text: "Uma empresa gerida por profissionais sérios e comprometidos. O Kemel é extremamente técnico e atencioso com o cliente, um profissional muito atento aos detalhes.",
    name: "Thiago Valeriano",
  },
  {
    text: "Meu consultório ficou impecável e o serviço foi incrível em todo o processo. Super recomendo!",
    name: "Paula Torido",
  },
  {
    text: "Encontrei dois profissionais em uma só pessoa: o engenheiro e o construtor, que presta serviços com rigorosidade técnica e, ao mesmo tempo, demonstra amorosidade pelo sonho de seu cliente.",
    name: "Khellen Kastellarz",
  },
  {
    text: "Gostaria de destacar o excelente trabalho pela Homsi Serviço de Engenharia, liderada pelo engenheiro Kemel. A empresa se destaca pelo alto padrão técnico, comprometimento com prazos e soluções inteligentes em engenharia.",
    name: "Rafael Esteves",
  },
  {
    text: "MARAVILHOSO trabalho! Excelentes profissionais.",
    name: "Cristina Maia Batista Santos",
  },
  {
    text: "Atendimento excelente!",
    name: "Maria Raquel Batista",
  },
  {
    text: "Super competente!!!",
    name: "Lorena Speltz",
  },
  {
    text: "Excelente e detalhista.",
    name: "Hannée Homsi",
  },
];


const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 12);


const TestimonialSection = () => {
  useScrollAnimation();
  
  return (
    <section id="depoimentos" className="bg-background pt-20 pb-10 md:pt-32 md:pb-12 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="fade-in text-3xl md:text-4xl lg:text-5xl font-black text-center mb-4 text-gray-900">
            O que nossos clientes dizem
          </h2>
          <p className="fade-in text-xl leading-relaxed mb-2 text-gray-700 text-center">
            Veja o que nossos clientes têm a dizer sobre nossos serviços
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={20} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={20} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

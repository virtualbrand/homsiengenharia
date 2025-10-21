import { Gallery4, type Gallery4Props } from "@/components/ui/gallery4";

const portfolioData: Gallery4Props = {
  title: "Nossos Projetos",
  description:
    "Conheça alguns dos principais projetos executados pela Homsi Engenharia. Nossa experiência abrange obras residenciais, comerciais e industriais com excelência e qualidade garantidas.",
  sectionId: "projetos",
  items: [
    {
      id: "apto-felipe",
      title: "Apartamento residencial",
      description: "",
      href: "",
      image: "/images/apto-felipe-cover.jpg",
    },
    {
      id: "casa-herbert",
      title: "Casa",
      description: "",
      href: "",
      image: "/images/casa-herbert-cover.jpg",
    },
    {
      id: "clinica-marcos",
      title: "Clínica",
      description: "",
      href: "",
      image: "/images/clinica-marcos-cover.jpg",
    },
    {
      id: "clinica-raissa",
      title: "Clínica",
      description: "",
      href: "",
      image: "/images/clinica-raissa-cover.jpg",
    },
  ],
};

export default function PortfolioSection() {
  return <Gallery4 {...portfolioData} />;
}

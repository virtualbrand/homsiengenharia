import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/pages/home/HeroSection";
import AboutSection from "@/components/pages/home/AboutSection";
import ServicesSection from "@/components/pages/home/ServicesSection";
import CtaSection from "@/components/pages/home/CtaSection";
import BlogSection from "@/components/pages/home/BlogSection";
import Footer from "@/components/Footer";

// Lazy load componentes pesados que não são above the fold
const ProjectsSection = dynamic(
  () => import("@/components/pages/home/ProjectsSection")
);

const TestimonialSection = dynamic(
  () => import("@/components/pages/home/TestimonialSection")
);

export const metadata: Metadata = {
  title: "Homsi Engenharia - Soluções em Engenharia Civil",
  description: "A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis. Transformamos suas ideias em realidade.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://homsiengenharia.com.br/",
  },
};

// Structured Data para a página inicial
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Homsi Engenharia",
  "legalName": "Homsi Engenharia",
  "url": "https://homsiengenharia.com.br",
  "logo": "https://homsiengenharia.com.br/logo.png",
  "image": "https://homsiengenharia.com.br/hero-provisoria.jpg",
  "description": "Empresa de engenharia civil especializada em projetos inovadores, seguros e sustentáveis.",
  "taxID": "55.155.900/0001-08",
  "email": "contato@homsiengenharia.com.br",
  "telephone": "+55-31-99226-1911",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida Cristiano Machado, 12.121",
    "addressLocality": "Belo Horizonte",
    "addressRegion": "MG",
    "postalCode": "31910-000",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.instagram.com/homsiengenharia",
    "https://www.linkedin.com/company/homsiengenharia"
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialSection />
        <BlogSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/pages/home/HeroSection";
import AboutSection from "@/components/pages/home/AboutSection";
import ServicesSection from "@/components/pages/home/ServicesSection";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import TestimonialSection from "@/components/pages/home/TestimonialSection";
import CtaSection from "@/components/pages/home/CtaSection";
import BlogSection from "@/components/pages/home/BlogSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Homsi Engenharia - Soluções em Engenharia Civil",
  description: "A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis. Transformamos suas ideias em realidade.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://homsiengenharia.com/",
  },
};

// Structured Data para a página inicial
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Homsi Engenharia",
  "legalName": "Homsi Engenharia",
  "url": "https://homsiengenharia.com",
  "logo": "https://homsiengenharia.com/logo.png",
  "image": "https://homsiengenharia.com/hero-provisoria.jpg",
  "description": "Empresa de engenharia civil especializada em projetos inovadores, seguros e sustentáveis.",
  "taxID": "55.155.900/0001-08",
  "email": "contato@homsiengenharia.com",
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

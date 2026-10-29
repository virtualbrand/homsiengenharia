import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/pages/home/HeroSection";
import AboutSection from "@/components/pages/home/AboutSection";
import ServicesSection from "@/components/pages/home/ServicesSection";
import CtaSection from "@/components/pages/home/CtaSection";
import BlogSection, { type BlogPost } from "@/components/pages/home/BlogSection";
import { createClient } from "@supabase/supabase-js";
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

// Página estática regenerada a cada 5 minutos (ISR) para refletir novos artigos
export const revalidate = 300;

async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    // Cliente anônimo sem cookies: mantém a home estática
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: { persistSession: false },
        // Evita que o Supabase fora do ar trave a geração da página
        global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(5000) }) },
      }
    );
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image, category, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

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
        <BlogSection posts={posts} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

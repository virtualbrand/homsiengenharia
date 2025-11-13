import type { Metadata } from "next";
import HeroSection from "@/components/pages/links/HeroSection";

export const metadata: Metadata = {
  title: "Links",
  description: "Acesse nossos links e redes sociais - Homsi Engenharia",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    url: "https://homsiengenharia.com.br/links",
  },
};

export default function LinksPage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}

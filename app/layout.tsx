import type { Metadata } from "next";
import "./globals-critical.css";
import LenisProvider from "@/components/providers/LenisProvider";
import { Toaster } from "sonner";
import { satoshi } from "@/components/OptimizedFonts";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import LoadingBar from "@/components/LoadingBar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Homsi Engenharia - Soluções em Engenharia Civil",
    template: "%s - Homsi Engenharia",
  },
  description: "A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis. Transformamos suas ideias em realidade.",
  keywords: ["engenharia civil", "projetos arquitetônicos", "construção civil", "projetos estruturais", "Homsi Engenharia"],
  authors: [{ name: "Homsi Engenharia" }],
  creator: "Homsi Engenharia",
  publisher: "Homsi Engenharia",
  metadataBase: new URL("https://homsiengenharia.com.br"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://homsiengenharia.com.br",
    siteName: "Homsi Engenharia",
    title: "Homsi Engenharia - Soluções em Engenharia Civil",
    description: "A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis.",
    images: [
      {
        url: "/hero-provisoria.jpg",
        width: 1200,
        height: 630,
        alt: "Homsi Engenharia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homsi Engenharia - Soluções em Engenharia Civil",
    description: "A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis.",
    images: ["/hero-provisoria.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Adicione seu código de verificação do Google aqui
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* DNS Prefetch para domínios externos */}
        <link rel="dns-prefetch" href="https://cloudflare-static.com" />
        
        {/* Preload de fontes críticas locais */}
        <link rel="preload" href="/fonts/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Preload de imagens críticas do hero */}
        <link rel="preload" href="/images/hero-home-mobile.webp" as="image" media="(max-width: 810px)" fetchPriority="high" />
        <link rel="preload" href="/images/hero-home.webp" as="image" media="(min-width: 811px)" fetchPriority="high" />
        
        {/* SEO: Verificação de propriedade e tags meta adicionais */}
        <meta name="theme-color" content="#1C1C1C" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph adicional */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Homsi Engenharia" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@homsiengenharia" />
        
        {/* Canonical URL será definido por página */}
        <link rel="canonical" href="https://homsiengenharia.com.br" />
      </head>
      <body
        className={`${satoshi.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

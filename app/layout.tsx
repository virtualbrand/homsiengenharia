import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

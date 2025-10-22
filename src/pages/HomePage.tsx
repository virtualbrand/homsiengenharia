import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import HeroSection from '../components/pages/home/HeroSection'
import AboutSection from '../components/pages/home/AboutSection'
import ServicesSection from '../components/pages/home/ServicesSection'
import PortfolioSection from '../components/pages/home/PortfolioSection'
import TestimonialSection from '../components/pages/home/TestimonialSection'
import CtaSection from '../components/pages/home/CtaSection'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>HomsiEngenharia - Soluções em Engenharia Civil</title>
        <meta name="description" content="A HomsiEngenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis. Transformamos suas ideias em realidade." />
        <meta name="keywords" content="engenharia civil, projetos arquitetônicos, construção civil, projetos estruturais, HomsiEngenharia" />
        <link rel="canonical" href="https://homsiengenharia.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homsiengenharia.com/" />
        <meta property="og:title" content="HomsiEngenharia - Soluções em Engenharia Civil" />
        <meta property="og:description" content="A HomsiEngenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis." />
        <meta property="og:image" content="https://homsiengenharia.com/hero-provisoria.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://homsiengenharia.com/" />
        <meta property="twitter:title" content="HomsiEngenharia - Soluções em Engenharia Civil" />
        <meta property="twitter:description" content="A HomsiEngenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis." />
        <meta property="twitter:image" content="https://homsiengenharia.com/hero-provisoria.jpg" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HomsiEngenharia",
            "url": "https://homsiengenharia.com",
            "logo": "https://homsiengenharia.com/logo.png",
            "description": "Empresa de engenharia civil especializada em projetos inovadores, seguros e sustentáveis.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR"
            },
            "sameAs": []
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialSection />
        <CtaSection />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
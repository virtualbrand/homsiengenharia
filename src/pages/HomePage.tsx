import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import HeroSection from '../components/pages/home/HeroSection'
import AboutSection from '../components/pages/home/AboutSection'
import ServicesSection from '../components/pages/home/ServicesSection'
import ProjectsSection from '../components/pages/home/ProjectsSection'
import TestimonialSection from '../components/pages/home/TestimonialSection'
import CtaSection from '../components/pages/home/CtaSection'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Homsi Engenharia - Soluções em Engenharia Civil</title>
        <meta name="description" content="A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis. Transformamos suas ideias em realidade." />
        <meta name="keywords" content="engenharia civil, projetos arquitetônicos, construção civil, projetos estruturais, Homsi Engenharia" />
        <link rel="canonical" href="https://homsiengenharia.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homsiengenharia.com/" />
        <meta property="og:title" content="Homsi Engenharia - Soluções em Engenharia Civil" />
        <meta property="og:description" content="A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis." />
        <meta property="og:image" content="https://homsiengenharia.com/hero-provisoria.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://homsiengenharia.com/" />
        <meta property="twitter:title" content="Homsi Engenharia - Soluções em Engenharia Civil" />
        <meta property="twitter:description" content="A Homsi Engenharia oferece soluções completas em engenharia civil com projetos inovadores, seguros e sustentáveis." />
        <meta property="twitter:image" content="https://homsiengenharia.com/hero-provisoria.jpg" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
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
              "streetAddress": "Rua Tenente Brito Melo",
              "addressLocality": "Belo Horizonte",
              "addressRegion": "MG",
              "postalCode": "30180-072",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-19.9201376",
              "longitude": "-43.9567692"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:30",
              "closes": "17:30"
            },
            "sameAs": [
              "https://www.instagram.com/kemel_homsiengenharia",
              "https://www.youtube.com/@HomsiEngenharia",
              "https://www.tiktok.com/@homsiengenharia"
            ],
            "priceRange": "$$",
            "areaServed": {
              "@type": "City",
              "name": "Belo Horizonte"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialSection />
        <CtaSection />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
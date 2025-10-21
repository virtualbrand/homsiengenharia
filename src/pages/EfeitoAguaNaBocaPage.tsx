import { HeroSection, ForWhoSection, TestimonialsSection, PricingSection, FAQSection, AboutSection, PainSection, FinalCTASection, DisclaimerSection } from '../components/pages/efeito-agua-na-boca'
import Seo from '@/components/Seo';

const EfeitoAguaNaBocaPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Seo
        title="Efeito Água na Boca | Duda Berger"
        description="Uma descrição detalhada da página Efeito Água na Boca."
        canonical="https://homsiengenharia.com/efeito-agua-na-boca"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Efeito Água na Boca',
          url: 'https://homsiengenharia.com/efeito-agua-na-boca',
        }}
      />
      <HeroSection />
      <PainSection />
      <ForWhoSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <AboutSection />
      <FinalCTASection />
      <DisclaimerSection />
    </div>
  )
}

export default EfeitoAguaNaBocaPage;

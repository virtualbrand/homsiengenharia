import { HeroSection, ForWhoSection, TestimonialsSection, PricingSection, FAQSection, AboutSection, PainSection } from '../components/pages/efeito-agua-na-boca'
import FinalCTASection from '../components/pages/efeito-agua-na-boca/FinalCTASection'
import DisclaimerSection from '../components/pages/efeito-agua-na-boca/DisclaimerSection'

const EfeitoAguaNaBocaPage = () => {
  return (
    <div className="w-full min-h-screen">
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

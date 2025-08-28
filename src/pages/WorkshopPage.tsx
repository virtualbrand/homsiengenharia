import Seo from '@/components/Seo';
import { 
  HeroSection, 
  PainSection, 
  // ForWhoSection, 
  // TestimonialsSection, 
  PricingSection, 
  FAQSection, 
  AboutSection, 
  // FinalCTASection,
} from '../components/pages/workshop'

const WorkshopPage = () => {
  return (
    <>
      <Seo
        title="Confeitaria com IA: Da Sobrecarga ao Sucesso | Workshop Ao Vivo"
        description="Quebre o ciclo de trabalhar muito e ganhar pouco! Workshop ao vivo para confeiteiras: aprenda a usar IA para organizar, precificar e vender de forma estratégica. Garanta seu ingresso."
        canonical="https://dudaberger.com.br/workshop-confeitaria-ia"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'Workshop Confeitaria com IA',
          startDate: '2025-06-21',
          endDate: '2025-06-22',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'VirtualLocation',
            url: 'https://dudaberger.com.br/workshop-confeitaria-ia',
          },
          description: '2 dias ao vivo para confeiteiras aprenderem a usar IA para organizar, precificar e vender de forma estratégica.',
          url: 'https://dudaberger.com.br/workshop-confeitaria-ia',
        }}
      />
      <HeroSection />
      <PainSection />
      <PricingSection />
      <FAQSection />
      <AboutSection />
    </>
  );
}

export default WorkshopPage;
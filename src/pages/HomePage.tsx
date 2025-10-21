import HeroSection from '../components/pages/home/HeroSection'
import Seo from '@/components/Seo';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Seo
        title="Duda Berger | Confeiteira"
        description="A detailed description of the Home page."
        canonical="https://homsiengenharia.com/"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Duda Berger',
          url: 'https://homsiengenharia.com/',
        }}
      />
      <HeroSection />
    </div>
  );
}

export default HomePage;
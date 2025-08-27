import HeroSection from '../components/pages/home/HeroSection'
import Seo from '@/components/Seo';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Seo
        title="Duda Berger | Confeiteira"
        description="A detailed description of the Home page."
        canonical="https://dudaberger.com.br/"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Duda Berger',
          url: 'https://dudaberger.com.br/',
        }}
      />
      <HeroSection />
    </div>
  );
}

export default HomePage;
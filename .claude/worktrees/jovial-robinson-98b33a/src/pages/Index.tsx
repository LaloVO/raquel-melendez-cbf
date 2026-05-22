import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import PropertiesSection from '@/components/home/PropertiesSection';
import AgentsSection from '@/components/home/AgentsSection';
import AIFeatureSection from '@/components/home/AIFeatureSection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Agencia | Exclusive Real Estate - Propiedades de Lujo en México</title>
        <meta
          name="description"
          content="Descubre propiedades exclusivas de lujo en México. Agencia combina inteligencia artificial con experiencia inmobiliaria para encontrar tu hogar ideal."
        />
      </Helmet>

      <Navbar />

      <main>
        <HeroSection />
        <PhilosophySection />
        <PropertiesSection />
        <AIFeatureSection />
        <AgentsSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;

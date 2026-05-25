import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import PropertiesSection from '@/components/home/PropertiesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CountriesSection from '@/components/home/CountriesSection';
import AboutMeSection from '@/components/home/AboutMeSection';
import ProductSection from '@/components/home/ProductSection';
import CoursesSection from '@/components/home/CoursesSection';
import ContactSection from '@/components/home/ContactSection';
import { useSiteUser } from '@/hooks/useSiteUser';

const Index = () => {
  const location = useLocation();
  const { site } = useSiteUser();

  // Handle smooth scrolling for hash links (e.g. Misión, Visión, Cursos)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      // Small delay to ensure the DOM is fully mounted
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>
          {site?.site_name ? `${site.site_name} | Asesoría Inmobiliaria Internacional` : 'Raquel Meléndrez | Inmobiliaria Boutique Internacional'}
        </title>
        <meta
          name="description"
          content="Asesoría inmobiliaria estratégica internacional y curaduría de propiedades en México y Estados Unidos. Toma decisiones inmobiliarias inteligentes."
        />
      </Helmet>

      <Navbar />

      <main className="bg-[#FAF7F2] overflow-x-hidden min-h-screen">
        {/* Hero Section with Filter Bar */}
        <HeroSection />

        {/* Section 1: Testimonials */}
        <TestimonialsSection />

        {/* Section 2: Countries (EE.UU. & México) */}
        <CountriesSection />

        {/* Misión & Visión (Philosophy) */}
        <PhilosophySection />

        {/* Featured Property Catalog */}
        <PropertiesSection />

        {/* About Me Profile Grid */}
        <AboutMeSection />

        {/* Masaroca Coating Product (Diagonal mirror split) */}
        <ProductSection />

        {/* Courses Academy (Coming Soon) */}
        <CoursesSection />

        {/* Lead Capture Form */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;

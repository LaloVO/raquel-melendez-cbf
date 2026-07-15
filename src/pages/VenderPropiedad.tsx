import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FormularioVenderPropiedad from '@/components/home/FormularioVenderPropiedad';
import { useSiteUser } from '@/hooks/useSiteUser';

const VenderPropiedad = () => {
  const { user } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Vende tu Propiedad | {user?.nombre_usuario ?? 'Raquel Meléndrez Inmobiliaria'}</title>
        <meta
          name="description"
          content="Registra tu propiedad con Raquel Meléndrez. Completa el expediente y recibe una estrategia de venta personalizada."
        />
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-24 min-h-screen bg-[#FAF7F2]">
        <div className="px-6 md:px-12 max-w-[90rem] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#B76E4D] text-[10px] uppercase tracking-[0.25em] font-sans font-bold block mb-4">
              Asesoría de Venta
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#6E6259] font-light leading-[1.05]">
              Vende tu propiedad
              <br />
              <span className="italic text-[#B76E4D]">con estrategia</span>
            </h1>

          </div>

          <FormularioVenderPropiedad />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VenderPropiedad;

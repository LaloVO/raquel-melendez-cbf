import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

const SolicitaInmueble = () => {
  const navigate = useNavigate();
  const { site } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>
          {site?.site_name
            ? `Solicita tu Inmueble | ${site.site_name}`
            : "Solicita tu Inmueble | Raquel Meléndez"}
        </title>
        <meta
          name="description"
          content="Completa tu perfil de búsqueda en 6 pasos y recibe asesoría personalizada para encontrar el inmueble ideal."
        />
      </Helmet>

      <Navbar />

      <main className="bg-[#FAF7F2] min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-12 px-6 text-center bg-gradient-to-b from-[#F2EBE2] to-[#FAF7F2]">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#B76E4D] mb-3">
            Asesoría Boutique
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2E251E] font-medium leading-tight mb-4">
            Solicita tu Inmueble Ideal
          </h1>
          <p className="font-sans text-sm text-[#6E6259] max-w-xl mx-auto leading-relaxed">
            Completa tu perfil en 6 pasos. Raquel analizará tu expediente
            personalmente y te contactará con las mejores opciones.
          </p>
        </section>

        {/* Formulario */}
        <section className="pb-24 px-4">
          <FormularioMultiStep onSubmitComplete={() => navigate("/")} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SolicitaInmueble;

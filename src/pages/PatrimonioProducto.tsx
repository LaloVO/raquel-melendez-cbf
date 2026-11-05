import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import PatrimonioForm from "@/features/patrimonio/PatrimonioForm";
import PatrimonioVideoModal from "@/features/patrimonio/PatrimonioVideoModal";
import { PATRIMONIO_PRODUCTS, getPatrimonioProduct } from "@/features/patrimonio/products";

const PatrimonioProducto = () => {
  const { producto } = useParams();
  const product = getPatrimonioProduct(producto);
  const [videoOpen, setVideoOpen] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVideoOpen(true);
    setRevealed(false);
  }, [producto]);

  if (!product) return <NotFound />;

  const others = PATRIMONIO_PRODUCTS.filter((p) => p.slug !== product.slug);

  const startDesign = () => {
    setVideoOpen(false);
    setRevealed(true);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("patrimonio-nombres")?.focus({ preventScroll: true });
    }, 250);
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name}: ${product.promise} | Raquel Meléndrez`}</title>
        <meta name="description" content={product.intro} />
      </Helmet>

      <Navbar />

      <PatrimonioVideoModal
        product={product}
        open={videoOpen}
        onOpenChange={(open) => {
          setVideoOpen(open);
          if (!open) setRevealed(true);
        }}
        onDesign={startDesign}
      />

      <main className="bg-[#FAF7F2] overflow-x-hidden">
        {/* Banda editorial del producto */}
        <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden px-6 pb-14 pt-32 md:px-12 md:pb-20 lg:px-24">
          <img
            src={product.image}
            alt={product.imageAlt}
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform [transition-duration:2400ms] ease-out motion-reduce:transition-none ${
              revealed ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#2E251E] via-[#2E251E]/60 to-[#2E251E]/10" />

          <div className="mx-auto w-full max-w-[90rem]">
            <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1.05] text-[#FAF7F2] sm:text-6xl md:text-7xl lg:text-8xl">
              {product.name}.
              <span className="mt-3 block text-3xl italic text-[#E3A587] sm:text-4xl md:text-5xl">{product.promise}</span>
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-white/75 md:text-lg">{product.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={startDesign}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#B76E4D] px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#FAF7F2] hover:text-[#2E251E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A587]"
              >
                Diseñar mi patrimonio
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-sans text-xs text-white/90 backdrop-blur-sm transition-colors hover:border-white hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A587]"
              >
                <Play className="h-4 w-4" />
                Ver el video
              </button>
              <Link
                to="/?servicio=patrimonio"
                className="inline-flex min-h-[44px] items-center gap-2 px-2 font-sans text-xs text-white/70 transition-colors hover:text-white sm:ml-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Ver todas las estrategias
              </Link>
            </div>
          </div>
        </section>

        {/* Estrategia + formulario */}
        <section id="estrategia" className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
          <div className="mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl font-light leading-tight text-[#2E251E] md:text-5xl">
                Así diseñamos tu estrategia de <span className="italic text-[#B76E4D]">{product.name.toLowerCase()}</span>
              </h2>

              <ol className="mt-12 space-y-10">
                {product.steps.map((step) => (
                  <li key={step.verb} className="grid grid-cols-[auto,1fr] gap-x-6">
                    <span className="mt-3 h-px w-10 bg-[#B76E4D]" aria-hidden />
                    <div>
                      <h3 className="font-serif text-2xl text-[#2E251E] md:text-3xl">{step.verb}</h3>
                      <p className="mt-2 font-sans text-base font-light leading-relaxed text-[#6E6259]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-12 max-w-md border-l border-[#E9DDCF] pl-5 font-sans text-xs leading-relaxed text-[#6E6259]/80">
                Con tus respuestas, Raquel identifica las opciones del catálogo de Seguros Monterrey New York Life que mejor se ajustan a ti y te
                orienta personalmente antes de cualquier decisión.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div ref={formRef} className="scroll-mt-28 lg:sticky lg:top-28">
                <PatrimonioForm product={product} />
              </div>
            </div>
          </div>
        </section>

        {/* Otras estrategias */}
        <section className="border-t border-[#E9DDCF] bg-[#F2EBE2]/60 px-6 py-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-[90rem]">
            <h2 className="font-serif text-3xl font-light text-[#2E251E] md:text-4xl">Completa tu patrimonio</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/patrimonio/${p.slug}`}
                  className="group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-3xl p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E4D] focus-visible:ring-offset-2"
                >
                  <img
                    src={p.image.replace("w=2000", "w=900")}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#2E251E]/90 via-[#2E251E]/30 to-transparent" />
                  <div className="flex w-full items-end justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-3xl text-white">{p.name}</h3>
                      <p className="mt-1 font-sans text-sm text-white/75">{p.promise}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-white transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PatrimonioProducto;

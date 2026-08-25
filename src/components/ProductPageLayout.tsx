import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import MonoFooter from "./MonoFooter";
import AnimateOnScroll from "./AnimateOnScroll";
import BentoGallery from "./BentoGallery";
import OpcoesDeCompra from "./OpcoesDeCompra";
import type { LinhaId } from "@/data/compra";

interface ColorSwatch {
  name: string;
  image: string;
}

interface Spec {
  label: string;
  value: string;
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductPageLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string[];
  specs: Spec[];
  colors: ColorSwatch[];
  colorsTitle?: string;
  gallery?: GalleryImage[];
  /** Recorte do hero. As fotos de ambiente sao retrato e o hero e uma faixa
   *  larga: sem isso o corte central cai na mobilia em vez do revestimento. */
  heroPosition?: string;
  /** Resolve a mensagem de WhatsApp de cada cor no bloco de compra. */
  linha?: LinhaId;
}

const ProductPageLayout = ({
  title,
  subtitle,
  heroImage,
  description,
  specs,
  colors,
  colorsTitle = "Cores disponíveis",
  gallery = [],
  heroPosition,
  linha,
}: ProductPageLayoutProps) => {
  const navigate = useNavigate();
  const { hash } = useLocation();

  // Os cards do catálogo linkam para #comprar; no carregamento direto o próprio
  // navegador rola, mas na navegação client-side o React Router não rola sozinho.
  // Salto instantâneo de propósito: é o comportamento nativo de âncora, e um scroll
  // suave de ~2400px atravessaria a página inteira em animação.
  useEffect(() => {
    if (hash !== "#comprar") return;
    document.getElementById("comprar")?.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
          style={heroPosition ? { objectPosition: heroPosition } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 section-padding pb-12 lg:pb-16">
          <AnimateOnScroll>
            <p className="text-sm font-body text-background/70 uppercase tracking-widest mb-2">
              {subtitle}
            </p>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-display font-light text-background">
              {title}
            </h1>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Back button */}
      <div className="section-padding pt-6 pb-0 bg-background">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-body text-sm"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      </div>

      {/* Description + Gallery */}
      <section className="py-12 lg:py-24 bg-background">
        <div className="section-padding">
          <div className={`grid ${gallery.length > 0 ? "grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16" : ""}`}>
            <AnimateOnScroll>
              <div className="space-y-5 max-w-2xl">
                {description.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>

            {gallery.length > 0 && (
              <AnimateOnScroll>
                <BentoGallery images={gallery} />
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="section-padding">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground mb-10">
              Especificações técnicas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-background rounded-xl p-6 space-y-1"
                >
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                    {spec.label}
                  </p>
                  <p className="text-sm font-body font-semibold text-foreground">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Colors / Finishes */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-padding">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground mb-10">
              {colorsTitle}
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {colors.map((color) => (
              <AnimateOnScroll key={color.name}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-3 flex items-center justify-center aspect-square">
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-body text-foreground text-center">
                    {color.name}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Compra */}
      <section id="comprar" className="py-20 lg:py-28 bg-secondary text-secondary-foreground scroll-mt-16">
        <div className="section-padding space-y-8">
          <AnimateOnScroll>
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-display font-light">
                Comprar {title}
              </h2>
              <p className="text-sm lg:text-base font-body text-secondary-foreground/70">
                Escolha a cor e fale com a nossa equipe no WhatsApp. A mensagem já vai
                preenchida com a linha e a medida que você está vendo.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <OpcoesDeCompra linha={linha} tom="escuro" />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <p className="text-center text-sm font-body text-secondary-foreground/60">
              Projeto grande ou obra?{" "}
              <button
                onClick={() => navigate("/orcamento")}
                className="underline underline-offset-4 hover:text-secondary-foreground transition-colors"
              >
                Solicite um orçamento
              </button>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default ProductPageLayout;

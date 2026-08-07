import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import MonoFooter from "./MonoFooter";
import AnimateOnScroll from "./AnimateOnScroll";
import BentoGallery from "./BentoGallery";
import { Button } from "./ui/button";

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
}: ProductPageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
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

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-secondary text-secondary-foreground">
        <div className="section-padding text-center space-y-6">
          <AnimateOnScroll>
            <h2 className="text-3xl lg:text-5xl font-display font-light">
              Solicite um orçamento
            </h2>
            <p className="text-sm lg:text-base font-body text-secondary-foreground/70 max-w-lg mx-auto mt-4">
              Fale com nossa equipe e receba uma proposta personalizada para o
              seu projeto.
            </p>
            <Button
              variant="mono"
              size="lg"
              className="mt-8 px-10 py-6 text-base"
              onClick={() => navigate("/orcamento")}
            >
              Solicitar Orçamento
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default ProductPageLayout;

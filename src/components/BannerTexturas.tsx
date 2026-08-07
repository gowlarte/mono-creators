import AnimateOnScroll from "./AnimateOnScroll";
import texturaCarvalho from "@/assets/textura-carvalho.png";
import texturaCastanheira from "@/assets/textura-castanheira.png";
import texturaCedro from "@/assets/textura-cedro.png";
import texturaFreijo from "@/assets/textura-freijo.png";
import texturaNogueira from "@/assets/textura-nogueira.png";

const swatches = [
  { name: "Carvalho", image: texturaCarvalho },
  { name: "Castanheira", image: texturaCastanheira },
  { name: "Cedro", image: texturaCedro },
  { name: "Freijó", image: texturaFreijo },
  { name: "Nogueira", image: texturaNogueira },
];

const BannerTexturas = () => {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="section-padding text-center">
        <AnimateOnScroll>
          <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Os revestimentos do futuro
          </p>
          <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground mb-12">
            Fazemos madeira de um jeito diferente
          </h2>
          <div className="flex justify-center gap-6 lg:gap-8 flex-wrap">
            {swatches.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-24 h-16 lg:w-40 lg:h-20 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                  title={s.name}
                />
                <span className="text-xs font-body text-muted-foreground tracking-wide">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default BannerTexturas;

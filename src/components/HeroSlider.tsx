import { useEffect, useState } from "react";
import forrosHero from "@/assets/forros-hero.jpg";
import cozinhaForro from "@/assets/produto-teto-vinilico.jpg";
import salaRipado from "@/assets/produto-forros-pvc.jpg";

const slides = [
  { src: forrosHero, alt: "Sala de estar com forro vinílico de madeira" },
  { src: cozinhaForro, alt: "Cozinha contemporânea com forro vinílico e marcenaria em madeira" },
  { src: salaRipado, alt: "Sala ampla com parede revestida em ripado vinílico" },
];

const SLIDE_MS = 6000;

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `active` nas deps: reinicia a contagem a cada troca, para que um clique
    // no indicador garanta o tempo cheio de exibição em vez de pular na hora.
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_MS
    );
    return () => window.clearTimeout(id);
  }, [paused, active]);

  return (
    <section
      className="relative w-full h-[78vh] min-h-[540px] max-h-[860px] overflow-hidden bg-[#1A1A1A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fotos em crossfade, com deriva lenta de zoom enquanto visíveis */}
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={i === active ? slide.alt : ""}
          aria-hidden={i !== active}
          className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] ease-out ${
            i === active ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ transitionDuration: i === active ? "1400ms, 7400ms" : "1400ms, 0ms" }}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          width={1536}
          height={1024}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/65" />

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1
          className="font-heading font-bold text-white leading-[1.08] drop-shadow-lg max-w-[19ch]"
          style={{ fontSize: "clamp(30px, 4.6vw, 62px)" }}
        >
          Superfícies Arquitetônicas em Vinílico
        </h1>

        <p
          className="font-body text-white/85 mt-5 md:mt-6 max-w-[46ch] leading-relaxed drop-shadow"
          style={{ fontSize: "clamp(15px, 1.7vw, 21px)" }}
        >
          Forros e revestimentos para paredes e tetos
        </p>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-[320px] sm:max-w-none sm:w-auto">
          <a
            href="/onde-comprar"
            className="text-[14px] font-body text-white px-7 py-3.5 rounded text-center transition-opacity hover:opacity-85"
            style={{ backgroundColor: "hsl(27 55% 50%)" }}
          >
            Comprar
          </a>
          <a
            href="/downloads"
            className="text-[14px] font-body text-white px-7 py-3.5 rounded text-center border border-white/70 backdrop-blur-sm transition-colors hover:bg-white hover:text-[#1A1A1A]"
          >
            Ver catálogo
          </a>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ir para a imagem ${i + 1} de ${slides.length}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

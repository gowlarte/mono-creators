import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import ripadoTijolo from "@/assets/produtos/ripado-amb-03.jpg";
import ripadoEstar from "@/assets/produtos/ripado-amb-05.jpg";
import lisoConcreto from "@/assets/produtos/liso-amb-03.jpg";
import ripadoMinimal from "@/assets/produtos/ripado-amb-04.jpg";
import lisoCozinha from "@/assets/produtos/liso-amb-05.jpg";

const slides = [
  { src: ripadoTijolo, alt: "Sala com parede de tijolo e painel ripado MONO" },
  { src: ripadoEstar, alt: "Estar com parede ripada, forro de madeira e sofás de couro" },
  { src: lisoConcreto, alt: "Sala com forro liso de madeira sobre parede de concreto" },
  { src: ripadoMinimal, alt: "Ambiente minimalista com painel ripado do piso ao teto" },
  { src: lisoCozinha, alt: "Cozinha com forro liso de madeira e marcenaria escura" },
];

const SLIDE_MS = 5500;

/**
 * Parallax em três camadas, cada uma com uma velocidade, como fração da altura
 * do hero percorrida na rolagem:
 *
 * - a foto desce (fica para trás, parecendo distante);
 * - o véu escuro desce menos (fica entre a foto e o texto);
 * - o texto sobe (sai na frente, parecendo próximo).
 *
 * O que cria profundidade é a diferença entre elas — aqui, 0,30 + 0,12 = 42% da
 * altura do hero separando foto e texto ao longo da rolagem. Mexer só na foto,
 * por pouco que seja, passa despercebido numa fotografia sem ponto de
 * referência.
 */
const FATOR_FOTO = 0.3;
const FATOR_VEU = 0.12;
const FATOR_TEXTO = -0.12;

/**
 * Folga da camada de foto acima e abaixo do hero, em fração da altura dele.
 * Precisa ser maior que FATOR_FOTO, senão a borda da imagem entra em cena no
 * fim do movimento.
 */
const FOLGA = 0.4;

const limitar = (valor: number, min: number, max: number) =>
  Math.min(Math.max(valor, min), max);

const HeroCreators = () => {
  const [ativo, setAtivo] = useState(0);
  const [reduzido, setReduzido] = useState(false);
  const secaoRef = useRef<HTMLElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const veuRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzido(consulta.matches);
    const aoMudar = () => setReduzido(consulta.matches);
    consulta.addEventListener("change", aoMudar);
    return () => consulta.removeEventListener("change", aoMudar);
  }, []);

  // `ativo` nas deps reinicia a contagem a cada troca, para o tempo de exibição
  // ser sempre o cheio.
  useEffect(() => {
    if (reduzido) return;
    const id = window.setTimeout(
      () => setAtivo((i) => (i + 1) % slides.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [reduzido, ativo]);

  /**
   * O hero é o topo da página, então `scrollY` já é a distância percorrida
   * dentro dele. Tudo acontece em `translate3d` dentro de um
   * `requestAnimationFrame`, para o navegador resolver no compositor em vez de
   * recalcular layout a cada quadro.
   */
  useEffect(() => {
    if (reduzido) return;
    let quadro = 0;

    const atualizar = () => {
      quadro = 0;
      const secao = secaoRef.current;
      if (!secao) return;
      const altura = secao.offsetHeight || 1;
      const progresso = limitar(window.scrollY / altura, 0, 1);
      const deslocar = (el: HTMLElement | null, fator: number) => {
        if (el) el.style.transform = `translate3d(0, ${progresso * altura * fator}px, 0)`;
      };

      deslocar(fotoRef.current, FATOR_FOTO);
      deslocar(veuRef.current, FATOR_VEU);
      deslocar(textoRef.current, FATOR_TEXTO);

      // O texto só começa a sumir depois da metade, quando o hero já está
      // saindo — some antes disso e atrapalha a leitura de quem parou no meio.
      if (textoRef.current) {
        textoRef.current.style.opacity = String(
          1 - limitar((progresso - 0.55) / 0.45, 0, 1),
        );
      }
    };

    const agendar = () => {
      if (!quadro) quadro = window.requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (quadro) window.cancelAnimationFrame(quadro);
    };
  }, [reduzido]);

  return (
    <section
      ref={secaoRef}
      className="relative h-[82vh] min-h-[520px] max-h-[900px] overflow-hidden bg-[#1A1A1A]"
    >
      {/* Camada 1 — a foto, mais ao fundo e mais lenta. É mais alta que o hero
          e começa acima dele para sobrar borda durante o movimento. */}
      <div
        ref={fotoRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `${-FOLGA * 100}%`, height: `${(1 + FOLGA * 2) * 100}%` }}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={i === ativo ? slide.alt : ""}
            aria-hidden={i !== ativo}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-out ${
              i === ativo ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>

      {/* Camada 2 — o véu, entre a foto e o texto. */}
      <div
        ref={veuRef}
        className="absolute inset-x-0 -top-[20%] h-[140%] bg-gradient-to-t from-foreground/85 via-foreground/45 to-foreground/15 will-change-transform"
      />

      {/* Camada 3 — o texto, à frente e no sentido contrário. */}
      <div ref={textoRef} className="absolute inset-0 flex items-end will-change-transform">
        <div className="section-padding pb-12 lg:pb-20 w-full max-w-[1280px] mx-auto">
          <p className="font-heading text-xs lg:text-sm uppercase tracking-[0.35em] text-background/80 mb-5">
            Mono Creators
          </p>
          <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl font-light text-background max-w-3xl leading-[1.08]">
            Transforme espaços.
            <br />
            Inspire pessoas.
          </h1>
          <p className="font-body text-base lg:text-lg text-background/80 max-w-xl mt-6 leading-relaxed">
            Faça parte da comunidade de creators da MONO e transforme sua criatividade em
            novas oportunidades.
          </p>
          <a
            href="#cadastro"
            className="inline-flex items-center gap-2 mt-9 text-sm font-body uppercase tracking-[0.15em] text-white px-9 py-4 rounded transition-opacity hover:opacity-85"
            style={{ backgroundColor: "hsl(27 55% 50%)" }}
          >
            Quero ser MONO Creator <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroCreators;

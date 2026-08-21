import { useEffect, useRef, useState } from "react";
import baseImg from "@/assets/esquema-camadas/Base.png";
import primerImg from "@/assets/esquema-camadas/Primer.png";
import texturaImg from "@/assets/esquema-camadas/Textura.png";
import topoImg from "@/assets/esquema-camadas/Topo.png";

/**
 * Camadas de baixo para cima — a ordem do array é a ordem no DOM, então a de cima
 * é desenhada por último e cobre as debaixo na sobreposição.
 *
 * `bordaTopoPct` é a altura da borda superior da peça na coluna `xAncora`, medida
 * direto do canal alpha de cada PNG. É o que faz o ponto da linha-guia cair sobre
 * a superfície da camada, e não no vazio da caixa da imagem.
 */
const camadas = [
  {
    id: "base",
    img: baseImg,
    alt: "Base em PVC alveolar",
    titulo: "Base PVC",
    subtitulo: null as string | null,
    proporcao: 1822 / 295,
    xAncora: 80,
    bordaTopoPct: 45,
  },
  {
    id: "primer",
    img: primerImg,
    alt: "Primeira camada: primer especial",
    titulo: "1ª Camada",
    subtitulo: "Primer especial",
    proporcao: 1787 / 267,
    xAncora: 63,
    bordaTopoPct: 33,
  },
  {
    id: "textura",
    img: texturaImg,
    alt: "Segunda camada: impressão digital",
    titulo: "2ª Camada",
    subtitulo: "Impresso digital",
    proporcao: 1784 / 262,
    xAncora: 46,
    bordaTopoPct: 22,
  },
  {
    id: "topo",
    img: topoImg,
    alt: "Terceira camada: proteção de verniz",
    titulo: "3ª Camada",
    subtitulo: "Proteção de verniz",
    proporcao: 1820 / 262,
    xAncora: 21,
    bordaTopoPct: 2,
  },
];

// Frações da LARGURA do diagrama, para tudo escalar junto.
const SEPARACAO = 0.075;
const TOPO_DA_BASE = 0.35;
const BASE_DO_ROTULO = 0.065;
const ALTURA_DO_PALCO = 0.54;
const FIM_DA_EXPLOSAO = 0.75;

// `top` em porcentagem é relativo à ALTURA do pai, e o palco tem altura
// ALTURA_DO_PALCO × largura. Converte uma fração-da-largura em porcentagem de top.
const emTop = (fracaoDaLargura: number) => `${(fracaoDaLargura / ALTURA_DO_PALCO) * 100}%`;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const CamadasScroll = () => {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const camadasRef = useRef<(HTMLDivElement | null)[]>([]);
  const guiasRef = useRef<(HTMLDivElement | null)[]>([]);
  const rotulosRef = useRef<(HTMLDivElement | null)[]>([]);
  const [estatico, setEstatico] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Abaixo de 768px o diagrama fica baixo demais para explodir com rótulos.
    const semMovimento = () => mq.matches || window.innerWidth < 768;

    // Sem rAF de propósito: são poucas escritas por evento, o scroll já chega na
    // cadência do frame, e rAF não dispara quando a aba não está compondo.
    const desenhar = () => {
      const palco = palcoRef.current;
      if (!palco) return;
      const L = palco.clientWidth;
      if (!L) return;

      let progresso = 1; // estático = peça já aberta
      if (!semMovimento()) {
        const trilho = trilhoRef.current;
        if (!trilho) return;
        const percorrivel = trilho.offsetHeight - window.innerHeight;
        progresso =
          percorrivel > 0 ? clamp01(-trilho.getBoundingClientRect().top / percorrivel) : 0;
      }

      const abertura = easeOutCubic(clamp01(progresso / FIM_DA_EXPLOSAO));

      camadas.forEach((c, i) => {
        const el = camadasRef.current[i];
        const guia = guiasRef.current[i];
        const rotulo = rotulosRef.current[i];

        const subida = i * SEPARACAO * abertura;
        const deriva = i * 0.012 * abertura; // leve escorregada para a esquerda
        if (el) el.style.transform = `translate(${-deriva * L}px, ${-subida * L}px)`;

        if (guia) {
          const yAncora = TOPO_DA_BASE - subida + (c.bordaTopoPct / 100) / c.proporcao;
          guia.style.height = `${Math.max(0, (yAncora - BASE_DO_ROTULO) * L)}px`;
        }

        if (rotulo) {
          const surgimento = clamp01((progresso - (0.1 + i * 0.15)) / 0.15);
          rotulo.style.opacity = String(surgimento);
          rotulo.style.transform = `translateY(${(1 - surgimento) * 8}px)`;
        }
      });
    };

    const sincronizar = () => {
      setEstatico(semMovimento());
      desenhar();
    };

    sincronizar();
    window.addEventListener("scroll", desenhar, { passive: true });
    window.addEventListener("resize", sincronizar);
    mq.addEventListener("change", sincronizar);
    return () => {
      window.removeEventListener("scroll", desenhar);
      window.removeEventListener("resize", sincronizar);
      mq.removeEventListener("change", sincronizar);
    };
  }, []);

  // O modo estático some com o trilho, então redesenha quando ele muda.
  useEffect(() => {
    window.dispatchEvent(new Event("scroll"));
  }, [estatico]);

  return (
    <section className="bg-background overflow-x-clip">
      <div
        ref={trilhoRef}
        className={estatico ? "relative" : "relative h-[280vh]"}
      >
        <div
          className={
            estatico
              ? "py-20"
              : "sticky top-0 h-screen flex flex-col justify-center py-16"
          }
        >
          <div className="section-padding mb-10 lg:mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-3">
                Composição
              </p>
              <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground">
                Quatro camadas, uma peça só
              </h2>
              <div className="w-16 h-px bg-mono-accent mt-4" />
              <p className="font-body text-base text-muted-foreground leading-relaxed mt-5">
                {estatico
                  ? "Cada camada responde por uma parte do resultado: o corpo da peça, a aderência, a fidelidade da textura e a resistência ao uso."
                  : "Role para separar a peça e ver o que cada camada resolve — do corpo em PVC ao verniz que protege a superfície."}
              </p>
            </div>
          </div>

          <div className="section-padding">
            <div
              ref={palcoRef}
              className="relative w-full mx-auto max-w-[960px]"
              style={{ aspectRatio: `1 / ${ALTURA_DO_PALCO}` }}
            >
              {camadas.map((c, i) => (
                <div key={c.id}>
                  {/* Rótulo, alinhado pela base sobre a linha-guia */}
                  <div
                    className={`absolute z-20 flex items-end pointer-events-none ${
                      estatico ? "hidden" : ""
                    }`}
                    style={{ left: `${c.xAncora}%`, top: 0, height: emTop(BASE_DO_ROTULO) }}
                  >
                    <div
                      ref={(el) => (rotulosRef.current[i] = el)}
                      className="pb-1.5 w-max max-w-[10rem] opacity-0"
                    >
                      <p className="font-body text-[13px] leading-snug text-foreground">
                        {c.titulo}
                      </p>
                      {c.subtitulo && (
                        <p className="font-body text-[13px] leading-snug text-foreground">
                          {c.subtitulo}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Linha-guia: desce do rótulo até a superfície da camada */}
                  <div
                    ref={(el) => (guiasRef.current[i] = el)}
                    className={`absolute z-10 w-px bg-foreground/30 pointer-events-none ${
                      estatico ? "hidden" : ""
                    }`}
                    style={{ left: `${c.xAncora}%`, top: emTop(BASE_DO_ROTULO), height: 0 }}
                  >
                    <span className="absolute -bottom-[2px] -left-[2px] w-[5px] h-[5px] rounded-full bg-foreground/45" />
                  </div>

                  {/* Camada */}
                  <div
                    ref={(el) => (camadasRef.current[i] = el)}
                    className="absolute left-0 w-full will-change-transform"
                    style={{ top: emTop(TOPO_DA_BASE) }}
                  >
                    <img
                      src={c.img}
                      alt={c.alt}
                      className="w-full h-auto select-none"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* No estático os rótulos viram lista: legível onde a peça é pequena. */}
            {estatico && (
              <ol className="mt-10 space-y-5 max-w-md mx-auto">
                {[...camadas].reverse().map((c) => (
                  <li key={c.id} className="flex gap-4">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mono-accent shrink-0" />
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground leading-snug">
                        {c.titulo}
                      </p>
                      {c.subtitulo && (
                        <p className="font-body text-sm text-muted-foreground leading-snug">
                          {c.subtitulo}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CamadasScroll;

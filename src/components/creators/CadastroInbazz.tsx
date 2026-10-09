import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ExternalLink, Loader2, X } from "lucide-react";

import { INBAZZ_CADASTRO_URL } from "@/lib/creators";

/**
 * Inscrição: passo a passo e o cadastro da Inbazz num modal.
 *
 * O link da Inbazz abre na tela de login, não na de cadastro, e quem chega
 * pela landing quase nunca tem conta lá. Por isso o roteiro explica o
 * "Cadastre-se" antes de abrir.
 *
 * O app abre num modal em vez de solto na página: é uma tela de celular com
 * várias etapas próprias, que num bloco de altura fixa vira rolagem dentro de
 * rolagem. O link de nova aba fica sempre visível, para o dia em que a Inbazz
 * deixar de aceitar ser embutida.
 *
 * O app da Inbazz leva uns segundos para iniciar e fica em branco enquanto
 * isso. O iframe começa a carregar (escondido) quando o visitante se aproxima
 * desta seção — não na abertura da landing, para quem só passa pelo topo não
 * baixar o app inteiro — e o modal abre pronto no clique.
 *
 * A tela de login da Inbazz não rola: ela se encaixa na altura do iframe e,
 * abaixo de uns 720px, o "Cadastre-se" fica cortado e inalcançável (notebook
 * com tela baixa ou zoom do Windows). Rolar o modal não resolve: a roda do
 * mouse sobre o iframe fica com o app da Inbazz. Então, quando a área é mais
 * baixa que isso, o iframe é desenhado com 720px e reduzido para caber — fica
 * menor, mas inteiro e clicável.
 *
 * O modal é feito à mão, sem o Dialog do Radix: montado e fechado, o Radix
 * continua tratando a página como modal e põe `pointer-events: none` no body
 * — nada mais é clicável, nem o botão que abriria o modal.
 */
/** Altura mínima em que a tela de login da Inbazz aparece inteira. */
const ALTURA_MINIMA_INBAZZ = 720;

const roteiro = [
  <>
    Na tela da Inbazz, toque em <strong className="font-medium text-foreground">Cadastre-se</strong>
    , logo abaixo do botão Entrar.
  </>,
  <>Preencha seus dados e confirme o código que chega no seu e-mail.</>,
  <>Pronto: seu pedido entra na comunidade MONO para o nosso time aprovar.</>,
];

const CadastroInbazz = () => {
  const [aberto, setAberto] = useState(false);
  const [montado, setMontado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const secao = useRef<HTMLDivElement>(null);
  const botaoAbrir = useRef<HTMLButtonElement>(null);
  const botaoFechar = useRef<HTMLButtonElement>(null);
  const areaIframe = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState({ largura: 0, altura: 0 });

  // Mede a área do iframe para decidir se a Inbazz precisa ser reduzida.
  useEffect(() => {
    const alvo = areaIframe.current;
    if (!alvo || !("ResizeObserver" in window)) return;
    const observador = new ResizeObserver(([entrada]) => {
      const { width, height } = entrada.contentRect;
      setArea({ largura: width, altura: height });
    });
    observador.observe(alvo);
    return () => observador.disconnect();
  }, [montado]);

  const escala =
    area.altura > 0 && area.altura < ALTURA_MINIMA_INBAZZ ? area.altura / ALTURA_MINIMA_INBAZZ : 1;

  // Monta o iframe quando a seção chega perto da tela.
  useEffect(() => {
    const alvo = secao.current;
    if (!alvo || montado) return;
    if (!("IntersectionObserver" in window)) {
      setMontado(true);
      return;
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) setMontado(true);
      },
      { rootMargin: "800px 0px" },
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, [montado]);

  // Aberto: trava a rolagem da página, leva o foco para o X e fecha no Esc.
  // O Esc só chega aqui com o foco fora do iframe; dentro dele, quem recebe a
  // tecla é o app da Inbazz.
  useEffect(() => {
    if (!aberto) return;
    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botaoFechar.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    const abridor = botaoAbrir.current;
    return () => {
      document.body.style.overflow = overflowAntes;
      window.removeEventListener("keydown", aoTeclar);
      abridor?.focus();
    };
  }, [aberto]);

  const abrir = () => {
    setMontado(true);
    setAberto(true);
  };

  return (
    <div ref={secao} className="space-y-10">
      <ol className="space-y-5 border-l border-mono-accent/30 pl-6 ml-3">
        {roteiro.map((texto, i) => (
          <li
            key={i}
            className="relative font-body text-sm lg:text-base text-muted-foreground leading-relaxed"
          >
            <span className="absolute -left-[37px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-background border border-mono-accent/50 font-heading text-[11px] text-mono-accent">
              {i + 1}
            </span>
            {texto}
          </li>
        ))}
      </ol>

      <div className="space-y-4">
        <button
          ref={botaoAbrir}
          type="button"
          onClick={abrir}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-body uppercase tracking-[0.15em] text-white px-10 py-4 rounded transition-opacity hover:opacity-85"
          style={{ backgroundColor: "hsl(27 55% 50%)" }}
        >
          Quero ser MONO Creator <ArrowRight size={16} />
        </button>
        <p className="font-body text-xs text-muted-foreground">
          Já tem conta na Inbazz? Entre com ela no mesmo botão.{" "}
          <a
            href={INBAZZ_CADASTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Prefere abrir em outra aba?
          </a>
        </p>
      </div>

      {montado &&
        createPortal(
          // Fechado fica invisível, mas com tamanho: com display none o iframe
          // teria 0×0 e o app da Inbazz só desenharia depois de aberto.
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              aberto ? "" : "invisible pointer-events-none"
            }`}
            aria-hidden={!aberto}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setAberto(false)}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="inbazz-titulo"
              className="relative flex flex-col w-full h-full bg-background shadow-2xl sm:w-[440px] sm:h-[min(860px,92vh)] sm:rounded-2xl sm:overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <div className="min-w-0 flex-1">
                  <h2 id="inbazz-titulo" className="font-body text-sm text-foreground">
                    Cadastro na Inbazz
                  </h2>
                  <p className="font-body text-xs text-muted-foreground truncate">
                    Toque em Cadastre-se para criar sua conta
                  </p>
                </div>
                <a
                  href={INBAZZ_CADASTRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir em outra aba"
                  title="Abrir em outra aba"
                  className="p-2 rounded text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  ref={botaoFechar}
                  type="button"
                  onClick={() => setAberto(false)}
                  aria-label="Fechar"
                  className="p-2 rounded text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
              <div ref={areaIframe} className="relative flex-1 overflow-hidden bg-white">
                {carregando && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 font-body text-sm text-muted-foreground">
                    <Loader2 size={16} className="animate-spin" /> Abrindo a Inbazz…
                  </div>
                )}
                <iframe
                  src={INBAZZ_CADASTRO_URL}
                  title="Cadastro na Inbazz"
                  onLoad={() => setCarregando(false)}
                  className="absolute top-0 left-0 border-0 origin-top-left"
                  style={
                    escala < 1
                      ? {
                          width: `${area.largura / escala}px`,
                          height: `${ALTURA_MINIMA_INBAZZ}px`,
                          transform: `scale(${escala})`,
                        }
                      : { width: "100%", height: "100%" }
                  }
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default CadastroInbazz;

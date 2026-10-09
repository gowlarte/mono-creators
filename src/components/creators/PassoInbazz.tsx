import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, ExternalLink, Loader2, X } from "lucide-react";

import { INBAZZ_CADASTRO_URL, type Candidatura } from "@/lib/creators";

/**
 * Segundo passo do cadastro: a conta na Inbazz.
 *
 * O link da Inbazz abre na tela de login, não na de cadastro, e quem chega
 * pelo nosso formulário quase nunca tem conta lá. Por isso o roteiro explica
 * o "Cadastre-se" antes de abrir, e insiste no mesmo e-mail — é por ele que o
 * time cruza a candidatura com o pedido de entrada na comunidade.
 *
 * O app abre num modal em vez de solto na página: é uma tela de celular com
 * cinco etapas próprias, que num bloco de altura fixa vira rolagem dentro de
 * rolagem. O link de nova aba fica sempre visível, para o dia em que a Inbazz
 * deixar de aceitar ser embutida.
 *
 * O app da Inbazz leva uns segundos para iniciar e fica em branco enquanto
 * isso. Por isso o modal é montado (escondido) assim que este passo aparece:
 * o iframe carrega enquanto o creator lê o roteiro e abre pronto no clique.
 *
 * O modal é feito à mão, sem o Dialog do Radix: montado e fechado, o Radix
 * continua tratando a página como modal e põe `pointer-events: none` no body
 * — nada mais é clicável, nem o botão que abriria o modal.
 */
const PassoInbazz = ({
  candidatura,
  onRefazer,
}: {
  candidatura: Candidatura;
  onRefazer: () => void;
}) => {
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const botaoAbrir = useRef<HTMLButtonElement>(null);
  const botaoFechar = useRef<HTMLButtonElement>(null);

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

  const roteiro = [
    <>
      Na tela da Inbazz, toque em{" "}
      <strong className="font-medium text-foreground">Cadastre-se</strong>, logo abaixo do botão
      Entrar.
    </>,
    <>
      Use o e-mail{" "}
      <strong className="font-medium text-foreground break-all">{candidatura.email}</strong> — é por
      ele que encontramos a sua candidatura.
    </>,
    <>
      Confirme o código que chega no seu e-mail e conclua as etapas. Pronto: seu pedido entra na
      comunidade MONO para o nosso time aprovar.
    </>,
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-start gap-4">
        <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-mono-accent">
          <Check size={18} className="text-white" />
        </span>
        <div className="space-y-2">
          <h3 className="font-display text-2xl lg:text-3xl font-light text-foreground">
            Recebemos sua candidatura
            {candidatura.instagram ? `, @${candidatura.instagram}` : ""}.
          </h3>
          <p className="font-body text-sm lg:text-base text-muted-foreground leading-relaxed max-w-xl">
            Falta um passo: criar sua conta na Inbazz, a plataforma onde você vai acompanhar cupom,
            vendas e comissões da parceria.
          </p>
        </div>
      </div>

      <ol className="space-y-5 border-l border-mono-accent/30 pl-6 ml-5">
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
          onClick={() => setAberto(true)}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-body uppercase tracking-[0.15em] text-white px-10 py-4 rounded transition-opacity hover:opacity-85"
          style={{ backgroundColor: "hsl(27 55% 50%)" }}
        >
          Criar minha conta na Inbazz <ArrowRight size={16} />
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

      <p className="font-body text-xs text-muted-foreground border-t border-border pt-6">
        Errou algum dado?{" "}
        <button
          type="button"
          onClick={onRefazer}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Preencher a candidatura de novo
        </button>
      </p>

      {createPortal(
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
                  Conta na Inbazz
                </h2>
                <p className="font-body text-xs text-muted-foreground truncate">
                  Toque em Cadastre-se e use {candidatura.email}
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
            <div className="relative flex-1 bg-white">
              {carregando && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 font-body text-sm text-muted-foreground">
                  <Loader2 size={16} className="animate-spin" /> Abrindo a Inbazz…
                </div>
              )}
              <iframe
                src={INBAZZ_CADASTRO_URL}
                title="Cadastro na Inbazz"
                onLoad={() => setCarregando(false)}
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default PassoInbazz;

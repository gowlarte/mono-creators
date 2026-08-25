import { MessageCircle } from "lucide-react";
import { cores, linhas, linkCompra, type LinhaId } from "@/data/compra";

interface OpcoesDeCompraProps {
  /** Com linha, abre um botão por cor. Sem linha, um botão por linha. */
  linha?: LinhaId;
  /** "escuro" para usar sobre bg-secondary; "claro" sobre o fundo do site. */
  tom?: "claro" | "escuro";
  /** Mostra a medida embaixo do nome — cabe no hub, polui no card de cor. */
  comChamada?: boolean;
}

const OpcoesDeCompra = ({ linha, tom = "claro", comChamada = false }: OpcoesDeCompraProps) => {
  const escuro = tom === "escuro";

  const base =
    "group flex h-full flex-col gap-1 rounded-xl border px-5 py-4 text-left transition-colors";
  const ativo = escuro
    ? "border-secondary-foreground/25 hover:border-secondary-foreground/60 hover:bg-secondary-foreground/5"
    : "border-border hover:border-mono-accent hover:bg-muted/50";
  const corNome = escuro ? "text-secondary-foreground" : "text-foreground";
  const corApoio = escuro ? "text-secondary-foreground/60" : "text-muted-foreground";

  // Com linha escolhida, a pessoa já está na página do produto: o que falta é
  // dizer a cor. Sem linha, ela ainda está decidindo o acabamento.
  const opcoes = linha
    ? cores.map((cor) => ({
        chave: cor,
        titulo: cor,
        apoio: linhas[linha].medida,
        href: linkCompra(linha, cor),
      }))
    : (Object.keys(linhas) as LinhaId[]).map((id) => ({
        chave: id,
        titulo: linhas[id].nome,
        apoio: linhas[id].medida,
        href: linkCompra(id),
      }));

  // Cinco cores pedem uma faixa de 5; duas linhas ficariam esticadas nela.
  const colunas = linha ? "lg:grid-cols-5" : "lg:grid-cols-2";

  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-2 ${colunas} gap-3 lg:gap-4`}>
      {opcoes.map((o) => (
        <li key={o.chave}>
          <a
            href={o.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} ${ativo}`}
          >
            <span
              className={`flex items-center gap-2 font-body text-sm font-semibold ${corNome}`}
            >
              {o.titulo}
              <MessageCircle
                size={14}
                className={`shrink-0 ${corApoio} transition-opacity opacity-60 group-hover:opacity-100`}
              />
            </span>
            {comChamada && (
              <span className={`font-body text-xs leading-relaxed ${corApoio}`}>{o.apoio}</span>
            )}
            <span className={`font-body text-xs ${corApoio}`}>Comprar no WhatsApp</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default OpcoesDeCompra;

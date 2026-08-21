import { ExternalLink } from "lucide-react";
import { opcoesDeCompra, type LinhaId } from "@/data/marketplaces";

interface OpcoesDeCompraProps {
  /** Sem linha, usa as lojas oficiais. Com linha, prefere o anúncio dela. */
  linha?: LinhaId;
  /** "escuro" para usar sobre bg-secondary; "claro" sobre o fundo do site. */
  tom?: "claro" | "escuro";
  /** Mostra a chamada de cada canal — cabe no hub, polui nas páginas de produto. */
  comChamada?: boolean;
}

const OpcoesDeCompra = ({ linha, tom = "claro", comChamada = false }: OpcoesDeCompraProps) => {
  const opcoes = opcoesDeCompra(linha);
  const escuro = tom === "escuro";

  const base =
    "group flex flex-col gap-1 rounded-xl border px-5 py-4 text-left transition-colors";
  const ativo = escuro
    ? "border-secondary-foreground/25 hover:border-secondary-foreground/60 hover:bg-secondary-foreground/5"
    : "border-border hover:border-mono-accent hover:bg-muted/50";
  const inativo = escuro
    ? "border-secondary-foreground/10 cursor-default"
    : "border-border/50 cursor-default";
  const corNome = escuro ? "text-secondary-foreground" : "text-foreground";
  const corApoio = escuro ? "text-secondary-foreground/60" : "text-muted-foreground";

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {opcoes.map((o) => {
        const conteudo = (
          <>
            <span className={`flex items-center gap-2 font-body text-sm font-semibold ${corNome}`}>
              {o.nome}
              {o.url && (
                <ExternalLink
                  size={14}
                  className={`shrink-0 ${corApoio} transition-opacity opacity-60 group-hover:opacity-100`}
                />
              )}
            </span>
            {comChamada && (
              <span className={`font-body text-xs leading-relaxed ${corApoio}`}>{o.chamada}</span>
            )}
            {!o.url && (
              <span className={`font-body text-xs ${corApoio}`}>Em breve</span>
            )}
          </>
        );

        return (
          <li key={o.id}>
            {o.url ? (
              <a
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} ${ativo}`}
              >
                {conteudo}
              </a>
            ) : (
              <div className={`${base} ${inativo}`} aria-disabled="true">
                {conteudo}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default OpcoesDeCompra;

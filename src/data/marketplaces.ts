/**
 * Fonte única dos links de compra.
 *
 * Como preencher:
 *  - `lojaOficial`  → vitrine da MONO no marketplace. Usada na página /onde-comprar
 *                     e como fallback quando a linha ainda não tem anúncio próprio.
 *  - `anuncios`     → link do anúncio específico de cada linha, usado nas páginas
 *                     de produto (/produtos/ripado e /produtos/liso).
 *
 * Enquanto uma URL for `null`, o botão aparece como "Em breve" e não vira link —
 * nada quebra e a página não fica com link morto.
 */

export type MarketplaceId = "mercado-livre" | "amazon" | "tiktok-shop" | "shopee";

export type LinhaId = "ripado" | "liso";

export interface Marketplace {
  id: MarketplaceId;
  nome: string;
  /** Descrição curta mostrada no card da página /onde-comprar. */
  chamada: string;
  lojaOficial: string | null;
}

export const marketplaces: Marketplace[] = [
  {
    id: "mercado-livre",
    nome: "Mercado Livre",
    chamada: "Frete calculado, parcelamento e Mercado Pago.",
    lojaOficial: null,
  },
  {
    id: "amazon",
    nome: "Amazon",
    chamada: "Entrega Prime e devolução facilitada.",
    lojaOficial: null,
  },
  {
    id: "tiktok-shop",
    nome: "TikTok Shop",
    chamada: "Compra direto pelo app, com cupons da loja.",
    lojaOficial: null,
  },
  {
    id: "shopee",
    nome: "Shopee",
    chamada: "Cupons de frete e programa de cashback.",
    lojaOficial: null,
  },
];

/** Anúncio de cada linha em cada marketplace. */
export const anuncios: Record<LinhaId, Partial<Record<MarketplaceId, string>>> = {
  ripado: {},
  liso: {},
};

export interface OpcaoDeCompra extends Marketplace {
  /** Anúncio da linha quando existe; senão a loja oficial; senão null. */
  url: string | null;
}

/**
 * Resolve os links de compra. Sem `linha`, devolve as lojas oficiais (hub).
 * Com `linha`, prefere o anúncio específico e cai na loja oficial se não houver.
 */
export function opcoesDeCompra(linha?: LinhaId): OpcaoDeCompra[] {
  return marketplaces.map((m) => ({
    ...m,
    url: (linha ? anuncios[linha]?.[m.id] : undefined) ?? m.lojaOficial,
  }));
}

/** True quando ao menos um canal já tem link ativo. */
export function temCanalAtivo(linha?: LinhaId): boolean {
  return opcoesDeCompra(linha).some((o) => o.url !== null);
}

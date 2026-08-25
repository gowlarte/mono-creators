/**
 * Fonte única da compra.
 *
 * Enquanto os cadastros de marketplace não estiverem no ar, toda intenção de
 * compra vai para o WhatsApp comercial. Cada botão manda uma mensagem já
 * preenchida com a linha (ripado ou liso), a cor e a medida da peça, para o
 * atendimento não precisar perguntar o que a pessoa estava vendo.
 *
 * Quando os marketplaces voltarem, o caminho é adicionar os links aqui e
 * trocar o destino em `OpcoesDeCompra` — os componentes já consomem este
 * módulo e não têm número nem texto cravado.
 */

export const WHATSAPP_NUMERO = "5511977971421";

export type LinhaId = "ripado" | "liso";

export type CorNome = "Cedro" | "Nogueira" | "Freijó" | "Carvalho" | "Castanheira";

export const cores: CorNome[] = ["Cedro", "Nogueira", "Freijó", "Carvalho", "Castanheira"];

interface Linha {
  nome: string;
  /** Nome curto, do jeito que aparece no card do catálogo. */
  rotulo: string;
  /** Medida curta, para o card do catálogo. */
  medidaCurta: string;
  /** Medida completa, usada na mensagem do WhatsApp. */
  medida: string;
  /** O que a linha entrega — dá contexto à mensagem de cada cor. */
  acabamento: string;
}

export const linhas: Record<LinhaId, Linha> = {
  ripado: {
    nome: "Natureshell PVC Ripado",
    rotulo: "Ripado",
    medidaCurta: "160×22mm",
    medida: "160 × 22 × 2900 mm",
    acabamento: "ripado",
  },
  liso: {
    nome: "Natureshell PVC Liso",
    rotulo: "Liso",
    medidaCurta: "200×8mm",
    medida: "200 × 8 × 5800 mm",
    acabamento: "liso",
  },
};

/**
 * Mensagem personalizada por linha e cor.
 *
 * Sem cor, fala da linha inteira; sem linha, é a porta de entrada genérica
 * usada no hub /onde-comprar e na home, onde a pessoa ainda não escolheu.
 */
export function mensagemCompra(linha?: LinhaId, cor?: CorNome): string {
  if (!linha) {
    return "Olá! Vim do site da MONO e quero comprar forro vinílico Natureshell. Pode me passar preços e disponibilidade?";
  }

  const { nome, medida, acabamento } = linhas[linha];

  if (!cor) {
    return `Olá! Vim do site da MONO e quero comprar o ${nome} (${medida}). Pode me passar preços, cores disponíveis e prazo de entrega?`;
  }

  return `Olá! Vim do site da MONO e quero comprar o ${nome} na cor ${cor} — acabamento ${acabamento}, ${medida}. Pode me passar preço, disponibilidade e prazo de entrega?`;
}

/** Link do WhatsApp com a mensagem já preenchida. */
export function linkCompra(linha?: LinhaId, cor?: CorNome): string {
  const texto = encodeURIComponent(mensagemCompra(linha, cor));
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
}

/**
 * Link de cadastro do MONO Creators.
 *
 * A landing não tem formulário: o creator cria a conta direto na Inbazz, que é
 * quem guarda os dados, confirma o e-mail e manda o pedido de entrada na
 * comunidade da MONO para o time aprovar no painel.
 */

/** Loja da MONO na Inbazz. É o que faz o creator cair na comunidade certa
 *  depois de criar a conta — não é segredo, é o mesmo link do convite. */
export const INBAZZ_STORE_ID =
  import.meta.env?.VITE_INBAZZ_STORE_ID ?? "4fa2c7a0-3132-495d-9b34-bd9ee3232d65";

export const INBAZZ_CADASTRO_URL = `https://creators.inbazz.com.br/login?storeId=${INBAZZ_STORE_ID}`;

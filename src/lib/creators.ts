/**
 * Máscaras, validações e envio do cadastro do MONO Creators.
 *
 * Tudo que não depende de React mora aqui para poder ser testado sozinho —
 * o formulário é longo e um CPF aceito errado só aparece depois, na planilha.
 */

/** Para onde o cadastro é enviado. Publicado, é a função `api/creators.ts` da
 *  própria Vercel, que grava no Supabase. No `npm run dev` essa função não
 *  existe, então o padrão fica vazio e `enviarCadastro` só registra o payload
 *  no console — dá para testar a página inteira sem banco. A variável
 *  `VITE_CREATORS_ENDPOINT` sobrepõe os dois casos. */
export const CREATORS_ENDPOINT =
  import.meta.env?.VITE_CREATORS_ENDPOINT ?? (import.meta.env?.PROD ? "/api/creators" : "");

/** Loja da MONO na Inbazz. É o que faz o creator cair na comunidade certa
 *  depois de criar a conta — não é segredo, é o mesmo link do convite. */
export const INBAZZ_STORE_ID =
  import.meta.env?.VITE_INBAZZ_STORE_ID ?? "4fa2c7a0-3132-495d-9b34-bd9ee3232d65";

/** A conta, a confirmação de e-mail e o pedido de entrada na comunidade são da
 *  Inbazz: a API de marcas não cria creator, então o cadastro termina lá. */
export const INBAZZ_CADASTRO_URL = `https://creators.inbazz.com.br/login?storeId=${INBAZZ_STORE_ID}`;

/** Quem já mandou a candidatura e recarrega a página volta direto para o passo
 *  da Inbazz, em vez de ver o formulário vazio e achar que perdeu tudo. */
const CHAVE_CANDIDATURA = "mono-creators:candidatura";

export interface Candidatura {
  email: string;
  /** Handle sem @. Pode faltar em candidatura guardada por uma versão antiga. */
  instagram?: string;
}

export const lerCandidatura = (): Candidatura | null => {
  try {
    const bruto = sessionStorage.getItem(CHAVE_CANDIDATURA);
    return bruto ? (JSON.parse(bruto) as Candidatura) : null;
  } catch {
    return null;
  }
};

export const guardarCandidatura = (candidatura: Candidatura | null) => {
  try {
    if (candidatura) sessionStorage.setItem(CHAVE_CANDIDATURA, JSON.stringify(candidatura));
    else sessionStorage.removeItem(CHAVE_CANDIDATURA);
  } catch {
    // Aba anônima ou storage bloqueado: só perde o atalho do recarregamento.
  }
};

export const somenteDigitos = (valor: string) => valor.replace(/\D/g, "");

export const mascaraCPF = (valor: string) => {
  const d = somenteDigitos(valor).slice(0, 11);
  let saida = d.slice(0, 3);
  if (d.length > 3) saida += "." + d.slice(3, 6);
  if (d.length > 6) saida += "." + d.slice(6, 9);
  if (d.length > 9) saida += "-" + d.slice(9, 11);
  return saida;
};

/** Aceita fixo (10 dígitos) e celular (11), com o DDD junto — separar DDD em
 *  outro campo só multiplica erro de digitação no mobile. */
export const mascaraTelefone = (valor: string) => {
  const d = somenteDigitos(valor).slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  const corte = d.length > 10 ? 7 : 6;
  if (d.length <= corte) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`;
};

export const mascaraCEP = (valor: string) => {
  const d = somenteDigitos(valor).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

export const mascaraData = (valor: string) => {
  const d = somenteDigitos(valor).slice(0, 8);
  let saida = d.slice(0, 2);
  if (d.length > 2) saida += "/" + d.slice(2, 4);
  if (d.length > 4) saida += "/" + d.slice(4, 8);
  return saida;
};

/** Tira @, URL e espaço: o creator cola o perfil de onde for mais fácil e a
 *  base recebe sempre só o handle. */
export const normalizarPerfil = (valor: string) =>
  valor
    .trim()
    .replace(/^https?:\/\/(www\.)?(instagram|tiktok)\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/.*$/, "")
    .replace(/\?.*$/, "")
    .toLowerCase();

export const cpfValido = (valor: string) => {
  const d = somenteDigitos(valor);
  if (d.length !== 11) return false;
  // 111.111.111-11 e afins passam na conta dos dígitos, mas não são CPF.
  if (/^(\d)\1{10}$/.test(d)) return false;

  const digito = (ate: number) => {
    let soma = 0;
    for (let i = 0; i < ate; i++) soma += Number(d[i]) * (ate + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
};

/** Converte dd/mm/aaaa em Date, recusando data que não existe no calendário
 *  (31/02, por exemplo, que o construtor do Date aceitaria virando 03/03). */
export const parseDataBR = (valor: string) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor.trim());
  if (!m) return null;
  const dia = Number(m[1]);
  const mes = Number(m[2]);
  const ano = Number(m[3]);
  const data = new Date(ano, mes - 1, dia);
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
    return null;
  }
  return data;
};

export const idadeEm = (nascimento: Date, referencia = new Date()) => {
  let idade = referencia.getFullYear() - nascimento.getFullYear();
  const antesDoAniversario =
    referencia.getMonth() < nascimento.getMonth() ||
    (referencia.getMonth() === nascimento.getMonth() &&
      referencia.getDate() < nascimento.getDate());
  if (antesDoAniversario) idade -= 1;
  return idade;
};

/** O programa envolve comissão e contrato, então o cadastro é de maior de 18. */
export const maiorDeIdade = (valor: string) => {
  const data = parseDataBR(valor);
  if (!data) return false;
  const idade = idadeEm(data);
  return idade >= 18 && idade < 120;
};

export interface EnderecoCEP {
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
}

/** ViaCEP é público e sem chave. Falha de rede ou CEP inexistente devolve null
 *  e o creator preenche na mão — o endereço nunca fica bloqueado pela busca. */
export const buscarCEP = async (cep: string): Promise<EnderecoCEP | null> => {
  const d = somenteDigitos(cep);
  if (d.length !== 8) return null;
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${d}/json/`);
    if (!resposta.ok) return null;
    const dados = await resposta.json();
    if (dados.erro) return null;
    return {
      estado: dados.uf ?? "",
      cidade: dados.localidade ?? "",
      bairro: dados.bairro ?? "",
      logradouro: dados.logradouro ?? "",
    };
  } catch {
    return null;
  }
};

export const enviarCadastro = async (dados: Record<string, unknown>) => {
  if (!CREATORS_ENDPOINT) {
    console.warn(
      "[MONO Creators] VITE_CREATORS_ENDPOINT não configurado — cadastro não foi enviado.",
      dados,
    );
    return;
  }
  const resposta = await fetch(CREATORS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...dados,
      origem: "site/creators",
      enviadoEm: new Date().toISOString(),
    }),
  });
  if (!resposta.ok) {
    throw new Error(`Falha ao enviar o cadastro (${resposta.status})`);
  }
};

/**
 * Máscaras, validações e envio do cadastro do MONO Creators.
 *
 * Tudo que não depende de React mora aqui para poder ser testado sozinho —
 * o formulário é longo e um CPF aceito errado só aparece depois, na planilha.
 */

/** Para onde o cadastro é enviado. O TI preenche quando o destino existir
 *  (endpoint da Inbazz, webhook do GoHighLevel, Apps Script — tanto faz, desde
 *  que aceite um POST JSON). Enquanto estiver vazio, `enviarCadastro` apenas
 *  registra o payload no console e devolve sucesso, para a página poder ser
 *  demonstrada de ponta a ponta sem back-end. */
export const CREATORS_ENDPOINT = import.meta.env?.VITE_CREATORS_ENDPOINT ?? "";

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
  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia
  ) {
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
    body: JSON.stringify({ ...dados, origem: "site/creators", enviadoEm: new Date().toISOString() }),
  });
  if (!resposta.ok) {
    throw new Error(`Falha ao enviar o cadastro (${resposta.status})`);
  }
};

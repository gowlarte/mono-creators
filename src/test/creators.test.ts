import { describe, it, expect } from "vitest";
import {
  cpfValido,
  idadeEm,
  maiorDeIdade,
  mascaraCEP,
  mascaraCPF,
  mascaraData,
  mascaraTelefone,
  normalizarPerfil,
  parseDataBR,
} from "@/lib/creators";

/**
 * O cadastro de creators alimenta pagamento de comissão e envio de produto.
 * Um CPF inválido ou um @ com URL colada só aparecem depois, na planilha, então
 * as regras que limpam e recusam entrada ficam fixadas aqui.
 */

describe("mascaraCPF", () => {
  it("formata progressivamente, sem pontuação sobrando", () => {
    expect(mascaraCPF("529")).toBe("529");
    expect(mascaraCPF("529982")).toBe("529.982");
    expect(mascaraCPF("52998224")).toBe("529.982.24");
    expect(mascaraCPF("52998224725")).toBe("529.982.247-25");
  });

  it("ignora o que passa de 11 dígitos e qualquer caractere não numérico", () => {
    expect(mascaraCPF("529.982.247-25999")).toBe("529.982.247-25");
    expect(mascaraCPF("abc529def982")).toBe("529.982");
  });
});

describe("mascaraTelefone", () => {
  it("separa o DDD e ajusta o corte entre fixo e celular", () => {
    expect(mascaraTelefone("4733334444")).toBe("(47) 3333-4444");
    expect(mascaraTelefone("47999334444")).toBe("(47) 99933-4444");
  });

  it("formata enquanto o número ainda está incompleto", () => {
    expect(mascaraTelefone("4")).toBe("(4");
    expect(mascaraTelefone("479")).toBe("(47) 9");
  });
});

describe("mascaraCEP e mascaraData", () => {
  it("formata CEP e data no padrão brasileiro", () => {
    expect(mascaraCEP("88306773")).toBe("88306-773");
    expect(mascaraCEP("883")).toBe("883");
    expect(mascaraData("01012000")).toBe("01/01/2000");
    expect(mascaraData("0101")).toBe("01/01");
  });
});

describe("cpfValido", () => {
  it("aceita CPF com dígitos verificadores corretos", () => {
    expect(cpfValido("529.982.247-25")).toBe(true);
    expect(cpfValido("11144477735")).toBe(true);
  });

  it("recusa dígito verificador errado e tamanho incompleto", () => {
    expect(cpfValido("529.982.247-26")).toBe(false);
    expect(cpfValido("5299822472")).toBe(false);
  });

  it("recusa sequências de dígito repetido, que passam na conta mas não existem", () => {
    for (const d of ["00000000000", "11111111111", "99999999999"]) {
      expect(cpfValido(d)).toBe(false);
    }
  });
});

describe("parseDataBR", () => {
  it("recusa data que não existe no calendário", () => {
    // O construtor do Date aceitaria 31/02 virando 03/03.
    expect(parseDataBR("31/02/2000")).toBeNull();
    expect(parseDataBR("29/02/2001")).toBeNull();
    expect(parseDataBR("29/02/2000")).not.toBeNull();
  });

  it("recusa formato fora de dd/mm/aaaa", () => {
    expect(parseDataBR("2000-01-01")).toBeNull();
    expect(parseDataBR("1/1/2000")).toBeNull();
  });
});

describe("idadeEm", () => {
  it("só conta o ano depois do aniversário", () => {
    const nascimento = new Date(2000, 5, 15); // 15/06/2000
    expect(idadeEm(nascimento, new Date(2018, 5, 14))).toBe(17);
    expect(idadeEm(nascimento, new Date(2018, 5, 15))).toBe(18);
  });
});

describe("maiorDeIdade", () => {
  it("recusa quem ainda não fez 18 e data absurda", () => {
    const hoje = new Date();
    const anoDeOntem = `${hoje.getFullYear() - 10}`;
    expect(maiorDeIdade(`01/01/${anoDeOntem}`)).toBe(false);
    expect(maiorDeIdade("01/01/1700")).toBe(false);
    expect(maiorDeIdade("01/01/1990")).toBe(true);
  });
});

describe("normalizarPerfil", () => {
  it("guarda só o handle, venha ele como @, URL ou com barra no fim", () => {
    expect(normalizarPerfil("@MonoVinilicos")).toBe("monovinilicos");
    expect(normalizarPerfil("https://www.instagram.com/monovinilicos/")).toBe("monovinilicos");
    expect(normalizarPerfil("https://tiktok.com/monovinilicos?lang=pt")).toBe("monovinilicos");
    expect(normalizarPerfil("  monovinilicos  ")).toBe("monovinilicos");
  });
});

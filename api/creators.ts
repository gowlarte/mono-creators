import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

/**
 * Recebe a candidatura do MONO Creators e grava no Supabase.
 *
 * Roda na Vercel, no servidor: é o único lugar que conhece a secret key. O
 * navegador nunca fala com o Supabase direto — por isso a landing não precisa
 * da publishable key para nada.
 *
 * Os nomes das variáveis seguem o que a integração Vercel + Supabase cria
 * sozinha; os nomes antigos (service role) ficam como alternativa.
 */

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const TABELA = "creators_candidaturas";

/** Mesmas regras do formulário. O navegador valida para ajudar o creator; aqui
 *  valida porque qualquer um pode mandar um POST sem passar pela página. */
const texto = (max: number) => z.string().trim().max(max);
const opcional = (max: number) =>
  texto(max)
    .optional()
    .transform((v) => (v ? v : null));

const candidaturaSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  instagram: texto(60).min(1),
  seguidoresInstagram: texto(40).min(1),
  tiktok: opcional(60),
  youtube: opcional(300),
  nicho: texto(80).min(1),
  formatos: z.array(texto(80)).min(1).max(20),
  sobreVoce: opcional(4000),
  /** Campo escondido na página. Gente não vê e não preenche; robô preenche. */
  site: z.string().optional(),
});

const json = (status: number, corpo: Record<string, unknown>) =>
  Response.json(corpo, { status, headers: { "Cache-Control": "no-store" } });

/** As variáveis nascem na Vercel com um valor provisório até alguém colar o
 *  real; com ele, o createClient lançaria erro em vez de responder. */
const configurado =
  /^https:\/\/\S+$/.test(SUPABASE_URL) &&
  // sb_secret_… é a secret key nova; eyJ… é a service role antiga (JWT).
  /^(sb_secret_|eyJ)/.test(SUPABASE_SECRET_KEY);

export async function POST(request: Request) {
  if (!configurado) {
    console.error("[api/creators] SUPABASE_URL ou SUPABASE_SECRET_KEY não configurados.");
    return json(500, { erro: "Serviço indisponível." });
  }

  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return json(400, { erro: "Corpo inválido." });
  }

  const resultado = candidaturaSchema.safeParse(corpo);
  if (!resultado.success) {
    return json(422, {
      erro: "Dados inválidos.",
      campos: resultado.error.issues.map((i) => i.path.join(".")),
    });
  }
  const dados = resultado.data;

  // Robô: responde como sucesso para ele não tentar de novo, mas não grava.
  if (dados.site) return json(200, { ok: true });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Reenvio com o mesmo e-mail atualiza a candidatura em vez de duplicar. O
  // status e as observações do time não estão aqui, então não são apagados.
  const { error } = await supabase.from(TABELA).upsert(
    {
      email: dados.email,
      instagram: dados.instagram.replace(/^@/, "").toLowerCase(),
      seguidores_instagram: dados.seguidoresInstagram,
      tiktok: dados.tiktok,
      youtube: dados.youtube,
      nicho: dados.nicho,
      formatos: dados.formatos,
      sobre_voce: dados.sobreVoce,
      origem: "site/creators",
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("[api/creators] Falha ao gravar no Supabase:", error.message);
    return json(500, { erro: "Não foi possível salvar agora." });
  }

  return json(201, { ok: true });
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PassoInbazz from "@/components/creators/PassoInbazz";
import {
  enviarCadastro,
  guardarCandidatura,
  lerCandidatura,
  normalizarPerfil,
  type Candidatura,
} from "@/lib/creators";
import { faixasDeSeguidores, nichos, tiposDeConteudo } from "@/data/creators";

/**
 * Só o que a MONO precisa para avaliar o perfil e que a Inbazz não pergunta.
 * Nome, telefone, CPF e endereço saíram daqui: o creator preenche tudo isso ao
 * criar a conta na Inbazz, e pedir duas vezes só aumenta o abandono. O e-mail
 * fica porque é a chave que liga a candidatura à conta de lá.
 */
const schema = z.object({
  email: z.string().trim().email("E-mail inválido"),

  instagram: z.string().trim().min(2, "Informe seu @ do Instagram"),
  seguidoresInstagram: z.string().min(1, "Selecione uma faixa"),
  tiktok: z.string().trim().optional(),
  youtube: z.string().trim().optional(),
  nicho: z.string().min(1, "Selecione o nicho principal"),
  formatos: z.array(z.string()).min(1, "Selecione ao menos um formato"),
  sobreVoce: z.string().trim().optional(),
  /** Isca para robô: fica fora da tela, gente não preenche. Ver api/creators.ts. */
  site: z.string().optional(),

  termos: z.literal(true, {
    errorMap: () => ({ message: "É preciso aceitar os termos para continuar" }),
  }),
});

type Cadastro = z.infer<typeof schema>;

const padroes = {
  email: "",
  instagram: "",
  seguidoresInstagram: "",
  tiktok: "",
  youtube: "",
  nicho: "",
  formatos: [] as string[],
  sobreVoce: "",
  site: "",
};

/**
 * Cabeçalho numerado dos blocos. A numeração dá ao creator a noção de quanto
 * falta sem quebrar o formulário em várias telas.
 */
const Secao = ({
  numero,
  titulo,
  descricao,
  children,
}: {
  numero: string;
  titulo: string;
  descricao?: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-6">
    <header className="space-y-2">
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-sm text-mono-accent tracking-widest">{numero}</span>
        <h3 className="font-display text-xl lg:text-2xl font-light text-foreground">{titulo}</h3>
      </div>
      {descricao && (
        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xl">
          {descricao}
        </p>
      )}
      <div className="w-12 h-px bg-mono-accent/40" />
    </header>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">{children}</div>
  </section>
);

const rotulo = "text-xs font-body uppercase tracking-[0.15em] text-muted-foreground";
const campo = "h-11 font-body text-base bg-background border-input rounded-md";
/** O `--radius` do site é 0.75rem, o que faz o `rounded-sm` do checkbox virar
 *  8px — redondo num quadrado de 16px. Num grupo de múltipla escolha isso passa
 *  a impressão de radio, então aqui o canto é quadrado. */
const quadrado = "rounded-[3px]";

/** Marca qual dos dois passos está na tela. */
const Passos = ({ atual }: { atual: 1 | 2 }) => (
  <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10 lg:mb-12 font-body text-xs uppercase tracking-[0.15em]">
    {["Sua candidatura", "Conta na Inbazz"].map((nome, i) => {
      const passo = i + 1;
      const ativo = passo === atual;
      return (
        <li key={nome} className="flex items-center gap-2">
          {i > 0 && <span className="hidden sm:block w-6 h-px bg-border mr-2" aria-hidden />}
          <span
            className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] ${
              ativo ? "bg-mono-accent text-white" : "border border-border text-muted-foreground"
            }`}
          >
            {passo}
          </span>
          <span className={ativo ? "text-foreground" : "text-muted-foreground"}>
            {nome}
            {ativo && <span className="sr-only"> (passo atual)</span>}
          </span>
        </li>
      );
    })}
  </ol>
);

const CreatorForm = () => {
  const [candidatura, setCandidatura] = useState<Candidatura | null>(lerCandidatura);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const form = useForm<Cadastro>({
    resolver: zodResolver(schema),
    defaultValues: padroes as unknown as Cadastro,
    mode: "onBlur",
  });

  const irParaOTopo = () =>
    document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onSubmit = async (dados: Cadastro) => {
    setErroEnvio(null);
    try {
      await enviarCadastro({
        ...dados,
        email: dados.email.toLowerCase(),
        instagram: normalizarPerfil(dados.instagram),
        tiktok: dados.tiktok ? normalizarPerfil(dados.tiktok) : "",
      });
      const nova = {
        email: dados.email.trim().toLowerCase(),
        instagram: normalizarPerfil(dados.instagram),
      };
      guardarCandidatura(nova);
      setCandidatura(nova);
      irParaOTopo();
    } catch {
      setErroEnvio(
        "Não conseguimos enviar seu cadastro agora. Tente novamente em alguns instantes.",
      );
    }
  };

  if (candidatura) {
    return (
      <>
        <Passos atual={2} />
        <PassoInbazz
          candidatura={candidatura}
          onRefazer={() => {
            guardarCandidatura(null);
            setCandidatura(null);
            irParaOTopo();
          }}
        />
      </>
    );
  }

  return (
    <>
      <Passos atual={1} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-14 lg:space-y-16"
          noValidate
        >
          {/* 01 — Contato */}
          <Secao
            numero="01"
            titulo="Seu e-mail"
            descricao="É por ele que falamos com você e encontramos sua conta na Inbazz. Nome, telefone e endereço você informa lá, no próximo passo."
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className={rotulo}>E-mail principal *</FormLabel>
                  <FormControl>
                    <Input
                      className={campo}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="voce@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-body text-xs text-muted-foreground">
                    Use este mesmo e-mail ao criar sua conta na Inbazz.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Secao>

          {/* 02 — Conteúdo e redes */}
          <Secao
            numero="02"
            titulo="Seu conteúdo"
            descricao="É aqui que conhecemos o seu trabalho. Quanto mais claro, melhor para a análise."
          >
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={rotulo}>Instagram *</FormLabel>
                  <FormControl>
                    <Input className={campo} placeholder="@seuperfil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seguidoresInstagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={rotulo}>Seguidores no Instagram *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={campo}>
                        <SelectValue placeholder="Selecione uma faixa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {faixasDeSeguidores.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={rotulo}>TikTok</FormLabel>
                  <FormControl>
                    <Input className={campo} placeholder="@seuperfil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={rotulo}>YouTube, Pinterest ou site</FormLabel>
                  <FormControl>
                    <Input className={campo} placeholder="Link do canal ou perfil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nicho"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className={rotulo}>Nicho principal do seu conteúdo *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={campo}>
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nichos.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formatos"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className={rotulo}>Formatos que você mais produz *</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {tiposDeConteudo.map((tipo) => (
                      <label
                        key={tipo}
                        className="flex items-center gap-3 font-body text-sm text-foreground cursor-pointer"
                      >
                        <Checkbox
                          className={quadrado}
                          checked={field.value?.includes(tipo)}
                          onCheckedChange={(marcado) =>
                            field.onChange(
                              marcado
                                ? [...(field.value ?? []), tipo]
                                : (field.value ?? []).filter((t) => t !== tipo),
                            )
                          }
                        />
                        {tipo}
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sobreVoce"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className={rotulo}>Conte um pouco sobre o seu trabalho</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="font-body text-base bg-background border-input rounded-md resize-none"
                      placeholder="Que tipo de ambiente você mostra, com quem você fala e o que gostaria de criar com a MONO."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Secao>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0"
            {...form.register("site")}
          />

          {/* Aceite e envio */}
          <div className="space-y-6 border-t border-border">
            <FormField
              control={form.control}
              name="termos"
              render={({ field }) => (
                <FormItem className="pt-8">
                  <div className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox
                        className={`mt-1 ${quadrado}`}
                        checked={field.value === true}
                        onCheckedChange={(marcado) => field.onChange(marcado === true)}
                      />
                    </FormControl>
                    <FormLabel className="font-body text-sm font-normal text-muted-foreground leading-relaxed">
                      Li e concordo com os termos do programa MONO Creators e autorizo o uso dos
                      meus dados para análise da candidatura e contato da equipe. *
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {erroEnvio && (
              <p role="alert" className="font-body text-sm text-destructive">
                {erroEnvio}
              </p>
            )}

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-body uppercase tracking-[0.15em] text-white px-10 py-4 rounded transition-opacity hover:opacity-85 disabled:opacity-60"
              style={{ backgroundColor: "hsl(27 55% 50%)" }}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar e seguir para a Inbazz <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreatorForm;

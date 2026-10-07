import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";

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
import {
  buscarCEP,
  cpfValido,
  enviarCadastro,
  maiorDeIdade,
  mascaraCEP,
  mascaraCPF,
  mascaraData,
  mascaraTelefone,
  normalizarPerfil,
  somenteDigitos,
} from "@/lib/creators";
import {
  estados,
  faixasDeSeguidores,
  generos,
  nichos,
  simNao,
  tiposDeConteudo,
} from "@/data/creators";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  sobrenome: z.string().trim().min(2, "Informe seu sobrenome"),
  email: z.string().trim().email("E-mail inválido"),
  cpf: z.string().refine(cpfValido, "CPF inválido"),
  dataNascimento: z
    .string()
    .refine(maiorDeIdade, "Informe uma data válida — o cadastro é para maiores de 18 anos"),
  telefone: z
    .string()
    .refine((v) => somenteDigitos(v).length >= 10, "Telefone incompleto, com DDD"),
  genero: z.string().min(1, "Selecione uma opção"),

  instagram: z.string().trim().min(2, "Informe seu @ do Instagram"),
  seguidoresInstagram: z.string().min(1, "Selecione uma faixa"),
  tiktok: z.string().trim().optional(),
  youtube: z.string().trim().optional(),
  nicho: z.string().min(1, "Selecione o nicho principal"),
  formatos: z.array(z.string()).min(1, "Selecione ao menos um formato"),

  cep: z.string().refine((v) => somenteDigitos(v).length === 8, "CEP incompleto"),
  estado: z.string().min(1, "Selecione o estado"),
  cidade: z.string().trim().min(2, "Informe a cidade"),
  bairro: z.string().trim().min(2, "Informe o bairro"),
  logradouro: z.string().trim().min(2, "Informe o endereço"),
  numero: z.string().trim().min(1, "Informe o número"),
  complemento: z.string().trim().optional(),

  cupom: z.string().trim().optional(),
  jaConhece: z.string().min(1, "Selecione uma opção"),
  jaFezParceria: z.string().min(1, "Selecione uma opção"),
  sobreVoce: z.string().trim().optional(),

  termos: z.literal(true, {
    errorMap: () => ({ message: "É preciso aceitar os termos para continuar" }),
  }),
});

type Cadastro = z.infer<typeof schema>;

const padroes = {
  nome: "",
  sobrenome: "",
  email: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  genero: "",
  instagram: "",
  seguidoresInstagram: "",
  tiktok: "",
  youtube: "",
  nicho: "",
  formatos: [] as string[],
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  cupom: "",
  jaConhece: "",
  jaFezParceria: "",
  sobreVoce: "",
};

/**
 * Cabeçalho numerado das etapas. O cadastro é longo e a numeração dá ao creator
 * a noção de quanto falta sem quebrar em várias telas — num formulário assim, o
 * wizard costuma aumentar o abandono em vez de reduzir.
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

const CreatorForm = () => {
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [buscandoCEP, setBuscandoCEP] = useState(false);

  const form = useForm<Cadastro>({
    resolver: zodResolver(schema),
    defaultValues: padroes as unknown as Cadastro,
    mode: "onBlur",
  });

  /**
   * Preenche o endereço assim que o CEP fica completo. O creator continua
   * podendo corrigir tudo na mão — a busca preenche, não trava.
   */
  const completarPeloCEP = async (valor: string) => {
    if (somenteDigitos(valor).length !== 8) return;
    setBuscandoCEP(true);
    const endereco = await buscarCEP(valor);
    setBuscandoCEP(false);
    if (!endereco) return;
    if (endereco.estado) form.setValue("estado", endereco.estado, { shouldValidate: true });
    if (endereco.cidade) form.setValue("cidade", endereco.cidade, { shouldValidate: true });
    if (endereco.bairro) form.setValue("bairro", endereco.bairro, { shouldValidate: true });
    if (endereco.logradouro)
      form.setValue("logradouro", endereco.logradouro, { shouldValidate: true });
  };

  const onSubmit = async (dados: Cadastro) => {
    setErroEnvio(null);
    try {
      await enviarCadastro({
        ...dados,
        instagram: normalizarPerfil(dados.instagram),
        tiktok: dados.tiktok ? normalizarPerfil(dados.tiktok) : "",
      });
      setEnviado(true);
      document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setErroEnvio(
        "Não conseguimos enviar seu cadastro agora. Tente novamente em alguns instantes.",
      );
    }
  };

  if (enviado) {
    return (
      <div className="rounded-2xl bg-secondary text-secondary-foreground px-6 py-14 lg:px-14 lg:py-20 text-center space-y-5">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mono-accent">
          <Check size={22} className="text-white" />
        </span>
        <h3 className="font-display text-2xl lg:text-3xl font-light">
          Cadastro enviado. Obrigado!
        </h3>
        <p className="font-body text-sm lg:text-base text-secondary-foreground/70 max-w-lg mx-auto leading-relaxed">
          Nosso time vai analisar seu perfil e entrar em contato pelo e-mail que você
          informou. Enquanto isso, acompanhe a MONO para ver o que estamos transformando.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14 lg:space-y-16" noValidate>
        {/* 01 — Dados pessoais */}
        <Secao
          numero="01"
          titulo="Seus dados"
          descricao="Precisamos dessas informações para emitir sua comissão e enviar produtos."
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Nome *</FormLabel>
                <FormControl>
                  <Input className={campo} autoComplete="given-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sobrenome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Sobrenome *</FormLabel>
                <FormControl>
                  <Input className={campo} autoComplete="family-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  É por aqui que avisamos o resultado da sua candidatura.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>CPF *</FormLabel>
                <FormControl>
                  <Input
                    className={campo}
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(mascaraCPF(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Data de nascimento *</FormLabel>
                <FormControl>
                  <Input
                    className={campo}
                    inputMode="numeric"
                    placeholder="dd/mm/aaaa"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(mascaraData(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>WhatsApp com DDD *</FormLabel>
                <FormControl>
                  <Input
                    className={campo}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(mascaraTelefone(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Gênero *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={campo}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {generos.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        </Secao>

        {/* 03 — Endereço */}
        <Secao
          numero="03"
          titulo="Endereço de entrega"
          descricao="Usamos para enviar amostras e produtos quando houver uma ação em parceria."
        >
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>CEP *</FormLabel>
                <FormControl>
                  <Input
                    className={campo}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      const valor = mascaraCEP(e.target.value);
                      field.onChange(valor);
                      void completarPeloCEP(valor);
                    }}
                  />
                </FormControl>
                {buscandoCEP && (
                  <FormDescription className="font-body text-xs text-muted-foreground flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" /> Buscando endereço…
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Estado *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={campo}>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estados.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
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
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Cidade *</FormLabel>
                <FormControl>
                  <Input className={campo} autoComplete="address-level2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Bairro *</FormLabel>
                <FormControl>
                  <Input className={campo} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logradouro"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className={rotulo}>Endereço *</FormLabel>
                <FormControl>
                  <Input className={campo} autoComplete="address-line1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Número *</FormLabel>
                <FormControl>
                  <Input className={campo} inputMode="numeric" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Complemento</FormLabel>
                <FormControl>
                  <Input className={campo} placeholder="Apto, bloco, referência" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Secao>

        {/* 04 — Sobre a parceria */}
        <Secao
          numero="04"
          titulo="Sobre a parceria"
          descricao="As últimas perguntas — elas ajudam a montar a sua proposta."
        >
          <FormField
            control={form.control}
            name="cupom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Sugestão de cupom</FormLabel>
                <FormControl>
                  <Input className={campo} placeholder="Ex.: SEUNOME10" {...field} />
                </FormControl>
                <FormDescription className="font-body text-xs text-muted-foreground">
                  O código que seus seguidores vão usar. Sujeito a disponibilidade.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jaConhece"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={rotulo}>Você já conhecia a MONO? *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={campo}>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {simNao.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
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
            name="jaFezParceria"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className={rotulo}>
                  Você já fez parceria com marcas de casa, decoração ou construção? *
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={campo}>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {simNao.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
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
                Quero ser MONO Creator <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default CreatorForm;

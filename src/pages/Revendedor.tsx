import { Link } from "react-router-dom";
import { Store, Hammer, DraftingCompass, Wrench, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import heroImg from "@/assets/produtos/ripado-ambientacao.jpg";

const WHATSAPP_URL =
  "https://wa.me/5511977971421?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Mono%20e%20gostaria%20de%20saber%20como%20me%20tornar%20revendedor.";

const perfis = [
  {
    icon: Store,
    titulo: "Lojas de material e acabamentos",
    texto:
      "Amplie o mix com uma linha de forro e revestimento que resolve teto e parede com o mesmo material.",
  },
  {
    icon: Hammer,
    titulo: "Marcenarias e movelarias",
    texto:
      "Complemente projetos de marcenaria com superfícies que dialogam com a madeira sem herdar seus problemas.",
  },
  {
    icon: DraftingCompass,
    titulo: "Arquitetura e design de interiores",
    texto:
      "Especifique com previsibilidade: paleta estável, ficha técnica clara e comportamento conhecido em obra.",
  },
  {
    icon: Wrench,
    titulo: "Equipes de instalação",
    texto:
      "Sistema de encaixe macho e fêmea, obra seca e montagem rápida — mais serviços entregues no mesmo prazo.",
  },
];

const apoio = [
  {
    titulo: "Duas linhas, dez referências",
    texto:
      "Natureshell Ripado e Natureshell Liso, cada uma nas cinco tonalidades da paleta: Carvalho, Cedro, Freijó, Castanheira e Nogueira.",
  },
  {
    titulo: "Material de apoio completo",
    texto:
      "Catálogo, ficha técnica, manual de instalação, termo de garantia e book de obras para apresentar e especificar.",
  },
  {
    titulo: "Suporte técnico",
    texto:
      "Apoio na especificação, na escolha de arremates e nas dúvidas de instalação, antes e durante a obra.",
  },
  {
    titulo: "Amostras físicas",
    texto:
      "A textura precisa convencer de perto. Amostras para mostrar em loja e deixar com o cliente.",
  },
];

const Revendedor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[34vh] lg:h-[42vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Ambiente revestido com forro vinílico MONO"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-10 lg:pb-14">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-background/70 mb-3">
            Parcerias comerciais
          </p>
          <h1 className="text-3xl lg:text-5xl font-display font-light text-background max-w-2xl">
            Seja revendedor MONO
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="section-padding max-w-3xl space-y-5">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
              Leve as superfícies MONO para a sua região
            </h2>
            <div className="w-16 h-px bg-mono-accent mt-4" />
            <p className="font-body text-base text-muted-foreground leading-relaxed mt-5">
              Trabalhamos com quem especifica, vende e instala. Se o seu negócio
              atende arquitetos, construtoras ou cliente final em busca de forro e
              revestimento com acabamento de madeira, existe espaço para uma
              parceria — com material de apoio, suporte técnico e uma linha que se
              sustenta no ambiente real, não só na amostra.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Perfis */}
      <section className="pb-4 lg:pb-8 bg-background">
        <div className="section-padding">
          <AnimateOnScroll>
            <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-8">
              Para quem é
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perfis.map((p) => (
              <AnimateOnScroll key={p.titulo}>
                <article className="space-y-3">
                  <p.icon size={24} className="text-mono-accent" />
                  <h3 className="font-display text-lg text-foreground leading-snug">
                    {p.titulo}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {p.texto}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Apoio */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="section-padding">
          <AnimateOnScroll>
            <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-8">
              O que você recebe
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
            {apoio.map((a) => (
              <AnimateOnScroll key={a.titulo}>
                <article className="flex gap-4">
                  <span className="text-mono-accent font-display text-lg leading-none pt-1">
                    —
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg text-foreground">{a.titulo}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {a.texto}
                    </p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA
          Quando o formulário de revenda existir na GoHighLevel, trocar este bloco
          pelo iframe — mesmo padrão de Downloads.tsx (o script form_embed.js é
          carregado num useEffect e o iframe recebe o data-form-id). Até lá, o
          contato acontece pelo WhatsApp comercial. */}
      <section className="pb-20 lg:pb-28 bg-background">
        <div className="section-padding">
          <AnimateOnScroll>
            <div className="rounded-2xl bg-secondary text-secondary-foreground px-6 py-12 lg:px-14 lg:py-16 text-center space-y-5">
              <h2 className="text-2xl lg:text-4xl font-display font-light">
                Vamos conversar sobre a sua região
              </h2>
              <p className="font-body text-sm lg:text-base text-secondary-foreground/70 max-w-xl mx-auto leading-relaxed">
                Fale com a equipe comercial pelo WhatsApp. Conte onde você atua e
                que tipo de cliente você atende — a partir daí montamos a proposta
                de parceria.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3 sm:gap-4 pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-body text-white px-7 py-3.5 rounded transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "hsl(27 55% 50%)" }}
                >
                  Falar com a equipe comercial <ArrowRight size={16} />
                </a>
                <Link
                  to="/downloads"
                  className="inline-flex items-center justify-center text-sm font-body px-7 py-3.5 rounded border border-secondary-foreground/30 hover:bg-secondary-foreground/10 transition-colors"
                >
                  Baixar o catálogo
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default Revendedor;

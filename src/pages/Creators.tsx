import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Megaphone,
  Package,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HeroCreators from "@/components/creators/HeroCreators";
import { beneficios } from "@/data/creators";
import { INBAZZ_CADASTRO_URL } from "@/lib/creators";
import ambienteImg from "@/assets/produtos/liso-amb-02.jpg";

/**
 * A landing é publicada separada do site (preview na Vercel, campanha, bio do
 * Instagram), então o menu precisa levar ao site no ar e não às rotas desta
 * publicação, que são uma cópia congelada no momento do deploy.
 */
const SITE_MONO = "https://monobr.com";

const icones: Record<string, LucideIcon> = {
  BadgePercent,
  Package,
  Ticket,
  Megaphone,
  BarChart3,
  Users,
};

const Creators = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar baseUrl={SITE_MONO} />

      <HeroCreators />

      {/* Manifesto */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-padding max-w-[1280px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <AnimateOnScroll>
              <p className="font-display text-2xl lg:text-4xl font-light text-foreground leading-snug">
                Acreditamos que transformar um ambiente é transformar a maneira como as
                pessoas vivem nele.
              </p>
              <div className="w-16 h-px bg-mono-accent mt-8" />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="space-y-5 pt-2">
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  A MONO nasceu para trazer novas possibilidades à arquitetura e à
                  decoração, combinando design, tecnologia e praticidade em revestimentos
                  que transformam espaços.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Agora, queremos ir além. Buscamos criadores que compartilhem nossa paixão
                  por decoração, arquitetura e transformação de ambientes. Pessoas que
                  inspirem outras a enxergar novas possibilidades para seus espaços.
                </p>
                <p className="font-display text-xl lg:text-2xl font-light text-foreground pt-2">
                  Seu conteúdo inspira. A MONO transforma.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 lg:py-24 bg-secondary text-secondary-foreground">
        <div className="section-padding max-w-[1280px] mx-auto">
          <AnimateOnScroll>
            <div className="max-w-2xl mb-12 lg:mb-16 space-y-5">
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-mono-accent">
                Benefícios
              </p>
              <h2 className="font-display text-3xl lg:text-5xl font-light">
                Por que ser um MONO Creator?
              </h2>
              <p className="font-body text-base text-secondary-foreground/70 leading-relaxed">
                Mais do que divulgar produtos, queremos construir parcerias com pessoas que
                se identificam com a nossa marca. Ao fazer parte da nossa comunidade, você
                poderá ter acesso a:
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {beneficios.map((b) => {
              const Icone = icones[b.icone];
              return (
                <AnimateOnScroll key={b.titulo}>
                  <article className="space-y-4">
                    {Icone && <Icone size={26} className="text-mono-accent" strokeWidth={1.5} />}
                    <h3 className="font-display text-xl font-light leading-snug">{b.titulo}</h3>
                    <p className="font-body text-sm text-secondary-foreground/70 leading-relaxed">
                      {b.texto}
                    </p>
                  </article>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Convite */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-padding max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="font-display text-3xl lg:text-4xl font-light text-foreground leading-snug">
                  Sua criatividade pode transformar muito mais.
                </h2>
                <div className="w-16 h-px bg-mono-accent" />
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Uma reforma, um novo revestimento ou uma pequena mudança podem transformar
                  completamente um ambiente.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Queremos estar ao lado de quem compartilha essas experiências, apresenta
                  novas ideias e inspira pessoas a transformarem seus próprios espaços.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Se você cria conteúdos sobre decoração, arquitetura, reformas, organização
                  ou transformação de ambientes, queremos conhecer seu trabalho.
                </p>
                <p className="font-display text-xl lg:text-2xl font-light text-foreground pt-1">
                  Faça parte do MONO Creators e vamos transformar espaços juntos.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <img
                src={ambienteImg}
                alt="Ambiente revestido com painel liso MONO"
                className="w-full h-[320px] lg:h-[520px] object-cover rounded-2xl"
                loading="lazy"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Cadastro — acontece na Inbazz, não aqui */}
      <section id="cadastro" className="pb-20 lg:pb-28 bg-background scroll-mt-20">
        <div className="section-padding max-w-[900px] mx-auto">
          <AnimateOnScroll>
            <div className="space-y-6">
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-mono-accent">
                Inscrição
              </p>
              <h2 className="font-display text-3xl lg:text-5xl font-light text-foreground">
                Quero ser MONO Creator
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xl">
                A inscrição é feita na Inbazz, a plataforma do programa. Toque em{" "}
                <strong className="font-medium text-foreground">Cadastre-se</strong>, crie sua
                conta e seu pedido chega para o nosso time.
              </p>
              <a
                href={INBAZZ_CADASTRO_URL}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-body uppercase tracking-[0.15em] text-white px-10 py-4 rounded transition-opacity hover:opacity-85"
                style={{ backgroundColor: "hsl(27 55% 50%)" }}
              >
                Quero ser MONO Creator <ArrowRight size={16} />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default Creators;

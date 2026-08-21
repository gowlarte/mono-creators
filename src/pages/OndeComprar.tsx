import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import OpcoesDeCompra from "@/components/OpcoesDeCompra";
import { temCanalAtivo } from "@/data/marketplaces";
import heroImg from "@/assets/produtos/liso-ambientacao.jpg";

const OndeComprar = () => {
  const jaVende = temCanalAtivo();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[34vh] lg:h-[42vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Ambiente com forro vinílico MONO"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-10 lg:pb-14">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-background/70 mb-3">
            Canais de venda
          </p>
          <h1 className="text-3xl lg:text-5xl font-display font-light text-background max-w-2xl">
            Onde comprar
          </h1>
        </div>
      </section>

      {/* Canais */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="section-padding space-y-8">
          <AnimateOnScroll>
            <div className="max-w-3xl space-y-5">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
                Compre nas lojas oficiais MONO
              </h2>
              <div className="w-16 h-px bg-mono-accent" />
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {jaVende
                  ? "Nossas linhas estão disponíveis nos principais marketplaces do país. Escolha o canal de sua preferência — em todos eles você compra direto da loja oficial, com o mesmo produto e a mesma garantia."
                  : "Estamos abrindo nossas lojas oficiais nos principais marketplaces do país. Assim que cada canal entrar no ar, o link aparece aqui — em todos eles você compra direto da MONO, com o mesmo produto e a mesma garantia."}
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <OpcoesDeCompra tom="claro" comChamada />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <p className="font-body text-xs text-muted-foreground max-w-3xl leading-relaxed">
              Compre apenas pelas lojas oficiais listadas acima. Não temos representantes
              autorizados a vender por outros perfis ou canais.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Outros caminhos */}
      <section className="pb-20 lg:pb-28 bg-background">
        <div className="section-padding grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <AnimateOnScroll>
            <article className="h-full rounded-2xl border border-border p-8 lg:p-10 space-y-4">
              <h3 className="text-xl lg:text-2xl font-display font-light text-foreground">
                Projeto grande ou obra?
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Para metragens maiores, especificação técnica e cálculo de acessórios,
                fale com nossa equipe e receba uma proposta fechada para o seu projeto.
              </p>
              <Link
                to="/orcamento"
                className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-mono-accent transition-colors"
              >
                Solicitar orçamento <ArrowRight size={16} />
              </Link>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <article className="h-full rounded-2xl border border-border p-8 lg:p-10 space-y-4">
              <h3 className="text-xl lg:text-2xl font-display font-light text-foreground">
                Quer revender MONO?
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Se você tem loja, marcenaria ou equipe de instalação, existe espaço para
                uma parceria comercial na sua região.
              </p>
              <Link
                to="/revendedor"
                className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-mono-accent transition-colors"
              >
                Seja revendedor <ArrowRight size={16} />
              </Link>
            </article>
          </AnimateOnScroll>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default OndeComprar;

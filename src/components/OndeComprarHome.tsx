import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import OpcoesDeCompra from "./OpcoesDeCompra";

const OndeComprarHome = () => {
  return (
    // Faixa escura entre duas seções claras: separa o momento comercial do
    // conteúdo educativo em volta, sem depender de mais um tom de bege.
    <section className="py-16 lg:py-20 bg-secondary text-secondary-foreground">
      <div className="section-padding space-y-8">
        <AnimateOnScroll className="max-w-2xl space-y-4">
          {/* mono-accent não passa em contraste sobre bg-secondary (3,65:1) */}
          <p className="text-xs font-body uppercase tracking-[0.25em] text-secondary-foreground/70">
            Onde comprar
          </p>
          <h2 className="text-3xl lg:text-4xl font-display font-light">
            Compre falando com a gente
          </h2>
          <div className="w-16 h-px bg-secondary-foreground/40" />
          <p className="font-body text-sm lg:text-base text-secondary-foreground/70 leading-relaxed">
            A venda é direto com a nossa equipe, pelo WhatsApp. Escolha a linha,
            diga a cor e a metragem, e você recebe preço, prazo e o cálculo dos
            acessórios na mesma conversa.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <OpcoesDeCompra tom="escuro" comChamada />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Link
            to="/onde-comprar"
            className="inline-flex items-center gap-2 font-body text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
          >
            Ver todos os canais de compra <ArrowRight size={16} />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default OndeComprarHome;

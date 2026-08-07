import AnimateOnScroll from "./AnimateOnScroll";
import { ArrowRight } from "lucide-react";
import woodTexture from "@/assets/wood-texture-dark.jpg";
import logoTerciaria from "@/assets/logo-terciaria-bege.svg";

const Sustentabilidade = () => {
  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundColor: "hsl(var(--mono-bg-dark))",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url(${woodTexture})`, backgroundSize: "cover" }}
      />
      <div className="section-padding relative z-10">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-xs font-body uppercase tracking-[0.25em] text-secondary-foreground/60">
                Sustentabilidade
              </p>
              <p className="text-lg lg:text-xl font-body leading-relaxed text-secondary-foreground/90 max-w-2xl">
                A MONO não abre mão da fidelidade de cores, texturas e design premium,
                ao mesmo tempo que propõem soluções de materiais sustentáveis em sua obra.
                Gere menos resíduos e instale revestimentos com facilidade,
                sem sujeira e necessidade de mão de obra especializada.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-secondary-foreground/80 hover:text-secondary-foreground font-body text-sm transition-colors group"
              >
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                Saiba mais
              </a>
            </div>
            <div className="flex justify-end">
              <img src={logoTerciaria} alt="MONO" className="w-32 lg:w-44 opacity-30" />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Sustentabilidade;

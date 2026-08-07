import AnimateOnScroll from "./AnimateOnScroll";
import { Sparkles, Puzzle, Wrench, ShieldCheck, Flame, Recycle } from "lucide-react";

const beneficios = [
  { icon: Sparkles, title: "Obra limpa", text: "Instalação a seco, sem geração de resíduos, poeira ou pintura na obra." },
  { icon: Puzzle, title: "Fácil instalação", text: "Sistema de encaixe macho-fêmea. Praticidade do início ao fim, sem mão de obra especializada." },
  { icon: Wrench, title: "Zero manutenção", text: "Instalou, tá pronto. Limpeza apenas com pano úmido, sem lixar, envernizar ou repintar." },
  { icon: ShieldCheck, title: "Resistente", text: "Imune a mofo, cupim e umidade. Durabilidade superior a 15 anos em condições ideais." },
  { icon: Flame, title: "Seguro", text: "Formulação autoextinguível que não propaga chamas e é livre de chumbo." },
  { icon: Recycle, title: "Renovável", text: "Sistema produtivo limpo, sem desperdício e sem retirar uma única árvore da floresta." },
];

const BeneficiosTecnicos = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="section-padding">
        <AnimateOnScroll className="mb-12 max-w-2xl">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-3">Inovação</p>
          <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground">
            Por que escolher o vinílico
          </h2>
          <div className="w-16 h-px bg-mono-accent mt-4" />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {beneficios.map((b) => (
            <AnimateOnScroll key={b.title}>
              <div className="flex gap-5">
                <b.icon className="text-mono-accent shrink-0 mt-1" size={30} strokeWidth={1.3} />
                <div className="space-y-2">
                  <h3 className="font-body font-semibold uppercase tracking-wide text-sm text-foreground">
                    {b.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeneficiosTecnicos;

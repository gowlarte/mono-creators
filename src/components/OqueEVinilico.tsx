import AnimateOnScroll from "./AnimateOnScroll";
import { Link } from "react-router-dom";
import imgRipado from "@/assets/produtos/ripado-amb-03.jpg";
import imgLiso from "@/assets/produtos/liso-amb-02.jpg";

const camadas = [
  { titulo: "Filme decorativo", texto: "Impressão de alta definição que reproduz veios de madeira e minerais com fidelidade." },
  { titulo: "Camada de proteção", texto: "Verniz UV que preserva a cor, resiste a riscos, umidade e facilita a limpeza." },
  { titulo: "Núcleo em PVC", texto: "Estrutura alveolar leve, rígida e 100% imune a cupim, mofo e infiltração." },
];

const OqueEVinilico = () => {
  return (
    <section id="o-que-e" className="py-20 lg:py-28 bg-background">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll className="space-y-6">
            <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent">
              Revestimentos vinílicos
            </p>
            <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground leading-tight">
              O que é forro e revestimento vinílico?
            </h2>
            <div className="w-16 h-px bg-mono-accent" />
            <p className="text-base font-body text-muted-foreground leading-relaxed">
              O revestimento vinílico é uma placa de PVC de alta performance que recebe uma
              impressão decorativa e uma camada protetora, reproduzindo a beleza da madeira
              natural e da pedra — sem os problemas dela. Ele é instalado por encaixe em
              tetos, forros e paredes, sobre gesso, laje, madeiramento ou perfis metálicos.
            </p>
            <p className="text-base font-body text-muted-foreground leading-relaxed">
              Na prática: obra seca, rápida e limpa, sem corte de madeira, sem pintura,
              sem resíduo. E um acabamento premium que continua igual daqui a 15 anos.
            </p>
            <div className="space-y-4 pt-2">
              {camadas.map((c, i) => (
                <div key={c.titulo} className="flex gap-4">
                  <span className="font-display text-lg text-mono-accent w-6 shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-body font-semibold text-foreground text-[15px]">{c.titulo}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/produtos"
              className="inline-block mt-2 bg-secondary text-secondary-foreground text-sm font-body px-7 py-3.5 rounded hover:opacity-85 transition-opacity"
            >
              Entenda nossos produtos
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll className="grid grid-cols-2 gap-4">
            <img
              src={imgRipado}
              alt="Forro vinílico ripado aplicado em teto de sala de estar"
              className="w-full h-full object-cover rounded-xl aspect-[3/4]"
              loading="lazy"
            />
            <img
              src={imgLiso}
              alt="Revestimento vinílico liso aplicado em ambiente residencial"
              className="w-full h-full object-cover rounded-xl aspect-[3/4] mt-8"
              loading="lazy"
            />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default OqueEVinilico;

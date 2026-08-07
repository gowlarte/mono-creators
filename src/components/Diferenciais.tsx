import AnimateOnScroll from "./AnimateOnScroll";
import icone1 from "@/assets/icone-1.svg";
import icone2 from "@/assets/icone-2.svg";
import icone3 from "@/assets/icone-3.svg";

const items = [
  { icon: icone1, title: "Obra rápida e limpa" },
  { icon: icone2, title: "Sustentável" },
  { icon: icone3, title: "Zero manutenção" },
];

const Diferenciais = () => {
  return (
    <section id="sobre" className="py-12 lg:py-16 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-center">
            <div className="md:col-span-1 space-y-3 text-center md:text-left">
              <p className="text-mono-accent font-body text-sm font-semibold uppercase tracking-widest">A Mono</p>
              <p className="text-foreground font-body text-base leading-relaxed">
                Sua nova referência para revestimentos de qualidade e custo benefício.
              </p>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="border border-border rounded-xl p-10 text-center space-y-5 hover:shadow-lg transition-shadow duration-300"
                >
                  <img src={item.icon} alt={item.title} className="mx-auto w-14 h-14" />
                  <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Diferenciais;

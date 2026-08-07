import AnimateOnScroll from "./AnimateOnScroll";
import amb1 from "@/assets/produtos/ripado-amb-02.jpg";
import amb2 from "@/assets/produtos/liso-amb-03.jpg";
import amb3 from "@/assets/produtos/pedra-amb-01.jpg";
import amb4 from "@/assets/produtos/ripado-amb-04.jpg";

const ambientes = [
  { img: amb1, title: "Forros residenciais", text: "Salas, quartos e varandas com teto em madeira sem peso e sem manutenção." },
  { img: amb2, title: "Paredes e painéis", text: "Painéis de TV, halls e corredores com continuidade visual entre teto e parede." },
  { img: amb3, title: "Áreas comerciais", text: "Lojas, escritórios e recepções que precisam de obra rápida e pouco tempo parado." },
  { img: amb4, title: "Áreas úmidas e externas cobertas", text: "Cozinhas, lavabos e gourmets — imune a umidade, mofo e cupim." },
];

const Aplicacoes = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="section-padding">
        <AnimateOnScroll className="mb-12 max-w-2xl">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-3">Aplicações</p>
          <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground">
            Onde aplicar os revestimentos MONO
          </h2>
          <div className="w-16 h-px bg-mono-accent mt-4" />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ambientes.map((a) => (
            <AnimateOnScroll key={a.title}>
              <article className="space-y-4">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full aspect-[4/5] object-cover rounded-xl"
                  loading="lazy"
                />
                <h3 className="font-display text-lg text-foreground">{a.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{a.text}</p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aplicacoes;

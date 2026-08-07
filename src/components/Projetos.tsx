import AnimateOnScroll from "./AnimateOnScroll";
import estacaoImg from "@/assets/projeto-estacao.jpg";
import comfortImg from "@/assets/projeto-comfort.jpg";
import operaImg from "@/assets/projeto-opera.jpg";

const projects = [
  {
    title: "Estação Polímata",
    image: estacaoImg,
    desc: "Ao mesmo tempo em que se precisa de um local para passar tempo, descansar, estudar e se manter inventivo, a Estação Consolet é um projeto que desafia o uso de um ambiente de uma com seu jeito próprio para combinar o clássico e o dia a dia.",
    partner: "Fresh Daily",
  },
  {
    title: "Comfort place",
    image: comfortImg,
    desc: "Nada como um local de descanso bem iluminado, reservado e com ótimo isolamento térmico e acústico para seus hóspedes. Projeto feito para atender que procuram preferências com conforto e estilo.",
    partner: "CLUB CASA",
  },
  {
    title: "Tidal Opera Haus",
    image: operaImg,
    desc: "Uma verdadeira obra arquitetônica à prova das ondas do tempo. Com design arrojado e a robustez conveniente do ferramentário, as fachadas das instalações. Todos os detalhes são cuidados, desde a câmara de ventilação, dando vida à câmera de articulações dentro do projeto.",
    partner: "",
  },
];

const Projetos = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="section-padding">
        <AnimateOnScroll>
          <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground mb-12">
            Projetos selecionados
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <AnimateOnScroll key={project.title}>
              <div className="group cursor-pointer space-y-4">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-xl text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-4">
                  {project.desc}
                </p>
                {project.partner && (
                  <p className="text-xs text-muted-foreground/70 font-body italic">
                    {project.partner}
                  </p>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="flex justify-center gap-8 mt-16">
          <span className="font-display text-lg italic text-muted-foreground">Fresh Daily</span>
          <span className="font-body text-sm font-semibold uppercase tracking-wider text-muted-foreground">CLUB CASA</span>
        </div>
      </div>
    </section>
  );
};

export default Projetos;

import AnimateOnScroll from "./AnimateOnScroll";

const Banner3D = () => {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="section-padding text-center">
        <AnimateOnScroll>
          <p className="text-lg lg:text-xl font-body text-foreground mb-2">
            Nossos produtos em 3D para seu próximo projeto
          </p>
          <div className="w-12 h-px bg-mono-accent mx-auto mt-4 mb-12" />
          <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
            <span className="text-2xl font-display text-muted-foreground italic">archello</span>
            <span className="text-2xl font-body font-bold tracking-wider text-muted-foreground uppercase">Casoca</span>
            <span className="text-2xl font-body font-bold text-muted-foreground">Blocks</span>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Banner3D;

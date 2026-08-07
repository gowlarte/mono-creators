import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ambImg from "@/assets/produtos/ripado-amb-04.jpg";
import ambImg2 from "@/assets/produtos/liso-ambientacao.jpg";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src={ambImg2}
          alt="Interior com revestimentos MONO"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimateOnScroll>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-heading font-medium text-foreground/80 text-center leading-tight max-w-3xl px-6">
              Somos apaixonados por{" "}
              <br className="hidden sm:block" />
              arquitetura, assim como você.
            </h1>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="section-padding text-center">
          <AnimateOnScroll>
            <p className="text-lg lg:text-2xl font-display font-light text-foreground leading-relaxed max-w-2xl mx-auto">
              A qualidade que você sequer saber existir,
              <br />
              agora está disponível para seu projeto
            </p>
            <div className="w-16 h-px bg-mono-accent mx-auto mt-6" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Ambience Image */}
      <section className="bg-background">
        <div className="section-padding max-w-4xl mx-auto">
          <AnimateOnScroll>
            <img
              src={ambImg}
              alt="Ambiente com revestimentos MONO"
              className="w-full rounded-xl object-cover aspect-[16/9]"
              loading="lazy"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-padding max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <AnimateOnScroll className="lg:col-span-2">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground leading-snug">
                A forma só faz sentido quando responde bem à função.
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll className="lg:col-span-3 space-y-5">
              <p className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed">
                Na arquitetura e no design de interiores, estética não pode existir isolada. Um bom projeto precisa funcionar no cotidiano, envelhecer bem, facilitar o uso e sustentar sua intenção ao longo do tempo. A MONO existe para atender exatamente esse ponto de equilíbrio entre aparência, desempenho e praticidade.
              </p>
              <p className="text-sm lg:text-base font-body text-foreground font-semibold">
                Não criamos superfícies para serem apenas vistas. Criamos materiais para serem usados.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="section-padding max-w-5xl mx-auto space-y-10">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
              De onde vem a MONO
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <p className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed">
                A MONO nasce da observação atenta do que acontece na prática dos projetos. Durante muito tempo, forros e revestimentos foram tratados como soluções secundárias — escolhidos no final do processo, com pouca atenção à textura, à leitura do material e ao impacto real no espaço.
              </p>
              <p className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed">
                Grande parte do mercado ainda oferece superfícies com aparência rasa, cores pouco consistentes e um discurso que não dialoga com quem projeta de fato. Materiais que funcionam apenas na amostra ou na imagem, mas não sustentam a decisão quando aplicados no ambiente real.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <p className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed max-w-3xl">
              Aqui, cada superfície é pensada a partir do uso, da instalação e da permanência no tempo. A textura precisa convencer de perto. A cor precisa se manter sob diferentes luzes. O material precisa facilitar o dia a dia de quem especifica e de quem vive o espaço.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-padding max-w-5xl mx-auto space-y-10">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
              O que nos guia
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Consistência",
                desc: "Não buscamos excessos nem promessas vazias. Buscamos materiais bem resolvidos e projetos que se confirmam além do conceito.",
              },
              {
                title: "Precisão",
                desc: "Este catálogo reúne soluções para arquitetos, engenheiros e designers que valorizam escolhas coerentes e resultados previsíveis.",
              },
              {
                title: "Permanência",
                desc: "Materiais que sustentam a decisão no tempo — estabilidade dimensional, acabamento consistente e desempenho duradouro.",
              },
            ].map((item) => (
              <AnimateOnScroll key={item.title}>
                <div className="border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-display text-xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default Sobre;

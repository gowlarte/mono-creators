import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import tetoImg from "@/assets/produto-teto-vinilico.jpg";
import forrosImg from "@/assets/produto-forros-pvc.jpg";

const WHATSAPP_URL =
  "https://wa.me/5511977971421?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Mono%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const produtos = [
  {
    nome: "Revestimento Vinílico Liso",
    descricao:
      "Superfície contínua e elegante, ideal para tetos e paredes que pedem acabamento uniforme com toque natural da madeira.",
    imagem: tetoImg,
  },
  {
    nome: "Revestimento Vinílico Ripado",
    descricao:
      "Ripas em PVC de alta performance que trazem ritmo, textura e sofisticação a qualquer ambiente, com instalação prática.",
    imagem: forrosImg,
  },
];

const Orcamento = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-padding py-14 lg:py-20 max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <AnimateOnScroll>
          <div className="space-y-3 mb-10 lg:mb-14">
            <h1 className="text-3xl lg:text-5xl font-heading uppercase tracking-wider text-foreground">
              Solicite seu orçamento
            </h1>
            <p className="text-sm lg:text-base font-body text-muted-foreground max-w-2xl">
              Fale diretamente com nossa equipe pelo WhatsApp e receba uma
              proposta personalizada para o seu projeto.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Sobre a Mono */}
        <AnimateOnScroll>
          <section className="mb-12 lg:mb-16 max-w-3xl space-y-4">
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
              Sobre a Mono
            </h2>
            <p className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed">
              A Mono é uma marca brasileira dedicada a criar revestimentos que
              traduzem a beleza da natureza em soluções contemporâneas. Nossos
              produtos em PVC de alta qualidade reproduzem com fidelidade a
              textura de madeiras nobres, oferecendo estética sofisticada e
              desempenho técnico em um só material.
            </p>
            <p className="text-sm lg:text-base font-body text-foreground/80 leading-relaxed">
              Cada linha é pensada para arquitetos, designers e clientes que
              valorizam ambientes acolhedores, duráveis e de instalação
              simples. Trabalhamos com resistência à umidade, facilidade de
              manutenção e uma paleta atemporal, ideal para projetos
              residenciais, comerciais e corporativos.
            </p>
          </section>
        </AnimateOnScroll>

        {/* CTA WhatsApp */}
        <AnimateOnScroll>
          <section className="rounded-2xl bg-secondary text-secondary-foreground px-6 py-12 lg:px-12 lg:py-16 text-center space-y-5 mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-display font-light">
              Fale com nosso time
            </h2>
            <p className="text-sm lg:text-base font-body text-secondary-foreground/70 max-w-lg mx-auto">
              Atendimento personalizado via WhatsApp. Envie sua mensagem e
              receba um orçamento sob medida.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-base font-body font-medium transition-colors mt-2"
              style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#1EBE5D";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#25D366";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar orçamento via WhatsApp
            </a>
            <address className="not-italic text-sm font-body text-secondary-foreground/70 pt-4">
              Av. Osvaldo Reis, 3281 - Praia Brava, Itajaí - SC, 88306-773
            </address>
          </section>
        </AnimateOnScroll>

        {/* Produtos em destaque */}
        <section>
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground mb-6 lg:mb-8">
              Nossos produtos em destaque
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {produtos.map((p) => (
              <AnimateOnScroll key={p.nome}>
                <div className="bg-muted/40 rounded-xl overflow-hidden">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <h3 className="text-base lg:text-lg font-display text-foreground">
                      {p.nome}
                    </h3>
                    <p className="text-xs lg:text-sm font-body text-foreground/70 leading-relaxed">
                      {p.descricao}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      </main>

      <MonoFooter />
    </div>
  );
};

export default Orcamento;

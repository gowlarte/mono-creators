import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import MonoNewsletter from "@/components/MonoNewsletter";
import CtaOrcamento from "@/components/CtaOrcamento";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { ArrowRight } from "lucide-react";

import heroImg from "@/assets/produtos/ripado-hero.jpg";
import ripadoImg from "@/assets/produtos/ripado-ambientacao.jpg";
import lisoImg from "@/assets/produtos/liso-ambientacao.jpg";
import pedraImg from "@/assets/produtos/pedra-amb-02.jpg";

const linhas = [
  {
    nome: "Natureshell PVC Ripado",
    image: ripadoImg,
    dimensao: "26,3 × 7 cm",
    href: "/produtos/ripado",
    descricao:
      "O ripado vinílico traz o relevo e o ritmo da madeira ripada com a leveza do PVC. Ideal para forros de sala, painéis de destaque e espaços comerciais que pedem presença visual imediata.",
    bullets: ["5 tonalidades de madeira", "Encaixe macho-fêmea", "Aplicação em teto e parede"],
  },
  {
    nome: "Natureshell PVC Liso",
    image: lisoImg,
    dimensao: "16,7 × 2,2 cm",
    href: "/produtos/liso",
    descricao:
      "Acabamento contínuo e discreto, com veios impressos em alta definição. É a escolha para quem quer um teto de madeira uniforme, elegante e sem manutenção.",
    bullets: ["5 tonalidades de madeira", "Superfície lisa e uniforme", "Fácil limpeza com pano úmido"],
  },
  {
    nome: "Lith Pedra Flexível",
    image: pedraImg,
    dimensao: "1200 × 600 mm",
    href: "/produtos/pedra-flexivel",
    descricao:
      "Lâmina mineral flexível que reproduz a textura da pedra natural em peças leves e curváveis. Perfeita para paredes, colunas e fachadas internas com efeito escultórico.",
    bullets: ["7 padrões minerais", "Flexível para superfícies curvas", "Peso reduzido"],
  },
];

const ProdutosOverview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[42vh] lg:h-[52vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Ambiente com forro vinílico MONO"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-10 lg:pb-14">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-background/70 mb-3">
            Produtos MONO
          </p>
          <h1 className="text-3xl lg:text-5xl font-display font-light text-background max-w-2xl">
            Revestimentos vinílicos para teto, forro e parede
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="section-padding grid grid-cols-1 lg:grid-cols-3 gap-10">
          <AnimateOnScroll className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
              Uma linha, três acabamentos, infinitas composições
            </h2>
            <div className="w-16 h-px bg-mono-accent" />
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Todos os nossos revestimentos partem do mesmo princípio: uma placa vinílica de
              alta performance, com filme decorativo de alta definição e camada de proteção UV.
              O que muda é o desenho, o relevo e a escala — para você compor teto, forro e
              parede com a mesma linguagem.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Instalação a seco, sem obra suja, sem manutenção e com durabilidade superior a
              15 anos. Abaixo, entenda cada linha em detalhe. Se você já sabe o que procura,
              vá direto para o catálogo de cores.
            </p>
            <Link
              to="/produtos/carrinho"
              className="inline-flex items-center gap-2 text-sm font-body text-white px-6 py-3 rounded transition-opacity hover:opacity-85"
              style={{ backgroundColor: "hsl(27 55% 50%)" }}
            >
              Ver catálogo de cores <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Linhas */}
      <section className="pb-8 lg:pb-16 bg-background">
        <div className="section-padding space-y-16 lg:space-y-24">
          {linhas.map((linha, i) => (
            <AnimateOnScroll key={linha.nome}>
              <article
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <img
                  src={linha.image}
                  alt={`${linha.nome} aplicado em ambiente`}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="space-y-5">
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent">
                    {linha.dimensao}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-display font-light text-foreground">
                    {linha.nome}
                  </h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {linha.descricao}
                  </p>
                  <ul className="space-y-2">
                    {linha.bullets.map((b) => (
                      <li key={b} className="flex gap-3 font-body text-sm text-muted-foreground">
                        <span className="text-mono-accent">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      to={linha.href}
                      className="inline-block bg-secondary text-secondary-foreground text-sm font-body px-6 py-3 rounded hover:opacity-85 transition-opacity"
                    >
                      Ver linha completa
                    </Link>
                    <Link
                      to="/produtos/carrinho"
                      className="inline-block border border-border text-foreground text-sm font-body px-6 py-3 rounded hover:bg-muted transition-colors"
                    >
                      Ver cores no catálogo
                    </Link>
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <CtaOrcamento />
      <MonoNewsletter />
      <MonoFooter />
    </div>
  );
};

export default ProdutosOverview;

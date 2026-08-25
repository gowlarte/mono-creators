import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { cores, linhas, linkCompra, type CorNome, type LinhaId } from "@/data/compra";

import heroImg from "@/assets/produto-teto-vinilico.jpg";

// Ripado colors
import ripadoCedro from "@/assets/produtos/ripado-cedro.jpg";
import ripadoNogueira from "@/assets/produtos/ripado-nogueira.jpg";
import ripadoFreijo from "@/assets/produtos/ripado-freijo.jpg";
import ripadoCarvalho from "@/assets/produtos/ripado-carvalho.jpg";
import ripadoCastanheira from "@/assets/produtos/ripado-castanheira.jpg";

// Liso colors
import lisoCedro from "@/assets/produtos/liso-cedro.jpg";
import lisoNogueira from "@/assets/produtos/liso-nogueira.jpg";
import lisoFreijo from "@/assets/produtos/liso-freijo.jpg";
import lisoCarvalho from "@/assets/produtos/liso-carvalho.jpg";
import lisoCastanheira from "@/assets/produtos/liso-castanheira.jpg";

type SubFilter = "todos" | LinhaId;

interface Product {
  id: string;
  name: string;
  cor: CorNome;
  dimension: string;
  image: string;
  sub: LinhaId;
  href: string;
}

const imagens: Record<LinhaId, Record<CorNome, string>> = {
  ripado: {
    Cedro: ripadoCedro,
    Nogueira: ripadoNogueira,
    Freijó: ripadoFreijo,
    Carvalho: ripadoCarvalho,
    Castanheira: ripadoCastanheira,
  },
  liso: {
    Cedro: lisoCedro,
    Nogueira: lisoNogueira,
    Freijó: lisoFreijo,
    Carvalho: lisoCarvalho,
    Castanheira: lisoCastanheira,
  },
};

// Nome e medida saem de @/data/compra para o card, a mensagem do WhatsApp e a
// página de produto nunca divergirem quando uma medida mudar.
const products: Product[] = (Object.keys(linhas) as LinhaId[]).flatMap((sub) =>
  cores.map((cor) => ({
    id: `${sub}-${cor}`,
    name: `Natureshell ${linhas[sub].rotulo} ${cor}`,
    cor,
    dimension: linhas[sub].medidaCurta,
    image: imagens[sub][cor],
    sub,
    href: `/produtos/${sub}`,
  })),
);

const ProdutosListing = () => {
  const navigate = useNavigate();
  const [subFilter, setSubFilter] = useState<SubFilter>("todos");

  const filtered =
    subFilter === "todos" ? products : products.filter((p) => p.sub === subFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[30vh] lg:h-[40vh] overflow-hidden">
        <img src={heroImg} alt="Nossos produtos" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-10 lg:pb-14">
          <AnimateOnScroll>
            <h1 className="text-3xl lg:text-5xl font-display font-light text-background">
              Catálogo de cores e texturas
            </h1>
            <div className="w-12 h-px bg-background/60 mt-3" />
            <p className="text-sm font-body text-background/70 mt-2 max-w-xl">
              Navegue por todas as cores das nossas linhas vinílicas e selecione as
              referências do seu projeto.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Linha */}
      <div className="section-padding py-0">
        <div className="border border-border rounded-xl overflow-hidden -mt-6 relative z-10 bg-muted shadow-sm py-5 text-center">
          <span className="text-base lg:text-lg font-display font-light text-foreground">Natureshell ®</span>
          <span className="block text-xs font-body text-foreground/50 mt-0.5">Forro Vinílico</span>
        </div>
      </div>

      {/* Breadcrumb + Filters */}
      <div className="section-padding pt-8 pb-4 flex items-center justify-between">
        <p className="text-xs font-body text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span className="mx-2">›</span>
          <a href="/produtos" className="hover:text-foreground transition-colors">Produtos</a>
          <span className="mx-2">›</span>
          <span className="text-foreground">Catálogo</span>
        </p>

        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground mr-1">Filtro:</span>
          {(["ripado", "liso", "todos"] as SubFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setSubFilter(f)}
              className={`text-xs font-body px-3 py-1 rounded-md transition-colors capitalize ${
                subFilter === f
                  ? "bg-foreground text-background"
                  : "bg-muted text-foreground/60 hover:text-foreground"
              }`}
            >
              {f === "todos" ? "Todos" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <section className="section-padding pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {filtered.map((product) => (
            <AnimateOnScroll key={product.id}>
              <div
                className="group border border-border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer bg-background"
                onClick={() => navigate(product.href)}
              >
                {/* Os renders do painel são retangulares (1,24:1 no ripado, 1,5:1 no
                    liso). Num quadrado, object-cover cortava as pontas da peça:
                    contain mostra a peça inteira e o padding dá folga para o zoom
                    do hover não encostar na borda. */}
                <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-muted/30 p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-body font-semibold text-foreground leading-tight">
                  {product.name}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  {product.dimension}
                </p>
                {/* Vai direto para o WhatsApp com a linha e a cor deste card. */}
                <Button
                  asChild
                  variant="mono-outline"
                  size="sm"
                  className="mt-3 w-full text-xs gap-1.5"
                >
                  <a
                    href={linkCompra(product.sub, product.cor)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Comprar
                    <MessageCircle size={14} />
                  </a>
                </Button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <MonoFooter />
    </div>
  );
};

export default ProdutosListing;

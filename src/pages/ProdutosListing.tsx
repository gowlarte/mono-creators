import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

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

// Pedra
import pedra01 from "@/assets/produtos/pedra-01.jpg";
import pedra02 from "@/assets/produtos/pedra-02.jpg";
import pedra03 from "@/assets/produtos/pedra-03.jpg";
import pedra04 from "@/assets/produtos/pedra-04.jpg";
import pedra05 from "@/assets/produtos/pedra-05.jpg";
import pedra06 from "@/assets/produtos/pedra-06.jpg";
import pedra07 from "@/assets/produtos/pedra-07.jpg";

type Category = "natureshell" | "lith";
type SubFilter = "todos" | "ripado" | "liso";

interface Product {
  id: string;
  name: string;
  dimension: string;
  image: string;
  category: Category;
  sub: "ripado" | "liso" | "pedra";
  href: string;
}

const products: Product[] = [
  // Ripado
  { id: "r1", name: "Natureshell Ripado Cedro", dimension: "26,3×7cm", image: ripadoCedro, category: "natureshell", sub: "ripado", href: "/produtos/ripado" },
  { id: "r2", name: "Natureshell Ripado Nogueira", dimension: "26,3×7cm", image: ripadoNogueira, category: "natureshell", sub: "ripado", href: "/produtos/ripado" },
  { id: "r3", name: "Natureshell Ripado Freijó", dimension: "26,3×7cm", image: ripadoFreijo, category: "natureshell", sub: "ripado", href: "/produtos/ripado" },
  { id: "r4", name: "Natureshell Ripado Carvalho", dimension: "26,3×7cm", image: ripadoCarvalho, category: "natureshell", sub: "ripado", href: "/produtos/ripado" },
  { id: "r5", name: "Natureshell Ripado Castanheira", dimension: "26,3×7cm", image: ripadoCastanheira, category: "natureshell", sub: "ripado", href: "/produtos/ripado" },
  // Liso
  { id: "l1", name: "Natureshell Liso Cedro", dimension: "16,7×2,2cm", image: lisoCedro, category: "natureshell", sub: "liso", href: "/produtos/liso" },
  { id: "l2", name: "Natureshell Liso Nogueira", dimension: "16,7×2,2cm", image: lisoNogueira, category: "natureshell", sub: "liso", href: "/produtos/liso" },
  { id: "l3", name: "Natureshell Liso Freijó", dimension: "16,7×2,2cm", image: lisoFreijo, category: "natureshell", sub: "liso", href: "/produtos/liso" },
  { id: "l4", name: "Natureshell Liso Carvalho", dimension: "16,7×2,2cm", image: lisoCarvalho, category: "natureshell", sub: "liso", href: "/produtos/liso" },
  { id: "l5", name: "Natureshell Liso Castanheira", dimension: "16,7×2,2cm", image: lisoCastanheira, category: "natureshell", sub: "liso", href: "/produtos/liso" },
  // Pedra
  { id: "p1", name: "Lith Pedra Flexível 01", dimension: "1200×600mm", image: pedra01, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
  { id: "p2", name: "Lith Pedra Flexível 02", dimension: "1200×600mm", image: pedra02, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
  { id: "p3", name: "Lith Pedra Flexível 03", dimension: "1200×600mm", image: pedra03, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
  { id: "p4", name: "Lith Pedra Flexível 04", dimension: "1200×600mm", image: pedra04, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
  { id: "p5", name: "Lith Pedra Flexível 05", dimension: "1200×600mm", image: pedra05, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
  { id: "p6", name: "Lith Pedra Flexível 06", dimension: "1200×600mm", image: pedra06, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
  { id: "p7", name: "Lith Pedra Flexível 07", dimension: "1200×600mm", image: pedra07, category: "lith", sub: "pedra", href: "/produtos/pedra-flexivel" },
];

const ProdutosListing = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("natureshell");
  const [subFilter, setSubFilter] = useState<SubFilter>("todos");

  const filtered = products.filter((p) => {
    if (p.category !== activeCategory) return false;
    if (activeCategory === "natureshell" && subFilter !== "todos") {
      return p.sub === subFilter;
    }
    return true;
  });

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
              Nossos produtos
            </h1>
            <div className="w-12 h-px bg-background/60 mt-3" />
            <p className="text-sm font-body text-background/70 mt-2">
              Escolha uma das nossas linhas
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="section-padding py-0">
        <div className="grid grid-cols-2 border border-border rounded-xl overflow-hidden -mt-6 relative z-10 bg-background shadow-sm">
          <button
            onClick={() => { setActiveCategory("natureshell"); setSubFilter("todos"); }}
            className={`py-5 text-center transition-colors ${
              activeCategory === "natureshell"
                ? "bg-muted text-foreground"
                : "bg-background text-foreground/50 hover:text-foreground/70"
            }`}
          >
            <span className="text-base lg:text-lg font-display font-light">Natureshell ®</span>
            <span className="block text-xs font-body text-foreground/50 mt-0.5">Forro Vinílico</span>
          </button>
          <button
            onClick={() => { setActiveCategory("lith"); setSubFilter("todos"); }}
            className={`py-5 text-center transition-colors ${
              activeCategory === "lith"
                ? "bg-muted text-foreground"
                : "bg-background text-foreground/50 hover:text-foreground/70"
            }`}
          >
            <span className="text-base lg:text-lg font-display font-light">Lith ®</span>
            <span className="block text-xs font-body text-foreground/50 mt-0.5">Pedra Flexível</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb + Filters */}
      <div className="section-padding pt-8 pb-4 flex items-center justify-between">
        <p className="text-xs font-body text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span className="mx-2">›</span>
          <span className="text-foreground">Produtos</span>
        </p>

        {activeCategory === "natureshell" && (
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
        )}
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
                <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-muted/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-body font-semibold text-foreground leading-tight">
                  {product.name}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  {product.dimension}
                </p>
                <Button
                  variant="mono-outline"
                  size="sm"
                  className="mt-3 w-full text-xs gap-1.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/orcamento");
                  }}
                >
                  Solicitar orçamento
                  <ShoppingBag size={14} />
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

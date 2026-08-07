import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";
import tetoImg from "@/assets/produto-teto-vinilico.jpg";
import forrosImg from "@/assets/produto-forros-pvc.jpg";
import pedraImg from "@/assets/produto-pedra-flexivel.jpg";

const products = [
  { title: "Natureshell PVC Ripado", image: forrosImg, href: "/produtos/ripado" },
  { title: "Natureshell PVC Liso", image: tetoImg, href: "/produtos/liso" },
  { title: "Lith Pedra Flexível", image: pedraImg, href: "/produtos/pedra-flexivel" },
];

const Produtos = () => {
  return (
    <section id="produtos" className="py-20 lg:py-28 bg-background">
      <div className="section-padding">
        <AnimateOnScroll>
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground">Descubra nossos produtos</h2>
            <div className="w-16 h-px bg-mono-accent mt-4" />
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <AnimateOnScroll key={product.title}>
              <Link to={product.href} className="group relative overflow-hidden rounded-xl block">
                <div className="absolute top-4 left-4 z-10 bg-mono-badge/90 text-foreground text-xs font-body font-semibold px-3 py-1 rounded-md">
                  {product.title}
                </div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-[4/3.5] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Produtos;

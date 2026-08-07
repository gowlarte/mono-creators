import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";
import tetoImg from "@/assets/produto-teto-vinilico.jpg";
import forrosImg from "@/assets/produto-forros-pvc.jpg";
import pedraImg from "@/assets/produto-pedra-flexivel.jpg";

const products = [
  {
    title: "Natureshell PVC Ripado",
    description: "Relevo ripado em 5 tonalidades de madeira, para teto e parede.",
    image: forrosImg,
    href: "/produtos/ripado",
  },
  {
    title: "Natureshell PVC Liso",
    description: "Acabamento contínuo e uniforme, com veios em alta definição.",
    image: tetoImg,
    href: "/produtos/liso",
  },
  {
    title: "Lith Pedra Flexível",
    description: "Lâmina mineral flexível para paredes, colunas e superfícies curvas.",
    image: pedraImg,
    href: "/produtos/pedra-flexivel",
  },
];

const Produtos = () => {
  return (
    <section id="produtos" className="py-20 lg:py-28 bg-background">
      <div className="section-padding">
        <AnimateOnScroll>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-3">Nossas linhas</p>
            <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground">Descubra nossos produtos</h2>
            <div className="w-16 h-px bg-mono-accent mt-4" />
            <p className="font-body text-base text-muted-foreground leading-relaxed mt-5">
              Três acabamentos vinílicos com a mesma tecnologia: placa de PVC com filme decorativo
              e proteção UV, instalada por encaixe em teto, forro e parede.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <AnimateOnScroll key={product.title}>
              <Link to={product.href} className="group block">
                <div className="relative overflow-hidden rounded-xl">
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
                </div>
                <h3 className="font-display text-xl text-foreground mt-4">{product.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mt-2">
                  {product.description}
                </p>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll>
          <div className="mt-12">
            <Link
              to="/produtos"
              className="inline-block bg-secondary text-secondary-foreground text-sm font-body px-7 py-3.5 rounded hover:opacity-85 transition-opacity"
            >
              Conheça todos os produtos
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Produtos;

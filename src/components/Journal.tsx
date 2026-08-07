import AnimateOnScroll from "./AnimateOnScroll";
import { Button } from "@/components/ui/button";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";
import journal4 from "@/assets/journal-4.jpg";
import { ChevronDown } from "lucide-react";

const articles = [
  { title: "Superfícies e sentidos, com Carlo Zaskia", image: journal1 },
  { title: "O novo minimalismo, conheça as tendências de 2026", image: journal2 },
  { title: "Um canto de aconchego perfeito para o seu inverno de 2026", image: journal3 },
  { title: "Um canto de aconchego perfeito para o seu inverno de 2026", image: journal4 },
];

const Journal = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="section-padding">
        <AnimateOnScroll>
          <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground text-center mb-12">
            Journal
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <AnimateOnScroll key={i}>
              <div className="group cursor-pointer space-y-3">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-body text-sm text-foreground leading-snug group-hover:text-mono-accent transition-colors">
                  {article.title}
                </h3>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button variant="mono-outline" className="gap-2">
            Carregar mais artigos <ChevronDown size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Journal;

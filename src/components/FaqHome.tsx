import AnimateOnScroll from "./AnimateOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Posso instalar o revestimento vinílico sobre gesso?",
    a: "Sim. É necessário verificar a linearidade e as condições da superfície, pois elas afetam o resultado e a durabilidade do produto. Para detalhes, consulte o manual de instalação.",
  },
  {
    q: "Qual é a durabilidade do produto?",
    a: "Em condições ideais de instalação, o produto tem durabilidade superior a 15 anos. Para aplicação em áreas internas, o painel vinílico conta com garantia de 10 anos.",
  },
  {
    q: "Posso instalar luminárias de LED embutidas entre as placas?",
    a: "Sim. Recomendamos sempre luminárias com aba. Sem aba, é necessário usar arremate. Em ambos os casos, os LEDs devem ser fixados na estrutura do telhado ou na estrutura de apoio do forro.",
  },
  {
    q: "Posso colar fita adesiva nas placas?",
    a: "Se necessário, use fita crepe por um curto período (até 24h). Fitas do tipo durex e dupla face possuem solventes que podem agredir a camada de impressão.",
  },
  {
    q: "O vinílico é o mesmo produto do teto vinílico tradicional?",
    a: "É a mesma tecnologia de painel vinílico já consolidada no mercado, com nossa curadoria de cores, texturas e acabamentos e um custo-benefício pensado para o seu projeto.",
  },
];

const FaqHome = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted">
      <div className="section-padding max-w-3xl">
        <AnimateOnScroll className="mb-10">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-mono-accent mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-display font-light text-foreground">
            Dúvidas frequentes sobre instalação
          </h2>
          <div className="w-16 h-px bg-mono-accent mt-4" />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="font-body text-left text-[15px] text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FaqHome;

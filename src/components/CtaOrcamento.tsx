import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "./AnimateOnScroll";

const CtaOrcamento = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-secondary text-secondary-foreground">
      <div className="section-padding text-center space-y-6">
        <AnimateOnScroll>
          <h2 className="text-3xl lg:text-5xl font-display font-light">
            Pronto para transformar seu projeto?
          </h2>
          <p className="text-sm lg:text-base font-body text-secondary-foreground/70 max-w-lg mx-auto mt-4">
            Solicite um orçamento personalizado e descubra a solução ideal para o seu espaço.
          </p>
          <Button
            variant="mono"
            size="lg"
            className="mt-8 px-10 py-6 text-base"
            onClick={() => navigate("/orcamento")}
          >
            Solicitar Orçamento
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CtaOrcamento;

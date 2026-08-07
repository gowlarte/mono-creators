import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="section-padding">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-display font-light text-foreground">
                Inscreva-se em nossa newsletter
              </h2>
              <p className="text-sm text-muted-foreground font-body max-w-md">
                Fique por dentro dos nossos últimos lançamentos e inspirações para seu próximo projeto.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-mono-accent"
                aria-label="Seu e-mail"
              />
              <Button variant="mono-dark">Inscrever-se</Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Newsletter;

import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";
import { CheckCircle } from "lucide-react";

const ObrigadoCatalogo = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#E8E4DC]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-[#C4AE96]" strokeWidth={1.2} />
          </div>
          <h1
            className="font-heading text-[#6B4426] mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Obrigado pelo download!
          </h1>
          <p className="font-body text-[#8B7B6B] text-base md:text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            Seu catálogo já está a caminho. Explore nossas coleções e descubra o revestimento ideal para o seu projeto.
          </p>
          <a
            href="/"
            className="inline-block font-body text-sm text-white px-8 py-3 rounded transition-opacity hover:opacity-85 animate-fade-in"
            style={{ backgroundColor: "hsl(27 55% 50%)", animationDelay: "0.4s", animationFillMode: "both" }}
          >
            Voltar ao site
          </a>
        </div>
      </main>
      <MonoFooter />
    </div>
  );
};

export default ObrigadoCatalogo;

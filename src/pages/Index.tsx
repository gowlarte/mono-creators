import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Diferenciais from "@/components/Diferenciais";
import Produtos from "@/components/Produtos";
import BannerTexturas from "@/components/BannerTexturas";
import Sustentabilidade from "@/components/Sustentabilidade";
import CtaOrcamento from "@/components/CtaOrcamento";
import MonoNewsletter from "@/components/MonoNewsletter";
import MonoFooter from "@/components/MonoFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Diferenciais />
      <Produtos />
      <BannerTexturas />
      <Sustentabilidade />
      <CtaOrcamento />
      <MonoNewsletter />
      <MonoFooter />
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Hero from "@/components/Hero";
import Diferenciais from "@/components/Diferenciais";
import OqueEVinilico from "@/components/OqueEVinilico";
import OndeComprarHome from "@/components/OndeComprarHome";
import BeneficiosTecnicos from "@/components/BeneficiosTecnicos";
import CamadasScroll from "@/components/CamadasScroll";
import Produtos from "@/components/Produtos";
import BannerTexturas from "@/components/BannerTexturas";
import Aplicacoes from "@/components/Aplicacoes";
import Sustentabilidade from "@/components/Sustentabilidade";
import FaqHome from "@/components/FaqHome";
import CtaOrcamento from "@/components/CtaOrcamento";
import MonoNewsletter from "@/components/MonoNewsletter";
import MonoFooter from "@/components/MonoFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlider />
      <Hero />
      <Diferenciais />
      <OqueEVinilico />
      <OndeComprarHome />
      <BeneficiosTecnicos />
      <CamadasScroll />
      <Produtos />
      <BannerTexturas />
      <Aplicacoes />
      <Sustentabilidade />
      <FaqHome />
      <CtaOrcamento />
      <MonoNewsletter />
      <MonoFooter />
    </div>
  );
};

export default Index;

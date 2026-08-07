import ProductPageLayout from "@/components/ProductPageLayout";
import heroImg from "@/assets/produtos/liso-hero.jpg";
import cedroImg from "@/assets/produtos/liso-cedro.jpg";
import carvalhoImg from "@/assets/produtos/liso-carvalho.jpg";
import freijoImg from "@/assets/produtos/liso-freijo.jpg";
import castanheiraImg from "@/assets/produtos/liso-castanheira.jpg";
import nogueiraImg from "@/assets/produtos/liso-nogueira.jpg";
import amb01 from "@/assets/produtos/liso-amb-01.jpg";
import amb02 from "@/assets/produtos/liso-amb-02.jpg";
import amb03 from "@/assets/produtos/liso-amb-03.jpg";
import amb04 from "@/assets/produtos/liso-amb-04.jpg";
import amb05 from "@/assets/produtos/liso-amb-05.jpg";
import ambHero from "@/assets/produtos/liso-ambientacao.jpg";

const ProdutoLiso = () => (
  <ProductPageLayout
    title="Natureshell PVC Liso"
    subtitle="Forro Vinílico"
    heroImage={heroImg}
    description={[
      "Os forros Natureshell da MONO foram desenvolvidos para projetos que pedem continuidade visual, precisão de acabamento e eficiência construtiva. Com superfície lisa e composição vinílica em PVC, o sistema entrega uma leitura limpa e equilibrada, ideal para ambientes que exigem discrição estética e alto controle formal.",
      "A ausência de ranhuras reforça a uniformidade do plano, permitindo que o forro atue como base silenciosa da arquitetura, valorizando iluminação, volumetria e demais elementos do espaço. Leve e versátil, pode ser aplicado em tetos residenciais ou comerciais, em áreas internas ou protegidas, com estabilidade dimensional e acabamento consistente ao longo do tempo.",
      "A composição em PVC vinílico confere resistência à umidade e dificulta a proliferação de mofos, tornando o Natureshell uma solução segura para projetos contemporâneos que aliam desempenho técnico e facilidade de manutenção.",
      "Disponível nas cores Carvalho, Cedro, Freijó, Castanheira e Nogueira, o forro Mono Natureshell compartilha a mesma paleta da linha, permitindo composições coesas entre parede e teto, com unidade estética e identidade material preservadas.",
    ]}
    specs={[
      { label: "Medida", value: "16,7cm × 2,2cm × 5,80m" },
      { label: "Tipo de encaixe", value: "Macho e fêmea" },
      { label: "Acabamento", value: "Verniz fosco" },
      { label: "Acessórios", value: "Arremate e Emenda" },
      { label: "Classificação de incêndio", value: "Classe IIA – d0" },
      { label: "Limpeza", value: "Pano úmido com solução água/álcool 50%" },
      { label: "Exposição solar", value: "Não indicado" },
    ]}
    colors={[
      { name: "Cedro", image: cedroImg },
      { name: "Carvalho", image: carvalhoImg },
      { name: "Freijó", image: freijoImg },
      { name: "Castanheira", image: castanheiraImg },
      { name: "Nogueira", image: nogueiraImg },
    ]}
    gallery={[
      { src: ambHero, alt: "Ambientação Liso" },
      { src: amb01, alt: "Liso em ambiente residencial" },
      { src: amb02, alt: "Liso em ambiente comercial" },
      { src: amb03, alt: "Liso em sala de estar" },
      { src: amb04, alt: "Liso em espaço integrado" },
      { src: amb05, alt: "Liso em teto decorativo" },
    ]}
  />
);

export default ProdutoLiso;

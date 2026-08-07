import ProductPageLayout from "@/components/ProductPageLayout";
import heroImg from "@/assets/produtos/pedra-hero.jpg";
import pedra01 from "@/assets/produtos/pedra-01.jpg";
import pedra02 from "@/assets/produtos/pedra-02.jpg";
import pedra03 from "@/assets/produtos/pedra-03.jpg";
import pedra04 from "@/assets/produtos/pedra-04.jpg";
import pedra05 from "@/assets/produtos/pedra-05.jpg";
import pedra06 from "@/assets/produtos/pedra-06.jpg";
import pedra07 from "@/assets/produtos/pedra-07.jpg";
import amb01 from "@/assets/produtos/pedra-amb-01.jpg";

const ProdutoPedraFlexivel = () => (
  <ProductPageLayout
    title="Lith Pedra Flexível"
    subtitle="Porcelana Ecológica Flexível"
    heroImage={heroImg}
    description={[
      "Alta relação custo-benefício para paredes internas, externas e decoração paisagística — um material de revestimento flexível de baixo carbono.",
      "A porcelana ecológica flexível é um material leve e maleável, produzido por meio da prensagem de solo ativo ecológico combinado com resíduos sólidos inorgânicos (resíduos da construção civil, sobras de fábricas de pedra/cerâmica e rejeitos minerais não metálicos).",
      "O produto é moldado com tecnologia de baixa temperatura, reduzindo significativamente o consumo de energia e eliminando emissões de gases poluentes e efluentes líquidos. As emissões de carbono de 1 m² de porcelana ecológica flexível são de 1,02 kg de CO₂e, o que representa 95,4% menos emissões que a cerâmica e 98,63% menos que a pedra natural.",
      "A porcelana ecológica flexível pode reproduzir diversos efeitos tridimensionais — como pedra, madeira, cimento e tecido — por meio da combinação de moldes e tecnologia de impressão inkjet. Sua característica de 'moldável conforme a necessidade' a torna especialmente adequada para acabamentos arquitetônicos irregulares, como paredes curvas e superfícies cilíndricas.",
      "O produto possui ampla versatilidade de aplicação, podendo ser instalado diretamente sobre bases antigas. É uma solução eficiente, prática e com custo significativamente inferior ao de fachadas em pedra natural.",
    ]}
    specs={[
      { label: "Medida", value: "1200 × 600 × 3,5(±1) mm" },
      { label: "Material", value: "Porcelana ecológica flexível" },
      { label: "Aplicação", value: "Paredes internas, externas e paisagismo" },
      { label: "Emissão CO₂", value: "1,02 kg CO₂e/m² (95% menor que cerâmica)" },
      { label: "Superfícies", value: "Planas, curvas e cilíndricas" },
      { label: "Instalação", value: "Sobre bases novas ou existentes" },
    ]}
    colors={[
      { name: "Acabamento 01", image: pedra01 },
      { name: "Acabamento 02", image: pedra02 },
      { name: "Acabamento 03", image: pedra03 },
      { name: "Acabamento 04", image: pedra04 },
      { name: "Acabamento 05", image: pedra05 },
      { name: "Acabamento 06", image: pedra06 },
      { name: "Acabamento 07", image: pedra07 },
    ]}
    colorsTitle="Acabamentos disponíveis"
    gallery={[
      { src: amb01, alt: "Pedra Flexível em ambiente" },
    ]}
  />
);

export default ProdutoPedraFlexivel;

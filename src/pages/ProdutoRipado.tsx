import ProductPageLayout from "@/components/ProductPageLayout";
import heroImg from "@/assets/produtos/ripado-hero.jpg";
import cedroImg from "@/assets/produtos/ripado-cedro.jpg";
import nogueiraImg from "@/assets/produtos/ripado-nogueira.jpg";
import freijoImg from "@/assets/produtos/ripado-freijo.jpg";
import carvalhoImg from "@/assets/produtos/ripado-carvalho.jpg";
import castanheiraImg from "@/assets/produtos/ripado-castanheira.jpg";
import amb01 from "@/assets/produtos/ripado-amb-01.jpg";
import amb02 from "@/assets/produtos/ripado-amb-02.jpg";
import amb03 from "@/assets/produtos/ripado-amb-03.jpg";
import amb04 from "@/assets/produtos/ripado-amb-04.jpg";
import amb05 from "@/assets/produtos/ripado-amb-05.jpg";
import ambHero from "@/assets/produtos/ripado-ambientacao.jpg";

const ProdutoRipado = () => (
  <ProductPageLayout
    title="Natureshell PVC Ripado"
    subtitle="Forro Vinílico"
    heroImage={heroImg}
    description={[
      "Os revestimentos Natureshell da MONO foram pensados para superfícies precisas e duráveis. Um painel ripado com composição em PVC, pensado para projetos que valorizam o conforto visual e a praticidade na hora da montagem ou manutenção.",
      "Sua superfície ripada cria jogos sutis de luz e sombra, conferindo cadência ao espaço sem excessos. Leve e versátil, pode ser aplicado tanto em paredes quanto em tetos, em ambientes residenciais ou comerciais, internos ou protegidos, mantendo a estabilidade dimensional e acabamento consistente ao longo do tempo.",
      "A composição em PVC contribui para a resistência à umidade e a proliferação de mofos, tornando o Natureshell uma escolha segura para projetos contemporâneos que exigem desempenho aliado à estética.",
      "Disponível nas cores Carvalho, Cedro, Freijó, Castanheira e Nogueira, o Mono Natureshell oferece uma paleta equilibrada, inspirada em madeiras atemporais, capaz de dialogar com diferentes linguagens arquitetônicas sem perder identidade.",
    ]}
    specs={[
      { label: "Medida", value: "26,3cm × 7cm × 2,90m" },
      { label: "Tipo de encaixe", value: "Macho e fêmea" },
      { label: "Acabamento", value: "Verniz fosco" },
      { label: "Acessórios", value: "Arremate e Emenda" },
      { label: "Classificação de incêndio", value: "Classe IIA – d0" },
      { label: "Limpeza", value: "Pano úmido com solução água/álcool 50%" },
      { label: "Exposição solar", value: "Não indicado" },
    ]}
    colors={[
      { name: "Cedro", image: cedroImg },
      { name: "Nogueira", image: nogueiraImg },
      { name: "Freijó", image: freijoImg },
      { name: "Carvalho", image: carvalhoImg },
      { name: "Castanheira", image: castanheiraImg },
    ]}
    gallery={[
      { src: ambHero, alt: "Ambientação Ripado" },
      { src: amb01, alt: "Ripado em ambiente residencial" },
      { src: amb02, alt: "Ripado em ambiente comercial" },
      { src: amb03, alt: "Ripado em sala de estar" },
      { src: amb04, alt: "Ripado em espaço integrado" },
      { src: amb05, alt: "Ripado em teto decorativo" },
    ]}
  />
);

export default ProdutoRipado;

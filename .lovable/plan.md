## Objetivo

Substituir o formulário da página `/orcamento` por uma seção institucional com destaque para os produtos **Revestimento Vinílico Liso** e **Revestimento Vinílico Ripado**, mantendo o padrão visual do site (Linen beige, tipografia PP Neue York, tons terrosos, sem sombras pesadas) e finalizando com um botão de WhatsApp.

## Estrutura da nova página `/orcamento`

1. **Navbar** (mantida)
2. **Cabeçalho editorial**
   - Título (H1) em PP Right Gothic: "Solicite seu orçamento"
   - Subtítulo curto convidando ao contato via WhatsApp
3. **Sobre a Mono (parágrafo institucional)**
   - Texto curto (~3–4 linhas) reforçando o posicionamento da marca: revestimentos que unem estética natural, durabilidade e instalação prática.
4. **Destaque dos dois produtos principais** (em cards pequenos, lado a lado)
   - Layout: grid 2 colunas no desktop, 1 coluna no mobile
   - Cada card contém:
     - Foto pequena (thumbnail contida, `aspect-[4/3]`, largura máx. ~340px, `object-cover`, `rounded-xl`)
     - Nome do produto
     - Descrição curta (1–2 linhas)
     - Link discreto "Ver detalhes" apontando para `/produtos/liso` e `/produtos/ripado`
   - Imagens reutilizadas dos assets já existentes (`produto-teto-vinilico.jpg` para o Liso e `produto-forros-pvc.jpg` para o Ripado).
5. **Menção rápida a outros produtos**
   - Uma linha textual mencionando também a Pedra Flexível, com link para `/produtos`.
6. **Bloco de CTA final**
   - Título curto: "Fale com nosso time"
   - Texto: "Atendimento personalizado via WhatsApp."
   - Botão grande com a cor oficial do WhatsApp (`#25D366`, hover `#1EBE5D`), texto branco, ícone do WhatsApp (lucide `MessageCircle` ou svg oficial), abrindo em nova aba:
     `https://wa.me/5511977971421?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Mono%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.`
7. **Footer** (mantido)

## Detalhes técnicos

- Editar apenas `src/pages/Orcamento.tsx`. Remover o `useEffect` que injeta `form_embed.js` e o `<iframe>` do LeadConnector.
- Reaproveitar `AnimateOnScroll` para consistência de entrada.
- Não introduzir cores hardcoded no design system global — a cor do WhatsApp fica inline no botão (exceção justificada por ser cor de marca externa), com `target="_blank"` e `rel="noopener noreferrer"`.
- Imagens usam `loading="lazy"` e `object-cover` em containers pequenos, seguindo o padrão dos cards em `Produtos.tsx`.
- Sem novas dependências, sem alterações em rotas, Navbar ou Footer.
- Título/meta da aba podem ser mantidos como estão (a página continua sendo "Solicitar Orçamento").

## Fora do escopo

- Não alterar as páginas de produto, home ou downloads.
- Não remover a rota `/orcamento` — apenas trocar o conteúdo.
- Não mexer no link "Solicitar Orçamento" da Navbar (continua apontando para `/orcamento`).

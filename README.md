# Remix of Mono

🚀 PROMPT AVANÇADO PARA LOVABLE.DEV — MONO Revestimentos

Instruções de uso: Cole este prompt inteiro no Lovable.dev junto com o PDF da página como anexo. O prompt foi construído com a estrutura CLEAR Framework + técnicas de meta-prompting para máxima fidelidade visual.

CONTEXTO (Context)

Você é um desenvolvedor front-end full-stack especialista em React, Tailwind CSS e design de alta fidelidade. Sua tarefa é replicar com precisão milimétrica o site institucional da MONO — uma marca brasileira premium de revestimentos (Teto Vinílico, Forros PVC, Pedra Flexível). O PDF anexo contém o design de referência completo da página home. Analise cada seção visual antes de começar a codar.

Stack obrigatória: React + Tailwind CSS + shadcn/ui. Zero dependências desnecessárias.

TAREFA (Task)

Crie uma landing page institucional completa e responsiva para a marca MONO, fiel ao design do PDF, composta pelas seguintes seções em ordem:

Navbar — fixa no topo

Hero Section — headline principal + CTA

Sobre / Diferenciais — 3 cards de benefícios

Produtos — 3 cards com imagem em destaque

Banner 3D — parceiros de visualização 3D

Banner "Fazemos madeira de um jeito diferente" — swatches de textura

Sustentabilidade — seção com fundo escuro + CTA

Projetos Selecionados — 3 cards de case

Journal / Blog — 4 cards de artigos

Newsletter — formulário de e-mail

Footer — links, redes sociais, CNPJ

DIRETRIZES VISUAIS (Guidelines)

Paleta de cores (extraída do PDF):

--color-bg: #F5F0EA          /* bege claro, fundo geral */
--color-bg-dark: #2A2118     /* marrom escuro, seções de destaque */
--color-accent: #C4813A      /* laranja terracota, cor principal da marca */
--color-text: #1A1A1A        /* quase preto */
--color-text-muted: #6B6560  /* cinza médio */
--color-white: #FFFFFF


Tipografia:

Logo/Display: fonte serifada elegante ou Sans-serif geométrico fino (ex: Playfair Display ou Cormorant Garamond para headlines impactantes)

Body: fonte Sans-serif limpa (ex: DM Sans ou Plus Jakarta Sans)

Import via Google Fonts no index.html

Estética geral:

Tom: premium, orgânico, sustentável, editorial

Layout: assimétrico, com generoso uso de espaço negativo

Imagens: use placeholders com https://placehold.co/ nas dimensões corretas com fundo bege/marrom, textos descritivos como "Teto Vinílico", "Forros PVC", etc.

Bordas: arredondadas sutis (rounded-lg ou rounded-xl)

Sombras: suaves e quentes, nunca frias

SEÇÃO POR SEÇÃO — ESPECIFICAÇÕES DETALHADAS

1. NAVBAR

- Fundo: transparente (scrolled: branco/bege sólido com leve sombra)
- Logo "mono" ao centro (tipografia logotipo, caixa-baixa, serif ou script elegante)
- Links à esquerda: Produtos | Lith | Natureshell | Sobre a Mono | Downloads
- Links à direita: Procurar (ícone lupa) | Peça sua amostra (botão outline) | Contato
- Mobile: hamburger menu
- Comportamento: sticky com transição suave no scroll


2. HERO SECTION

- Layout: texto à esquerda, imagem grande à direita
- Headline (2 linhas):
    "Dizem que o essencial é
    invisível aos olhos"
- Subheadline: "Mas a nossa essência é inevitável"
- CTA Button: "Conheça nossos produtos" — cor accent (#C4813A), texto branco
- Imagem direita: stack/pilha de ripas de madeira empilhadas (placeholder: 600x500, fundo bege)
- Background: #F5F0EA (bege claro)
- Fonte headline: display serif grande (64px+), peso leve/thin


3. SOBRE / DIFERENCIAIS

- Título seção esquerda: "A Mono" + subtítulo "Sua nova referência para revestimentos de qualidade e custo benefício."
- 3 ícones + texto à direita:
    [ícone martelo/obra] "Obra rápida e limpa"
    [ícone folha/leaf]   "Sustentável"
    [ícone ferramenta/zero] "Zero manutenção"
- Layout: grid 4 colunas (1 texto + 3 cards)
- Cards: borda sutil, padding generoso, ícone laranja no topo


4. PRODUTOS — "Descubra nossos produtos"

- Título: "Descubra nossos produtos" com linha decorativa abaixo
- 3 cards side-by-side (full width):
    Card 1: "Teto Vinílico" — badge no canto superior esquerdo (amarelo/dourado), imagem com stack de painéis
    Card 2: "Forros PVC" — badge no canto superior esquerdo (amarelo/dourado)
    Card 3: "Pedra Flexível" — badge no canto superior esquerdo (amarelo/dourado)
- Cada card: imagem grande (aprox 400x350), efeito hover com scale leve
- Placeholders: 400x350, fundo variando entre tons terrosos


5. BANNER 3D

- Fundo: bege claro (#F5F0EA) ou branco
- Texto centralizado: "Nossos produtos em 3D para seu próximo projeto"
- Linha decorativa abaixo do título
- Logos de parceiros em linha: archello | CASOCA | Blocks (texto estilizado, cinza)
- Layout: centralizado, padding vertical generoso


6. BANNER TEXTURAS — "Os revestimentos do futuro"

- Texto centralizado: "Os revestimentos do futuro" (pequeno, uppercase, letra espaçada)
- Subtítulo maior: "Fazemos madeira de um jeito diferente"
- Swatches de textura: 5–6 retângulos lado a lado mostrando diferentes acabamentos de madeira
  (placeholders: 180x80 cada, tons variados de madeira: claro, médio, escuro, acinzentado, avermelhado)
- Fundo: bege neutro


7. SUSTENTABILIDADE

- Fundo: marrom escuro (#2A2118) com textura sutil de madeira (background-image com baixa opacidade)
- Badge topo: "Sustentabilidade" (texto pequeno uppercase, cor muted)
- Texto principal (branco):
  "A MONO não abre mão da fidelidade de cores, texturas e design premium,
  ao mesmo tempo que propõem soluções de materiais sustentáveis em sua obra.
  Gere menos resíduos e instale revestimentos com facilidade,
  sem sujeira e necessidade de mão de obra especializada."
- CTA: "→ Saiba mais" (texto branco, underline hover)
- Logo MONO no canto inferior direito (branco, estilizado em 2 linhas "mo/no")
- Layout: texto à esquerda, logo à direita


8. PROJETOS SELECIONADOS

- Título seção: "Projetos selecionados"
- 3 cards em grid:
  Card 1: "Estação Polímata" — imagem interior quente/amadeirado (placeholder 350x250)
          Texto: "Ao mesmo tempo em que se precisa de um local para passar tempo, descansar..."
          Badge parceiro: "Fresh Daily"
  Card 2: "Comfort place" — imagem lareira/ambiente aconchegante (placeholder 350x250)
          Texto: "Nada como um local de descanso bem iluminado, reservado e com ótimo isolamento..."
          Badge parceiro: "CLUB CASA"
  Card 3: "Tidal Opera Haus" — imagem arquitetura fachada ondulada (placeholder 350x250)
          Texto: "Uma verdadeira obra arquitetônica à prova das ondas do tempo..."
- Cards: sem borda, espaçamento entre imagem e texto, tipografia editorial


9. JOURNAL / BLOG

- Título seção: "Journal"
- Grid 2x2 (ou layout editorial assimétrico):
  Artigo 1: "Superfícies e sentidos, com Carlo Zaskia" — imagem pequena + texto
  Artigo 2: "O novo minimalismo, conheça as tendências de 2026"
  Artigo 3: "Um canto de aconchego perfeito para o seu inverno de 2026"
  Artigo 4: "Um canto de aconchego perfeito para o seu inverno de 2026" (variação)
- Botão centralizado: "Carregar mais artigos ↓" — outline, cor texto escuro
- Imagens: placeholders 300x200, tons quentes


10. NEWSLETTER

- Fundo: bege (#F5F0EA) ou branco
- Título: "Inscreva-se em nossa newsletter" (lado esquerdo)
- Subtítulo: "Fique por dentro dos nossos últimos lançamentos e inspirações para seu próximo projeto."
- Input de e-mail + botão "Inscrever-se" (inline, botão escuro)
- Layout: 2 colunas em desktop, empilhado em mobile


11. FOOTER

- Fundo: #1A1A1A (quase preto) ou #2A2118 (marrom escuro)
- Logo MONO (branco) no canto inferior esquerdo
- Colunas de links:
  Col 1 "Produtos": Coleções | Manuais | Catálogo
  Col 2 "Sobre": Empresa | Contato
  Col 3 "Siga-nos": ícones X (Twitter) | Instagram | LinkedIn | YouTube
- Bottom bar: "MONOBR IND E COMÉRCIO DE PERFILADOS LTDA  CNPJ 00.000.000/0001-00  © Todos direitos reservados"
- Texto em branco/cinza claro


COMPORTAMENTOS E INTERAÇÕES (Constraints)

Responsividade: Mobile-first. Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

Animações:

Fade-in suave nas seções ao entrar no viewport (use Intersection Observer ou CSS animation-delay)

Hover nos cards: escala leve (scale-105) + sombra

Navbar: transição de transparente para sólido no scroll

Scroll: Suave (scroll-behavior: smooth)

Acessibilidade: Alt text em todas as imagens, contraste adequado, botões com aria-labels

Performance: Lazy loading nas imagens

NÃO use: Material UI, Bootstrap, ou qualquer UI kit que não seja shadcn/ui + Tailwind

ESTRUTURA DE ARQUIVOS ESPERADA

src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Diferenciais.tsx
│   ├── Produtos.tsx
│   ├── Banner3D.tsx
│   ├── BannerTexturas.tsx
│   ├── Sustentabilidade.tsx
│   ├── Projetos.tsx
│   ├── Journal.tsx
│   ├── Newsletter.tsx
│   └── Footer.tsx
├── App.tsx         ← importa todos os componentes em ordem
└── index.css       ← variáveis CSS globais + Google Fonts import


VALIDAÇÃO FINAL

Antes de finalizar, confirme:

[ ] Todas as 11 seções estão presentes na ordem correta

[ ] A paleta de cores (#F5F0EA, #2A2118, #C4813A) está sendo usada consistentemente

[ ] O layout é responsivo em mobile, tablet e desktop

[ ] As animações de scroll estão funcionando

[ ] A navbar fica sticky e muda de aparência ao scrollar

[ ] Nenhuma seção usa fundo branco puro — sempre bege (#F5F0EA) ou escuro (#2A2118)

[ ] A tipografia tem hierarquia clara: display serif grande nos títulos, sans-serif limpa no corpo

Prompt desenvolvido com CLEAR Framework + análise de design fidelidade para Lovable.dev Referência visual: PDF Frame_226 — Site MONO Revestimentos

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0cca425c-63ef-47f6-aee9-297d46b3a364).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

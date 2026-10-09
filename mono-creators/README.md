# MONO Creators — landing de recrutamento

Landing de captação de influenciadores para o programa MONO Creators.

Ela é publicada **sozinha**, num endereço próprio (repositório `mono-creators`
na conta pessoal, deploy na Vercel), e por isso ocupa a **raiz** desse endereço:
o site no ar não tem link para o programa e, por enquanto, é assim que deve ser
— ninguém deveria precisar digitar `/creators` para chegar nela. A rota
`/creators` continua respondendo, para não quebrar link já divulgado.

Quando a landing for para o site da MONO, leve os **arquivos**, não a rota raiz
desta branch — ela substituiria a home. O aviso está no `src/App.tsx`.

Esta pasta guarda o briefing, o copy
aprovado e os assets de campanha; o código vive no `src/` do site, reaproveitando
o design system da MONO (fontes PP Right Gothic / PP Neue York, paleta `mono-*`,
`Navbar`, `MonoFooter`, `AnimateOnScroll` e os componentes shadcn já instalados).

## Onde está cada coisa

| Arquivo | O que é |
| --- | --- |
| `src/pages/Creators.tsx` | A página: hero, manifesto, benefícios, convite e a seção de inscrição. |
| `src/components/creators/HeroCreators.tsx` | O hero: slideshow automático de 5 ambientes, sem controles, com parallax. |
| `src/data/creators.ts` | Conteúdo editável: os benefícios. |
| `src/lib/creators.ts` | O link de cadastro da Inbazz (`INBAZZ_STORE_ID`). |

Para mudar texto de benefício, mexa só em `src/data/creators.ts` — a página se
ajusta sozinha.

## A inscrição

A landing não tem formulário. O botão **Quero ser MONO Creator** leva direto a
`creators.inbazz.com.br/login?storeId=…`, o link de convite da comunidade da
MONO na Inbazz. Lá o creator toca em *Cadastre-se*, cria a conta (nome, CPF,
endereço, Instagram, confirmação por e-mail) e o pedido de entrada na
comunidade aparece para o time aprovar no painel da Inbazz.

A Inbazz não tem API para a marca criar creator, por isso o cadastro precisa
acontecer lá. O link abre na tela de login, não na de cadastro — o texto da
seção avisa para tocar em *Cadastre-se*.

`VITE_INBAZZ_STORE_ID` (opcional, já existe na Vercel) troca a loja sem commit.

**Legado:** entre 9/10/2026 e a remoção do formulário, a página gravou
candidaturas no Supabase (projeto **Mono Creators**, tabela
`creators_candidaturas`, estrutura em `supabase/migrations/`). O projeto e os
dados continuam lá; as variáveis `SUPABASE_URL` e `SUPABASE_SECRET_KEY` na
Vercel não são mais usadas.

## Pendências

- [ ] Fazer um cadastro real pelo botão e confirmar que o pedido chega na
      comunidade da MONO no painel da Inbazz.
- [ ] Trocar as fotos por imagens de campanha, se houver. Hoje o slideshow do
      hero usa cinco ambientes do catálogo (lista no topo de `HeroCreators.tsx`)
      e a seção de convite usa `liso-amb-02.jpg`.
- [ ] Decidir se `/creators` entra no menu do site ou fica só na bio do Instagram.

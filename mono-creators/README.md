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
| `src/pages/Creators.tsx` | A página: hero, manifesto, benefícios, convite e a seção de cadastro. |
| `src/components/creators/HeroCreators.tsx` | O hero: slideshow automático de 5 ambientes, sem controles, com parallax. |
| `src/components/creators/CreatorForm.tsx` | Passo 1: a candidatura (formulário curto), com validação e máscaras. |
| `src/components/creators/PassoInbazz.tsx` | Passo 2: roteiro e modal com o cadastro da Inbazz embutido. |
| `src/data/creators.ts` | Conteúdo editável: benefícios, nichos, faixas de seguidores, formatos, UFs. |
| `src/lib/creators.ts` | Máscaras, validações, o envio e o link da Inbazz (`INBAZZ_STORE_ID`). |
| `src/test/creators.test.ts` | Testes das regras de validação (`npm test`). |

Para mudar texto de benefício, acrescentar um nicho ou uma faixa de seguidores,
mexa só em `src/data/creators.ts` — a página se ajusta sozinha.

## O cadastro em dois passos

A API de marcas da Inbazz não cria creator: a conta é do próprio creator, com
senha e código de confirmação por e-mail, e é ela que pede entrada na
comunidade da MONO. Por isso o cadastro é híbrido.

1. **Sua candidatura** (nosso formulário) — só o que a MONO precisa para avaliar
   o perfil e a Inbazz não pergunta: e-mail, Instagram e faixa de seguidores,
   TikTok, YouTube/Pinterest/site, nicho, formatos e um campo aberto. Nome,
   telefone, CPF, nascimento, gênero e endereço ficam só na Inbazz, para o
   creator não digitar nada duas vezes — o e-mail é o único campo repetido,
   porque é a chave entre as duas bases.
2. **Conta na Inbazz** — depois do envio, a seção vira um roteiro de três itens
   (tocar em *Cadastre-se*, usar **o mesmo e-mail**, confirmar o código) e um
   botão que abre `creators.inbazz.com.br/login?storeId=…` num modal. O iframe
   começa a carregar assim que o passo 2 aparece, porque o app da Inbazz leva
   alguns segundos para iniciar. Há sempre um link para abrir em outra aba.

O passo 2 fica guardado na sessão do navegador: quem recarrega a página volta
direto para ele. O link "Preencher a candidatura de novo" limpa isso.

**Como o time junta as duas coisas:** quem pede entrada na comunidade aparece
no painel da Inbazz, com nome e telefone; o e-mail é a chave para achar a
candidatura na nossa base. Quem manda a candidatura e não termina a conta na
Inbazz fica só com e-mail e @ — o contato de recuperação é por e-mail.

O que o formulário garante antes de enviar:

- **Instagram e TikTok** normalizados: `@perfil`, `instagram.com/perfil/` ou
  `perfil` chegam na base sempre como `perfil`. E-mail chega em minúsculas.
- **Aceite dos termos** obrigatório.

## Onde o cadastro é gravado

```
navegador ──POST──▶ /api/creators (função da Vercel) ──secret key──▶ Supabase
                                                                     tabela creators_candidaturas
```

- `api/creators.ts` valida tudo de novo (o formulário pode ser pulado com um
  POST direto), descarta robô pelo campo-isca escondido `site` e grava com
  `upsert` pelo e-mail: quem reenvia atualiza a própria linha, sem duplicar, e
  o `status` dado pelo time não é apagado.
- A tabela está em `supabase/migrations/`. RLS ligado e **sem policies**: só a
  secret key (no servidor) lê e escreve. A publishable key não é usada.
- Colunas para o time: `status` (`nova`, `conta_inbazz`, `aprovada`,
  `recusada`) e `observacoes`.

### Variáveis de ambiente (Vercel)

| Variável | Onde | Obrigatória | Observação |
| --- | --- | --- | --- |
| `SUPABASE_URL` | servidor | sim | `https://lnhrlzythenvbwnxecvu.supabase.co` (projeto Supabase **Mono Creators**, org Lesco Free). |
| `SUPABASE_SECRET_KEY` | servidor | sim | `sb_secret_…`, sensível, só Production e Preview. Nunca com prefixo `VITE_`. |
| `VITE_INBAZZ_STORE_ID` | navegador | não | Mesmo valor que já está no código; serve para trocar sem commit. |
| `VITE_CREATORS_ENDPOINT` | navegador | não | Padrão: `/api/creators` publicado; vazio no `npm run dev`. |

Os nomes antigos `SUPABASE_SERVICE_ROLE_KEY` e `NEXT_PUBLIC_SUPABASE_URL`
também são aceitos, caso a integração crie esses. Modelo em `.env.example`.

No `npm run dev` a função não roda: o formulário só registra o payload no
console. Para testar com o banco localmente, use `vercel dev`.

## Pendências

- [x] Tabela criada no projeto Supabase (aplicada com `supabase db query`, então não
      aparece no histórico de migrações do `db push`).
- [ ] Colar a secret key em `SUPABASE_SECRET_KEY` na Vercel e fazer redeploy.
- [ ] Fazer um cadastro real de ponta a ponta pelo modal e confirmar que o pedido
      chega na comunidade da MONO no painel da Inbazz.
- [ ] Página ou PDF com os **termos do programa** — o aceite hoje não aponta para
      lugar nenhum.
- [ ] Trocar as fotos por imagens de campanha, se houver. Hoje o slideshow do
      hero usa cinco ambientes do catálogo (lista no topo de `HeroCreators.tsx`)
      e a seção de convite usa `liso-amb-02.jpg`.
- [ ] Decidir se `/creators` entra no menu do site ou fica só na bio do Instagram.

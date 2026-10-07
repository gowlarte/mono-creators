# MONO Creators — landing de recrutamento

Landing de captação de influenciadores para o programa MONO Creators, no ar em
**`/creators`** dentro do site principal. Esta pasta guarda o briefing, o copy
aprovado e os assets de campanha; o código vive no `src/` do site, reaproveitando
o design system da MONO (fontes PP Right Gothic / PP Neue York, paleta `mono-*`,
`Navbar`, `MonoFooter`, `AnimateOnScroll` e os componentes shadcn já instalados).

## Onde está cada coisa

| Arquivo | O que é |
| --- | --- |
| `src/pages/Creators.tsx` | A página: hero, manifesto, benefícios, convite e a seção de cadastro. |
| `src/components/creators/HeroCreators.tsx` | O hero: slideshow automático de 5 ambientes, sem controles, com parallax. |
| `src/components/creators/CreatorForm.tsx` | O formulário completo, com validação e máscaras. |
| `src/data/creators.ts` | Conteúdo editável: benefícios, nichos, faixas de seguidores, formatos, UFs. |
| `src/lib/creators.ts` | Máscaras, validação de CPF e data, busca de CEP e o envio. |
| `src/test/creators.test.ts` | Testes das regras de validação (`npm test`). |

Para mudar texto de benefício, acrescentar um nicho ou uma faixa de seguidores,
mexa só em `src/data/creators.ts` — a página se ajusta sozinha.

## O formulário

Estrutura inspirada no cadastro da Inbazz (referência: `inbazz.com.br/zerezes`),
adaptada ao universo da MONO. Quatro blocos numerados numa página só:

1. **Seus dados** — nome, sobrenome, e-mail, CPF, data de nascimento, WhatsApp, gênero.
2. **Seu conteúdo** — Instagram, faixa de seguidores, TikTok, YouTube/Pinterest/site,
   nicho principal e formatos que mais produz.
3. **Endereço de entrega** — CEP (preenche o resto via ViaCEP), estado, cidade,
   bairro, endereço, número, complemento.
4. **Sobre a parceria** — sugestão de cupom, se já conhecia a MONO, se já fez
   parceria com marcas do setor e um campo aberto sobre o trabalho.

Fecha com o aceite dos termos e o botão **Quero ser MONO Creator**.

O que o formulário já garante antes de enviar:

- **CPF** conferido pelos dígitos verificadores (recusa `111.111.111-11` e afins).
- **Data de nascimento** que existe no calendário e com 18 anos ou mais.
- **Telefone** com DDD, aceitando fixo e celular.
- **CEP** completo, que busca o endereço no ViaCEP e preenche estado, cidade,
  bairro e logradouro — sempre editáveis na mão, se a busca falhar.
- **Instagram e TikTok** normalizados: `@perfil`, `instagram.com/perfil/` ou
  `perfil` chegam na base sempre como `perfil`.
- **Aceite dos termos** obrigatório.

## Para o cadastro começar a chegar

Hoje o envio aponta para um endpoint que ainda não existe. Enquanto a variável
estiver vazia, o formulário valida tudo, mostra a tela de confirmação e registra
o payload no console do navegador — **nada é gravado em lugar nenhum**.

Para ligar de verdade, basta criar um `.env` na raiz do site com:

```
VITE_CREATORS_ENDPOINT=https://url-que-recebe-o-post
```

O destino precisa apenas aceitar um `POST` com JSON. O corpo enviado é o
formulário inteiro mais `origem: "site/creators"` e `enviadoEm` (ISO). Serve
webhook da Inbazz, do GoHighLevel, do Make/Zapier ou um Apps Script jogando numa
planilha — a escolha é do TI e não muda nada na página.

## Pendências

- [ ] Definir o destino do cadastro e preencher `VITE_CREATORS_ENDPOINT`.
- [ ] Página ou PDF com os **termos do programa** — o aceite hoje não aponta para
      lugar nenhum.
- [ ] Trocar as fotos por imagens de campanha, se houver. Hoje o slideshow do
      hero usa cinco ambientes do catálogo (lista no topo de `HeroCreators.tsx`)
      e a seção de convite usa `liso-amb-02.jpg`.
- [ ] Decidir se `/creators` entra no menu do site ou fica só na bio do Instagram.

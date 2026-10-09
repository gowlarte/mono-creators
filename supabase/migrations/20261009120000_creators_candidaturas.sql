-- Candidaturas do MONO Creators (passo 1 da landing).
--
-- Só a função /api/creators grava aqui, com a secret key, que ignora RLS.
-- RLS fica ligado e sem nenhuma policy: a publishable key não lê nem escreve,
-- então e-mails de candidatos não vazam mesmo que a chave pública circule.

create table if not exists public.creators_candidaturas (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),

  -- Chave para cruzar com o pedido de entrada na comunidade da Inbazz.
  -- Sempre em minúsculas; quem reenvia a candidatura atualiza a linha.
  email text not null unique check (email = lower(email)),

  instagram text not null,
  seguidores_instagram text not null,
  tiktok text,
  youtube text,
  nicho text not null,
  formatos text[] not null default '{}',
  sobre_voce text,
  aceite_termos_em timestamptz not null,

  -- Acompanhamento do time: nova → conta_inbazz → aprovada | recusada.
  status text not null default 'nova'
    check (status in ('nova', 'conta_inbazz', 'aprovada', 'recusada')),
  observacoes text,

  origem text not null default 'site/creators'
);

comment on table public.creators_candidaturas is
  'Candidaturas da landing MONO Creators. Gravação só pela função /api/creators (secret key).';

create index if not exists creators_candidaturas_criado_em_idx
  on public.creators_candidaturas (criado_em desc);
create index if not exists creators_candidaturas_status_idx
  on public.creators_candidaturas (status);

alter table public.creators_candidaturas enable row level security;

create or replace function public.creators_candidaturas_tocar_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

drop trigger if exists creators_candidaturas_atualizado_em on public.creators_candidaturas;
create trigger creators_candidaturas_atualizado_em
  before update on public.creators_candidaturas
  for each row execute function public.creators_candidaturas_tocar_atualizado_em();

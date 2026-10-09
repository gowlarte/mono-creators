-- O formulário deixou de ter o aceite de termos (não há termos publicados
-- para o creator ler), então a coluna não registra mais nada.
alter table public.creators_candidaturas drop column if exists aceite_termos_em;

-- Função usada pelo Vercel Cron (/api/cron/keep-alive) para gerar atividade
-- diária no banco e evitar a pausa do plano Free. Não lê nenhuma tabela.
create or replace function public.keep_alive()
returns timestamptz
language sql
stable
as $$
  select now();
$$;

revoke all on function public.keep_alive() from public;
grant execute on function public.keep_alive() to anon, authenticated;

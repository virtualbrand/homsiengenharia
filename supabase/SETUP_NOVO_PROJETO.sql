-- ==============================================
-- SETUP DE UM PROJETO SUPABASE NOVO (tudo que o site precisa)
-- Execute este SQL inteiro, uma vez, no SQL Editor do Supabase.
--
-- Junta SETUP_COMPLETO.sql e as migrations que ele não cobria:
--   - create_categories_and_tags_tables.sql
--   - 06_change_old_slug_to_text.sql
--   - 07_add_keep_alive_function.sql
-- Pode ser executado de novo sem erro (é idempotente).
-- ==============================================

-- ----------------------------------------------
-- 1. Função compartilhada para atualizar updated_at
-- ----------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- ----------------------------------------------
-- 2. Posts do blog
-- ----------------------------------------------
create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  category text,
  tags text[],
  author_id uuid references auth.users(id) on delete cascade,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  meta_title text,
  meta_description text,
  og_image text,
  -- Slug anterior, para redirecionar links antigos após renomear um post
  old_slug text default null
);

comment on column public.blog_posts.old_slug is 'Slug anterior para redirecionamento automático (apenas 1)';

create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_published_idx on public.blog_posts(published);
create index if not exists blog_posts_author_id_idx on public.blog_posts(author_id);
create index if not exists blog_posts_category_idx on public.blog_posts(category);
create index if not exists blog_posts_tags_idx on public.blog_posts using gin(tags);
create index if not exists idx_blog_posts_old_slug on public.blog_posts(old_slug);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published posts" on public.blog_posts;
create policy "Public can read published posts"
  on public.blog_posts for select
  using (published = true);

drop policy if exists "Authenticated users can read all posts" on public.blog_posts;
create policy "Authenticated users can read all posts"
  on public.blog_posts for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert posts" on public.blog_posts;
create policy "Authenticated users can insert posts"
  on public.blog_posts for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Authors can update own posts" on public.blog_posts;
create policy "Authors can update own posts"
  on public.blog_posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "Authors can delete own posts" on public.blog_posts;
create policy "Authors can delete own posts"
  on public.blog_posts for delete
  to authenticated
  using (auth.uid() = author_id);

drop trigger if exists handle_blog_posts_updated_at on public.blog_posts;
create trigger handle_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.handle_updated_at();

-- ----------------------------------------------
-- 3. Categorias e tags
-- ----------------------------------------------
create table if not exists public.blog_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  featured_image text,
  meta_title text,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.blog_tags (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  featured_image text,
  meta_title text,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_blog_categories_slug on public.blog_categories(slug);
create index if not exists idx_blog_tags_slug on public.blog_tags(slug);

alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;

drop policy if exists "Enable read access for all users" on public.blog_categories;
create policy "Enable read access for all users" on public.blog_categories
  for select using (true);
drop policy if exists "Enable insert for authenticated users only" on public.blog_categories;
create policy "Enable insert for authenticated users only" on public.blog_categories
  for insert with check (auth.role() = 'authenticated');
drop policy if exists "Enable update for authenticated users only" on public.blog_categories;
create policy "Enable update for authenticated users only" on public.blog_categories
  for update using (auth.role() = 'authenticated');
drop policy if exists "Enable delete for authenticated users only" on public.blog_categories;
create policy "Enable delete for authenticated users only" on public.blog_categories
  for delete using (auth.role() = 'authenticated');

drop policy if exists "Enable read access for all users" on public.blog_tags;
create policy "Enable read access for all users" on public.blog_tags
  for select using (true);
drop policy if exists "Enable insert for authenticated users only" on public.blog_tags;
create policy "Enable insert for authenticated users only" on public.blog_tags
  for insert with check (auth.role() = 'authenticated');
drop policy if exists "Enable update for authenticated users only" on public.blog_tags;
create policy "Enable update for authenticated users only" on public.blog_tags
  for update using (auth.role() = 'authenticated');
drop policy if exists "Enable delete for authenticated users only" on public.blog_tags;
create policy "Enable delete for authenticated users only" on public.blog_tags
  for delete using (auth.role() = 'authenticated');

drop trigger if exists update_blog_categories_updated_at on public.blog_categories;
create trigger update_blog_categories_updated_at
  before update on public.blog_categories
  for each row execute function public.handle_updated_at();

drop trigger if exists update_blog_tags_updated_at on public.blog_tags;
create trigger update_blog_tags_updated_at
  before update on public.blog_tags
  for each row execute function public.handle_updated_at();

-- ----------------------------------------------
-- 4. Keep-alive (Vercel Cron em /api/cron/keep-alive)
-- Gera atividade diária no banco para evitar a pausa do plano Free.
-- Não lê nenhuma tabela.
-- ----------------------------------------------
create or replace function public.keep_alive()
returns timestamptz
language sql
stable
as $$
  select now();
$$;

revoke all on function public.keep_alive() from public;
grant execute on function public.keep_alive() to anon, authenticated;

-- ==============================================
-- PRONTO! Próximo passo: criar o usuário do admin em
-- Authentication → Users.
-- ==============================================

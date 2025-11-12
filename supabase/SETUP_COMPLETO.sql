-- ==============================================
-- MIGRATION COMPLETA PARA BLOG
-- Execute este SQL no SQL Editor do Supabase
-- ==============================================

-- 1. Criar tabela blog_posts
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
  meta_keywords text,
  og_image text
);

-- 2. Criar índices
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_published_idx on public.blog_posts(published);
create index if not exists blog_posts_author_id_idx on public.blog_posts(author_id);
create index if not exists blog_posts_category_idx on public.blog_posts(category);
create index if not exists blog_posts_tags_idx on public.blog_posts using gin(tags);

-- 3. Habilitar Row Level Security
alter table public.blog_posts enable row level security;

-- 4. Criar políticas de segurança
-- Qualquer pessoa pode ler posts publicados
create policy "Public can read published posts"
  on public.blog_posts for select
  using (published = true);

-- Usuários autenticados podem ler todos os posts
create policy "Authenticated users can read all posts"
  on public.blog_posts for select
  to authenticated
  using (true);

-- Usuários autenticados podem criar posts
create policy "Authenticated users can insert posts"
  on public.blog_posts for insert
  to authenticated
  with check (auth.uid() = author_id);

-- Autores podem atualizar seus próprios posts
create policy "Authors can update own posts"
  on public.blog_posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- Autores podem deletar seus próprios posts
create policy "Authors can delete own posts"
  on public.blog_posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- 5. Criar função para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 6. Criar trigger
create trigger handle_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.handle_updated_at();

-- ==============================================
-- PRONTO! Agora você pode criar posts.
-- ==============================================

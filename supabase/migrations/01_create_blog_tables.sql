-- Create blog_posts table
create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  author_id uuid references auth.users(id) on delete cascade,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create an index on slug for faster lookups
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);

-- Create an index on published for filtering
create index if not exists blog_posts_published_idx on public.blog_posts(published);

-- Create an index on author_id
create index if not exists blog_posts_author_id_idx on public.blog_posts(author_id);

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Create policies
-- Anyone can read published posts
create policy "Public can read published posts"
  on public.blog_posts for select
  using (published = true);

-- Authenticated users can read all posts (including drafts)
create policy "Authenticated users can read all posts"
  on public.blog_posts for select
  to authenticated
  using (true);

-- Authenticated users can insert posts
create policy "Authenticated users can insert posts"
  on public.blog_posts for insert
  to authenticated
  with check (auth.uid() = author_id);

-- Authors can update their own posts
create policy "Authors can update own posts"
  on public.blog_posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- Authors can delete their own posts
create policy "Authors can delete own posts"
  on public.blog_posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger handle_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.handle_updated_at();

-- Create blog_categories table (optional, for future use)
create table if not exists public.blog_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create blog_post_categories junction table (many-to-many)
create table if not exists public.blog_post_categories (
  post_id uuid references public.blog_posts(id) on delete cascade,
  category_id uuid references public.blog_categories(id) on delete cascade,
  primary key (post_id, category_id)
);

-- Enable RLS on categories
alter table public.blog_categories enable row level security;

-- Anyone can read categories
create policy "Public can read categories"
  on public.blog_categories for select
  using (true);

-- Authenticated users can manage categories
create policy "Authenticated users can manage categories"
  on public.blog_categories for all
  to authenticated
  using (true)
  with check (true);

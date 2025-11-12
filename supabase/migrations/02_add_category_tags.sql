-- Add category and tags fields to blog_posts table
alter table public.blog_posts
add column if not exists category text,
add column if not exists tags text[];

-- Create index on category for filtering
create index if not exists blog_posts_category_idx on public.blog_posts(category);

-- Create index on tags for filtering
create index if not exists blog_posts_tags_idx on public.blog_posts using gin(tags);

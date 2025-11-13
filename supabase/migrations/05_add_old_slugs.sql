-- Adiciona campo para armazenar slugs antigos
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS old_slugs TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Adiciona índice para melhorar performance nas buscas
CREATE INDEX IF NOT EXISTS idx_blog_posts_old_slugs ON blog_posts USING GIN (old_slugs);

-- Adiciona comentário explicativo
COMMENT ON COLUMN blog_posts.old_slugs IS 'Array de slugs antigos para redirecionamento automático';

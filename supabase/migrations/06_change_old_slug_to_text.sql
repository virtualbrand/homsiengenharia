-- Altera o campo old_slugs de array para text simples
ALTER TABLE blog_posts
DROP COLUMN IF EXISTS old_slugs;

ALTER TABLE blog_posts
ADD COLUMN old_slug TEXT DEFAULT NULL;

-- Adiciona índice para melhorar performance nas buscas
CREATE INDEX IF NOT EXISTS idx_blog_posts_old_slug ON blog_posts (old_slug);

-- Adiciona comentário explicativo
COMMENT ON COLUMN blog_posts.old_slug IS 'Slug anterior para redirecionamento automático (apenas 1)';

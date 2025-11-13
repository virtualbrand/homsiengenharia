-- Execute este SQL no Supabase para adicionar o slug antigo manualmente

-- Atualiza o post teste-3 para incluir teste-2 nos slugs antigos
UPDATE blog_posts
SET old_slugs = ARRAY['teste-2', 'teste']
WHERE slug = 'teste-3';

-- Verifica se funcionou
SELECT slug, old_slugs FROM blog_posts WHERE slug = 'teste-3';

-- Verifica a estrutura da tabela (apenas colunas com slug)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
AND column_name LIKE '%slug%';

-- Mostra todos os posts com seus slugs (SEM old_slugs que não existe)
SELECT id, slug, old_slug
FROM blog_posts 
WHERE slug = 'testando-o-artigo' OR slug = 'novo-artigoa';

-- Busca posts onde old_slug é 'novo-artigoa'
SELECT id, slug, old_slug 
FROM blog_posts 
WHERE old_slug = 'novo-artigoa';

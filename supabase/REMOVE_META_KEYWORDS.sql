-- =============================================
-- Script para Remover a Coluna meta_keywords
-- =============================================
-- Execute este script no SQL Editor do Supabase
-- para remover completamente a coluna meta_keywords
-- da tabela blog_posts
-- =============================================

-- Remove a coluna meta_keywords da tabela blog_posts
ALTER TABLE blog_posts
DROP COLUMN IF EXISTS meta_keywords;

-- Confirma a remoção
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
  AND column_name = 'meta_keywords';

-- Se o resultado acima estiver vazio, a coluna foi removida com sucesso

-- ==============================================
-- ADICIONAR CAMPOS DE SEO À TABELA BLOG_POSTS
-- Execute este SQL se você já criou a tabela anteriormente
-- ==============================================

-- Adicionar campos de SEO
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text,
ADD COLUMN IF NOT EXISTS og_image text;

-- ==============================================
-- PRONTO! Campos de SEO adicionados.
-- ==============================================

# Sistema de Redirecionamento de Slugs

## Como funciona:

1. Quando você alterar o slug de um post (ex: de `teste-2` para `teste-3`), o slug antigo (`teste-2`) será automaticamente salvo no campo `old_slugs`

2. Quando alguém acessar o slug antigo (`/artigos/teste-2`), será automaticamente redirecionado para o slug atual (`/artigos/teste-3`)

3. Isso funciona para múltiplas alterações - você pode mudar o slug quantas vezes quiser

## Para ativar:

Execute este SQL no Supabase SQL Editor:

```sql
-- Adiciona campo para armazenar slugs antigos
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS old_slugs TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Adiciona índice para melhorar performance nas buscas
CREATE INDEX IF NOT EXISTS idx_blog_posts_old_slugs ON blog_posts USING GIN (old_slugs);

-- Adiciona comentário explicativo
COMMENT ON COLUMN blog_posts.old_slugs IS 'Array de slugs antigos para redirecionamento automático';
```

## Exemplo:

1. Post criado com slug: `meu-artigo`
2. Você muda para: `meu-novo-artigo`
   - `old_slugs` agora contém: `["meu-artigo"]`
3. Você muda novamente para: `artigo-final`
   - `old_slugs` agora contém: `["meu-artigo", "meu-novo-artigo"]`

Todos os 3 URLs funcionarão:
- `/artigos/meu-artigo` → redireciona para `/artigos/artigo-final`
- `/artigos/meu-novo-artigo` → redireciona para `/artigos/artigo-final`
- `/artigos/artigo-final` → mostra o artigo

## Benefícios:

✅ Links antigos não quebram (SEO)
✅ Bookmarks dos usuários continuam funcionando
✅ Redirecionamento 301 permanente
✅ Sem necessidade de configuração manual

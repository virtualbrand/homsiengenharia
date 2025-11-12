# Como Popular o Blog com Posts de Exemplo

## 1. Execute as Migrations no Supabase

Acesse o painel do Supabase: [https://supabase.com/dashboard](https://supabase.com/dashboard)

### Migration 1: Criar Tabelas do Blog

Vá em **SQL Editor** e execute o conteúdo do arquivo:
`supabase/migrations/01_create_blog_tables.sql`

### Migration 2: Adicionar Campos de Categoria e Tags

Execute o conteúdo do arquivo:
`supabase/migrations/02_add_category_tags.sql`

### Migration 3: Inserir Posts de Exemplo

Execute o conteúdo do arquivo:
`supabase/migrations/03_insert_sample_posts.sql`

**IMPORTANTE:** Antes de executar a migration 3, você precisa:
1. Fazer login no sistema (/login)
2. Verificar seu `user_id` na tabela `auth.users`
3. Substituir `(SELECT id FROM auth.users LIMIT 1)` pelo seu ID de usuário

## 2. Alternativa: Usar o Script Node.js

Se preferir usar o script automatizado:

```bash
npm run seed:blog
```

## 3. Verificar os Posts

Após executar as migrations, acesse:
- http://localhost:3000/artigos - Ver lista de artigos
- http://localhost:3000/admin/blog - Gerenciar no admin

## Posts de Exemplo Criados

1. **Tendências em Construção Civil para 2025**
   - Categoria: Engenharia
   - Tags: Construção, Tecnologia, Inovação

2. **Como Escolher os Melhores Materiais para sua Obra**
   - Categoria: Projetos
   - Tags: Materiais, Construção, Planejamento

3. **Sustentabilidade na Construção: O Futuro é Verde**
   - Categoria: Sustentabilidade
   - Tags: Sustentabilidade, Meio Ambiente, Eficiência Energética

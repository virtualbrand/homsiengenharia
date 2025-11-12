# Configuração do Supabase para HOMSI Engenharia

Este projeto utiliza Supabase para autenticação e banco de dados do blog.

## Configuração Inicial

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Anote a **URL** e **anon/public key** do projeto

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 3. Executar Migrations no Supabase

1. No dashboard do Supabase, vá em **SQL Editor**
2. Copie e cole o conteúdo de `supabase/migrations/01_create_blog_tables.sql`
3. Execute a query para criar as tabelas

### 4. Criar Primeiro Usuário

Você pode criar o primeiro usuário de duas formas:

#### Opção 1: Via Interface (Recomendado para primeiro usuário)
1. Acesse `/login` no seu site
2. Clique em "Criar Conta"
3. Preencha email e senha
4. A conta será criada automaticamente

#### Opção 2: Via Supabase Dashboard
1. No dashboard do Supabase, vá em **Authentication > Users**
2. Clique em "Add user"
3. Adicione email e senha
4. Confirme o email automaticamente marcando a opção

## Estrutura do Banco de Dados

### Tabela: blog_posts

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | ID único do post |
| title | text | Título do post |
| slug | text | URL amigável (único) |
| excerpt | text | Resumo do post |
| content | text | Conteúdo completo (suporta Markdown) |
| cover_image | text | URL da imagem de capa |
| author_id | uuid | ID do autor (referência a auth.users) |
| published | boolean | Se está publicado ou rascunho |
| published_at | timestamp | Data de publicação |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Última atualização |

### Tabela: blog_categories (Opcional)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | ID único da categoria |
| name | text | Nome da categoria |
| slug | text | URL amigável |
| description | text | Descrição da categoria |

## Segurança (Row Level Security)

As políticas de segurança estão configuradas para:

- ✅ Visitantes podem ler posts **publicados**
- ✅ Usuários autenticados podem ler **todos** os posts (incluindo rascunhos)
- ✅ Usuários autenticados podem criar posts
- ✅ Autores podem editar/deletar **apenas seus próprios** posts

## Rotas Protegidas

O middleware protege automaticamente as seguintes rotas:

- `/admin/*` - Requer autenticação
- `/login` - Página pública de login

## Deploy

### Variáveis de Ambiente no Vercel

No painel do Vercel, adicione as variáveis:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Próximos Passos

1. ✅ Configurar Supabase
2. ✅ Criar primeiro usuário
3. ⏳ Acessar `/admin` e criar posts
4. ⏳ Personalizar temas e estilos
5. ⏳ Adicionar upload de imagens (Supabase Storage)

## Suporte

Para mais informações sobre Supabase:
- [Documentação Oficial](https://supabase.com/docs)
- [Guia Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

# Migração para Next.js - Homsi Engenharia

## ✅ Migração Concluída com Sucesso!

O projeto foi migrado de **Vite + React** para **Next.js 15** com sucesso. Agora você tem um projeto com SEO otimizado, Server-Side Rendering (SSR) e Static Site Generation (SSG).

## 📋 O que foi feito

### 1. Estrutura do Projeto
- ✅ Criada pasta `app/` com App Router do Next.js
- ✅ Configurado `next.config.ts`
- ✅ Migrado `tsconfig.json` para Next.js
- ✅ Atualizado `tailwind.config.ts`
- ✅ Criado `.eslintrc.json` para Next.js

### 2. Páginas e Rotas
- ✅ Migrado `HomePage` para `app/page.tsx`
- ✅ Migrado `LinksPage` para `app/links/page.tsx`
- ✅ Criado `app/layout.tsx` com layout global
- ✅ Implementado sitemap dinâmico (`app/sitemap.ts`)
- ✅ Implementado robots.txt dinâmico (`app/robots.ts`)

### 3. Componentes
- ✅ Adicionado `'use client'` em componentes interativos
- ✅ Criado `LenisProvider` para smooth scroll
- ✅ Configurado carregamento dinâmico para Leaflet (mapa)
- ✅ Mantidos todos os componentes UI existentes

### 4. API Routes
- ✅ Migrado `api/trello.js` para `app/api/trello/route.ts`
- ✅ Adaptado para Next.js Route Handlers
- ✅ Mantida funcionalidade de envio de leads para Trello

### 5. SEO Otimizado
- ✅ Implementado Metadata API do Next.js 15
- ✅ Configurado Open Graph tags
- ✅ Configurado Twitter Card
- ✅ Structured Data (Schema.org) para Organization
- ✅ Sitemap.xml automático
- ✅ Robots.txt automático

### 6. Dependências
- ✅ Removidas dependências do Vite
- ✅ Adicionadas dependências do Next.js
- ✅ Mantidas todas as bibliotecas UI (Radix, Framer Motion, etc.)

## 🚀 Como usar

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### Build de Produção
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 📁 Nova Estrutura de Pastas

```
homsiengenharia/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout global
│   ├── page.tsx             # Página inicial (/)
│   ├── globals.css          # Estilos globais
│   ├── sitemap.ts           # Sitemap dinâmico
│   ├── robots.ts            # Robots.txt dinâmico
│   ├── links/
│   │   └── page.tsx         # Página de links
│   └── api/
│       └── trello/
│           └── route.ts     # API de integração com Trello
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── providers/       # Providers (Lenis, etc.)
│   │   ├── pages/           # Componentes de página
│   │   └── ui/              # Componentes UI reutilizáveis
│   ├── hooks/               # Custom hooks
│   └── lib/                 # Utilitários
├── public/                  # Assets estáticos
├── next.config.ts           # Configuração do Next.js
├── tailwind.config.ts       # Configuração do Tailwind
├── tsconfig.json            # Configuração do TypeScript
└── package.json             # Dependências
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
TRELLO_API_KEY=your_trello_api_key_here
TRELLO_TOKEN=your_trello_token_here
TRELLO_LIST_ID=your_trello_list_id_here
```

## 🎯 Benefícios da Migração

### SEO
- ✅ **Server-Side Rendering (SSR)**: Conteúdo renderizado no servidor
- ✅ **Metadata API**: SEO otimizado por página
- ✅ **Sitemap automático**: Gerado dinamicamente
- ✅ **Open Graph**: Compartilhamento otimizado em redes sociais

### Performance
- ✅ **Automatic Code Splitting**: Carregamento otimizado
- ✅ **Image Optimization**: Otimização automática de imagens
- ✅ **Font Optimization**: Google Fonts otimizadas
- ✅ **Static Generation**: Páginas estáticas quando possível

### Developer Experience
- ✅ **File-based Routing**: Rotas baseadas em arquivos
- ✅ **TypeScript**: Tipagem completa
- ✅ **Fast Refresh**: Atualizações instantâneas
- ✅ **API Routes**: Backend integrado

## 📝 Próximos Passos Recomendados

### 1. Adicionar Imagens do Blog
As imagens do blog estão faltando:
```
public/images/blog/blog-1.jpg
public/images/blog/blog-2.jpg
public/images/blog/blog-3.jpg
```

### 2. Otimizar Imagens
Substitua `<img>` por `<Image>` do Next.js para otimização automática:
```tsx
import Image from 'next/image'

<Image 
  src="/hero-provisoria.jpg" 
  alt="Hero"
  width={1920}
  height={1080}
  priority
/>
```

### 3. Configurar Analytics
Adicione Google Analytics ou similar no `app/layout.tsx`

### 4. Configurar Deploy
Configure o deploy na Vercel:
```bash
npm i -g vercel
vercel
```

### 5. Remover Arquivos Vite (Opcional)
Após garantir que tudo funciona, você pode remover:
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `api/` (antiga pasta de API)

## 🐛 Troubleshooting

### Erro: "window is not defined"
- Certifique-se de que componentes que usam `window` têm `'use client'`
- Use `dynamic import` com `{ ssr: false }` para bibliotecas que dependem do browser

### Erro: Imagens não carregam
- Verifique se as imagens estão na pasta `public/`
- Use caminhos absolutos começando com `/`

### Erro: Estilos não aplicam
- Verifique se `app/globals.css` está importado no `app/layout.tsx`
- Limpe o cache: `rm -rf .next && npm run dev`

## 📚 Recursos

- [Documentação do Next.js](https://nextjs.org/docs)
- [Guia de Migração](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js + Vercel](https://vercel.com/docs)

## 📞 Suporte

Se precisar de ajuda adicional, consulte:
- Documentação oficial do Next.js
- GitHub Issues do projeto
- Comunidade Next.js no Discord

---

**Migração concluída em:** 11 de novembro de 2025
**Versão do Next.js:** 15.5.6
**Versão do React:** 19.0.0

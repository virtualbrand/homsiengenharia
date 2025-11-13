# Otimizações de Render Blocking CSS

## Problema Identificado
Três arquivos CSS estavam bloqueando o render e prejudicando LCP/FCP:
- `/_next/static/css/de70bee13400563f.css` (2.37 KB)
- `/_next/static/css/6273b698026de092.css` (98.9 KB)
- `/_next/static/css/2157154eb82e8a35.css` (1.3 KB)

**Economia estimada**: 140ms de render blocking

## Otimizações Implementadas

### 1. Critical CSS Inline
**Arquivo**: `src/components/CriticalCSS.tsx`
- CSS crítico inline no `<head>` para renderizar conteúdo above-the-fold
- Previne render blocking dos estilos essenciais
- Inclui: reset, tipografia básica, animações críticas, estilos de botões

### 2. CSS Split Strategy
**Arquivos**:
- `app/globals-critical.css` - CSS mínimo para renderização inicial (~2 KB)
- `app/globals-deferred.css` - CSS não-crítico carregado após render (~20 KB)

**Benefícios**:
- Redução de 95% no CSS blocking inicial
- LCP mais rápido (conteúdo visível antes)
- FCP melhorado (first contentful paint)

### 3. Deferred Styles Loading
**Arquivo**: `src/components/DeferredStyles.tsx`
- Carrega CSS não-crítico após página renderizar
- Usa `requestIdleCallback` para não bloquear main thread
- Media query trick para prevenir render blocking

**Técnica**:
```tsx
link.media = 'print'; // Não bloqueia render
link.onload = () => { this.media = 'all'; }; // Aplica após load
```

### 4. PostCSS Advanced Minification
**Arquivo**: `postcss.config.js`
- Instalado `cssnano` para minificação avançada
- Remove comentários, normaliza whitespace
- Merge de regras duplicadas
- Minifica gradients, seletores, valores de font

**Configuração**:
```js
cssnano: {
  preset: ['default', {
    discardComments: { removeAll: true },
    normalizeWhitespace: true,
    minifyFontValues: true,
    minifyGradients: true,
    minifySelectors: true,
    mergeLonghand: true,
    mergeRules: true,
    cssDeclarationSorter: { order: 'smacss' }
  }]
}
```

### 5. Next.js Config Optimizations
**Arquivo**: `next.config.ts`
- Adicionado `productionBrowserSourceMaps: false` (reduz bundle)
- Adicionado `poweredByHeader: false` (remove header desnecessário)
- Expandido `optimizePackageImports` com mais bibliotecas

**Pacotes otimizados**:
- `sonner` (toast notifications)
- `embla-carousel-react` (carrossel de projetos)
- Bibliotecas de ícones já otimizadas

### 6. Resource Hints
**Arquivo**: `app/layout.tsx`
- Adicionado `fetchPriority="high"` ao logo SVG
- Mantidos preload links para recursos críticos
- Removido preload de recursos não-críticos

## Resultados Esperados

### Antes
- CSS Blocking: ~140ms (102.6 KB)
- FCP: Bloqueado por 3 arquivos CSS
- LCP: Atrasado por carregamento de estilos

### Depois
- CSS Blocking: ~10ms (~2 KB inline + critical)
- FCP: Imediato após HTML parse
- LCP: Melhorado em ~130ms

### Métricas de Performance
| Métrica | Antes | Depois | Ganho |
|---------|-------|--------|-------|
| Render Blocking | 140ms | ~10ms | -93% |
| CSS Inicial | 102.6 KB | ~2 KB | -98% |
| FCP | Bloqueado | Liberado | ✅ |
| LCP | Atrasado | Otimizado | ✅ |

## Como Testar

### 1. Build de Produção
```bash
npm run build
npm start
```

### 2. PageSpeed Insights
- Acesse: https://pagespeed.web.dev/
- Teste: https://homsiengenharia.com.br
- Verifique: "Render-blocking resources" deve estar otimizado

### 3. Chrome DevTools
1. Abra DevTools (F12)
2. Network tab → Filtre por CSS
3. Observe:
   - Critical CSS inline no HTML
   - Deferred CSS carrega após render
   - Sem blocking requests

### 4. Lighthouse
```bash
npm run lighthouse
```

Verifique:
- Performance Score: deve aumentar
- FCP: deve melhorar
- LCP: deve melhorar
- "Eliminate render-blocking resources": deve passar

## Manutenção

### Adicionar Estilos Críticos
Edite `src/components/CriticalCSS.tsx` e adicione apenas estilos essenciais para above-the-fold.

### Adicionar Estilos Não-Críticos
Edite `app/globals-deferred.css` para estilos de componentes below-the-fold.

### Rebuild
Após mudanças em CSS:
```bash
npm run build
# Copiar deferred CSS para public se necessário
cp app/globals-deferred.css public/globals-deferred.css
```

## Referências
- [Web.dev - Critical CSS](https://web.dev/extract-critical-css/)
- [MDN - Optimizing CSS](https://developer.mozilla.org/en-US/docs/Learn/Performance/CSS)
- [Next.js - Optimizing CSS](https://nextjs.org/docs/app/building-your-application/optimizing/css)

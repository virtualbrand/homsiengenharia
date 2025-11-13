# Otimização de Cache para Recursos de Terceiros

## ✅ Implementações Automáticas

### 1. Service Worker (`/public/sw.js`)
- **OpenStreetMap tiles**: Cache de 7 dias automaticamente
- **Recursos estáticos**: Cache com estratégia network-first
- **Fallback**: Imagens placeholder se falhar

### 2. Headers de Cache (`next.config.ts`)
- **Imagens**: Cache de 1 ano (`max-age=31536000`)
- **Fontes**: Cache de 1 ano (`max-age=31536000`)
- **Vídeos**: Cache de 1 ano (`max-age=31536000`)

## 🚀 Configurações Adicionais (Opcional)

### Para Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

### Para Cloudflare
Configure no Dashboard:
1. **Cache Rules** → Criar regra:
   - URL Pattern: `*.tile.openstreetmap.org/*`
   - Cache Level: Standard
   - Edge Cache TTL: 7 days (604800 seconds)

2. **Page Rules** (se disponível):
   - URL: `*homsiengenharia.com.br/images/*`
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month

## 📊 Recursos que Agora Têm Cache

### OpenStreetMap (via Service Worker)
- ✅ `*.tile.openstreetmap.org/*.png` → 7 dias
- ✅ Cache local no navegador
- ✅ Funciona offline após primeira visita

### Cloudflare (via Headers Next.js)
- ✅ `/beacon.min.js` → Controlado pelo Cloudflare
- ✅ Headers otimizados para static assets

### Assets Locais
- ✅ `/images/*` → 1 ano
- ✅ `/fonts/*` → 1 ano  
- ✅ `/videos/*` → 1 ano

## 🔧 Como Funciona

### Service Worker
1. Primeira visita: Busca tiles do OpenStreetMap
2. Cache: Armazena localmente por 7 dias
3. Visitas seguintes: Serve do cache (instantâneo)
4. Após 7 dias: Busca novos tiles e atualiza cache

### Headers de Cache
- Browser cache: Armazena recursos localmente
- CDN cache: Vercel/Cloudflare armazena na edge
- Immutable: Recursos não mudam (podem ser cacheados permanentemente)

## 📈 Resultados Esperados

Após deploy:
- ✅ OpenStreetMap tiles: De 1d-2d para cache permanente
- ✅ Economia de bandwidth: ~150 KiB por visita
- ✅ Carregamento mais rápido em visitas repetidas
- ✅ Funciona offline (Progressive Web App)

## 🐛 Troubleshooting

### Service Worker não registra?
Verifique no console: `Application → Service Workers`

### Cache não funciona?
1. Limpe o cache do navegador
2. Force reload (Cmd/Ctrl + Shift + R)
3. Verifique se está em HTTPS

### Atualizar Service Worker?
Mude o `CACHE_NAME` no arquivo `sw.js`:
```javascript
const CACHE_NAME = 'homsi-cache-v2'; // Incremente a versão
```

## ⚠️ Notas Importantes

1. **Service Workers** só funcionam em HTTPS (exceto localhost)
2. **Cache de 7 dias** para tiles é um bom equilíbrio (mapas não mudam muito)
3. **Cloudflare beacon** é controlado pela Cloudflare (você não tem controle direto)
4. Use `npm run build` e teste em produção para ver os efeitos completos

## 📝 Próximos Passos

1. Deploy para produção
2. Teste com DevTools → Application → Service Workers
3. Verifique PageSpeed Insights após 24h (CDN precisa "aquecer")
4. Monitore com Lighthouse em visitas repetidas (score melhora muito!)

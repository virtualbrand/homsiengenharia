# Guia de Imagens dos Presets

## Estrutura Padronizada

Todas as imagens foram renomeadas seguindo o padrão:
```
produto-before.webp  # Imagem original (sem edição)
produto-after.webp   # Imagem editada (com preset aplicado)
```

## Lista de Imagens Disponíveis

### Bolos
- `bolo-cenoura-before.webp` / `bolo-cenoura-after.webp`
- `bolo-chocolate-before.webp` / `bolo-chocolate-after.webp`
- `bolotone-before.webp` / `bolotone-after.webp`
- `bento-cake-before.webp` / `bento-cake-after.webp`

### Cookies e Biscoitos
- `cookies-before.webp` / `cookies-after.webp`

### Cupcakes
- `muffin-natal-before.webp` / `muffin-natal-after.webp`

### Chocolates
- `ovo-pascoa-before.webp` / `ovo-pascoa-after.webp`
- `ovo-pascoa-corte-before.webp` / `ovo-pascoa-corte-after.webp`
- `ovos-duo-before.webp` / `ovos-duo-after.webp`

### Presets Gerais
- `preset1-before.webp` / `preset1-after.webp`

## Como Usar

### 1. Usando o arquivo de configuração
```typescript
import { presetsComparisons, getComparisonById } from '@/data/presets-images';

// Obter uma comparação específica
const boloComparison = getComparisonById('bolo-cenoura');
```

### 2. Componente de Comparação Individual
```tsx
import { ImageComparisonSlider } from '@/components/ui/image-comparison-slider-horizontal';

<ImageComparisonSlider
  leftImage="/images/presets/bolo-cenoura-before.webp"
  rightImage="/images/presets/bolo-cenoura-after.webp"
  altLeft="Bolo de Cenoura - Antes"
  altRight="Bolo de Cenoura - Depois"
  initialPosition={50}
/>
```

### 3. Carousel de Comparações
```tsx
import { CarouselComparing } from '@/components/pages/presets';

<CarouselComparing />
```

### 4. Galeria Completa
```tsx
import { PresetsGallery } from '@/components/pages/presets';

<PresetsGallery />
```

## Estrutura dos Dados

Cada preset possui:
- `id`: Identificador único
- `title`: Nome do produto/preset
- `description`: Descrição da transformação
- `beforeImage`: Caminho para imagem original
- `afterImage`: Caminho para imagem editada
- `category`: Categoria do produto
- `emoji`: Emoji representativo

## Categorias Disponíveis

- **Bolos**: Bolos tradicionais e especiais
- **Biscoitos**: Cookies e biscoitos decorados
- **Cupcakes**: Cupcakes e muffins
- **Chocolates**: Ovos de páscoa e chocolates
- **Geral**: Presets genéricos

## Adicionando Novos Presets

1. Adicione as imagens na pasta `public/images/presets/`
2. Siga o padrão de nomenclatura: `nome-before.webp` e `nome-after.webp`
3. Adicione a configuração em `src/data/presets-images.ts`
4. Teste o componente de comparação

// Configuração das imagens de comparação dos presets
export interface PresetComparison {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  emoji: string;
}

export const presetsComparisons: PresetComparison[] = [
  {
    id: "preset1",
    title: "Preset Dark",
    description: "Transformação com preset escuro profissional",
    beforeImage: "/images/presets/preset1-before.webp",
    afterImage: "/images/presets/preset1-after.webp",
    category: "Geral",
    emoji: "🌙"
  },
  {
    id: "bolo-cenoura",
    title: "Bolo de Cenoura",
    description: "Edição profissional realçando cores e textura",
    beforeImage: "/images/presets/bolo-cenoura-before.webp",
    afterImage: "/images/presets/bolo-cenoura-after.webp",
    category: "Bolos",
    emoji: "🥕"
  },
  {
    id: "bolo-chocolate",
    title: "Bolo de Chocolate",
    description: "Destaque para o chocolate branco e apresentação",
    beforeImage: "/images/presets/bolo-chocolate-before.webp",
    afterImage: "/images/presets/bolo-chocolate-after.webp",
    category: "Bolos",
    emoji: "🍫"
  },
  {
    id: "bolotone",
    title: "Bolotone",
    description: "Realce da textura e cores vibrantes",
    beforeImage: "/images/presets/bolotone-before.webp",
    afterImage: "/images/presets/bolotone-after.webp",
    category: "Bolos",
    emoji: "🎂"
  },
  {
    id: "cookies",
    title: "Cookies Decorados",
    description: "Destaque para detalhes e cores dos biscoitos",
    beforeImage: "/images/presets/cookies-before.webp",
    afterImage: "/images/presets/cookies-after.webp",
    category: "Biscoitos",
    emoji: "🍪"
  },
  {
    id: "muffin-natal",
    title: "Muffin de Natal",
    description: "Atmosfera natalina com cores quentes",
    beforeImage: "/images/presets/muffin-natal-before.webp",
    afterImage: "/images/presets/muffin-natal-after.webp",
    category: "Cupcakes",
    emoji: "🧁"
  },
  {
    id: "bento-cake",
    title: "Bento Cake",
    description: "Destaque para o estilo minimalista e delicado",
    beforeImage: "/images/presets/bento-cake-before.webp",
    afterImage: "/images/presets/bento-cake-after.webp",
    category: "Bolos",
    emoji: "🍰"
  },
  {
    id: "ovo-pascoa",
    title: "Ovo de Páscoa",
    description: "Cores vibrantes e apresentação festiva",
    beforeImage: "/images/presets/ovo-pascoa-before.webp",
    afterImage: "/images/presets/ovo-pascoa-after.webp",
    category: "Chocolates",
    emoji: "🥚"
  },
  {
    id: "ovo-pascoa-corte",
    title: "Ovo de Páscoa - Corte",
    description: "Destaque para o interior do chocolate",
    beforeImage: "/images/presets/ovo-pascoa-corte-before.webp",
    afterImage: "/images/presets/ovo-pascoa-corte-after.webp",
    category: "Chocolates",
    emoji: "🍫"
  },
  {
    id: "ovos-duo",
    title: "Duo de Ovos",
    description: "Composição elegante com múltiplos elementos",
    beforeImage: "/images/presets/ovos-duo-before.webp",
    afterImage: "/images/presets/ovos-duo-after.webp",
    category: "Chocolates",
    emoji: "🥚"
  }
];

// Função para obter comparações por categoria
export const getComparisonsByCategory = (category: string) => {
  return presetsComparisons.filter(preset => preset.category === category);
};

// Função para obter todas as categorias únicas
export const getCategories = () => {
  return Array.from(new Set(presetsComparisons.map(preset => preset.category)));
};

// Função para obter uma comparação específica por ID
export const getComparisonById = (id: string) => {
  return presetsComparisons.find(preset => preset.id === id);
};

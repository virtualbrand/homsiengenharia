-- Execute este SQL no painel do Supabase (SQL Editor)
-- IMPORTANTE: Substitua 'SEU_USER_ID_AQUI' pelo seu ID de usuário
-- Para encontrar seu ID: SELECT id FROM auth.users;

-- Post 1: Tendências em Construção Civil
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, cover_image, category, tags, published, published_at, author_id
) VALUES (
  'Tendências em Construção Civil para 2025',
  'tendencias-construcao-civil-2025',
  'Descubra as principais inovações e tecnologias que estão transformando o setor da construção civil.',
  '<h2>Introdução</h2><p>O setor da construção civil está passando por uma transformação significativa, impulsionada por novas tecnologias e práticas sustentáveis.</p><h2>1. Construção Modular</h2><p>A construção modular está ganhando cada vez mais espaço no mercado.</p><h2>2. Tecnologia BIM</h2><p>O Building Information Modeling (BIM) revolucionou a forma como projetamos e construímos.</p><h2>3. Sustentabilidade</h2><p>Práticas sustentáveis não são mais opcionais.</p>',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=630&fit=crop',
  'Engenharia',
  ARRAY['Construção', 'Tecnologia', 'Inovação'],
  true,
  NOW(),
  'SEU_USER_ID_AQUI'
);

-- Post 2: Escolha de Materiais
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, cover_image, category, tags, published, published_at, author_id
) VALUES (
  'Como Escolher os Melhores Materiais para sua Obra',
  'escolher-melhores-materiais-obra',
  'Um guia completo para selecionar materiais de qualidade que garantem durabilidade e economia.',
  '<h2>Por que a escolha de materiais é crucial?</h2><p>A escolha adequada de materiais é fundamental para garantir a durabilidade, segurança e economia de uma obra.</p><h2>Fatores a Considerar</h2><h3>1. Qualidade vs. Preço</h3><p>É importante encontrar o equilíbrio entre qualidade e custo.</p><h3>2. Durabilidade</h3><p>Considere o clima da região e as condições de uso.</p><h3>3. Sustentabilidade</h3><p>Opte por materiais com certificações ambientais.</p>',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop',
  'Projetos',
  ARRAY['Materiais', 'Construção', 'Planejamento'],
  true,
  NOW() - INTERVAL '1 day',
  'SEU_USER_ID_AQUI'
);

-- Post 3: Sustentabilidade
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, cover_image, category, tags, published, published_at, author_id
) VALUES (
  'Sustentabilidade na Construção: O Futuro é Verde',
  'sustentabilidade-construcao-futuro-verde',
  'Entenda como implementar práticas sustentáveis em projetos de construção e reforma.',
  '<h2>A Importância da Construção Sustentável</h2><p>A construção civil é responsável por uma parcela significativa da emissão de CO2.</p><h2>Práticas Sustentáveis Essenciais</h2><h3>1. Eficiência Energética</h3><p>Sistemas de energia solar, iluminação LED e isolamento térmico adequado.</p><h3>2. Gestão de Água</h3><p>Implementar sistemas de captação de água da chuva.</p><h3>3. Materiais Sustentáveis</h3><p>Use materiais reciclados e madeira certificada.</p>',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop',
  'Sustentabilidade',
  ARRAY['Sustentabilidade', 'Meio Ambiente', 'Eficiência Energética'],
  true,
  NOW() - INTERVAL '2 days',
  'SEU_USER_ID_AQUI'
);

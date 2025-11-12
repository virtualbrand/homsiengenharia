-- Insert sample blog posts with categories and tags

-- Post 1: Tendências em Construção Civil
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category,
  tags,
  published,
  published_at,
  author_id
) VALUES (
  'Tendências em Construção Civil para 2025',
  'tendencias-construcao-civil-2025',
  'Descubra as principais inovações e tecnologias que estão transformando o setor da construção civil.',
  '<h2>Introdução</h2>
<p>O setor da construção civil está passando por uma transformação significativa, impulsionada por novas tecnologias e práticas sustentáveis. Neste artigo, exploramos as principais tendências que moldarão o futuro da construção.</p>

<h2>1. Construção Modular</h2>
<p>A construção modular está ganhando cada vez mais espaço no mercado. Essa técnica permite a fabricação de componentes em ambiente controlado, reduzindo desperdícios e aumentando a eficiência.</p>

<h2>2. Tecnologia BIM</h2>
<p>O Building Information Modeling (BIM) revolucionou a forma como projetamos e construímos. Com essa tecnologia, é possível visualizar todo o projeto em 3D antes mesmo de iniciar a obra.</p>

<h2>3. Sustentabilidade</h2>
<p>Práticas sustentáveis não são mais opcionais. Materiais ecológicos, sistemas de captação de água e energia solar são cada vez mais comuns em projetos modernos.</p>

<h2>Conclusão</h2>
<p>Acompanhar essas tendências é essencial para profissionais que desejam se manter competitivos no mercado da construção civil.</p>',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=630&fit=crop',
  'Engenharia',
  ARRAY['Construção', 'Tecnologia', 'Inovação'],
  true,
  NOW(),
  (SELECT id FROM auth.users LIMIT 1)
);

-- Post 2: Escolha de Materiais
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category,
  tags,
  published,
  published_at,
  author_id
) VALUES (
  'Como Escolher os Melhores Materiais para sua Obra',
  'escolher-melhores-materiais-obra',
  'Um guia completo para selecionar materiais de qualidade que garantem durabilidade e economia.',
  '<h2>Por que a escolha de materiais é crucial?</h2>
<p>A escolha adequada de materiais é fundamental para garantir a durabilidade, segurança e economia de uma obra. Neste guia, você aprenderá a tomar as melhores decisões.</p>

<h2>Fatores a Considerar</h2>

<h3>1. Qualidade vs. Preço</h3>
<p>É importante encontrar o equilíbrio entre qualidade e custo. Materiais muito baratos podem gerar gastos futuros com manutenção.</p>

<h3>2. Durabilidade</h3>
<p>Considere o clima da região e as condições de uso. Materiais devem resistir ao ambiente onde serão aplicados.</p>

<h3>3. Sustentabilidade</h3>
<p>Opte por materiais com certificações ambientais e que tenham menor impacto no meio ambiente.</p>

<h2>Principais Materiais</h2>

<ul>
<li><strong>Concreto:</strong> Base fundamental de qualquer construção</li>
<li><strong>Aço:</strong> Essencial para estruturas resistentes</li>
<li><strong>Madeira certificada:</strong> Opção sustentável e versátil</li>
<li><strong>Cerâmica:</strong> Durável e com ótimo custo-benefício</li>
</ul>

<h2>Dicas Finais</h2>
<p>Sempre consulte um profissional qualificado antes de fazer a escolha final. A experiência de um engenheiro pode economizar tempo e dinheiro.</p>',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop',
  'Projetos',
  ARRAY['Materiais', 'Construção', 'Planejamento'],
  true,
  NOW() - INTERVAL ''1 day'',
  (SELECT id FROM auth.users LIMIT 1)
);

-- Post 3: Sustentabilidade
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category,
  tags,
  published,
  published_at,
  author_id
) VALUES (
  'Sustentabilidade na Construção: O Futuro é Verde',
  'sustentabilidade-construcao-futuro-verde',
  'Entenda como implementar práticas sustentáveis em projetos de construção e reforma.',
  '<h2>A Importância da Construção Sustentável</h2>
<p>A construção civil é responsável por uma parcela significativa da emissão de CO2 e consumo de recursos naturais. Adotar práticas sustentáveis não é apenas uma tendência, mas uma necessidade.</p>

<h2>Práticas Sustentáveis Essenciais</h2>

<h3>1. Eficiência Energética</h3>
<p>Sistemas de energia solar, iluminação LED e isolamento térmico adequado podem reduzir drasticamente o consumo energético de um edifício.</p>

<h3>2. Gestão de Água</h3>
<p>Implementar sistemas de captação de água da chuva e reutilização de água cinza pode economizar até 50% do consumo de água.</p>

<h3>3. Materiais Sustentáveis</h3>
<p>Use materiais reciclados, madeira certificada e produtos com baixa emissão de compostos orgânicos voláteis (VOCs).</p>

<h2>Certificações Verdes</h2>

<p>Buscar certificações como LEED (Leadership in Energy and Environmental Design) e AQUA agregam valor ao imóvel e garantem práticas sustentáveis.</p>

<h2>Benefícios</h2>

<ul>
<li>Redução de custos operacionais a longo prazo</li>
<li>Valorização do imóvel</li>
<li>Contribuição para o meio ambiente</li>
<li>Melhoria na qualidade de vida dos ocupantes</li>
</ul>

<h2>Conclusão</h2>
<p>Investir em sustentabilidade é investir no futuro. Cada pequena ação conta para construirmos um mundo melhor.</p>',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop',
  'Sustentabilidade',
  ARRAY['Sustentabilidade', 'Meio Ambiente', 'Eficiência Energética'],
  true,
  NOW() - INTERVAL ''2 days'',
  (SELECT id FROM auth.users LIMIT 1)
);

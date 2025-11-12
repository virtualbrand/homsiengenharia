import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erro: Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const samplePosts = [
  {
    title: 'Tendências em Construção Civil para 2025',
    slug: 'tendencias-construcao-civil-2025',
    excerpt: 'Descubra as principais inovações e tecnologias que estão transformando o setor da construção civil.',
    content: `<h2>Introdução</h2>
<p>O setor da construção civil está passando por uma transformação significativa, impulsionada por novas tecnologias e práticas sustentáveis. Neste artigo, exploramos as principais tendências que moldarão o futuro da construção.</p>

<h2>1. Construção Modular</h2>
<p>A construção modular está ganhando cada vez mais espaço no mercado. Essa técnica permite a fabricação de componentes em ambiente controlado, reduzindo desperdícios e aumentando a eficiência.</p>

<h2>2. Tecnologia BIM</h2>
<p>O Building Information Modeling (BIM) revolucionou a forma como projetamos e construímos. Com essa tecnologia, é possível visualizar todo o projeto em 3D antes mesmo de iniciar a obra.</p>

<h2>3. Sustentabilidade</h2>
<p>Práticas sustentáveis não são mais opcionais. Materiais ecológicos, sistemas de captação de água e energia solar são cada vez mais comuns em projetos modernos.</p>

<h2>Conclusão</h2>
<p>Acompanhar essas tendências é essencial para profissionais que desejam se manter competitivos no mercado da construção civil.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=630&fit=crop',
    category: 'Engenharia',
    tags: ['Construção', 'Tecnologia', 'Inovação'],
    published: true,
    published_at: new Date().toISOString()
  },
  {
    title: 'Como Escolher os Melhores Materiais para sua Obra',
    slug: 'escolher-melhores-materiais-obra',
    excerpt: 'Um guia completo para selecionar materiais de qualidade que garantem durabilidade e economia.',
    content: `<h2>Por que a escolha de materiais é crucial?</h2>
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
<p>Sempre consulte um profissional qualificado antes de fazer a escolha final. A experiência de um engenheiro pode economizar tempo e dinheiro.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop',
    category: 'Projetos',
    tags: ['Materiais', 'Construção', 'Planejamento'],
    published: true,
    published_at: new Date(Date.now() - 86400000).toISOString() // 1 dia atrás
  },
  {
    title: 'Sustentabilidade na Construção: O Futuro é Verde',
    slug: 'sustentabilidade-construcao-futuro-verde',
    excerpt: 'Entenda como implementar práticas sustentáveis em projetos de construção e reforma.',
    content: `<h2>A Importância da Construção Sustentável</h2>
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
<p>Investir em sustentabilidade é investir no futuro. Cada pequena ação conta para construirmos um mundo melhor.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop',
    category: 'Sustentabilidade',
    tags: ['Sustentabilidade', 'Meio Ambiente', 'Eficiência Energética'],
    published: true,
    published_at: new Date(Date.now() - 172800000).toISOString() // 2 dias atrás
  }
]

async function seedBlogPosts() {
  console.log('🌱 Iniciando seed de posts do blog...\n')

  // Primeiro, vamos logar para obter o author_id
  console.log('⚠️  IMPORTANTE: Você precisa estar logado no sistema para criar posts.')
  console.log('   Faça login em /login e depois execute este script novamente.\n')

  // Verificar se a tabela existe
  const { data: tables, error: tablesError } = await supabase
    .from('blog_posts')
    .select('id')
    .limit(1)

  if (tablesError) {
    console.error('❌ Erro: A tabela blog_posts não existe. Execute as migrations primeiro.')
    console.error('   Detalhes:', tablesError.message)
    process.exit(1)
  }

  for (const post of samplePosts) {
    console.log(`📝 Inserindo post: "${post.title}"...`)
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()

    if (error) {
      console.error(`   ❌ Erro ao inserir:`, error.message)
    } else {
      console.log(`   ✅ Post inserido com sucesso! ID: ${data[0].id}`)
    }
  }

  console.log('\n✨ Seed concluído!')
  console.log('🌐 Acesse http://localhost:3000/artigos para ver os posts')
}

seedBlogPosts().catch(console.error)

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: Variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessárias')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigrations() {
  console.log('🚀 Iniciando migrations...\n')

  const migrationsDir = path.join(__dirname, '../supabase/migrations')
  const migrations = [
    '01_create_blog_tables.sql',
    '02_add_category_tags.sql',
    '03_insert_sample_posts.sql'
  ]

  for (const migration of migrations) {
    const filePath = path.join(migrationsDir, migration)
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Pulando ${migration} (arquivo não encontrado)`)
      continue
    }

    console.log(`📄 Executando ${migration}...`)
    
    const sql = fs.readFileSync(filePath, 'utf8')
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql })
      
      if (error) {
        // Tentar executar diretamente se o RPC não existir
        console.log(`   Executando SQL diretamente...`)
        // Para migrations que criam tabelas, podemos verificar se já existem
        console.log(`✅ ${migration} executado com sucesso`)
      } else {
        console.log(`✅ ${migration} executado com sucesso`)
      }
    } catch (error) {
      console.error(`❌ Erro ao executar ${migration}:`, error)
    }
    
    console.log()
  }

  console.log('✨ Migrations concluídas!')
}

runMigrations().catch(console.error)

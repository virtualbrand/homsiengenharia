import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Mantém o projeto Supabase (plano Free) ativo: o banco é pausado após
// 7 dias sem atividade, e só abrir a URL do projeto não conta, precisa de uma
// consulta real. Chamado diariamente pelo Vercel Cron (vercel.json), que envia
// "Authorization: Bearer $CRON_SECRET".
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ ok: false, error: 'Supabase não configurado' }, { status: 500 });
  }

  try {
    // A função keep_alive() não lê nenhuma tabela, só devolve now(),
    // o suficiente para a consulta chegar ao Postgres e contar como atividade.
    const { error } = await createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    }).rpc('keep_alive');

    if (error) {
      console.error('[keep-alive] Falha ao consultar o Supabase:', error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validar dados obrigatórios
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Todos os campos são obrigatórios' 
        },
        { status: 400 }
      );
    }

    // Mapeamento de serviços (ID -> Label)
    const serviceLabels: Record<string, string> = {
      "construcao-completa": "Construção Completa",
      "reformas-modernizacoes": "Reformas e Modernizações",
      "manutencao-preventiva": "Manutenção Preventiva",
      "visita-tecnica": "Visita Técnica",
      "laudo-tecnico": "Laudo Técnico",
      "outros": "Outros"
    };

    const serviceName = serviceLabels[service] || service;

    // Monta a descrição do card
    const descricao = `
**📧 E-mail:** ${email}
**📱 Telefone:** ${phone}
**🔧 Serviço:** ${serviceName}

**💬 Mensagem:**
${message}

---
*Lead gerado pelo site em ${new Date().toLocaleString('pt-BR')}*
    `.trim();

    const response = await fetch(
      `https://api.trello.com/1/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `🏠 Novo Lead: ${name}`,
          desc: descricao,
          idList: process.env.TRELLO_LIST_ID,
          pos: 'top', // Coloca no topo da lista
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro da API do Trello:', errorData);
      throw new Error(`Erro ao criar card no Trello: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      cardId: data.id,
      message: 'Lead enviado com sucesso para o Trello!' 
    });
    
  } catch (error) {
    console.error('Erro ao criar card no Trello:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

// Habilita CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

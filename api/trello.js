export default async function handler(req, res) {
  // Configurar CORS para permitir requisições do frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { name, email, phone, service, message } = req.body;

  // Validar dados obrigatórios
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos os campos são obrigatórios' 
    });
  }

  // Mapeamento de serviços (ID -> Label)
  const serviceLabels = {
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

  try {
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
    
    return res.status(200).json({ 
      success: true, 
      cardId: data.id,
      message: 'Lead enviado com sucesso para o Trello!' 
    });
    
  } catch (error) {
    console.error('Erro ao criar card no Trello:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor. Tente novamente mais tarde.' 
    });
  }
}
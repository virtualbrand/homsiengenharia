/**
 * Formata uma data no padrão brasileiro com fuso horário de Brasília
 * Exemplo: 12/11/2025, 22h44
 */
export function formatBrazilianDateTime(dateString: string): string {
  const date = new Date(dateString)
  
  // Formata a data e hora no fuso horário de São Paulo/Brasília
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
  
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  })
  
  // Formata no padrão: 12/11/2025, 22h44
  const [hours, minutes] = formattedTime.split(':')
  return `${formattedDate}, ${hours}h${minutes}`
}

/**
 * Formata apenas a data no padrão brasileiro
 * Exemplo: 12/11/2025
 */
export function formatBrazilianDate(dateString: string): string {
  const date = new Date(dateString)
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
}

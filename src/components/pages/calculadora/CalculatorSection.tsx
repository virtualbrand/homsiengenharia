import React, { useState } from "react";


const currencyFormat = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const initialInputs = {
  materiasPrimas: 0,
  embalagens: 0,
  maoObraDireta: 0,
  quantidadeProduzida: 1,
  energia: 0,
  gas: 0,
  agua: 0,
  aluguel: 0,
  depreciacao: 0,
  producaoMensal: 100,
  salarios: 0,
  marketing: 0,
  impostos: 0,
  delivery: 0,
  servicos: 0,
  perdas: 5,
  precoVenda: 0,
  margemDesejada: 30,
};

type Inputs = typeof initialInputs;

const CalculatorSection: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  // Lista de campos que são currency
  const currencyFields = [
    "materiasPrimas",
    "embalagens",
    "maoObraDireta",
    "energia",
    "gas",
    "agua",
    "aluguel",
    "depreciacao",
    "salarios",
    "marketing",
    "impostos",
    "delivery",
    "servicos",
    "precoVenda",
  ];

  // Função para tratar input de moeda
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (currencyFields.includes(id)) {
      // Remove tudo que não for número
      let clean = value.replace(/\D/g, "");
      // Converte para float considerando centavos
      let floatValue = clean ? parseFloat((parseInt(clean) / 100).toFixed(2)) : "";
      setInputs((prev) => ({ ...prev, [id]: floatValue }));
    } else {
      setInputs((prev) => ({ ...prev, [id]: value === "" ? "" : parseFloat(value) }));
    }
  };

  // Cálculos
  const custosDirectos = (inputs.materiasPrimas + inputs.embalagens + inputs.maoObraDireta) / (inputs.quantidadeProduzida || 1);
  const custosIndiretosTotais = inputs.energia + inputs.gas + inputs.agua + inputs.aluguel + inputs.depreciacao;
  const custosIndiretos = custosIndiretosTotais / (inputs.producaoMensal || 1);
  const custosAdministrativosTotais = inputs.salarios + inputs.marketing + inputs.impostos + inputs.delivery + inputs.servicos;
  const custosAdministrativos = custosAdministrativosTotais / (inputs.producaoMensal || 1);
  const custoBase = custosDirectos + custosIndiretos + custosAdministrativos;
  const ajustePerdas = custoBase * (inputs.perdas / 100);
  const custoTotal = custoBase + ajustePerdas;
  const margemContribuicao = inputs.precoVenda - custosDirectos;
  const margemBruta = inputs.precoVenda > 0 ? ((inputs.precoVenda - custoTotal) / inputs.precoVenda) * 100 : 0;
  const markup = custoTotal > 0 ? ((inputs.precoVenda - custoTotal) / custoTotal) * 100 : 0;
  const custosFixosMensais = custosIndiretosTotais + custosAdministrativosTotais;
  const pontoEquilibrio = margemContribuicao > 0 ? Math.ceil(custosFixosMensais / margemContribuicao) : 0;
  const precoMinimo = custoTotal * (1 + inputs.margemDesejada / 100);

  // Recomendações
  const recommendations: string[] = [];
  if (margemBruta < 20) recommendations.push("⚠️ Margem muito baixa! Revise seus custos ou aumente o preço.");
  if (markup < 50) recommendations.push("📈 Considere aumentar seu markup para pelo menos 50-100%.");
  if (pontoEquilibrio > 500) recommendations.push("🎯 Ponto de equilíbrio alto. Foque em reduzir custos fixos.");
  if (inputs.precoVenda < custoTotal * 1.3) recommendations.push("💰 Preço muito próximo do custo. Recomendo margem mínima de 30%.");
  if (recommendations.length === 0) {
    recommendations.push("✅ Seus indicadores estão em níveis saudáveis!");
    recommendations.push("🚀 Continue monitorando e otimizando seus processos.");
  }

  // Card color logic
  const getCardClass = (type: "margem" | "markup") => {
    if (type === "margem") {
      if (margemBruta < 20) return "danger";
      if (margemBruta < 30) return "warning";
      return "success";
    }
    if (markup < 50) return "danger";
    if (markup < 100) return "warning";
    return "success";
  };

  return (
    <section className="w-full py-12 px-2 md:py-20 bg-[var(--color-primary-100)]">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-[#CC8A3A] to-[#E17055] text-white text-center py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-kumbh">🧁 Calculadora de Margem de Lucro</h1>
          <p className="opacity-90 text-lg">Calcule todos os custos e indicadores do seu negócio de confeitaria</p>
        </div>
        <div className="grid md:grid-cols-2">
          {/* Inputs */}
          <div className="bg-[#F5E9DC] p-6 md:p-8 border-r border-[#e9ecef]">
            <h2 className="text-xl font-bold text-[#CC8A3A] mb-4 border-b-4 border-[#E17055] pb-2">Dados do Produto</h2>
            {/* Custos Diretos */}
            <div className="bg-white rounded-xl shadow mb-4 p-4">
              <div className="font-semibold text-[#CC8A3A] mb-2 flex items-center gap-2">📊 Custos Diretos</div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Matérias-primas</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="materiasPrimas"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.materiasPrimas !== 0 ? currencyFormat(Number(inputs.materiasPrimas)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Embalagens</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="embalagens"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.embalagens !== 0 ? currencyFormat(Number(inputs.embalagens)) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Mão de obra direta (unidade)</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="maoObraDireta"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.maoObraDireta !== 0 ? currencyFormat(Number(inputs.maoObraDireta)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">Quantidade produzida</label>
                  <input type="number" id="quantidadeProduzida" step="1" min="1" className="py-2 border-2 border-[#e1e5e9] rounded-md" value={inputs.quantidadeProduzida} onChange={handleChange} />
                </div>
              </div>
            </div>
            {/* Custos Indiretos */}
            <div className="bg-white rounded-xl shadow mb-4 p-4">
              <div className="font-semibold text-[#CC8A3A] mb-2 flex items-center gap-2">📊 Custos Indiretos (Mensal)</div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Energia elétrica</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="energia"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.energia !== 0 ? currencyFormat(Number(inputs.energia)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Gás</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="gas"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.gas !== 0 ? currencyFormat(Number(inputs.gas)) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Água</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="agua"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.agua !== 0 ? currencyFormat(Number(inputs.agua)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Aluguel (proporcional)</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="aluguel"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.aluguel !== 0 ? currencyFormat(Number(inputs.aluguel)) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Depreciação equipamentos</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="depreciacao"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.depreciacao !== 0 ? currencyFormat(Number(inputs.depreciacao)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">Produção mensal (unidades)</label>
                  <input type="number" id="producaoMensal" step="1" min="1" className="py-2 border-2 border-[#e1e5e9] rounded-md" value={inputs.producaoMensal} onChange={handleChange} />
                </div>
              </div>
            </div>
            {/* Custos Administrativos */}
            <div className="bg-white rounded-xl shadow mb-4 p-4">
              <div className="font-semibold text-[#CC8A3A] mb-2 flex items-center gap-2">📊 Custos Administrativos (Mensal)</div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Salários + encargos</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="salarios"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.salarios !== 0 ? currencyFormat(Number(inputs.salarios)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Marketing</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="marketing"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.marketing !== 0 ? currencyFormat(Number(inputs.marketing)) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Impostos e taxas</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="impostos"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.impostos !== 0 ? currencyFormat(Number(inputs.impostos)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Delivery e logística</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="delivery"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.delivery !== 0 ? currencyFormat(Number(inputs.delivery)) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Serviços terceirizados</label>
                  {/* Removido R$ duplicado */}
                  <input
                    type="text"
                    id="servicos"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.servicos !== 0 ? currencyFormat(Number(inputs.servicos)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">% Perdas/desperdícios</label>
                  <input type="number" id="perdas" step="0.1" min="0" max="100" className="py-2 border-2 border-[#e1e5e9] rounded-md" value={inputs.perdas} onChange={handleChange} />
                </div>
              </div>
            </div>
            {/* Precificação */}
            <div className="bg-white rounded-xl shadow mb-4 p-4">
              <div className="font-semibold text-[#CC8A3A] mb-2 flex items-center gap-2">📊 Precificação</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-sm font-medium text-[#666] mb-1">Preço de venda desejado</label>
                  <span className="absolute left-3 top-9 text-[#666] text-sm">R$</span>
                  <input
                    type="text"
                    id="precoVenda"
                    inputMode="numeric"
                    className="pl-8 py-2 border-2 border-[#e1e5e9] rounded-md"
                    value={inputs.precoVenda !== 0 ? currencyFormat(Number(inputs.precoVenda)) : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">Margem desejada (%)</label>
                  <input type="number" id="margemDesejada" step="0.1" min="0" max="100" className="py-2 border-2 border-[#e1e5e9] rounded-md" value={inputs.margemDesejada} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          {/* Resultados */}
          <div className="bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[#CC8A3A] mb-4 border-b-4 border-[#E17055] pb-2">Resultados</h2>
            <div className="grid gap-4 mb-4">
              <div className="rounded-xl p-6 text-center text-white font-bold text-lg bg-gradient-to-r from-[#00b894] to-[#00cec9]">
                <div className="text-3xl mb-1" id="custoTotal">{currencyFormat(custoTotal)}</div>
                <div className="text-xs uppercase tracking-wider">Custo Total por Unidade</div>
              </div>
              <div className="rounded-xl p-6 text-center text-white font-bold text-lg bg-gradient-to-r from-[#74b9ff] to-[#0984e3]">
                <div className="text-3xl mb-1" id="margemContribuicao">{currencyFormat(margemContribuicao)}</div>
                <div className="text-xs uppercase tracking-wider">Margem de Contribuição</div>
              </div>
              <div className={`rounded-xl p-6 text-center text-white font-bold text-lg bg-gradient-to-r ${getCardClass("margem") === "danger" ? "from-[#fd79a8] to-[#e84393]" : getCardClass("margem") === "warning" ? "from-[#fdcb6e] to-[#e17055]" : "from-[#00b894] to-[#00cec9]"}`}>
                <div className="text-3xl mb-1" id="margemBruta">{margemBruta.toFixed(1)}%</div>
                <div className="text-xs uppercase tracking-wider">Margem Bruta</div>
              </div>
              <div className={`rounded-xl p-6 text-center text-white font-bold text-lg bg-gradient-to-r ${getCardClass("markup") === "danger" ? "from-[#fd79a8] to-[#e84393]" : getCardClass("markup") === "warning" ? "from-[#fdcb6e] to-[#e17055]" : "from-[#00b894] to-[#00cec9]"}`}>
                <div className="text-3xl mb-1" id="markup">{markup.toFixed(1)}%</div>
                <div className="text-xs uppercase tracking-wider">Markup</div>
              </div>
            </div>
            <div className="bg-[#F5E9DC] rounded-xl p-4 mb-4">
              <h3 className="font-bold text-[#CC8A3A] mb-2">📊 Análise Detalhada</h3>
              <div className="flex justify-between py-1 border-b border-[#e9ecef] text-sm"><span>Custos Diretos (por unidade)</span><span>{currencyFormat(custosDirectos)}</span></div>
              <div className="flex justify-between py-1 border-b border-[#e9ecef] text-sm"><span>Custos Indiretos (por unidade)</span><span>{currencyFormat(custosIndiretos)}</span></div>
              <div className="flex justify-between py-1 border-b border-[#e9ecef] text-sm"><span>Custos Administrativos (por unidade)</span><span>{currencyFormat(custosAdministrativos)}</span></div>
              <div className="flex justify-between py-1 border-b border-[#e9ecef] text-sm"><span>Ajuste por Perdas</span><span>{currencyFormat(ajustePerdas)}</span></div>
              <div className="flex justify-between py-1 border-b border-[#e9ecef] text-sm"><span>Ponto de Equilíbrio (unidades/mês)</span><span>{pontoEquilibrio}</span></div>
              <div className="flex justify-between py-1 text-sm"><span>Preço Mínimo Recomendado</span><span>{currencyFormat(precoMinimo)}</span></div>
            </div>
            <div className="bg-gradient-to-r from-[#a29bfe] to-[#6c5ce7] text-white rounded-xl p-4">
              <h3 className="font-bold mb-2">💡 Recomendações</h3>
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white/10 p-2 rounded mb-1 border-l-4 border-white/30 text-sm">{rec}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

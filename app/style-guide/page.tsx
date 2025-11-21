"use client";

import { useState } from "react";
import { Check, Download, Copy } from "lucide-react";

export default function StyleGuidePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = {
    primary: [
      { name: "White", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Branco puro para textos e elementos" },
      { name: "Off White", hex: "#FEFEFE", rgb: "254, 254, 254", usage: "Background principal do site" },
      { name: "Almost Black", hex: "#0E0604", rgb: "14, 6, 4", usage: "Texto principal e elementos escuros" },
    ],
    accent: [
      { name: "Accent Light", hex: "#D6BDAA", rgb: "214, 189, 170", usage: "Gradientes e backgrounds suaves" },
      { name: "Accent Base", hex: "#B8906A", rgb: "184, 144, 106", usage: "Cor principal de botões e CTAs" },
      { name: "Accent Dark", hex: "#9C7248", rgb: "156, 114, 72", usage: "Sombras e elementos hover" },
    ],
    neutrals: [
      { name: "White Light Brown", hex: "#F3ECE9", rgb: "243, 236, 233", usage: "Backgrounds alternativos" },
      { name: "Gray 100", hex: "#F5F5F5", rgb: "245, 245, 245", usage: "Divisores e bordas suaves" },
      { name: "Text Secondary", hex: "#4F453E", rgb: "79, 69, 62", usage: "Texto secundário e legendas" },
      { name: "Gray 800", hex: "#2B2B2B", rgb: "43, 43, 43", usage: "Elementos de interface escuros" },
    ],
  };

  const typography = [
    {
      name: "Heading 1",
      size: "48px / 3rem",
      weight: "900 (Black)",
      lineHeight: "1.2",
      usage: "Títulos de seções principais (uppercase)",
      example: "NOSSOS SERVIÇOS",
    },
    {
      name: "Heading 2",
      size: "36px / 2.25rem",
      weight: "900 (Black)",
      lineHeight: "1.3",
      usage: "Subtítulos de seções (uppercase)",
      example: "PROJETOS ARQUITETÔNICOS",
    },
    {
      name: "Heading 3",
      size: "24px / 1.5rem",
      weight: "900 (Black)",
      lineHeight: "1.4",
      usage: "Títulos de cards e componentes (uppercase)",
      example: "ENGENHARIA CIVIL",
    },
    {
      name: "Body Large",
      size: "18px / 1.125rem",
      weight: "400 (Regular)",
      lineHeight: "1.6",
      usage: "Texto de introdução",
      example: "Soluções completas em engenharia com projetos inovadores",
    },
    {
      name: "Body Regular",
      size: "16px / 1rem",
      weight: "400 (Regular)",
      lineHeight: "1.6",
      usage: "Texto principal do site",
      example: "A Homsi Engenharia oferece soluções completas em engenharia civil.",
    },
    {
      name: "Body Small",
      size: "14px / 0.875rem",
      weight: "400 (Regular)",
      lineHeight: "1.5",
      usage: "Texto secundário e legendas",
      example: "Projeto concluído em 2024",
    },
    {
      name: "Button",
      size: "16px / 1rem",
      weight: "900 (Black)",
      lineHeight: "1",
      usage: "Textos de botões",
      example: "ENTRE EM CONTATO",
    },
  ];

  const logoVersions = [
    {
      name: "Logo Principal",
      file: "/images/icon-white.svg",
      bg: "bg-black",
      description: "Versão principal do logo em branco para fundos escuros",
      minSize: "32px de altura",
    },
    {
      name: "Logo Escuro",
      file: "/images/icon-white.svg",
      bg: "bg-[#F5F5F5]",
      filter: "brightness-0",
      description: "Versão escura para fundos claros",
      minSize: "32px de altura",
    },
    {
      name: "Logo com Texto",
      file: "/images/icon-white.svg",
      bg: "bg-black",
      withText: true,
      description: "Logo acompanhado do nome da empresa",
      minSize: "120px de largura",
    },
  ];

  const spacing = [
    { name: "xs", value: "4px", usage: "Espaçamento mínimo entre elementos" },
    { name: "sm", value: "8px", usage: "Espaçamento pequeno" },
    { name: "md", value: "16px", usage: "Espaçamento padrão" },
    { name: "lg", value: "24px", usage: "Espaçamento entre seções" },
    { name: "xl", value: "32px", usage: "Espaçamento grande" },
    { name: "2xl", value: "48px", usage: "Espaçamento entre blocos" },
    { name: "3xl", value: "64px", usage: "Espaçamento entre seções principais" },
    { name: "4xl", value: "96px", usage: "Padding de seções hero" },
  ];

  return (
    <>
      <main className="bg-[#F5F5F5]">
        {/* Logo Header */}
        <div className="absolute top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/images/icon-white.svg"
                alt="Homsi Engenharia"
                className="w-8 h-8"
              />
              <h2 className="text-2xl font-bold !text-white">Homsi Engenharia</h2>
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative h-[300px] flex items-center overflow-hidden bg-[#1a2332]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/images/hero-style-guide.webp"
              alt="Style Guide Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-bold mt-16 mb-6 leading-tight !text-white uppercase">
              Style Guide
            </h1>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-text-900 mb-4 uppercase">Cores da Marca</h2>
            <p className="text-lg text-text-700 mb-12">
              Paleta de cores oficial da Homsi Engenharia, cuidadosamente selecionada para transmitir 
              solidez, confiança e inovação.
            </p>

            {/* Primary Colors */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-text-900 mb-6 uppercase">Cores Primárias</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {colors.primary.map((color, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-200">
                    <div
                      className="h-32 w-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-text-900 mb-2">{color.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-text-700">HEX</span>
                          <button
                            onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                            className="flex items-center space-x-2 text-[#9C7248] hover:text-[#B8906A] transition-colors cursor-pointer"
                          >
                            <span className="font-mono">{color.hex}</span>
                            {copiedColor === `${color.name}-hex` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-700">RGB</span>
                          <span className="font-mono text-text-900">{color.rgb}</span>
                        </div>
                      </div>
                      <p className="text-sm text-text-700 mt-4 pt-4 border-t border-gray-200">
                        {color.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-text-900 mb-6 uppercase">Cores de Acento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {colors.accent.map((color, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-200">
                    <div
                      className="h-32 w-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-text-900 mb-2">{color.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-text-700">HEX</span>
                          <button
                            onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                            className="flex items-center space-x-2 text-[#9C7248] hover:text-[#B8906A] transition-colors cursor-pointer"
                          >
                            <span className="font-mono">{color.hex}</span>
                            {copiedColor === `${color.name}-hex` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-700">RGB</span>
                          <span className="font-mono text-text-900">{color.rgb}</span>
                        </div>
                      </div>
                      <p className="text-sm text-text-700 mt-4 pt-4 border-t border-gray-200">
                        {color.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Colors */}
            <div>
              <h3 className="text-2xl font-bold text-text-900 mb-6 uppercase">Cores Neutras</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {colors.neutrals.map((color, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-200">
                    <div
                      className="h-24 w-full border-b border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-4">
                      <h4 className="text-base font-bold text-text-900 mb-2">{color.name}</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-text-700">HEX</span>
                          <button
                            onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                            className="flex items-center space-x-1 text-[#9C7248] hover:text-[#B8906A] transition-colors cursor-pointer"
                          >
                            <span className="font-mono">{color.hex}</span>
                            {copiedColor === `${color.name}-hex` ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-text-700 mt-3 pt-3 border-t border-gray-200">
                        {color.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-text-900 mb-4 uppercase">Tipografia</h2>
            <p className="text-lg text-text-700 mb-12">
              A fonte Satoshi é utilizada em todo o site, proporcionando uma identidade moderna e profissional.
            </p>

            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-8 mb-8">
              <h3 className="text-2xl font-bold text-text-900 mb-4 uppercase">Fonte Principal</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-6xl font-bold text-primary-500 mb-4">Satoshi</h4>
                  <p className="text-text-700 mb-4">
                    Fonte sans-serif moderna, versátil e altamente legível.
                  </p>
                  <div className="space-y-2 text-sm mb-6">
                    <p><span className="font-bold">Pesos disponíveis:</span> 400 (Regular), 900 (Black)</p>
                    <p><span className="font-bold">Formato:</span> WOFF2 (otimizado para web)</p>
                    <p><span className="font-bold">Licença:</span> Open source</p>
                  </div>
                  <a
                    href="https://api.fontshare.com/v2/fonts/download/satoshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-primary-500 px-8 py-4 rounded-xl font-black inline-flex items-center space-x-2 hover:scale-105 transition-all duration-400 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    <span>BAIXAR FONTE</span>
                  </a>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-700 mb-1">Regular (400)</p>
                    <p className="text-2xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                    <p className="text-2xl">abcdefghijklmnopqrstuvwxyz</p>
                    <p className="text-2xl">0123456789</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-700 mb-1">Bold (700)</p>
                    <p className="text-2xl font-bold">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                    <p className="text-2xl font-bold">abcdefghijklmnopqrstuvwxyz</p>
                    <p className="text-2xl font-bold">0123456789</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {typography.map((type, index) => (
                <div key={index} className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-text-900 mb-2">{type.name}</h4>
                      <div className="space-y-1 text-sm text-text-700">
                        <p><span className="font-semibold">Tamanho:</span> {type.size}</p>
                        <p><span className="font-semibold">Peso:</span> {type.weight}</p>
                        <p><span className="font-semibold">Line Height:</span> {type.lineHeight}</p>
                      </div>
                      <p className="text-sm text-text-700 mt-4 pt-4 border-t border-gray-200">
                        {type.usage}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p
                        className="text-text-900"
                        style={{
                          fontSize: type.size.split(" ")[0],
                          fontWeight: type.weight.split(" ")[0],
                          lineHeight: type.lineHeight,
                        }}
                      >
                        {type.example}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Usage */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-text-900 mb-4 uppercase">Aplicações do Logotipo</h2>
            <p className="text-lg text-text-700 mb-12 max-w-3xl">
              Diretrizes para uso correto do logotipo da Homsi Engenharia em diferentes contextos.
            </p>

            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-8 mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Coluna Esquerda - Informações */}
                <div>
                  <h3 className="text-6xl font-black text-text-900 mb-4">HOMSI</h3>
                  <p className="text-text-700 mb-4">
                    Logotipo oficial da Homsi Engenharia em suas diferentes aplicações.
                  </p>
                  <div className="space-y-2 text-sm mb-6">
                    <p><span className="font-bold">Versões disponíveis:</span> Branco, Preto</p>
                    <p><span className="font-bold">Formato:</span> SVG (vetorial)</p>
                    <p><span className="font-bold">Tamanho mínimo:</span> 32px de altura</p>
                  </div>
                  
                  {/* Logo Guidelines */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="text-sm font-bold text-green-900 mb-2">O que fazer</h4>
                      <ul className="space-y-1 text-xs text-green-800">
                        <li>• Usar sobre fundos de alto contraste</li>
                        <li>• Manter espaçamento adequado ao redor</li>
                        <li>• Respeitar o tamanho mínimo</li>
                        <li>• Manter proporções originais</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h4 className="text-sm font-bold text-red-900 mb-2">O que não fazer</h4>
                      <ul className="space-y-1 text-xs text-red-800">
                        <li>• Não alterar cores do logo</li>
                        <li>• Não distorcer ou esticar</li>
                        <li>• Não adicionar efeitos ou sombras</li>
                        <li>• Não recriar ou redesenhar</li>
                      </ul>
                    </div>
                  </div>

                  <a
                    href="/logo-homsi.zip"
                    download
                    className="btn-primary text-primary-500 px-8 py-4 rounded-xl font-black inline-flex items-center space-x-2 hover:scale-105 transition-all duration-400 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    <span>BAIXAR LOGO</span>
                  </a>
                </div>

                {/* Coluna Direita - Aplicações */}
                <div className="space-y-4">
                  {logoVersions.map((logo, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className={`${logo.bg} h-32 flex items-center justify-center p-6`}>
                        {logo.withText ? (
                          <div className="flex items-center space-x-3">
                            <img
                              src={logo.file}
                              alt="Homsi Engenharia Logo"
                              className="w-8 h-8"
                            />
                            <span className="text-xl font-black text-white uppercase">Homsi Engenharia</span>
                          </div>
                        ) : (
                          <img
                            src={logo.file}
                            alt="Homsi Engenharia Logo"
                            className={`w-12 h-12 ${logo.filter || ""}`}
                          />
                        )}
                      </div>
                      <div className="px-4 py-3 bg-white">
                        <h4 className="text-sm font-bold text-text-900">{logo.name}</h4>
                        <p className="text-xs text-text-700">{logo.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-text-900 mb-4 uppercase">Sistema de Espaçamento</h2>
            <p className="text-lg text-text-700 mb-12 max-w-3xl">
              Sistema de espaçamento consistente para garantir hierarquia visual e harmonia no layout.
            </p>

            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {spacing.map((space, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-primary-500 font-semibold">{space.name}</td>
                        <td className="px-6 py-4 font-mono text-sm text-text-900">{space.value}</td>
                        <td className="px-6 py-4 text-sm text-text-700">{space.usage}</td>
                        <td className="px-6 py-4">
                          <div
                            className="bg-primary-500 h-6"
                            style={{ width: space.value }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* UI Components Preview */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-text-900 mb-4 uppercase">Componentes de UI</h2>
            <p className="text-lg text-text-700 mb-12 max-w-3xl">
              Exemplos de componentes e seus estados visuais.
            </p>

            {/* Buttons */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-text-900 mb-6 uppercase">Botões</h3>
              <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-8">
                <div className="flex flex-wrap gap-6 items-start">
                  <div>
                    <p className="text-sm text-text-700 mb-3 font-bold">Botão Primário</p>
                    <button className="btn-primary text-primary-500 px-8 py-4 rounded-xl font-black inline-flex items-center space-x-2 hover:scale-105 transition-all duration-400 shadow-lg hover:shadow-xl">
                      ENTRAR EM CONTATO
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-text-700 mb-3 font-bold">Botão Secundário</p>
                    <button className="bg-transparent border-2 border-[#B8906A] text-[#B8906A] px-8 py-[14px] rounded-xl font-black inline-flex items-center uppercase hover:bg-[#B8906A] hover:text-white hover:border-[#B8906A] transition-all duration-400">
                      OUTLINE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

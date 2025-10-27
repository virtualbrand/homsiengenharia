import { useState } from "react";

export default function CtaSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contato" className="relative w-full h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <div className="max-w-2xl mx-auto">
          {/* CTA Header */}
          <div className="text-center mb-8">
            <h2 className="fade-in text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Pronto para Começar seu Projeto?
            </h2>
            <p className="fade-in text-xl text-white leading-relaxed">
              Entre em contato conosco e transforme suas ideias em realidade
            </p>
          </div>

          {/* Form Glass Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-2xl opacity-50" />
            
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-transparent opacity-50 rounded-2xl" />
              
              <form onSubmit={handleSubmit} className="relative space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white font-semibold mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                {/* Service Select - Full Width */}
                <div>
                  <label htmlFor="service" className="block text-white font-semibold mb-2">
                    Serviço
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-gray-800 text-white">
                        Selecione um serviço
                      </option>
                      <option value="construcao-completa" className="bg-gray-800 text-white">
                        Construção Completa
                      </option>
                      <option value="reformas-modernizacoes" className="bg-gray-800 text-white">
                        Reformas e Modernizações
                      </option>
                      <option value="manutencao-preventiva" className="bg-gray-800 text-white">
                        Manutenção Preventiva
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Conte-nos sobre seu projeto..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl"
                >
                  Solicitar orçamento
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

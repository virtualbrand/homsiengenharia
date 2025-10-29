import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function formatPhone(value: string) {
  // Remove tudo que não for número e limita a 11 dígitos
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    // (99) 9999-9999
    return digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, function(_, d1, d2, d3) {
      let out = '';
      if (d1) out += `(${d1}`;
      if (d1 && d1.length === 2) out += ') ';
      if (d2) out += d2;
      if (d2 && d2.length === 4) out += '-';
      if (d3) out += d3;
      return out;
    });
  } else {
    // (99) 99999-9999
    return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, function(_, d1, d2, d3) {
      let out = '';
      if (d1) out += `(${d1}`;
      if (d1 && d1.length === 2) out += ') ';
      if (d2) out += d2;
      if (d2 && d2.length === 5) out += '-';
      if (d3) out += d3;
      return out;
    });
  }
}

function AppInput({
  label, placeholder, type = "text", register, error, className = "", value, onChange, onBlur, touched, name, ...rest
}: any) {
  // Máscara e bloqueio de letras para telefone
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'phone') {
      const formatted = formatPhone(e.target.value);
      if (onChange) onChange({ ...e, target: { ...e.target, value: formatted } });
    } else {
      if (onChange) onChange(e);
    }
  };

  // Bloquear letras no input telefone
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (name === 'phone' && /[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-white font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${error ? 'border-red-400 focus:ring-red-400' : ''} ${className}`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={onBlur}
          {...(value === undefined && register ? register : {})}
          {...rest}
        />
      </div>
      {error && <p className="text-sm mt-1 text-red-300">{error}</p>}
    </div>
  );
}

function AppTextarea({
  label, placeholder, register, error, className = "", ...rest
}: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-white font-semibold mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${error ? 'border-red-400 focus:ring-red-400' : ''} ${className}`}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
      {error && <p className="text-sm mt-1 text-red-300">{error}</p>}
    </div>
  );
}

function AppSelect({
  label, options, register, error, className = "", ...rest
}: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-white font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none ${error ? 'border-red-400 focus:ring-red-400' : ''} ${className}`}
          {...register}
          {...rest}
        >
          {options.map((option: any) => (
            <option key={option.value} value={option.value} className="bg-gray-800 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm mt-1 text-red-300">{error}</p>}
    </div>
  );
}

export default function CtaSection() {
  const { register, handleSubmit, formState: { errors, touchedFields }, setValue } = useForm<FormData>({ mode: "onTouched" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Salvar dados para o WhatsApp
    setSubmittedData(data);
    
    // Aqui você pode integrar com seu serviço de envio de email
    console.log("Form submitted:", data);
    
    // Mostrar mensagem de agradecimento
    setIsFormSubmitted(true);
    setIsSubmitting(false);
  };

    const handleWhatsAppRedirect = () => {
    if (!submittedData) return;
    
    // Mapeamento de serviços (ID -> Label)
    const serviceLabels: { [key: string]: string } = {
      "construcao-completa": "Construção Completa",
      "reformas-modernizacoes": "Reformas e Modernizações",
      "manutencao-preventiva": "Manutenção Preventiva",
      "visita-tecnica": "Visita Técnica",
      "laudo-tecnico": "Laudo Técnico",
      "outros": "Outros"
    };
    
    // Obter o label do serviço
    const serviceName = serviceLabels[submittedData.service] || submittedData.service;
    
    // Criar mensagem para WhatsApp
    const message = `Olá! Gostaria de solicitar um orçamento:

*Nome:* ${submittedData.name}
*E-mail:* ${submittedData.email}
*Telefone:* ${submittedData.phone}
*Serviço:* ${serviceName}
*Mensagem:* ${submittedData.message}`;
    
    // Substitua pelo número real do WhatsApp da empresa (com código do país)
    const whatsappNumber = "5531992261911"; // +55 31 99226-1911
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="relative w-full min-h-screen py-20 md:py-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className={`relative container mx-auto px-4 py-8 ${isFormSubmitted ? 'flex items-center justify-center min-h-[80vh]' : ''}`}>
        <div className="max-w-2xl mx-auto">
          {/* CTA Header */}
          {!isFormSubmitted && (
            <div className="text-center mb-8">
              <h2 className="fade-in text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
                Pronto para Começar seu Projeto?
              </h2>
              <p className="fade-in text-xl text-white leading-relaxed">
                Entre em contato conosco e transforme suas ideias em realidade
              </p>
            </div>
          )}

          {/* Form Glass Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-2xl opacity-50" />
            
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-transparent opacity-50 rounded-2xl" />
              
              {!isFormSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">
                  {/* Name Input */}
                  <AppInput
                    label="Nome Completo *"
                    placeholder="Seu nome"
                    register={register("name", { required: "Nome é obrigatório" })}
                    error={errors.name?.message}
                    touched={touchedFields.name}
                  />

                  {/* Email and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AppInput
                      label="E-mail *"
                      placeholder="seu@email.com"
                      type="email"
                      register={register("email", { 
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "E-mail inválido"
                        }
                      })}
                      error={errors.email?.message}
                      touched={touchedFields.email}
                    />

                    <AppInput
                      label="Telefone *"
                      placeholder="(99) 99999-9999"
                      type="tel"
                      name="phone"
                      value={phoneValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatPhone(e.target.value);
                        setPhoneValue(formatted);
                        setValue("phone", formatted, { shouldValidate: true });
                      }}
                      onBlur={(_e: React.FocusEvent<HTMLInputElement>) => setValue("phone", phoneValue, { shouldValidate: true })}
                      register={register("phone", {
                        required: "Telefone é obrigatório",
                        validate: value => {
                          const digits = value.replace(/\D/g, "");
                          if (!(digits.length === 10 || digits.length === 11)) return "Telefone inválido";
                          return true;
                        }
                      })}
                      error={errors.phone?.message}
                      touched={touchedFields.phone}
                    />
                  </div>

                  {/* Service Select - Full Width */}
                  <AppSelect
                    label="Serviço *"
                    register={register("service", { required: "Selecione um serviço" })}
                    error={errors.service?.message}
                    options={[
                      { value: "", label: "Selecione um serviço" },
                      { value: "construcao-completa", label: "Construção Completa" },
                      { value: "reformas-modernizacoes", label: "Reformas e Modernizações" },
                      { value: "manutencao-preventiva", label: "Manutenção Preventiva" },
                      { value: "visita-tecnica", label: "Visita Técnica" },
                      { value: "laudo-tecnico", label: "Laudo Técnico" },
                      { value: "outros", label: "Outros" }
                    ]}
                  />

                  {/* Message Textarea */}
                  <AppTextarea
                    label="Mensagem *"
                    placeholder="Conte-nos sobre seu projeto..."
                    rows={5}
                    register={register("message", { required: "Mensagem é obrigatória" })}
                    error={errors.message?.message}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar orçamento"}
                  </button>
                </form>
              ) : (
                <div className="relative text-center space-y-6">
                  {/* Success Message */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 border border-white/30 mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Obrigado pelo seu contato!
                    </h3>
                    
                    <p className="text-lg text-white/90 leading-relaxed max-w-md mx-auto">
                      Responderemos sua mensagem em breve.<br />
                      Para agilizar o seu atendimento, encaminhe sua mensagem por WhatsApp clicando no botão abaixo.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4">
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full btn-primary rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.119"/>
                      </svg>
                      <span>Encaminhar mensagem</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

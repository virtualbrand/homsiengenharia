
export const HeroSection = () => {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-white relative overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-0">
        {/* Texto */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-xl z-10">
          <span className="inline-block bg-blue-100 text-blue-700 font-semibold rounded px-3 py-1 text-xs mb-2">
            2 DIAS AO VIVO
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Confeitaria com IA: <span className="text-blue-600">DA SOBRECARGA AO SUCESSO</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mt-2">
            2 dias ao vivo para quebrar o ciclo de trabalhar muito e ganhar pouco, usando IA para organizar, precificar e vender de forma estratégica
          </p>
          <p className="text-base text-gray-600">
            Se você trabalha 12 horas por dia, atende no WhatsApp até tarde e ainda não sabe se está lucrando de verdade, essa imersão vai te mostrar como a IA pode revolucionar sua confeitaria.
          </p>
          <a
            href="#ingresso"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all text-base"
          >
            GARANTIR MEU INGRESSO
          </a>
        </div>
        {/* Imagem decorativa */}
        <div className="flex-1 flex items-center justify-center relative mt-10 md:mt-0">
          <img
            src="/images/confeitaria-hero-bg.png"
            alt="Confeitaria com IA"
            className="max-w-xs md:max-w-md w-full opacity-80 drop-shadow-xl rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

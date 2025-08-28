import { Progress } from "@/components/ui/progress";


export const HeroSection = () => {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-white">
      {/* Imagem de fundo decorativa, pode ser ajustada conforme necessidade */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/duda.webp"
          alt="Confeitaria com IA"
          className="object-cover w-full h-full opacity-40"
          loading="lazy"
        />
      </div>
      <div className="relative h-full w-full flex items-center justify-center z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="backdrop-blur-md rounded-2xl p-8 md:p-10 lg:p-12 max-w-xl lg:max-w-2xl text-white shadow-2xl bg-[var(--color-primary-500)]/90">
            <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold !text-white mb-4">
              Confeitaria com IA: <span className="text-accent-400">da sobrecarga ao sucesso</span>
            </h1>
            <div className="text-white mb-6 leading-relaxed text-base md:text-lg">
              <p className="mb-3">
                2 dias ao vivo para quebrar o ciclo de trabalhar muito e ganhar pouco, usando IA para organizar, precificar e vender de forma estratégica
              </p>
              <p className="mb-3">
                Se você trabalha 12 horas por dia, atende no WhatsApp até tarde e ainda não sabe se está lucrando de verdade, essa imersão vai te mostrar como a IA pode revolucionar sua confeitaria.
              </p>
            </div>
            <div className="space-y-3">
              <button
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 w-full text-base md:text-lg"
                onClick={() => {
                  const el = document.getElementById('ingresso');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Garantir um ingresso
              </button>
              <div className="mt-2">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold text-muted-foreground mr-2">LOTE 1</span>
                  <span className="text-xs font-semibold text-accent-600">35% VENDIDO</span>
                </div>
                <Progress
                  value={35}
                  className="w-full h-3 bg-white/30 rounded-full"
                  barClassName="bg-accent-500 rounded-full transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

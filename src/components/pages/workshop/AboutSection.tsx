import { Timeline } from "@/components/ui/timeline"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export const AboutSection = () => {
  useScrollAnimation();
  const timelineData = [
    {
      image: "/images/duda-about-presets.webp",
      content: (
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <h3 className="text-xl md:text-2xl font-bold !text-[var(--color-amaranth-500)] fade-in">De Mochileira a Confeiteira</h3>
          <p className="fade-in">
            De mochileira aventureira a confeiteira: minha história começou servindo café da manhã numa pousada boutique na Praia do Rosa, onde aprendi que produtos artesanais e locais valem ouro.
          </p>
          <p className="fade-in">
            Formada em Gastronomia pela UFPEL, descobri meu verdadeiro talento quando todos diziam que eu tinha "mão para bolo".
          </p> 
        </div>
      ),
    },
    {
      image: "/images/workshop/primeiro-bolo-duda.webp",
      content: (
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <h3 className="text-xl md:text-2xl font-bold !text-[var(--color-amaranth-500)] fade-in">Onde tudo começou de verdade</h3>
          <p className="fade-in">
            Comecei no meio da pandemia, em setembro de 2020, numa cidade de 30 mil habitantes onde ninguém me conhecia. Meus primeiros testes? O aniversário do meu esposo (feito com caixinha de leite condensado como espátula), o batizado da minha afilhada e o aniversário do meu sobrinho.
          </p>
          <p className="fade-in">
            Foi ali que vi a mão de Deus: o produto era excepcional e eu seria capaz de faturar muito mais do que trabalhando para outras pessoas.
          </p>
        </div>
      ),
    },
    {
      image: "/images/duda-about-presets.webp",
      content: (
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <h3 className="text-xl md:text-2xl font-bold !text-[var(--color-amaranth-500)]">Crescimento exponencial em 3 anos</h3>
          <p className="fade-in">
            Em janeiro de 2021 criei o Instagram da Conto Atelier. No primeiro ano bati R$ 10 mil/mês, no segundo cheguei a R$ 15 mil, e na alta temporada alcancei R$ 30 mil/mês com quatro funcionárias.
          </p>
        </div>
      ),
    },
    {
      image: "/images/duda-about-presets.webp",
      content: (
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <h3 className="text-xl md:text-2xl font-bold !text-[var(--color-amaranth-500)]">Maternidade e negócio em equilíbrio</h3>
          <p className="fade-in">
            Quando engravidei, escolhi ter mais tempo com meu filho. Repaginei tudo: transformei a confeitaria num formato menor, mais lucrativo, que me permite faturar bem enquanto cuido da minha família.
          </p>
        </div>
      ),
    },
     {
      image: "/images/duda-about-presets.webp",
      content: (
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <h3 className="text-xl md:text-2xl font-bold !text-[var(--color-amaranth-500)]">Por que me tornei Mentora</h3>
          <p className="fade-in">
            Acredito que fazer bolos incríveis não basta – você precisa saber o que vender, como precificar e onde divulgar. E é exatamente isso que eu ensino: o lado estratégico que ninguém te conta.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      {/* Timeline Section */}
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="fade-in text-3xl md:text-4xl font-bold text-center !text-[var(--color-amaranth-500)] mb-0">
          Conheça minha trajetória até me tornar Mentora
        </h2>
        <Timeline data={timelineData} showHeader={false} />
      </div>
    </section>
  )
}

export default AboutSection

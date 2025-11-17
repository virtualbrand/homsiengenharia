'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

const AboutSection = () => {
  useScrollAnimation()

  return (
    <section id="sobre" className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:block">
          {/* Image Side - Aparece primeiro no mobile, float right no desktop */}
          <div className="w-full mb-6 md:mb-8 md:float-right md:w-5/12 md:ml-8 lg:ml-10">
            <div className="fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-2xl opacity-20 blur-2xl" />
              <Image
                src="/images/kemel.webp"
                alt="Kemel Homsi - Engenheiro Civil"
                width={1000}
                height={1239}
                quality={80}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMjM5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEyMzkiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
                className="relative rounded-2xl w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>

          {/* Content Side - Flui ao redor da imagem */}
          <div className="w-full">
            <div>
              <span className="fade-in font-bold text-sm uppercase tracking-wider block text-[var(--color-secondary-700)]">
                A Engenharia construída pela Experiência
              </span>
              <h2 className="fade-in text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Kemel Amir el Homsi 
              </h2>
              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-6">
                <span className="font-bold text-gray-900">Na Homsi Engenharia</span>, fundada em 2024 sobre pilares de excelência e inovação, a história do seu fundador, Kemel Amir El Homsi, é a própria base de nossa credibilidade. Engenheiro por vocação e formação pela Pontifícia Universidade Católica, Kemel não é apenas um visionário, mas um construtor com as mãos na massa, cuja jornada profissional é um testemunho de dedicação e expertise prática.
              </p>
              
              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-6">
                Sua paixão pela construção começou nos alicerces: desde os estágios na Prefeitura de Belo Horizonte e na Engenharia dos Correios, Kemel forjou seu conhecimento. No Departamento de Estradas e Rodagens de Minas Gerais (DER-MG), ele não só esteve em laboratórios e na elaboração de projetos rodoviários, mas vivenciou, in loco, a grandiosidade da engenharia de infraestrutura. Foi ele quem acompanhou, do início ao fim, as complexas obras da Secopa, incluindo a construção de três viadutos e as ampliações cruciais da rodovia para o Aeroporto de Confins, demonstrando uma capacidade ímpar de gestão e fiscalização em projetos de grande escala.
              </p>

              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-6">
                Sua passagem pela SUDECAP, fiscalizando e garantindo a normativa de obras, e sua experiência em pavimentação asfáltica, incluindo a revitalização de estradas no interior de Minas e a criação de estacionamentos emblemáticos como os do Del Rey e BH Shopping, consolidaram uma visão abrangente. Até mesmo na montagem de estruturas temporárias tão desafiadoras quanto as do Cirque du Soleil em São Paulo e Rio de Janeiro, Kemel deixou sua marca de competência e proatividade.
              </p>

              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-6">
                A habilidade de Kemel em gerir complexidades foi testada até mesmo em projetos tão singulares quanto a montagem do Cirque du Soleil em São Paulo e Rio de Janeiro. Contudo, foi a partir de 2014 que ele encontrou sua verdadeira paixão e especialização: <span className="font-bold text-gray-900">a construção civil de alto padrão</span>. Em condomínios de luxo como Vale dos Cristais, Vila Del Rey e Riviera, Kemel já transformou mais de 16 visões em lares de tirar o fôlego, consolidando uma reputação de precisão, qualidade e, acima de tudo, compromisso com a excelência.
              </p>

              <p className="fade-in text-lg text-gray-700 leading-relaxed mb-8">
                Na Homsi Engenharia, cada projeto é uma extensão dessa expertise. Somos a voz da obra bem feita, pautada na integridade inegociável e no cuidado artesanal. Nosso foco na solução prática e na proatividade garante que cada detalhe, desde o conceito à entrega das chaves e ao pós-obra, seja impecável. Kemel Amir El Homsi imprime na Homsi a garantia de que seu investimento será materializado em um sonho, com a assistência e competência que só uma vida inteira dedicada à engenharia pode oferecer. Para nós, sua satisfação não é apenas um objetivo; é a nossa palavra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

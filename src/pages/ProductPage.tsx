import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-pink-200"></div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pink-700">Curso de Confeitaria Avançada</h1>
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600">4.9 (128 avaliações)</span>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-pink-700">R$ 497,00</div>
                      <div className="text-gray-500 line-through text-lg">R$ 997,00</div>
                    </div>
                    <div className="bg-pink-100 text-pink-800 font-medium py-2 px-4 rounded-md inline-block">
                      50% de desconto - Oferta por tempo limitado!
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">O que você vai aprender:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Técnicas avançadas de confeitaria profissional</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Precificação estratégica para maximizar lucros</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Marketing digital para confeiteiras</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Gestão de negócio para confeitaria</span>
                      </li>
                    </ul>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-pink-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-700 transition-colors"
                  >
                    Comprar agora
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-pink-700">Detalhes do Curso</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-pink-700">Descrição</h3>
              <p className="text-gray-600 mb-4">
                O Curso de Confeitaria Avançada é perfeito para confeiteiras que já dominam o básico e desejam elevar 
                suas habilidades a um nível profissional. Com técnicas exclusivas e estratégias de negócio, você 
                aprenderá a criar doces sofisticados e altamente rentáveis.
              </p>
              <p className="text-gray-600">
                Desenvolvido por Duda Berger, com mais de 10 anos de experiência no mercado de confeitaria de luxo, 
                este curso combina excelência técnica com visão empresarial para transformar sua paixão em um negócio 
                lucrativo.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-pink-700">O que está incluso</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>40 aulas em vídeo HD</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>E-book com 50 receitas exclusivas</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Planilhas de precificação</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Grupo exclusivo de alunos</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Certificado de conclusão</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Acesso vitalício</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Suporte por 6 meses</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Atualizações gratuitas</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-700">Módulos do curso</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Módulo 1: Fundamentos da Confeitaria Avançada</h4>
                    <span className="text-sm text-gray-500">5 aulas</span>
                  </div>
                  <p className="text-gray-600 text-sm">Aprenda as técnicas e conceitos fundamentais que serão a base para todo o curso.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Módulo 2: Massas e Recheios Gourmet</h4>
                    <span className="text-sm text-gray-500">8 aulas</span>
                  </div>
                  <p className="text-gray-600 text-sm">Desenvolva massas especiais e recheios exclusivos que se destacam no mercado.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Módulo 3: Decoração Profissional</h4>
                    <span className="text-sm text-gray-500">10 aulas</span>
                  </div>
                  <p className="text-gray-600 text-sm">Técnicas de decoração que transformam seus doces em verdadeiras obras de arte.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Módulo 4: Precificação e Gestão de Negócio</h4>
                    <span className="text-sm text-gray-500">7 aulas</span>
                  </div>
                  <p className="text-gray-600 text-sm">Aprenda a precificar seus produtos corretamente e gerencie seu negócio com eficiência.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Módulo 5: Marketing para Confeitarias</h4>
                    <span className="text-sm text-gray-500">10 aulas</span>
                  </div>
                  <p className="text-gray-600 text-sm">Estratégias de marketing digital para atrair clientes e vender mais.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-700 transition-colors"
            >
              Garantir minha vaga agora
            </motion.button>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-8 text-pink-700">Depoimentos de Alunas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold text-gray-800">Mariana Costa</h3>
                    <p className="text-sm text-gray-500">Confeiteira em São Paulo</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">
                  "Esse curso mudou completamente minha vida profissional. Aprendi técnicas que me permitiram criar produtos 
                  únicos e a parte de gestão me ajudou a triplicar meu faturamento em apenas 4 meses. Recomendo a todas as confeiteiras!"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductPage

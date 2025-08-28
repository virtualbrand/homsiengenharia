
import { motion } from "framer-motion";

const PainSection = () => (
  <section className="w-full py-20 lg:py-24 bg-[var(--color-primary-500)]">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold !text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        O que te mantém sobrecarregada hoje... não é falta de clientes.
      </motion.h2>
      <motion.p
        className="text-white mb-4 font-normal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Você já provou que sabe fazer doces incríveis. Tem demanda, tem pessoas que amam seus produtos, tem potencial real.<br/>
        O problema não é sua competência. É sua organização.
      </motion.p>
      <motion.p
        className="text-white mb-4 font-normal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
      >
        A maioria das confeiteiras fica anos no ciclo de "correria constante" porque não sabe:
      </motion.p>
      <motion.ul
        className="text-white mb-4 font-normal text-left max-w-lg mx-auto list-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <li>✗ Como precificar corretamente (e para de trabalhar "de graça")</li>
        <li>✗ Como organizar demandas sem virar escrava do próprio negócio</li>
        <li>✗ Como usar IA para automatizar 80% das tarefas repetitivas</li>
        <li>✗ Como criar conteúdo sem passar horas nas redes sociais</li>
        <li>✗ Como controlar finanças de forma simples e eficaz</li>
      </motion.ul>
      <motion.p
        className="text-white mb-4 font-normal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        viewport={{ once: true }}
      >
        Sem sistema inteligente, você fica refém da própria desorganização.<br/>
        Um ciclo desgastante que se repete: aceita tudo, cobra pouco, trabalha demais, não sobra tempo para crescer estrategicamente.
      </motion.p>
      <motion.button
        className="mt-2 bg-[#CC8A3A] hover:bg-[#b8772d] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg font-kumbh"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
        onClick={() => {
          const el = document.getElementById('investimento');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Quero dominar o efeito agora
      </motion.button>
    </div>
  </section>
);

export default PainSection;

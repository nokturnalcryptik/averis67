import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Ready to organize your group?
          </h2>
          <p className="mt-4 text-gray-500">
            Join hundreds of Roblox groups already using Prova to run things smoothly.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#5B6CF7] hover:bg-[#4A5BE6] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Get started free
              <ArrowRight size={16} />
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Free forever · Only upgrade when you need more
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

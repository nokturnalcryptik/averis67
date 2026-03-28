import React, { useState, useEffect } from 'react';
import { faqItems as mockFaq } from '../data/mockData';
import { fetchFAQ } from '../services/api';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqItems, setFaqItems] = useState(mockFaq);

  useEffect(() => {
    fetchFAQ().then(setFaqItems);
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Common questions
          </h2>
          <p className="mt-4 text-gray-500">
            Quick answers to what most people ask before getting started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-xl border border-gray-200 px-6 overflow-hidden data-[state=open]:border-gray-300"
              >
                <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-10 bg-white rounded-2xl border border-gray-200 p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need help?</h3>
          <p className="text-sm text-gray-500 mb-4">
            If you need help setting things up, our team is happy to help.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6CF7] hover:text-[#4A5BE6] transition-colors duration-200"
          >
            Get in touch
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

import React from 'react';
import { guideArticles } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Clock } from 'lucide-react';

const GuidesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="guides" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <p className="text-sm font-medium text-[#5B6CF7] mb-3">Guides</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Learn how to get the most out of Prova
            </h2>
            <p className="mt-4 text-gray-500">
              Short, practical guides to help you set up and run your group better.
            </p>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6CF7] hover:text-[#4A5BE6] transition-colors duration-200 whitespace-nowrap"
          >
            All guides
            <ArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guideArticles.map((article, i) => (
            <motion.a
              key={i}
              href={article.link}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="group block bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-[#5B6CF7] transition-colors duration-200">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#5B6CF7]/10 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-[#5B6CF7]">{article.authorInitials}</span>
                  </div>
                  <span className="text-xs text-gray-400">{article.author}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={10} />
                  {article.readTime}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6CF7]"
          >
            All guides
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;

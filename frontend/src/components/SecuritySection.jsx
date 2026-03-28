import React from 'react';
import { securityFeatures } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, FileText, UserCheck } from 'lucide-react';

const iconMap = {
  Shield,
  Lock,
  FileText,
  UserCheck,
};

const SecuritySection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Your group's data is safe
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Built with security from the ground up — so you can focus on your group, not data leaks.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-[#5B6CF7]/20 group-hover:bg-[#5B6CF7]/5 transition-colors duration-300">
                  {Icon && <Icon size={18} className="text-gray-600 group-hover:text-[#5B6CF7] transition-colors duration-300" />}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;

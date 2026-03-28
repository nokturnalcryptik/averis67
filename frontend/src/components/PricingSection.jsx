import React from 'react';
import { pricingPlans } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" ref={ref} className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium text-[#5B6CF7] mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Simple plans, no surprises
          </h2>
          <p className="mt-4 text-gray-500">
            Start free. Upgrade when you're ready for more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-[#5B6CF7] bg-white shadow-lg shadow-[#5B6CF7]/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-[#5B6CF7] text-white text-xs font-medium px-3 py-1 rounded-full">
                    <Star size={10} fill="white" />
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.priceSubtext && (
                  <p className="text-xs text-gray-400 mt-1">{plan.priceSubtext}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#5B6CF7]/10 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#5B6CF7]" />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={!plan.ctaLink}
                className={`w-full py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  plan.popular
                    ? 'bg-[#5B6CF7] text-white hover:bg-[#4A5BE6]'
                    : plan.ctaLink
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

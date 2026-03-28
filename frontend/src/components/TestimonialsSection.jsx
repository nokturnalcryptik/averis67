import React, { useState, useEffect } from 'react';
import { testimonials as mockTestimonials } from '../data/mockData';
import { fetchTestimonials } from '../services/api';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonials, setTestimonials] = useState(mockTestimonials);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Groups that switched love it
          </h2>
          <p className="mt-4 text-gray-500">
            Hear from the people actually using Prova to run their communities.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
            >
              <Quote size={16} className="text-[#5B6CF7]/30 mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5B6CF7]/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-[#5B6CF7]">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role} · {testimonial.group}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

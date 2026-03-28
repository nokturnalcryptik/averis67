import React, { useState, useEffect } from 'react';
import { stats as mockStats } from '../data/mockData';
import { fetchStats } from '../services/api';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="stat-number text-3xl md:text-4xl font-bold text-gray-900">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    decimals={stat.isDecimal ? 1 : 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  '0'
                )}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

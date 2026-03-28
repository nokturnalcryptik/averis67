import React from 'react';
import { robloxGroups } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LogoTicker = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const tripleGroups = [...robloxGroups, ...robloxGroups, ...robloxGroups];

  return (
    <section ref={ref} className="py-10 overflow-hidden bg-white">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-center text-sm text-gray-400 mb-8"
      >
        Thousands of Roblox communities are already using Prova
      </motion.p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="ticker-track flex items-center gap-8 w-max">
          {tripleGroups.map((group, i) => (
            <div
              key={`${group.name}-${i}`}
              className="flex items-center gap-3 flex-shrink-0 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100"
            >
              <img
                src={group.logo}
                alt={group.name}
                className="w-8 h-8 rounded-lg object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 whitespace-nowrap">{group.name}</p>
                <p className="text-xs text-gray-400">Roblox group</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;

import React, { useState } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitWaitlist } from '../services/api';

const HeroSection = () => {
  const [aiInput, setAiInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitAI = async () => {
    if (!aiInput.trim() || submitting) return;
    setSubmitting(true);
    try {
      await submitWaitlist(aiInput);
      setAiInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9ff] to-white pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 leading-[1.1]"
        >
          Run your Roblox{' '}
          <br />
          <span className="hero-groups-text text-5xl md:text-7xl">groups</span>
          <br />
          like a pro.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
        >
          Cases, staff, sessions, rankings, AI thumbnails — everything your group needs, in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#5B6CF7] hover:bg-[#4A5BE6] text-white px-8 py-3.5 rounded-full text-base font-medium transition-colors duration-200 shadow-lg shadow-[#5B6CF7]/20"
          >
            Start using Prova
            <ArrowRight size={16} />
          </a>

          <span className="text-gray-400 text-sm">or</span>

          <div className="relative">
            <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm w-64">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#5B6CF7] to-[#8B9CF9] mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Create with ProvAI..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
              <button
                onClick={handleSubmitAI}
                disabled={submitting}
                className="ml-2 w-8 h-8 bg-[#5B6CF7] rounded-full flex items-center justify-center text-white hover:bg-[#4A5BE6] transition-colors duration-200 disabled:opacity-50"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-5 flex items-center justify-center gap-4 text-xs text-gray-400"
        >
          <span>Free forever</span>
          <span>·</span>
          <span>No credit card</span>
          <span>·</span>
          <span>Set up in 5 min</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

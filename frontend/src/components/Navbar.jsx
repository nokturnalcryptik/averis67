import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/mockData';
import { ArrowRight, X, MessageSquare, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopBanner = ({ onClose }) => {
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      exit={{ y: -40, opacity: 0 }}
      className="bg-[#0a0a14] text-white py-2.5 px-4 flex items-center justify-center text-sm relative"
    >
      <div className="flex items-center gap-2">
        <span className="text-gray-400">◀</span>
        <span>👑</span>
        <span className="text-gray-300">
          Want to get your group featured? Open a ticket!
        </span>
        <span className="text-gray-500">— nullpagee</span>
      </div>
      <button
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

const Navbar = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showBanner && <TopBanner onClose={() => setShowBanner(false)} />}
      </AnimatePresence>
      <nav
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b transition-shadow duration-300 ${
          scrolled ? 'shadow-sm border-gray-200/60' : 'border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5B6CF7] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">Prova</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 transition-colors duration-200"
            >
              <MessageSquare size={14} />
              Join Discord
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 bg-[#5B6CF7] hover:bg-[#4A5BE6] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Open app
              <ArrowRight size={14} />
            </a>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#"
                  className="block px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  Join Discord
                </a>
                <a
                  href="#"
                  className="block mt-2 text-center bg-[#5B6CF7] text-white px-5 py-2.5 rounded-full text-sm font-medium"
                >
                  Open app →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;

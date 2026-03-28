import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings } from 'lucide-react';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Cookie size={16} className="text-amber-500" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">We use cookies</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  We use cookies to improve your experience. You can customize your preferences below.{' '}
                  <a href="#" className="text-[#5B6CF7] hover:underline">Cookie Policy</a>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-[#5B6CF7] text-white text-xs font-medium py-2 rounded-lg hover:bg-[#4A5BE6] transition-colors duration-200"
              >
                Accept All
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-gray-100 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Reject All
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Settings size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

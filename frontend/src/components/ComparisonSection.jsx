import React from 'react';
import { withoutProva, withProvaList, comparisonFeatures, comparisonData } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check, AlertTriangle } from 'lucide-react';

const ComparisonSection = () => {
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Messy vs Prova Section */}
      <section ref={ref1} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Running a group shouldn't feel this messy
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Most groups don't fail because their team is lazy — they fail because the tools aren't there.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Without Prova */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="bg-red-50/50 border border-red-100 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-400" />
                Without the right tools
              </h3>
              <ul className="space-y-4">
                {withoutProva.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X size={12} className="text-red-500" />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* With Prova */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-green-50/50 border border-green-100 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                With Prova
              </h3>
              <ul className="space-y-4">
                {withProvaList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={ref2} className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              One tool instead of five
            </h2>
            <p className="mt-4 text-gray-500">
              See how Prova stacks up against what most groups are still using.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Feature</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-[#5B6CF7]">Prova</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-gray-500">Spreadsheets</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-gray-500">Discord bots</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i} className={`${i < comparisonFeatures.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <td className="px-6 py-3.5 text-sm text-gray-600">{feature}</td>
                      <td className="text-center px-4 py-3.5">
                        {comparisonData.prova[i] ? (
                          <div className="w-5 h-5 rounded-full bg-[#5B6CF7]/10 flex items-center justify-center mx-auto">
                            <Check size={12} className="text-[#5B6CF7]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                            <X size={12} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="text-center px-4 py-3.5">
                        {comparisonData.spreadsheets[i] ? (
                          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                            <Check size={12} className="text-green-500" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                            <X size={12} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="text-center px-4 py-3.5">
                        {comparisonData.discordBots[i] ? (
                          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                            <Check size={12} className="text-green-500" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                            <X size={12} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ComparisonSection;

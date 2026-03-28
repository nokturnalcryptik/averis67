import React, { useState } from 'react';
import { featureTabs, caseItems, caseTags } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FileText, Calendar, Activity, Trophy, Users, Sparkles,
  Webhook, Shield, Bell, Upload, UserPlus, Clock, Tag, Download
} from 'lucide-react';

const tabIcons = {
  Cases: FileText,
  Sessions: Calendar,
  Activity: Activity,
  Rankings: Trophy,
  Staff: Users,
  ProvAI: Sparkles,
  Webhooks: Webhook,
  Security: Shield,
  Notices: Bell,
};

const tagIcons = {
  'Evidence uploads': Upload,
  'Assignments': UserPlus,
  'Timeline': Clock,
  'Tags': Tag,
  'Export': Download,
};

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState('Cases');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="features" ref={ref} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#5B6CF7] mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Everything your group needs
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Prova brings all your tools into one clean workspace — so your team can focus on running the group, not managing spreadsheets.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-10 bg-white p-1.5 rounded-xl border border-gray-200 max-w-fit mx-auto">
          {featureTabs.map((tab) => {
            const Icon = tabIcons[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#5B6CF7] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon size={14} />}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'Cases' && <CasesContent />}
            {activeTab !== 'Cases' && (
              <div className="feature-card bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-[#5B6CF7]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {React.createElement(tabIcons[activeTab], { size: 28, className: 'text-[#5B6CF7]' })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{activeTab}</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Powerful {activeTab.toLowerCase()} management tools to help your team stay organized and efficient.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const CasesContent = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left - Description */}
      <div className="feature-card bg-white rounded-2xl border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Cases that keep everything together
        </h3>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Every report has evidence, assignments, and a timeline — so nothing gets lost in Discord chats.
        </p>

        <div className="flex flex-wrap gap-2">
          {caseTags.map((tag) => {
            const Icon = tagIcons[tag];
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100"
              >
                {Icon && <Icon size={12} />}
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* Right - Case cards */}
      <div className="feature-card bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          app.withprova.app/cases
        </div>

        <div className="space-y-3">
          {caseItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400">Assigned to {item.assignee}</p>
                </div>
              </div>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  color: item.statusColor,
                  backgroundColor: `${item.statusColor}15`,
                }}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

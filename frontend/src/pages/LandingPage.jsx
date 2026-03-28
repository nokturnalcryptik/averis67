import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LogoTicker from '../components/LogoTicker';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import ComparisonSection from '../components/ComparisonSection';
import SecuritySection from '../components/SecuritySection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import GuidesSection from '../components/GuidesSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <LogoTicker />
      <StatsSection />
      <FeaturesSection />
      <ComparisonSection />
      <SecuritySection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <GuidesSection />
      <CTASection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default LandingPage;

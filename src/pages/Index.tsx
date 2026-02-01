import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { Footer } from "@/components/Footer";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { VideographySection } from "@/components/sections/VideographySection";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact' || location.hash === 'contact') {
      const scrollToContact = () => {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      };
      const t = setTimeout(scrollToContact, 150);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <>
      <SEO language={i18n.language as 'en' | 'sk'} />
      <div className="min-h-screen">
        <Navigation variant="homepage" />
        <HeroSection />
        <PortfolioSection />
        <ExperienceSection />
        <SkillsSection />
        <VideographySection />
        <Footer variant="full" />
      </div>
    </>
  );
};

export default Index;
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { VideographySection } from "@/components/sections/VideographySection";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { i18n } = useTranslation();

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
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
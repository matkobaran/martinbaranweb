import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { VideographySection } from "@/components/sections/VideographySection";
import { SEO } from "@/components/SEO";
import { useTranslation } from 'react-i18next';
/*import { BlogSection } from "@/components/sections/BlogSection";*/
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  return (
    <>
      <SEO language={i18n.language as 'en' | 'sk'} />
      <div className="min-h-screen">
        <HeroSection />
        <PortfolioSection />
        <ExperienceSection />
        <SkillsSection />
        {/* <BlogSection /> */}
        <VideographySection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
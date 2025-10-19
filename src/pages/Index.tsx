import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { VideographySection } from "@/components/sections/VideographySection";
/*import { BlogSection } from "@/components/sections/BlogSection";*/
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen">
      <HeroSection />
      <PortfolioSection />
      <ExperienceSection />
      <SkillsSection />
      {/* <BlogSection /> */}
      <VideographySection />
      <ContactSection />
    </div>
  );
};

export default Index;
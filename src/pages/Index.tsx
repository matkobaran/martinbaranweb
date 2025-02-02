import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { VideographySection } from "@/components/VideographySection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <PortfolioSection />
      <VideographySection />
      <ContactSection />
    </div>
  );
};

export default Index;
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { VideographySection } from "@/components/VideographySection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        setIsAdmin(roles?.role === "admin");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        {isAdmin && (
          <Button 
            variant="outline"
            onClick={() => navigate("/admin")}
            className="mr-2"
          >
            Admin Dashboard
          </Button>
        )}
      </div>
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
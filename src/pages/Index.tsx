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
import { UserCog } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      console.log("Checking admin status...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log("User found:", user.id);
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        console.log("User roles:", roles);
        setIsAdmin(roles?.role === "admin");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check admin status",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        {isAdmin && (
          <Button 
            variant="outline"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <UserCog className="w-4 h-4" />
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
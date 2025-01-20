import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { VideographySection } from "@/components/VideographySection";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCreateAlbum = () => {
    if (!session) {
      toast.error("Please login to create an album");
      return;
    }
    // TODO: Implement album creation
    toast.info("Album creation coming soon!");
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <PortfolioSection />
      <VideographySection />
      <ContactSection />
      
      {session && (
        <div className="fixed bottom-8 right-8">
          <Button 
            onClick={handleCreateAlbum}
            className="rounded-full h-16 w-16 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
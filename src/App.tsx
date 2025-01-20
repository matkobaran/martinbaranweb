import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Video from "./pages/Video";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const Navigation = () => {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

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

  const handleAuth = async () => {
    if (session) {
      try {
        await supabase.auth.signOut();
        toast.success("Logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error logging out");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        console.error("Error logging in:", error);
        toast.error("Error logging in");
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 dark:bg-navy/80 backdrop-blur-sm">
      <div className="text-2xl font-bold text-white">MB</div>
      <Button 
        variant="ghost" 
        className="text-white hover:bg-white/20"
        onClick={handleAuth}
      >
        {session ? (
          <>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </>
        )}
      </Button>
    </nav>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/video/:id" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Video from "./pages/VideoDetail";
import Videos from "./pages/Videos";

const CHATBOT_SCRIPT_URL = "https://web-production-f1a43.up.railway.app/static/embed.js";
const CHATBOT_TENANT_ID = "martinbaran.com";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (document.getElementById("chatbot-embed")) return;
    const script = document.createElement("script");
    script.id = "chatbot-embed";
    script.src = CHATBOT_SCRIPT_URL;
    script.setAttribute("data-tenant-id", CHATBOT_TENANT_ID);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const el = document.getElementById("chatbot-embed");
      if (el?.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/events" element={<Portfolio />} />
            <Route path="/portfolio/sport" element={<Portfolio />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
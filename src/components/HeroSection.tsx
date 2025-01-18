import { motion } from "framer-motion";
import { ArrowDown, Menu, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-skyblue to-blue-400 text-white p-4">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Home className="w-6 h-6" />
          <span>PhotoFolio</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-lg hover:text-skyblue transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-lg hover:text-skyblue transition-colors text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-lg hover:text-skyblue transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>

      <div className="text-center" id="home">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          John Doe
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl mb-8"
        >
          Photographer
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ArrowDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};
import { motion } from "framer-motion";
import { ArrowDown, Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AnimatedButton from "./my components/AnimatedButton";

const menuItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'videography', label: 'Videography' },
  { id: 'contact', label: 'Contact' }
];

export const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModePreference.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModePreference.addEventListener('change', handler);
    return () => darkModePreference.removeEventListener('change', handler);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.location.reload();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-r from-skyblue to-blue-400 dark:from-navy dark:to-blue-900 text-white">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 dark:bg-navy/80 backdrop-blur-sm">
        <button onClick={handleLogoClick} className="text-2xl font-bold">
          MB
        </button>
        <div className="flex items-center gap-4">
          <div className="mr-5">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-lg hover:text-white/80 transition-colors relative group"
              >
                {item.label}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
              </button>
            ))}
          </div>

          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-skyblue/95 dark:bg-navy/95 backdrop-blur-sm py-2 md:hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-32 flex min-h-screen items-center" id="home">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm Martin
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              A passionate software developer currently based in Brno, Czechia, specializing in software development for Windows, mobile and web application. When I'm not coding, you'll find me taking photos or jogging.
            </p>
            <div className="flex gap-4">
            <AnimatedButton
              text="View photos"
              onClick={() => scrollToSection('portfolio')}
              variant="primary"
            />
            <AnimatedButton
              text="Get in Touch"
              onClick={() => scrollToSection('contact')}
              variant="secondary"
            />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col pb-4 gap-4 max-w-sm mx-auto"
          >
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczP_m0HEKdoz8kbXcF6MYbnkATWq1sJwooRGSqU3K8yelcQm3GX6MxiCSetj8k8y2rSJF5laIR18ocZkXVl312UNr5JxSUxFI8Dc_TjSVd3rpko34a4JgcXjKRY4g4YGbHLRdeAj4IL79Oj7Sfb2Z8GzVA=w472-h815-s-no-gm"
                alt="Martin Baran"
                className="rounded-2xl w-full shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
            </div>

          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => scrollToSection('experience')}
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};
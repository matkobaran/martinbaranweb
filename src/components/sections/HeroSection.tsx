import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import titlePhotoThumb from "/resources/img/hero/title_thumb.webp";
import titlePhotoMedium from "/resources/img/hero/title_medium.webp";
import titlePhotoFull from "/resources/img/hero/title_full.webp";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import AnimatedButton from "../my components/AnimatedButton";
import { Navigation } from "../Navigation";

export const HeroSection = () => {
  const { t } = useTranslation();
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
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-r from-skyblue to-navy text-white overflow-hidden">
      <Navigation variant="homepage" />

      <div className="container mx-auto px-4 pt-32 flex min-h-screen items-center overflow-hidden" id="home">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t('hero.greeting')}
            </h1>
            <p 
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('hero.description') }}
            />
            <div className="flex flex-col sm:flex-row gap-4">
            <AnimatedButton
              text={t('hero.portfolioButton')}
              onClick={() => scrollToSection('portfolio')}
              variant="primary"
            />
            <AnimatedButton
              text={t('hero.contactButton')}
              onClick={() => scrollToSection('contact')}
              variant="secondary"
            />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col pb-4 gap-4 max-w-sm mx-auto w-full"
          >
            <div className="relative">
              <picture>
                {/* Optimized responsive images with high quality */}
                <source media="(max-width: 480px)" srcSet={titlePhotoMedium} />
                <source media="(max-width: 768px)" srcSet={titlePhotoMedium} />
                <source media="(max-width: 1024px)" srcSet={titlePhotoFull} />
                <img
                  src={titlePhotoFull}
                  alt="Martin Baran"
                  className="rounded-2xl w-full h-auto shadow-xl object-cover"
                  loading="eager"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
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
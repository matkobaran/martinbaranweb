import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavigationProps {
  variant?: 'homepage' | 'subpage';
}

export const Navigation = ({ variant = 'homepage' }: NavigationProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage first
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      // If already on homepage, scroll to top immediately
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  };

  // Scroll to top when navigating to homepage
  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [location.pathname]);

  const menuItems = [
    { id: 'portfolio', label: t('navigation.photography') },
    { id: 'experience', label: t('navigation.experience') },
    { id: 'skills', label: t('navigation.skills') },
    { id: 'videography', label: t('navigation.videography') },
    { id: 'contact', label: t('navigation.contact') }
  ];

  const isSubpage = variant === 'subpage' || location.pathname !== '/';

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
      <button 
        onClick={handleLogoClick} 
        className="text-2xl font-bold text-white flex items-center gap-2"
      >
        {isSubpage && <Home size={20} />}
        MB
      </button>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher textColor="text-white" />
        
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-lg hover:text-white/80 transition-colors relative group text-white"
            >
              {item.label}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
            </button>
          ))}
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-skyblue/95 backdrop-blur-sm py-2 md:hidden border-t border-white/20">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

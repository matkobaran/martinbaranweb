import { motion } from "framer-motion";
import { ArrowDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'videography', label: 'Videography' },
  { id: 'contact', label: 'Contact' }
];

export const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-r from-skyblue to-blue-400 text-white">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="text-2xl font-bold">
          Martin Baran
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
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

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-skyblue/95 backdrop-blur-sm py-2 md:hidden">
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
              A passionate software developer based in Prague, specializing in creating beautiful and functional web experiences. When I'm not coding, you'll find me exploring nature photography and practicing yoga.
            </p>
            <div className="flex gap-4">
              <Link to="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white text-skyblue px-6 py-3 rounded-full font-semibold cursor-pointer"
                >
                  View My Work
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border-2 border-white px-6 py-3 rounded-full font-semibold cursor-pointer"
                onClick={() => scrollToSection('contact')}
              >
                Get in Touch
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 max-w-sm mx-auto"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Martin Baran"
                className="rounded-2xl w-full shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <h3 className="text-xl font-semibold mb-3">Quick Facts</h3>
              <ul className="space-y-2">
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2"
                >
                  🎓 Master's in Computer Science
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2"
                >
                  💼 5+ years of development experience
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2"
                >
                  📸 Amateur photographer
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2"
                >
                  🧘‍♂️ Yoga enthusiast
                </motion.li>
              </ul>
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
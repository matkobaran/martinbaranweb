import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-r from-skyblue to-blue-400 text-white">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="text-2xl font-bold">
          Martin Baran
        </Link>
        <div className="flex gap-8">
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
      </nav>

      <div className="container mx-auto px-4 pt-32 flex min-h-screen items-center" id="home">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white text-skyblue px-6 py-3 rounded-full font-semibold cursor-pointer"
                onClick={() => scrollToSection('portfolio')}
              >
                View My Work
              </motion.div>
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
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Quick Facts</h3>
              <ul className="space-y-4">
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};
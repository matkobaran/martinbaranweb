import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import AnimatedButton from "./my components/AnimatedButton";
import titleCyberWine from "/resources/img/Cyber Wine/title.jpg";
import titleBDParis from "/resources/img/BD Paris/title.jpg";
import titleBDLondon from "/resources/img/BD London/title.jpg";

const photos = [
  {
    id: 1,
    src: titleBDParis,
    title: "Best Diplomats Paris 2025",
  },
  {
    id: 2,
    src: titleBDLondon,
    title: "Best Diplomats London 2024",
  },
  {
    id: 3,
    src: titleCyberWine,
    title: "Cyber Wine 2024",
  }
];

export const PortfolioSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
    const [visibleCount, setVisibleCount] = useState(3);
  

  const handlePhotoClick = (photo: typeof photos[0]) => {
    navigate(`/portfolio?category=${photo.title.toLowerCase()}`);
  };

   useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setVisibleCount(3);
        } else if (window.innerWidth >= 768) {
          setVisibleCount(2);
        } else {
          setVisibleCount(3);
        }
      };
  
      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  // Show all photos on mobile (sm), 2 photos on md, and 3 photos on lg
  const visiblePhotos = photos.slice(0, isMobile ? 3 : window.innerWidth < 1024 ? 2 : 3);

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="portfolio">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue dark:text-blue-400">Photo portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col items-center">
          <Link to="/portfolio" className="group">
            <AnimatedButton
              text="View more photo categories"
              variant="wide"
              decoration={true}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
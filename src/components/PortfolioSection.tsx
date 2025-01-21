import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    title: "Nature",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07",
    title: "Architecture",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    title: "Landscape",
  }
];

export const PortfolioSection = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handlePhotoClick = (photo: typeof photos[0]) => {
    navigate(`/portfolio?category=${photo.title.toLowerCase()}`);
  };

  const visiblePhotos = showAll ? photos : photos.slice(0, 2);

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
        
        <div className="mt-12 flex flex-col items-center gap-4">
          {photos.length > 2 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAll(!showAll)}
              className="border-2 border-skyblue dark:border-blue-400 px-6 py-3 rounded-full font-semibold cursor-pointer flex items-center gap-2 text-skyblue dark:text-blue-400 hover:bg-skyblue hover:text-white dark:hover:bg-blue-400 transition-all"
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp className="transition-transform" />
                </>
              ) : (
                <>
                  Show more
                  <ChevronDown className="transition-transform" />
                </>
              )}
            </motion.button>
          )}
          
          <Link to="/portfolio" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="border-2 border-skyblue dark:border-blue-400 px-6 py-3 rounded-full font-semibold cursor-pointer flex items-center gap-2 text-skyblue dark:text-blue-400 hover:bg-skyblue hover:text-white dark:hover:bg-blue-400 transition-all"
            >
              View more photo categories
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};
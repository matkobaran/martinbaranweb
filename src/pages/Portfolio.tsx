import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import titleCyberWine from "/resources/img/Cyber Wine/title.jpg";
import titleBDParis from "/resources/img/BD Paris/title.jpg";
import titleBDLondon from "/resources/img/BD London/title.jpg";

const categoryPhotos = {
  Paris: [
    titleBDParis,
  ],
  London: [
    titleBDLondon,
  ],
  CyberWine: [
    titleCyberWine,
  ],
};

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const category = searchParams.get("category");
  const photos = category ? categoryPhotos[category as keyof typeof categoryPhotos] || [] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-skyblue to-blue-400 p-4">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <span>MB</span>
        </Link>
      </nav>

      <div className="container mx-auto pt-24">
        <Link
          to={category ? ("/portfolio") : ("/")}
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>
        <div className="flex items-center gap-4 mb-8">
          {category ? (
            <h1 className="text-4xl font-bold text-white capitalize">{category} Photos</h1>
          ) : (
            <h1 className="text-4xl font-bold text-white">Photo portfolio</h1>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category ? (
            photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <img
                  src={photo}
                  alt={`${category} photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))
          ) : (
            Object.entries(categoryPhotos).map(([categoryName, photos], index) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => window.location.href = `/portfolio?category=${categoryName}`}
              >
                <img
                  src={photos[0]}
                  alt={`${categoryName} category`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 capitalize">
                    {categoryName}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <X size={32} />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <img
              src={photos[selectedPhotoIndex]}
              alt={`${category} photo ${selectedPhotoIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;

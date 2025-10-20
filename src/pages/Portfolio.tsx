import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// Enhanced metadata-driven structure
const portfolioData = [
  {
    id: 'bd-paris-2025',
    title: "Best Diplomats Paris 2025",
    folder: "BD_Paris",
    photoCount: 1,
    thumbnail: "/resources/img/events/BD_Paris/thumbs/1.webp",
    tags: ['events', 'conference'],
    date: '2025-01-15',
    description: 'Diplomatic conference photography'
  },
  {
    id: 'bd-london-2024',
    title: "Best Diplomats London 2024",
    folder: "BD_London",
    photoCount: 29,
    thumbnail: "/resources/img/events/BD_London/thumbs/1.webp",
    tags: ['events', 'conference'],
    date: '2024-12-01',
    description: 'International diplomatic summit'
  },
  {
    id: 'cyber-wine-2024',
    title: "Cyber Wine 2024",
    folder: "Cyber_Wine",
    photoCount: 39,
    thumbnail: "/resources/img/events/Cyber_Wine/thumbs/1.webp",
    tags: ['events', 'networking'],
    date: '2024-11-15',
    description: 'Technology and wine networking event'
  },
  {
    id: 'kendice-kosice-2024',
    title: "Cup match football match Kendice vs Košice",
    folder: "Kendice_Kosice",
    photoCount: 56,
    thumbnail: "/resources/img/sports/Kendice_Kosice/thumbs/1.webp",
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: 'Dynamic sports photography capturing the intensity and passion of football'
  }
];

// Generate optimized image URLs
const getOptimizedImage = (folder: string, index: number, size: 'thumb' | 'medium' | 'full' = 'full', type: 'events' | 'sports' = 'events') => {
  const sizePath = size === 'thumb' ? 'thumbs' : size === 'medium' ? 'medium' : 'fulls';
  return `/resources/img/${type}/${folder}/${sizePath}/${index + 1}.webp`;
};

const categoryPhotos = {};

portfolioData.forEach(({ title, folder, photoCount, tags }) => {
  const type = tags.includes('sports') ? 'sports' : 'events';
  categoryPhotos[title] = {
    thumbnails: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'thumb', type)),
    medium: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'medium', type)),
    full: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'full', type))
  };
});

// Temporary fallback for old structure until optimization script is run
const oldCategories = [
  { title: "Best Diplomats Paris 2025", folder: "BD_Paris", photoCount: 1 },
  { title: "Best Diplomats London 2024", folder: "BD_London", photoCount: 29},
  { title: "Cyber Wine 2024", folder: "Cyber_Wine", photoCount: 39 },
];

oldCategories.forEach(({ title, folder, photoCount }) => {
  if (!categoryPhotos[title]) {
    categoryPhotos[title] = Array.from({ length: photoCount }, (_, i) => 
      `/resources/img/events/${folder}/${i + 1}.jpg`
    );
  }
});

// Note: Using native lazy loading with loading="lazy" attribute instead of IntersectionObserver

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageQuality, setImageQuality] = useState<'thumb' | 'medium' | 'full'>('thumb');
  const [isLoading, setIsLoading] = useState(false);
  
  const category = searchParams.get("category");
  const photos = category ? categoryPhotos[category as keyof typeof categoryPhotos] : null;
  
  // Fallback to original structure if new structure doesn't exist
  const getPhotosForDisplay = () => {
    if (!photos) return [];
    
    // If new structure exists, use it
    if (photos[imageQuality]) {
      return photos[imageQuality];
    }
    
    // Fallback to old structure (temporary until optimization script is run)
    if (Array.isArray(photos)) {
      return photos;
    }
    
    return [];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadedImages(new Set());
    setImageQuality('thumb');
    
    // Progressive loading: start with thumbnails, then upgrade to full quality
    const timer = setTimeout(() => setImageQuality('medium'), 500);
    const timer2 = setTimeout(() => setImageQuality('full'), 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [category]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null || !photos) return;
    setSelectedPhotoIndex(selectedPhotoIndex === 0 ? photos.full.length - 1 : selectedPhotoIndex - 1);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null || !photos) return;
    setSelectedPhotoIndex(selectedPhotoIndex === photos.full.length - 1 ? 0 : selectedPhotoIndex + 1);
  };

  const navigate = useNavigate();

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
          {category && photos ? (
            getPhotosForDisplay().map((photo, index) => {
              const isLoaded = loadedImages.has(index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPhotoIndex(index)}
                >
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-skyblue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={photo}
                    alt={`${category} photo ${index + 1}`}
                    className={`w-full h-full object-cover hover:scale-105 transition-all duration-500 ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    loading="lazy"
                  />
                </motion.div>
              );
            })
          ) : (
            portfolioData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/portfolio?category=${item.title}`)}
              >
                <img
                  src={item.thumbnail}
                  alt={`${item.title} category`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-end group-hover:justify-center p-4">
                  <div className="text-center opacity-80 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 group-hover:translate-y-0">
                    <h3 className="text-white text-lg font-bold mb-2 drop-shadow-lg capitalize">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-2 leading-relaxed drop-shadow-md max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
                      {item.description}
                    </p>
                    <span className="text-skyblue text-xs font-medium drop-shadow-md">
                      {item.photoCount} photos
                    </span>
                  </div>
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

            {photos && (
              <img
                src={photos.full[selectedPhotoIndex]}
                alt={`${category} photo ${selectedPhotoIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
                loading="eager"
              />
            )}

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

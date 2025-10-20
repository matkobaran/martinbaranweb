import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from 'react-i18next';

// Enhanced metadata-driven structure
// titlePhoto: specifies which photo number (1-based) to use as the category thumbnail
const portfolioData = [
  {
    id: 'bd-paris-2025',
    titleKey: "portfolio.galleries.bd_paris.title",
    title: "Best Diplomats Paris 2025",
    folder: "BD_Paris",
    photoCount: 1,
    titlePhoto: 1, // Photo number to use as thumbnail
    tags: ['events', 'conference'],
    date: '2025-01-15',
    description: 'Diplomatic conference photography'
  },
  {
    id: 'bd-london-2024',
    titleKey: "portfolio.galleries.bd_london.title",
    title: "Best Diplomats London 2024",
    folder: "BD_London",
    photoCount: 21,
    titlePhoto: 1, // Photo number to use as thumbnail
    tags: ['events', 'conference'],
    date: '2024-12-01',
    description: 'International diplomatic summit'
  },  
  {
    id: 'cyber-wine-2024',
    titleKey: "portfolio.galleries.cyber_wine.title",
    title: "Cyber Wine 2024",
    folder: "Cyber_Wine",
    photoCount: 31,
    titlePhoto: 1, // Photo number to use as thumbnail
    tags: ['events', 'networking'],
    date: '2024-11-15',
    description: 'Technology and wine networking event'
  },
  {
    id: 'kendice-kosice-2025',
    titleKey: "portfolio.galleries.kendice_kosice.title",
    title: "Cup football match Kendice vs Košice",
    folder: "Kendice_Kosice",
    photoCount: 56,
    titlePhoto: 30, // Photo number to use as thumbnail (renumbered by script)
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: ''
  },
  {
    id: 'kendice-bardejov-2025',
    titleKey: "portfolio.galleries.kendice_bardejov.title",
    title: "Football match Kendice vs Bardejov",
    folder: "Kendice_Bardejov",
    photoCount: 37,
    titlePhoto: 32, // Photo number to use as thumbnail (renumbered by script)
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: ''  
  },
  {
    id: 'kendice-saris-2025',
    titleKey: "portfolio.galleries.kendice_saris.title",
    title: "Football match Kendice vs Veľký Šariš",
    folder: "Kendice_Saris",
    photoCount: 41,
    titlePhoto: 6, // Photo number to use as thumbnail (renumbered by script)
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: ''
  }
];

// Generate optimized image URLs
const getOptimizedImage = (folder: string, index: number, size: 'thumb' | 'medium' | 'full' = 'full', type: 'events' | 'sports' = 'events') => {
  const sizePath = size === 'thumb' ? 'thumbs' : size === 'medium' ? 'medium' : 'fulls';
  return `/resources/img/${type}/${folder}/${sizePath}/${index + 1}.webp`;
};

const categoryPhotos = {};

portfolioData.forEach(({ title, folder, photoCount, titlePhoto, tags }) => {
  const type = tags.includes('sports') ? 'sports' : 'events';
  categoryPhotos[title] = {
    thumbnails: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'thumb', type)),
    medium: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'medium', type)),
    full: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'full', type)),
    titlePhoto: getOptimizedImage(folder, titlePhoto - 1, 'thumb', type) // titlePhoto is 1-based, so subtract 1
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
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageQuality, setImageQuality] = useState<'thumb' | 'medium' | 'full'>('thumb');
  const [isLoading, setIsLoading] = useState(false);
  
  // Create a mapping from translated titles to portfolio data
  const getPortfolioItemByTranslatedTitle = (translatedTitle: string) => {
    return portfolioData.find(item => {
      const translatedItemTitle = t(item.titleKey);
      return translatedItemTitle === translatedTitle;
    });
  };
  
  const category = searchParams.get("category");
  const portfolioItem = category ? getPortfolioItemByTranslatedTitle(category) : null;
  const photos = portfolioItem ? categoryPhotos[portfolioItem.title as keyof typeof categoryPhotos] : null;
  
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
          {portfolioItem ? (
            <h1 className="text-4xl font-bold text-white capitalize">{t(portfolioItem.titleKey)} Photos</h1>
          ) : (
            <h1 className="text-4xl font-bold text-white">Photo portfolio</h1>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {category && photos ? (
            getPhotosForDisplay().map((photo, index) => {
              const isLoaded = loadedImages.has(index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedPhotoIndex(index)}
                >
                  <div className="relative w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse flex items-center justify-center min-h-[250px]">
                        <div className="w-6 h-6 border-2 border-skyblue border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={photo}
                      alt={`${category} photo ${index + 1}`}
                      className={`w-full h-auto object-cover group-hover:scale-105 transition-all duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      loading="lazy"
                    />
                  </div>
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
                onClick={() => navigate(`/portfolio?category=${t(item.titleKey)}`)}
              >
                <img
                  src={categoryPhotos[item.title]?.titlePhoto || `/resources/img/events/${item.folder}/thumbs/1.webp`}
                  alt={`${t(item.titleKey)} category`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-end group-hover:justify-center p-4">
                  <div className="text-center opacity-80 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 group-hover:translate-y-0">
                    <h3 className="text-white text-lg font-bold mb-2 drop-shadow-lg capitalize">
                      {t(item.titleKey)}
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
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
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

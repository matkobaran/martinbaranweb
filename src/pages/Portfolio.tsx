import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { portfolioData, getPortfolioByTranslatedTitle } from '../config/portfolioData';
import { getPhotoCountText, getCurrentLanguage } from '../utils/photoCount';
import { SEO, PortfolioSEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';

// Portfolio data is now imported from centralized config

// Generate optimized image URLs
const getOptimizedImage = (folder: string, index: number, size: 'thumb' | 'medium' | 'full' = 'full', type: 'events' | 'sports' = 'events') => {
  const sizePath = size === 'thumb' ? 'thumbs' : size === 'medium' ? 'medium' : 'fulls';
  return `/resources/img/${type}/${folder}/${sizePath}/${index + 1}.webp`;
};

// Create categoryPhotos object from centralized data
const createCategoryPhotos = () => {
  const categoryPhotos: { [key: string]: any } = {};
  
  portfolioData.forEach(({ titleKey, folder, photoCount, titlePhoto, tags }) => {
    const type = tags.includes('sports') ? 'sports' : 'events';
    // Use the full titleKey as the key to avoid conflicts
    categoryPhotos[titleKey] = {
      thumbnails: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'thumb', type)),
      medium: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'medium', type)),
      full: Array.from({ length: photoCount }, (_, i) => getOptimizedImage(folder, i, 'full', type)),
      titlePhoto: getOptimizedImage(folder, titlePhoto - 1, 'thumb', type) // titlePhoto is 1-based, so subtract 1
    };
  });
  
  return categoryPhotos;
};

const categoryPhotos = createCategoryPhotos();


// Note: Using native lazy loading with loading="lazy" attribute instead of IntersectionObserver

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageQuality, setImageQuality] = useState<'thumb' | 'medium' | 'full'>('thumb');
  const [isLoading, setIsLoading] = useState(false);
  
  const category = searchParams.get("category");
  const portfolioItem = category ? getPortfolioByTranslatedTitle(category, t) : null;
  const photos = portfolioItem ? categoryPhotos[portfolioItem.titleKey as keyof typeof categoryPhotos] : null;
  
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

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextPhoto();
    }
    if (isRightSwipe) {
      handlePrevPhoto();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevPhoto();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNextPhoto();
          break;
        case 'Escape':
          event.preventDefault();
          setSelectedPhotoIndex(null);
          break;
      }
    };

    if (selectedPhotoIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when lightbox is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhotoIndex, handlePrevPhoto, handleNextPhoto]);

  const navigate = useNavigate();

  return (
    <>
      {portfolioItem ? (
        <PortfolioSEO
          galleryTitle={t(portfolioItem.titleKey)}
          galleryDescription={portfolioItem.description || t(portfolioItem.descriptionKey)}
          photoCount={portfolioItem.photoCount}
          galleryUrl={`https://martinbaran.com/portfolio?category=${t(portfolioItem.titleKey)}`}
          language={i18n.language as 'en' | 'sk'}
        />
      ) : (
        <SEO
          title={i18n.language === 'sk' ? "Fotografické portfólio | Martin Baran" : "Photography Portfolio | Martin Baran"}
          description={i18n.language === 'sk' 
            ? "Prehliadajte profesionálne fotografické portfólio Martina Barana obsahujúce fotografovanie konferencií, udalostí a športu z Prahy, Česká republika."
            : "Browse Martin Baran's professional photography portfolio featuring conference photography, event photography, and sports photography from Prague, Czech Republic."
          }
          keywords={i18n.language === 'sk'
            ? "fotografické portfólio, Martin Baran, fotografovanie udalostí, fotografovanie konferencií, športové fotografovanie, fotograf Praha"
            : "photography portfolio, Martin Baran, event photography, conference photography, sports photography, Prague photographer"
          }
          language={i18n.language as 'en' | 'sk'}
        />
      )}
      
      <div className="min-h-screen bg-gradient-to-r from-skyblue to-navy p-4">
        <Navigation variant="subpage" />

      <div className="container mx-auto pt-24">
        <Link
          to={category ? ("/portfolio") : ("/")}
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('common.back')}
        </Link>
        <div className="flex items-center gap-4 mb-8">
          {portfolioItem ? (
            <h1 className="text-4xl font-bold text-white capitalize">{t(portfolioItem.titleKey)}</h1>
          ) : (
            <h1 className="text-4xl font-bold text-white">{t('portfolio.title')}</h1>
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
                      alt={`${portfolioItem ? `${t(portfolioItem.titleKey)} professional photography` : 'Professional photography'} by Martin Baran - Photo ${index + 1} of ${portfolioItem?.photoCount || 'portfolio'}`}
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
                  src={categoryPhotos[item.titleKey]?.titlePhoto || `/resources/img/events/${item.folder}/thumbs/1.webp`}
                  alt={`${t(item.titleKey)} professional photography portfolio by Martin Baran - ${item.photoCount} photos available`}
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
                    <span className="text-white text-xs font-semibold">
                      {getPhotoCountText(item.photoCount, getCurrentLanguage(i18n))}
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute top-2 md:top-4 right-2 md:right-4">
              <button
                className="text-white hover:text-white/80 transition-colors p-2 md:p-0"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <X size={40} className="md:w-8 md:h-8" />
              </button>
            </div>
            
            <button
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 md:p-0"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
            >
              <ChevronLeft size={40} className="md:w-8 md:h-8" />
            </button>

            {photos && (
              <>
                <div className="absolute top-2 md:top-4 left-2 md:left-4 text-white/70 text-sm bg-black/50 px-2 py-1 rounded">
                  {selectedPhotoIndex + 1} / {photos.full.length}
                </div>
                <img
                  src={photos.full[selectedPhotoIndex]}
                  alt={`${portfolioItem ? `${t(portfolioItem.titleKey)} professional photography` : 'Professional photography'} by Martin Baran - High resolution photo ${selectedPhotoIndex + 1} of ${portfolioItem?.photoCount || 'portfolio'}`}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  loading="eager"
                />
              </>
            )}

            <button
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-2 md:p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
            >
              <ChevronRight size={40} className="md:w-8 md:h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

export default Portfolio;

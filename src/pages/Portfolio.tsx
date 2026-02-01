import { useSearchParams, useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { portfolioData, getPortfolioByTranslatedTitle, getPortfolioById, getPortfoliosByCategory } from '../config/portfolioData';
import { getPhotoCountText, getCurrentLanguage } from '../utils/photoCount';
import { SEO, PortfolioSEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

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

type PortfolioCategory = 'events' | 'sport';

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageQuality, setImageQuality] = useState<'thumb' | 'medium' | 'full'>('thumb');
  const [isLoading, setIsLoading] = useState(false);

  // URL category: /portfolio/sport -> 'sport', /portfolio/events or /portfolio -> 'events'
  const pathCategory: PortfolioCategory = pathname.endsWith('/sport') ? 'sport' : 'events';

  // Redirect /portfolio (no segment) to /portfolio/events so clients get a clear URL
  useEffect(() => {
    if (pathname === '/portfolio' && !searchParams.get('id') && !searchParams.get('category')) {
      navigate('/portfolio/events', { replace: true });
    }
  }, [pathname, searchParams, navigate]);

  const categoryId = searchParams.get("id");
  const category = searchParams.get("category"); // Keep for backward compatibility
  const portfolioItem = categoryId 
    ? getPortfolioById(categoryId) 
    : category 
      ? getPortfolioByTranslatedTitle(category, t) 
      : null;
  const photos = portfolioItem ? categoryPhotos[portfolioItem.titleKey as keyof typeof categoryPhotos] : null;

  // Grid view: show galleries filtered by path category (events vs sport)
  const listCategory: PortfolioCategory = pathCategory;
  const portfolioList = getPortfoliosByCategory(listCategory === 'sport' ? 'sports' : 'events');
  
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
  }, [categoryId, category]);

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

  const backHref = portfolioItem
    ? (portfolioItem.tags.includes('sports') ? '/portfolio/sport' : '/portfolio/events')
    : '/';

  return (
    <>
      {portfolioItem ? (
        <PortfolioSEO
          galleryTitle={t(portfolioItem.titleKey)}
          galleryDescription={portfolioItem.description || t(portfolioItem.descriptionKey)}
          photoCount={portfolioItem.photoCount}
          galleryUrl={`https://martinbaran.com/portfolio/${portfolioItem.tags.includes('sports') ? 'sport' : 'events'}?id=${portfolioItem.id}`}
          language={i18n.language as 'en' | 'sk'}
        />
      ) : (
        <SEO
          title={
            pathCategory === 'sport'
              ? (i18n.language === 'sk' ? "Športová fotografia – futbal | Martin Baran" : "Sports photography – football | Martin Baran")
              : (i18n.language === 'sk' ? "Fotografické portfólio | Martin Baran" : "Photography Portfolio | Martin Baran")
          }
          description={
            pathCategory === 'sport'
              ? (i18n.language === 'sk'
                ? "Fotografie z futbalových zápasov. Profesionálna športová fotografia pre futbalové kluby – reportáže zo zápasov, pohár, akcie. Spolupráca na objednávku. Pôsobisko: Praha."
                : "Football match photography. Professional sports photography for football clubs – match reportage, cup games, club events. Available for collaboration. Based in Prague.")
              : (i18n.language === 'sk'
                ? "Prehliadajte profesionálne fotografické portfólio Martina Barana obsahujúce fotografovanie konferencií, udalostí a športu z Prahy, Česká republika."
                : "Browse Martin Baran's professional photography portfolio featuring conference photography, event photography, and sports photography from Prague, Czech Republic.")
          }
          keywords={i18n.language === 'sk'
            ? "fotografické portfólio, Martin Baran, fotografovanie udalostí, fotografovanie konferencií, športové fotografovanie, futbalová fotografia, fotograf Praha"
            : "photography portfolio, Martin Baran, event photography, conference photography, sports photography, football photography, Prague photographer"
          }
          url={pathCategory === 'sport' ? 'https://martinbaran.com/portfolio/sport' : 'https://martinbaran.com/portfolio/events'}
          image={pathCategory === 'sport' ? 'https://martinbaran.com/resources/img/hero/title_medium.webp' : undefined}
          language={i18n.language as 'en' | 'sk'}
        />
      )}
      
      <div className="min-h-screen bg-gradient-to-r from-skyblue to-navy p-4">
        <Navigation variant="subpage" />

      <div className="container mx-auto pt-24">
        <Link
          to={backHref}
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('common.back')}
        </Link>

        {!portfolioItem && (
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white text-center mb-6">{t('portfolio.title')}</h1>
            <div className="flex justify-center">
              <div className="inline-flex bg-white/15 backdrop-blur-sm rounded-xl p-1.5 shadow-lg ring-1 ring-white/20">
                <Link
                  to="/portfolio/events"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pathCategory === 'events'
                      ? 'bg-white text-skyblue shadow-md'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('portfolio.categories.events')}
                </Link>
                <Link
                  to="/portfolio/sport"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pathCategory === 'sport'
                      ? 'bg-white text-skyblue shadow-md'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('portfolio.categories.sport')}
                </Link>
              </div>
            </div>
          </div>
        )}

        {portfolioItem && (
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-white capitalize">{t(portfolioItem.titleKey)}</h1>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {portfolioItem && photos ? (
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
            portfolioList.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/portfolio/${pathCategory}?id=${item.id}`)}
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
        <Footer variant="compact" contactButtonDelay={portfolioItem ? 500 : 0} />
      </div>
    </>
  );
};

export default Portfolio;

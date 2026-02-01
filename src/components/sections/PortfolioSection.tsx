import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import AnimatedButton from "../my components/AnimatedButton";
import { getHighlightedPortfolios, getPortfoliosByCategory } from '../../config/portfolioData';
import { getPhotoCountText, getCurrentLanguage } from '../../utils/photoCount';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Get highlighted portfolios from centralized data
const getEventData = () => {
  return getPortfoliosByCategory('events').filter(item => item.isHighlight);
};

const getSportData = () => {
  return getPortfoliosByCategory('sports').filter(item => item.isHighlight);
};

type PortfolioSectionProps = {
  /** When true, section title and bottom "view more" link are omitted (used inside overview with tabs). */
  embedded?: boolean;
};

export const PortfolioSection = ({ embedded = false }: PortfolioSectionProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<'Events' | 'Sport'>('Events');
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Create photos with translations from centralized data
  const eventPhotos = getEventData().map(({ id, folder, titleKey, descriptionKey, photoCount, titlePhoto }) => ({
    id,
    src: `/resources/img/events/${folder}/mediums/${titlePhoto}.webp`,
    title: t(titleKey),
    category: "Events",
    description: t(descriptionKey),
    photoCount: getPhotoCountText(photoCount, getCurrentLanguage(i18n)),
  }));

  const sportPhotos = getSportData().map(({ id, folder, titleKey, descriptionKey, photoCount, titlePhoto }) => ({
    id,
    src: `/resources/img/sports/${folder}/mediums/${titlePhoto}.webp`,
    title: t(titleKey),
    category: "Sport",
    description: t(descriptionKey),
    photoCount: getPhotoCountText(photoCount, getCurrentLanguage(i18n)),
  }));

  const allPhotos = { Events: eventPhotos, Sport: sportPhotos };
  const combinedPhotos = [...eventPhotos, ...sportPhotos];

  const handlePhotoClick = (photo: typeof eventPhotos[0]) => {
    const segment = photo.category === 'Events' ? 'events' : 'sport';
    navigate(`/portfolio/${segment}?id=${photo.id}`);
  };

  const jumpToCategory = (category: 'Events' | 'Sport') => {
    if (!carouselApi) return;
    
    const categoryStartIndex = category === 'Events' ? 0 : eventPhotos.length;
    carouselApi.scrollTo(categoryStartIndex);
    setCurrentCategory(category);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (!mounted || !carouselApi || combinedPhotos.length === 0) return;
    
    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        // If we can't scroll next, go to beginning for seamless loop
        carouselApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, carouselApi, combinedPhotos.length]);

  // Track current category based on carousel position
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const selectedIndex = carouselApi.selectedScrollSnap();
      if (selectedIndex < eventPhotos.length) {
        setCurrentCategory('Events');
      } else {
        setCurrentCategory('Sport');
      }
    };

    carouselApi.on('select', onSelect);
    return () => carouselApi.off('select', onSelect);
  }, [carouselApi]);

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const content = (
    <div className="container mx-auto px-4">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-8"
      >
        {!embedded && (
          <motion.h2
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-8 text-skyblue dark:text-blue-400"
          >
            {t('portfolio.title')}
          </motion.h2>
        )}

        {/* Category Indicators */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => jumpToCategory('Events')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                currentCategory === 'Events'
                  ? 'bg-skyblue text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-skyblue dark:hover:text-blue-400'
              }`}
            >
              {t('portfolio.categories.events')}
            </button>
            <button
              onClick={() => jumpToCategory('Sport')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                currentCategory === 'Sport'
                  ? 'bg-skyblue text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-skyblue dark:hover:text-blue-400'
              }`}
            >
              {t('portfolio.categories.sport')}
            </button>
          </div>
        </motion.div>

        {mounted && (
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Carousel
              className="w-full"
              opts={{ 
                align: "start", 
                loop: true,
                skipSnaps: false,
                dragFree: false,
                containScroll: "trimSnaps"
              }}
              setApi={setCarouselApi}
            >
              <CarouselContent>
                {combinedPhotos.map((photo, index) => (
                  <CarouselItem key={photo.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="cursor-pointer group"
                      onClick={() => handlePhotoClick(photo)}
                    >
                      <div className="relative overflow-hidden rounded-lg aspect-square">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-end group-hover:justify-center p-4">
                          <div className="text-center opacity-80 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 group-hover:translate-y-0">
                            <h3 className="text-white text-lg font-bold mb-2 drop-shadow-lg">
                              {photo.title}
                            </h3>
                            <p className="text-white/90 text-sm mb-2 leading-relaxed drop-shadow-md max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
                              {photo.description}
                            </p>
                            <span className="text-white text-xs font-semibold">
                              {photo.photoCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-12 h-12 w-12 text-xl" />
              <CarouselNext className="-right-6 md:-right-12 h-12 w-12 text-xl" />
            </Carousel>
          </motion.div>
        )}
        
        {!embedded && (
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="mt-12 flex flex-col items-center"
          >
            <Link to="/portfolio" className="group">
              <AnimatedButton
                text={t('portfolio.viewMoreButton')}
                variant="wide"
                decoration={true}
              />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  if (embedded) {
    return <div className="py-12 md:py-16">{content}</div>;
  }
  return (
    <section className="py-20 bg-lightgray dark:bg-gray-900" id="portfolio">
      {content}
    </section>
  );
};
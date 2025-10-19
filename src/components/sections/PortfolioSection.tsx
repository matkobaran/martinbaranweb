import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedButton from "../my components/AnimatedButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const eventData = [
  { id: 1, folder: "BD_Paris", title: "Best Diplomats Paris 2025", category: "Events" },
  { id: 2, folder: "BD_London", title: "Best Diplomats London 2024", category: "Events" },
  { id: 3, folder: "Cyber_Wine", title: "Cyber Wine 2024", category: "Events" },
];

const sportData = [
  { id: 4, folder: "Kendice_Kosice", title: "Football Match", category: "Sport" },
  { id: 5, folder: "Sport", title: "Basketball Tournament", category: "Sport" },
  { id: 6, folder: "Sport", title: "Tennis Match", category: "Sport" },
];

const eventPhotos = eventData.map(({ id, folder, title, category }) => ({
  id,
  src: `/resources/img/events/${folder}/mediums/1.webp`,
  title,
  category,
}));

const sportPhotos = sportData.map(({ id, folder, title, category }) => ({
  id,
  src: `/resources/img/sports/${folder}/mediums/1.webp`,
  title,
  category,
}));

const allPhotos = { Events: eventPhotos, Sport: sportPhotos };
const combinedPhotos = [...eventPhotos, ...sportPhotos];


export const PortfolioSection = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<'Events' | 'Sport'>('Events');
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const handlePhotoClick = (photo: typeof eventPhotos[0]) => {
    navigate(`/portfolio?category=${photo.title}`);
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

  return (
    <section className="py-20 bg-lightgray dark:bg-gray-900" id="portfolio">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-skyblue dark:text-blue-400">Photo portfolio</h2>
        
        {/* Category Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => jumpToCategory('Events')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                currentCategory === 'Events'
                  ? 'bg-skyblue text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-skyblue dark:hover:text-blue-400'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => jumpToCategory('Sport')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                currentCategory === 'Sport'
                  ? 'bg-skyblue text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-skyblue dark:hover:text-blue-400'
              }`}
            >
              Sport
            </button>
          </div>
        </div>
        {mounted && (
          <div className="relative">
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
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <p className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-12 h-12 w-12 text-xl" />
              <CarouselNext className="-right-6 md:-right-12 h-12 w-12 text-xl" />
            </Carousel>
          </div>
        )}
        
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
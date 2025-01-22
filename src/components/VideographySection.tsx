import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const videos = [
  {
    id: 1,
    title: "Stovka",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Documentary about rivarly",
    duration: "7:06"
  },
  {
    id: 2,
    title: "Koleje",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    description: "A short film about the benefits of living in a dormitory",
    duration: "3:05"
  },
  {
    id: 3,
    title: "RHSO 2023",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Regional Games of the Special Olympics 2023 Brno",
    duration: "5:05"
  }
];

export const VideographySection = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const handleVideoClick = (videoId: number) => {
    navigate(`/video/${videoId}`);
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

  const visibleVideos = videos.slice(0, visibleCount);

  return (
    <section className="py-20 bg-lightgray dark:bg-gray-900" id="videography">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue dark:text-blue-400">Videography</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm opacity-90">{video.description}</p>
                    <span className="absolute top-0 right-4 bg-black/50 px-2 py-1 rounded text-sm">
                      {video.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center">
          <Link to="/videos" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="border-2 border-skyblue dark:border-blue-400 px-6 py-3 rounded-full font-semibold cursor-pointer flex items-center gap-2 text-skyblue dark:text-blue-400 hover:bg-skyblue hover:text-white dark:hover:bg-blue-400 transition-all"
            >
              View more video categories
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};
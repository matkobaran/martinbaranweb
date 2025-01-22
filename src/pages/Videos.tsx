import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

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
  },
  {
    id: 4,
    title: "Svadba Juraj a Naďka",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Wedding video",
    duration: "4:32"
  }
];

const Videos = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="min-h-screen bg-gradient-to-r from-skyblue to-blue-400 p-4">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <span>MB</span>
        </Link>
      </nav>

      <div className="container mx-auto pt-24">
        <Link
          to="/"
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Videos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => window.location.href = `/video/${video.id}`}
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
      </div>
    </div>
  );
};

export default Videos;
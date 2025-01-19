import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const videos = [
  {
    id: 1,
    title: "Stovka",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Documentary about Czech forests",
    duration: "7:06"
  },
  {
    id: 2,
    title: "Koleje",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    description: "A short film exploring city life in Prague",
    duration: "3:05"
  },
  {
    id: 3,
    title: "RHSO 2023",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Documentary about Czech forests",
    duration: "5:05"
  },
  {
    id: 4,
    title: "Svadba",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Documentary about Czech forests",
    duration: "4:33"
  }

];

export const VideographySection = () => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId: number) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <section className="py-20 bg-lightgray" id="videography">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue">Videography</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {videos.map((video, index) => (
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
                    <span className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-sm">
                      {video.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
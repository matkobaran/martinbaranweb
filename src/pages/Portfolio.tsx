import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const categoryPhotos = {
  nature: [
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  ],
  architecture: [
    "https://images.unsplash.com/photo-1493863641943-9b68992a8d07",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  ],
  landscape: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
  ],
  wildlife: [
    "https://images.unsplash.com/photo-1554080353-a576cf803bda",
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46",
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
  ],
  mountains: [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  ],
  forest: [
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
  ],
};

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "nature";
  const photos = categoryPhotos[category as keyof typeof categoryPhotos] || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-skyblue to-blue-400 p-4">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <Home className="w-6 h-6" />
          <span>PhotoFolio</span>
        </Link>
      </nav>

      <div className="container mx-auto pt-24">
        <h1 className="text-4xl font-bold text-white mb-8 capitalize">{category} Photos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={photo}
                alt={`${category} photo ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    title: "Nature",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07",
    title: "Architecture",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    title: "Landscape",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1554080353-a576cf803bda",
    title: "Wildlife",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Mountains",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
    title: "Forest",
  },
];

export const PortfolioSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const navigate = useNavigate();

  const handlePhotoClick = (photo: typeof photos[0]) => {
    navigate(`/portfolio?category=${photo.title.toLowerCase()}`);
  };

  return (
    <section className="py-20 bg-white" id="portfolio">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue">Photo portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
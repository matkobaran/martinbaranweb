import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import AnimatedButton from "../my components/AnimatedButton";
import titleStovka from "/resources/img/video-thumbnails/stovka_medium.webp";
import titleKoleje from "/resources/img/video-thumbnails/koleje_medium.webp";
import titleRHSO from "/resources/img/video-thumbnails/rso_medium.webp";


type VideographySectionProps = {
  /** When true, section title and bottom "view more" link are omitted (used inside overview with tabs). */
  embedded?: boolean;
};

export const VideographySection = ({ embedded = false }: VideographySectionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const videos = [
    {
      id: 1,
      title: t('videography.videos.stovka.title'),
      thumbnail: titleStovka,
      description: t('videography.videos.stovka.description'),
      duration: "7:06"
    },
    {
      id: 2,
      title: t('videography.videos.koleje.title'),
      thumbnail: titleKoleje,
      description: t('videography.videos.koleje.description'),
      duration: "3:05"
    },
    {
      id: 3,
      title: t('videography.videos.rhso.title'),
      thumbnail: titleRHSO,
      description: t('videography.videos.rhso.description'),
      duration: "5:05"
    }
  ];

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

  const content = (
    <div className="container mx-auto px-4">
      {!embedded && (
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue dark:text-white">{t('videography.title')}</h2>
      )}
        
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
        {!embedded && (
          <div className="mt-12 flex flex-col items-center">
            <Link to="/videos" className="group">
              <AnimatedButton
                text={t('videography.viewMoreButton')}
                variant="wide"
                decoration={true}
              />
            </Link>
          </div>
        )}
      </div>
  );

  if (embedded) {
    return <div className="py-12 md:py-16">{content}</div>;
  }
  return (
    <section className="py-20 bg-white dark:bg-navy" id="videography">
      {content}
    </section>
  );
};
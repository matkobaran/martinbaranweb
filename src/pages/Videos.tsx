import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Navigation } from '../components/Navigation';
import titleStovka from "/resources/img/video-thumbnails/stovka_medium.webp";
import titleKoleje from "/resources/img/video-thumbnails/koleje_medium.webp";
import titleRHSO from "/resources/img/video-thumbnails/rso_medium.webp";
import titleSvadba from "/resources/img/video-thumbnails/svadba_medium.webp";
import titleKreditovka from "/resources/img/video-thumbnails/kreditovka_medium.webp";

const videos = [
  {
    id: 1,
    key: "stovka",
    thumbnail: titleStovka,
    duration: "7:06"
  },
  {
    id: 2,
    key: "koleje",
    thumbnail: titleKoleje,
    duration: "3:05"
  },
  {
    id: 3,
    key: "rhso",
    thumbnail: titleRHSO,
    duration: "5:05"
  },
  {
    id: 4,
    key: "svadba",
    thumbnail: titleSvadba,
    duration: "4:32"
  },
  {
    id: 5,
    key: "kreditovka",
    thumbnail: titleKreditovka,
    duration: "8:01"
  }
];

const Videos = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-skyblue to-navy p-4">
      <Navigation variant="subpage" />

      <div className="container mx-auto pt-24">
        <Link
          to="/"
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('common.back')}
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">{t('pages.videos')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => navigate(`/video/${video.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={video.thumbnail}
                  alt={t(`videos.${video.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{t(`videos.${video.key}.title`)}</h3>
                    <p className="text-sm opacity-90">{t(`videos.${video.key}.description`)}</p>
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
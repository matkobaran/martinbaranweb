import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

const videos = [
  {
    id: 1,
    key: "stovka",
    videoUrl: "https://www.youtube.com/embed/oVmHn2yd9ks?si=QP79mRBum6mD9Qrz",
    year: "2024",
    duration: "7:06",
  },
  {
    id: 2,
    key: "koleje",
    videoUrl: "https://www.youtube.com/embed/sMOxQ3qbSt8?si=DkCsDgMeBrJtoD9H",
    year: "2023",
    duration: "3:05",
  },
  {
    id: 3,
    key: "rhso",
    videoUrl: "https://www.youtube.com/embed/g26BMLE5T2Q?si=CfY2OAtFwKYZ1eOw",
    year: "2023",
    duration: "5:05",
  },
  {
    id: 4,
    key: "svadba",
    videoUrl: "https://www.youtube.com/embed/ctfxxjWLWSo?si=DZjE7ERXWsYem5lk",
    year: "2022",
    duration: "4:32",
  },
  {
    id: 5,
    key: "kreditovka",
    videoUrl: "https://www.youtube.com/embed/sfe-V-tRXI8?si=11qmQuj4fzbUzbuq",
    year: "2024",
    duration: "8:01",
  }
];

const Video = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find(v => v.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-skyblue to-navy p-4 flex flex-col">
        <Navigation variant="subpage" />
        <div className="container mx-auto pt-24 px-4 pb-10 flex-1">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{t('common.videoNotFound')}</h1>
            <Link
              to="/videos"
              className="text-white hover:text-white/80 transition-colors flex items-center gap-2 justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
              {t('common.back')}
            </Link>
          </div>
        </div>
        <Footer variant="compact" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-skyblue to-navy p-4 flex flex-col">
      <Navigation variant="subpage" />
      <div className="container mx-auto pt-24 px-4 pb-10 flex-1">
        <Link
          to="/videos"
          className="text-white hover:text-white/80 transition-colors flex items-center gap-2 pb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('common.back')}
        </Link>

        <h1 className="text-4xl font-bold mb-6 text-white">{t(`videos.${video.key}.title`)}</h1>

        <div className="aspect-video w-full mb-8 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <iframe
            src={video.videoUrl}
            title={t(`videos.${video.key}.title`)}
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-white/90">{t('common.aboutThisFilm')}</h2>
            <p className="text-white/80 leading-relaxed bg-white/10 rounded-lg p-4 ring-1 ring-white/10">
              {t(`videos.${video.key}.details`)}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 rounded-lg p-4 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold mb-3 text-white">{t('common.details')}</h3>
              <div className="space-y-2 text-white/80">
                <p>{t('common.year')}: {video.year}</p>
                <p>{t('common.duration')}: {video.duration}</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold mb-3 text-white">{t('common.credits')}</h3>
              <ul className="space-y-1 text-white/80">
                {Object.values(t(`videos.${video.key}.credits`, { returnObjects: true })).map((credit, index) => (
                  <li key={index}>{credit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer variant="compact" />
    </div>
  );
};

export default Video;
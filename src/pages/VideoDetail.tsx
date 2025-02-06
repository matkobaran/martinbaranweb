import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const videos = [
  
  {
    id: 1,
    title: "Stovka",
    videoUrl: "https://www.youtube.com/embed/oVmHn2yd9ks?si=QP79mRBum6mD9Qrz",
    description: "Documentary about rivarly",
    details: "What is victory and what you are willing to sacrifice? This is a documentary about the last race of the season, when there can only be one winner.",
    year: "2024",
    duration: "7:06",
    credits: [
      "Director: Martin Baran",
      "Cinematography: Dominik Hanak",
      "Editing: Martin Baran",
    ]
  },
  {
    id: 2,
    title: "Koleje",
    videoUrl: "https://www.youtube.com/embed/sMOxQ3qbSt8?si=DkCsDgMeBrJtoD9H",
    description: "A short film about the benefits of living in a dormitory",
    details: "Short commercial created for the Film Festival, where viewer can see how life in dormitories can sometimes be interesting",
    year: "2023",
    duration: "3:05",
    credits: [
      "Director: Martin Baran",
      "Cinematography: Lazar Kis Bence",
      "Editing: Martin Baran",
    ]
  },
  {
    id: 3,
    title: "RSHO 2023",
    videoUrl: "https://www.youtube.com/embed/g26BMLE5T2Q?si=CfY2OAtFwKYZ1eOw",
    description: "Regional Games of the Special Olympics 2023 Brno",
    details: "A sports event organized by MUNI Sport student.",
    year: "2023",
    duration: "5:05",
    credits: [
      "Cinematography: Martin Baran",
      "Editing: Martin Baran",
    ]
  },
  {
    id: 4,
    title: "Svadba Juraj a Naďka",
    videoUrl: "https://www.youtube.com/embed/ctfxxjWLWSo?si=DZjE7ERXWsYem5lk",
    description: "Wedding video",
    details: "Video from my dear friend's wedding",
    year: "2022",
    duration: "4:32",
    credits: [
      "Cinematography: Martin Baran",
      "Editing: Martin Baran",
    ]
  }
];

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find(v => v.id === Number(id));

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
      <Link
          to="/videos"
          className="text-black hover:text-black/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>

        <h1 className="text-4xl font-bold mb-4">{video.title}</h1>
        <div className="aspect-video w-full mb-8">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">About this film</h2>
            <p className="text-gray-700 mb-6">{video.details}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Details</h3>
              <div className="space-y-2 text-gray-700">
                <p>Year: {video.year}</p>
                <p>Duration: {video.duration}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Credits</h3>
              <ul className="space-y-1 text-gray-700">
                {video.credits.map((credit, index) => (
                  <li key={index}>{credit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const videos = [
  
  {
    id: 1,
    title: "Stovka",
    videoUrl: "https://www.youtube.com/embed/oVmHn2yd9ks?si=QP79mRBum6mD9Qrz",
    description: "Documentary about Czech forests",
    details: "An intimate look at the seasonal changes in Czech forests, featuring rare wildlife footage and stunning macro photography. This project was created to raise awareness about local conservation efforts.",
    year: "2024",
    duration: "8:45",
    credits: [
      "Director: Martin Baran",
      "Cinematography: Martin Baran",
      "Editing: Martin Baran",
      "Sound Design: Nature Sounds"
    ]
  },
  {
    id: 2,
    title: "Koleje",
    videoUrl: "https://www.youtube.com/embed/sMOxQ3qbSt8?si=DkCsDgMeBrJtoD9H",
    description: "A short film exploring city life in Prague",
    details: "This documentary captures the essence of urban life in Prague, showcasing the blend of historical architecture with modern city living. Shot over 6 months, it features interviews with local residents and beautiful timelapses of city landmarks.",
    year: "2023",
    duration: "3:05",
    credits: [
      "Director: Martin Baran",
      "Cinematography: Martin Baran",
      "Editing: Martin Baran",
      "Music: Local Artists"
    ]
  },
  {
    id: 3,
    title: "RSHO 2023",
    videoUrl: "https://www.youtube.com/embed/g26BMLE5T2Q?si=CfY2OAtFwKYZ1eOw",
    description: "Regionální hry Speciální olympiády 2023 Brno",
    details: "Športová akcia organizovaná študentami Fakulty športových študií Masarykovej univerzity. Video z regionálnych hier SO konaných 12.5. 2023 v areáli: Pod Palackého vrchem Brno",
    year: "2023",
    duration: "5:05",
    credits: [
      "Director: Martin Baran",
      "Cinematography: Martin Baran",
      "Editing: Martin Baran",
      "Interviews: Local Tech Leaders"
    ]
  },
  {
    id: 4,
    title: "Svadba Juraj a Naďka",
    videoUrl: "https://www.youtube.com/embed/ctfxxjWLWSo?si=DZjE7ERXWsYem5lk",
    description: "Series about local tech startups",
    details: "A documentary series highlighting the innovative tech startups in Prague's growing tech scene. Features interviews with founders, developers, and investors who are shaping the future of technology in the Czech Republic.",
    year: "2022",
    duration: "4:32",
    credits: [
      "Director: Martin Baran",
      "Cinematography: Martin Baran",
      "Editing: Martin Baran",
      "Interviews: Local Tech Leaders"
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>

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
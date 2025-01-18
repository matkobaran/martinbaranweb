import { PortfolioSection } from "@/components/PortfolioSection";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-skyblue/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <Home className="w-6 h-6" />
          <span>PhotoFolio</span>
        </Link>
      </nav>
      <div className="pt-20">
        <PortfolioSection />
      </div>
    </div>
  );
};

export default Portfolio;
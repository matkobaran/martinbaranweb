import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

const blogPosts = [
  
  {
    id: 1,
    title: "I love the rain",
    subTitle: "Or what could happened if you decide to walk from Porto to Santiago de Compostela",
    content: " “I love the rain!” I kept repeating to myself as I walked from Porto to Santiago de Compostela for 10 days. Since I planned to successfully complete my journey, I had no other choice. As a true sports fan, I started my journey at the Draka stadium in Porto, where I was drawn in by the atmosphere in the metro on the way from the airport. The next morning, I set off with determination. My first steps were from the most famous monuments in Porto towards the ocean, and after a few hours I left the city. There are two options for which route you can choose. Walk along the coast and walk on wooden footbridges or take an inland route through villages and countryside. I chose the latter due to the weather, as the wind from the ocean combined with the rain was unpleasant for walking. The morning after waking up consisted of finding a local bakery where I enjoyed a pastel de nata with coffee. I later missed that in Spain. When walking in the Portuguese part, you walk along historic cobblestone roads. The surroundings of these side roads are lined with old walls and vineyards. The architecture interested me, especially in terms of the variety of colors and stone building materials that we rarely encounter here. On the contrary, after four days I found myself in Spain, where I walked more on asphalt roads and the churches along the way seemed the same everywhere. To receive a certificate of completion, you must walk at least the last 100km and get at least 2 stamps in the \"Credential\" every day. The closer I was to the destination, the more people I met. Most often you will meet during the walk or in the evening in an albergue (a place of accommodation for pilgrims, typically large rooms with bunk beds, a kitchen and a shower). Sometimes you don't see each other for a few days and meeting later is all the more beautiful. In the kitchens, I learned a lot of interesting stories from people from different countries. I was inspired by older retired people who were in no hurry and walked at their own pace, often for weeks. The first morning after arriving in Santiago is special. You sit in a café or in front of the cathedral again, observing the surroundings, but today you don't have to walk anywhere. You think about everything you experienced and everyone you met. After getting to know the city, I then returned to Porto, from where I flew home. It was a strange feeling to walk a route that took me 10 days on foot, 10 euros and only 4 hours by bus. The journey itself will definitely teach you something, whether you decide to walk alone or with someone.",
    year: "2024",
    author: "Martin Baran"
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogPosts.find(v => v.id === Number(id));
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
      <Link
          to="/"
          className="text-black hover:text-black/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <h3 className="text-2xl font-bold mb-4">{blog.subTitle}</h3>
        <div className="row">
          <p>Year: {blog.year}</p>
          <p>Author: {blog.author}</p>
        </div>

        <div className="grid mt-10">
            <p className="text-gray-700 mb-6">{blog.content}</p>
          </div>        
        </div>
      </div>
  );
};

export default BlogDetail;
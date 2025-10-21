import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const blogPosts = [
  {
    id: 1,
    type: "blog1",
    title: "10 days of walking",
    description: "What could happened if you decide to walk from Porto to Santiago de Compostela",
  }
];

export const BlogSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
  

  const handleBlogClick = (blogId: number) => {
    navigate(`/BlogDetail/${blogId}`);
  };
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue">Blog</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleBlogClick(blog.id)}
            >
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700">{blog.description}</p>
              <Button variant="link" className="mt-4 text-accent" >
                {t('common.readMore')}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
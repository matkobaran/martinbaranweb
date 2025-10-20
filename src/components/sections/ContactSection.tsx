import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  return (
    <section className="py-20 bg-navy text-white dark:bg-gray-900" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Want to collaborate on a photo project or discuss a software idea? 
            I'm always excited to work on new creative ventures!
          </p>
          
          {/* Email Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <a
              href="mailto:martin.baran12@gmail.com"
              className="inline-flex items-center space-x-3 bg-skyblue/20 hover:bg-skyblue/30 transition-all duration-300 px-8 py-4 rounded-full border border-skyblue/30 hover:border-skyblue/50 group"
            >
              <Mail size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-semibold">martin.baran12@gmail.com</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <a
              href="https://github.com/matkobaran"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-skyblue transition-colors group"
            >
              <Github size={24} className="group-hover:scale-110 transition-transform duration-300" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/martin-baran/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-skyblue transition-colors group"
            >
              <Linkedin size={24} className="group-hover:scale-110 transition-transform duration-300" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/matko_baran/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-skyblue transition-colors group"
            >
              <Instagram size={24} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Instagram</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
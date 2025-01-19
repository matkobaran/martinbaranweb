import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  return (
    <section className="py-20 bg-navy text-white" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center space-x-8"
        >
          <a
            href="mailto:martin.baran12@gmail.com"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Mail size={24} />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/matkobaran"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Github size={24} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/martin-baran/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/matko_baran/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Instagram size={24} />
            <span>Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
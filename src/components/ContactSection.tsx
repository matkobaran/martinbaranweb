import { Mail, Github, Linkedin } from "lucide-react";
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
            href="mailto:your.email@example.com"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Mail size={24} />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Github size={24} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
import { Code2, Database, FileCode, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  {
    icon: <Code2 size={32} />,
    title: "Frontend Development",
    technologies: ["React", "TypeScript", "HTML", "CSS", "JS"],
  },
  {
    icon: <Database size={32} />,
    title: "Backend Development",
    technologies: [".NET", ".VB", "C#", "SQL"],
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Development",
    technologies: ["React Native", "MAUI", "Xamarin"],
  },

  {
    icon: <FileCode size={32} />,
    title: "Technologies",
    technologies: ["Git", "Azure", "Docker"],
  },
];

export const SkillsSection = () => {
  return (
    <section className="py-20 bg-lightgray dark:bg-navy" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center dark:text-white  mb-16">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-navy mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-navy text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const experiences = [
  {
    id: 1,
    type: "work2",
    title: "Junior Software Developer",
    company: "ApS Brno",
    period: "06/2023 - Present",
    description: "Fullstack Software Developer",
    details: [
      "Developed and maintained Windows applications  (.NET, .VB)",
      "Developing web applications used by 50,000+ users",
      "Migration of mobile application from Xamarin to MAUI, improving performance and maintainability",
      "Creating REST API for mobile app",
      "Facelift of Windows application in XAML",
      "Customer support"
    ]
  },
  {
    id: 2,
    type: "work1",
    title: "Frontend Developer",
    company: "Metio Software",
    period: "12/2022 - 05/2023",
    description: "Developed and optimized frontend applications using React and JavaScript",
    details: [
      "Developed reusable React components from Figma designs",
      "Working with Redux",
      "Adjusting static web pages"
    ]
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor's in Computer Science",
    company: "Masaryk University",
    period: "09/2018 - 09/2020, 09/2021 - 01/2023",
    description: "Unfinished",
    details: [
     "Studied core computer science principles, including algorithms, data structures, and software development", 
     "Gained experience with programming languages and software engineering methodologies", 
     "Completed the majority of coursework",
     "Organizing a faculty film festival"
    ]
  },
  {
    id: 3,
    type: "project",
    title: "Service Technician",
    company: "Kodys Slovensko",
    period: "10/2020 - 09/2021",
    description: "Diagnosed and repaired scanners and printers used in warehouse environments",
    details: [
      "Diagnostics and physical repair of broken printers and hand scanners", 
      "Onsite service", 
      "Zebra device configuration", 
      "Customer support"
    ]
  }
];

export const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 " id="experience">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-skyblue">Experience & Education</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedExperience(exp)}
            >
              <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
              <p className="text-gray-700">{exp.description}</p>
              <Button variant="link" className="mt-4 text-skyblue">
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">{selectedExperience?.title}</DialogTitle>
                <p className="text-gray-600 text-center">{selectedExperience?.company}</p>
                <p className="text-sm text-gray-500 mb-4 text-center">{selectedExperience?.period}</p>
                <ul className="list-disc pl-4 space-y-2">
                  {selectedExperience?.details.map((detail, index) => (
                    <li key={index} className="text-gray-700 ">{detail}</li>
                  ))}
                </ul>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
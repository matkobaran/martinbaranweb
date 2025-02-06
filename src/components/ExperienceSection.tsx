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
    description: "Fullstack software developer",
    details: [
      "Developed and maintained Windows application for our customers (.NET, .VB)",
      "Migration of mobile application from Xamarin to MAUI",
      "Creating REST API for mobile app",
      "Facelift of Windows application in XAML",
      "Maintainence of web in .vbhtml, .js",
      "Customers support"
    ]
  },
  {
    id: 2,
    type: "work1",
    title: "Frontend Developer",
    company: "Metio Software",
    period: "12/2022 - 05/2023",
    description: "Frontend programming, mostly in React and javascript",
    details: [
      "Creating React components from Figma",
      "Working with Redux",
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
     "Completing most of the undergraduate courses", 
     "Learning strong software engineering fundamentals", 
     "Organizing a faculty film festival"
    ]
  },
  {
    id: 3,
    type: "project",
    title: "Service Technician",
    company: "Kodys Slovensko",
    period: "10/2020 - 09/2021",
    description: "Repair of scanners and printers for warehouses.",
    details: [
      "Physical repair of broken devices", 
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
              <DialogTitle>{selectedExperience?.title}</DialogTitle>
                <p className="text-gray-600">{selectedExperience?.company}</p>
                <p className="text-sm text-gray-500 mb-4">{selectedExperience?.period}</p>
                <ul className="list-disc pl-4 space-y-2">
                  {selectedExperience?.details.map((detail, index) => (
                    <li key={index} className="text-gray-700 text-left">{detail}</li>
                  ))}
                </ul>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
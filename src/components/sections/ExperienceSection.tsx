import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "../ui/button";
import AnimatedButton from "../my components/AnimatedButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ExperienceSection = () => {
  const { t } = useTranslation();
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [showMore, setShowMore] = useState(false);

  const experiences = [
    {
      id: 0,
      type: "work3",
      title: t('experience.experiences.creasoft.title'),
      company: t('experience.experiences.creasoft.company'),
      period: t('experience.experiences.creasoft.period'),
      description: t('experience.experiences.creasoft.description'),
      details: t('experience.experiences.creasoft.details', { returnObjects: true }) as string[]
    },
    {
      id: 1,
      type: "work2",
      title: t('experience.experiences.aps_brno.title'),
      company: t('experience.experiences.aps_brno.company'),
      period: t('experience.experiences.aps_brno.period'),
      description: t('experience.experiences.aps_brno.description'),
      details: t('experience.experiences.aps_brno.details', { returnObjects: true }) as string[]
    },
    {
      id: 2,
      type: "work1",
      title: t('experience.experiences.metio.title'),
      company: t('experience.experiences.metio.company'),
      period: t('experience.experiences.metio.period'),
      description: t('experience.experiences.metio.description'),
      details: t('experience.experiences.metio.details', { returnObjects: true }) as string[]
    },
    {
      id: 4,
      type: "education",
      title: t('experience.experiences.university.title'),
      company: t('experience.experiences.university.company'),
      period: t('experience.experiences.university.period'),
      description: t('experience.experiences.university.description'),
      details: t('experience.experiences.university.details', { returnObjects: true }) as string[]
    },
    {
      id: 3,
      type: "project",
      title: t('experience.experiences.kodys.title'),
      company: t('experience.experiences.kodys.company'),
      period: t('experience.experiences.kodys.period'),
      description: t('experience.experiences.kodys.description'),
      details: t('experience.experiences.kodys.details', { returnObjects: true }) as string[]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="experience">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-16 text-skyblue">
      {t('experience.title')}
    </h2>

    {/* STATE: show more toggle */}
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {(showMore ? experiences : experiences.slice(0, 4)).map((exp, index) => (
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
            <Button variant="link" className="mt-4 text-accent">
              {t('common.learnMore')}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {experiences.length > 4 && (
        <div className="mt-12 flex flex-col items-center">
          <button onClick={() => setShowMore(!showMore)} className="group">
            <AnimatedButton
              text={showMore ? t('common.showLess') : t('common.showMore')}
              variant="wide"
              decoration={true}
            />
          </button>
        </div>
      )}
    </div>

    {/* Dialog */}
    <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{selectedExperience?.title}</DialogTitle>
          <p className="text-gray-600 text-center">{selectedExperience?.company}</p>
          <p className="text-sm text-gray-500 mb-4 text-center">{selectedExperience?.period}</p>
          <ul className="list-disc pl-4 space-y-2">
            {selectedExperience?.details.map((detail, index) => (
              <li key={index} className="text-gray-700">
                {detail}
              </li>
            ))}
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</section>

  );
};
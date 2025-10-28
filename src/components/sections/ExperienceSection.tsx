import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { X, Calendar, MapPin, Building } from "lucide-react";
import AnimatedButton from "../my components/AnimatedButton";

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
                className="bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedExperience(exp)}
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-skyblue transition-colors">{exp.title}</h3>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                <p className="text-gray-700">{exp.description}</p>
                <p className="mt-4 text-accent text-sm font-medium group-hover:text-skyblue transition-colors">
                  {t('common.learnMore')} →
                </p>
              </motion.div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {experiences.length > 4 && (
            <div className="mt-12 flex flex-col items-center">
              <AnimatedButton
                text={showMore ? t('common.showLess') : t('common.showMore')}
                variant="wide"
                decoration={true}
                onClick={() => setShowMore(!showMore)}
              />
            </div>
          )}
        </div>

        {/* Custom Modal */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-skyblue to-navy p-6 text-white relative">
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Building size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedExperience.title}</h3>
                      <p className="text-white/90">{selectedExperience.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">{selectedExperience.period}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {selectedExperience.description}
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('experience.keyResponsibilities')}
                    </h4>
                    <ul className="space-y-3">
                      {selectedExperience.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-skyblue rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="px-6 py-2 bg-skyblue text-white rounded-lg hover:bg-skyblue/90 transition-colors font-medium"
                  >
                    {t('common.close')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
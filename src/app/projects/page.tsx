"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { ProjectCard, ProjectModal } from '@/components/ProjectCard';
import { projects } from './projects';
import { useDarkMode } from '@/context/DarkModeContext';

const ProjectsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { darkMode } = useDarkMode();

  const nextProject = () => setCurrentIndex((currentIndex + 1) % projects.length);
  const prevProject = () => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Projects Carousel */}
      <section className="relative flex-grow flex items-center justify-center py-12 px-4">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <ProjectCard project={projects[currentIndex]} isActive onClick={openModal} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevProject}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 text-teal-300' : 'bg-white text-blue-600'}`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextProject}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 text-teal-300' : 'bg-white text-blue-600'}`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </motion.button>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={projects[currentIndex]} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;

"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { ProjectCard, ProjectModal } from '@/components/ProjectCard';
import { projects } from './blog/projects';
import { useDarkMode } from '@/context/DarkModeContext';

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { darkMode } = useDarkMode();

  const nextProject = () => setCurrentIndex((currentIndex + 1) % projects.length);
  const prevProject = () => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className={`text-5xl font-extrabold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Hi, I'm Alimoudine IDRISSOU
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`mt-6 max-w-3xl mx-auto text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            A visionary full-stack developer specializing in blockchain and AI, crafting innovative solutions for tomorrow's challenges.
          </motion.p>
        </motion.div>

        <div className="mt-24 relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <ProjectCard project={projects[currentIndex]} isActive={true} onClick={openModal} />
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevProject}
            className={`absolute top-1/2 -left-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg 
            ${darkMode ? 'bg-gray-800 text-blue-400 hover:text-blue-300' : 'bg-white text-blue-600 hover:text-blue-800'} 
            transition-colors duration-300`}
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextProject}
            className={`absolute top-1/2 -right-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg 
            ${darkMode ? 'bg-gray-800 text-blue-400 hover:text-blue-300' : 'bg-white text-blue-600 hover:text-blue-800'} 
            transition-colors duration-300`}
          >
            <ChevronRightIcon className="w-8 h-8" />
          </motion.button>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          {projects.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex 
                  ? (darkMode ? 'bg-blue-400' : 'bg-blue-600') 
                  : (darkMode ? 'bg-blue-700' : 'bg-blue-300')
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal
            project={projects[currentIndex]}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
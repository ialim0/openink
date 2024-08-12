"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { ProjectCard, ProjectModal } from '@/components/ProjectCard';
import { projects } from './projects';
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
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center px-4 py-12 sm:py-20"
        >
          <h1 className={`text-4xl sm:text-6xl font-extrabold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`}>
          Welcome! I'm Alim Idrissou,          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}
          >
AI-focused Software Engineer dedicated to transforming abstract concepts into concrete solutions.          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`mt-4 sm:mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
I'm passionate about creating smart, efficient solutions that drive innovation and improve lives.      
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 sm:mt-10 flex justify-center space-x-4"
          >
            <a
              href="#projects"
              className={`px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out ${darkMode ? 'hover:bg-blue-500' : ''}`}
            >
              View Projects
            </a>
            {/* <a
              href="#contact"
              className={`px-6 py-3 rounded-full ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition duration-300 ease-in-out`}
            >
              Connect 
            </a> */}
          </motion.div>
        </motion.div>

        <div className="mt-12 sm:mt-16 relative">
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
            className={`absolute top-1/2 -left-5 sm:-left-10 lg:-left-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg 
            ${darkMode ? 'bg-gray-800 text-blue-400 hover:text-blue-300' : 'bg-white text-blue-600 hover:text-blue-800'} 
            transition-colors duration-300`}
          >
            <ChevronLeftIcon className="w-6 sm:w-8 h-6 sm:h-8" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextProject}
            className={`absolute top-1/2 -right-5 sm:-right-10 lg:-right-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg 
            ${darkMode ? 'bg-gray-800 text-blue-400 hover:text-blue-300' : 'bg-white text-blue-600 hover:text-blue-800'} 
            transition-colors duration-300`}
          >
            <ChevronRightIcon className="w-6 sm:w-8 h-6 sm:h-8" />
          </motion.button>
        </div>

        <div className="mt-8 sm:mt-12 flex justify-center space-x-2 sm:space-x-4">
          {projects.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${idx === currentIndex
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

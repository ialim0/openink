'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { ProjectCard,ProjectModal } from '@/components/ProjectCard';
import { projects } from './blog/projects';

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const nextProject = () => setCurrentIndex((currentIndex + 1) % projects.length);
  const prevProject = () => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 sm:text-6xl text-center mb-6"
        >
          Hi !        
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-3xl text-center mx-auto text-xl text-gray-600 leading-relaxed"
        >
          I'm Alimoudine IDRISSOU, a visionary full-stack developer specializing in blockchain and AI.
        </motion.p>

        <div className="mt-20 relative">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={projects[currentIndex]} isActive={true} onClick={openModal} />
            </motion.div>
          </AnimatePresence>

          <button onClick={prevProject} className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button onClick={nextProject} className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-blue-600' : 'bg-blue-300'}`}
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

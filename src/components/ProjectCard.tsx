import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useDarkMode } from '@/context/DarkModeContext';

interface Project {
  name: string;
  description: string;
  imageUrls: string[];
  tags: string[];
  links: {
    github: string;
    demo: string;
    live: string;
  };
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onClick }) => {
  const { darkMode } = useDarkMode();

  return (
    <motion.div
      className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-lg rounded-lg overflow-hidden transform ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'} transition-all duration-500 cursor-pointer`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      onClick={onClick}
      id='projects'
    >
      <div className="relative h-96 overflow-hidden">
        <Image
          src={project.imageUrls[0]}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">{project.name}</h2>
      </div>
      <div className="p-6">
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} mb-6 leading-relaxed`}>{project.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className={`px-3 py-1 text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full`}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { darkMode } = useDarkMode();

  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % project.imageUrls.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + project.imageUrls.length) % project.imageUrls.length);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-6 max-w-3xl w-full relative`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button onClick={onClose} className={`absolute top-4 right-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
        <div className="relative h-64 mb-4">
          <Image
            src={project.imageUrls[currentImageIndex]}
            alt={`${project.name} screenshot`}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
          {project.imageUrls.length > 1 && (
            <>
              <button onClick={prevImage} className={`absolute top-1/2 left-0 transform -translate-y-1/2 ${darkMode ? 'bg-gray-700 text-blue-400 hover:text-blue-300' : 'bg-white text-blue-600 hover:text-blue-800'} p-2 rounded-full shadow-lg transition-colors duration-300`}>
                &lt;
              </button>
              <button onClick={nextImage} className={`absolute top-1/2 right-0 transform -translate-y-1/2 ${darkMode ? 'bg-gray-700 text-blue-400 hover:text-blue-300' : 'bg-white text-blue-600 hover:text-blue-800'} p-2 rounded-full shadow-lg transition-colors duration-300`}>
                &gt;
              </button>
            </>
          )}
        </div>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className={`px-3 py-1 text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full`}>{tag}</span>
          ))}
        </div>
        <div className="flex justify-between space-x-4">
          {Object.entries(project.links).map(([type, url]) => (
            <a
              key={type}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-3 px-4 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm font-semibold rounded-lg shadow-md transition duration-300 text-center`}
            >
              {type === 'github' ? <FaGithub className="inline-block mr-2" /> : <FaExternalLinkAlt className="inline-block mr-2" />}
              {type === 'github' ? 'Code' : type.charAt(0).toUpperCase() + type.slice(1)}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { ProjectCard, ProjectModal };

"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const projects = [
  {
    name: 'Decentralized Finance Platform',
    description: 'A cutting-edge DeFi solution built on Ethereum, offering smart contract-based lending, borrowing, and staking. Employs Solidity, React, and Web3.js to deliver a trustless, high-yield ecosystem.',
    imageUrl: "/images/defi-project.jpg",
    tags: ['Solidity', 'React', 'Web3.js', 'Ethereum'],
    links: {
      github: 'https://github.com/alimouid/defi-platform',
      demo: 'https://demo.defi-platform.com',
      live: 'https://defi-platform.com',
    },
  },
  {
    name: 'AI-Driven Data Analytics',
    description: 'An intelligent data analytics tool that uses machine learning to derive actionable insights from vast datasets. Built with Python, TensorFlow, and React, it offers predictive modeling and interactive visualizations.',
    imageUrl: '/path/to/ai-analytics.jpg',
    tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
    links: {
      github: 'https://github.com/alimouid/ai-analytics',
      demo: 'https://demo.ai-analytics.com',
      live: 'https://ai-analytics.com',
    },
  },
  {
    name: 'Blockchain Supply Chain',
    description: 'A transparent supply chain solution leveraging blockchain for end-to-end tracking. Uses Hyperledger Fabric, Node.js, and Vue.js to ensure product authenticity and streamline logistics.',
    imageUrl: '/path/to/blockchain-supply.jpg',
    tags: ['Hyperledger', 'Node.js', 'Vue.js', 'Docker'],
    links: {
      github: 'https://github.com/alimouid/blockchain-supply',
      demo: 'https://demo.blockchain-supply.com',
      live: 'https://blockchain-supply.com',
    },
  },
  // More projects...
];

const ProjectCard = ({ project, isActive }) => (
  <motion.div 
    className={`bg-white shadow-lg rounded-lg overflow-hidden transform ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'} transition-all duration-500`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
  >
    <div className="relative h-96 overflow-hidden">
      <Image
        src={project.imageUrl}
        alt={project.name}
        layout="fill"
        objectFit="cover"
        className="transform hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">{project.name}</h2>
    </div>
    <div className="p-6">
      <p className="text-gray-800 mb-6 leading-relaxed">{project.description}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">{tag}</span>
        ))}
      </div>
      <div className="flex justify-between space-x-4">
        {Object.entries(project.links).map(([type, url]) => (
          <a
            key={type}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md transition duration-300 text-center"
          >
            {type === 'github' ? 'Code' : type.charAt(0).toUpperCase() + type.slice(1)}
          </a>
        ))}
      </div>
    </div>
  </motion.div>
);

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => setCurrentIndex((currentIndex + 1) % projects.length);
  const prevProject = () => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 sm:text-6xl text-center mb-6"
        >
          Crafting Digital Brilliance
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-3xl text-center mx-auto text-xl text-gray-600 leading-relaxed"
        >
          I'm Alimoudine IDRISSOU, a visionary full-stack developer specializing in blockchain and AI. With a passion for decentralized systems and machine learning, I architect solutions that redefine industries.
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
              <ProjectCard project={projects[currentIndex]} isActive={true} />
            </motion.div>
          </AnimatePresence>
          
          <button onClick={prevProject} className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button onClick={nextProject} className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
        
        <div className="mt-12 flex justify-center space-x-4">
          {projects.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-indigo-600' : 'bg-indigo-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
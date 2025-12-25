"use client"
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Video, ArrowLeft } from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext';
import { Project } from '../projects.d';

const getYouTubeID = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { darkMode } = useDarkMode();
  const [[page, direction], setPage] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasLinks = Boolean(project.links?.live || project.links?.github || project.links?.video);
  const currentIndex = ((page % project.imageUrls.length) + project.imageUrls.length) % project.imageUrls.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage, _]) => [currentPage + newDirection, newDirection]);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
          <Link
            href="/"
            className={`group inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 ${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-blue-600'}`}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>
        </nav>

        {/* Header Section */}
        <header className="mb-10 sm:mb-16">
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {project.name}
          </h1>
          {project.description && (
            <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {project.description}
            </p>
          )}
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {project.previewType === 'video' && project.links?.video ? (
              <div className={`relative w-full overflow-hidden rounded-2xl border ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'} shadow-2xl`}>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeID(project.links.video)}`}
                    title={`YouTube video player for ${project.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ) : project.imageUrls?.length ? (
              <div className={`relative w-full overflow-hidden rounded-2xl border ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'} shadow-2xl`}>
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.figure
                      key={page}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.imageUrls[currentIndex]}
                        alt={`${project.name} screenshot ${currentIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="cursor-grab object-contain active:cursor-grabbing"
                        priority
                        onClick={() => setIsFullscreen(true)}
                      />
                    </motion.figure>
                  </AnimatePresence>

                  {project.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={() => paginate(-1)}
                        className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2.5 transition-all duration-200 ${darkMode ? 'bg-gray-800/90 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white/95 text-gray-900 hover:bg-gray-50 border border-gray-200'} shadow-xl backdrop-blur-md hover:scale-110 active:scale-95`}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => paginate(1)}
                        className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2.5 transition-all duration-200 ${darkMode ? 'bg-gray-800/90 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white/95 text-gray-900 hover:bg-gray-50 border border-gray-200'} shadow-xl backdrop-blur-md hover:scale-110 active:scale-95`}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                </div>

                {project.imageUrls.length > 1 && (
                  <div className={`px-4 py-4 flex justify-center gap-2 ${darkMode ? 'bg-gray-900/30' : 'bg-gray-50/50'} backdrop-blur-sm`}>
                    {project.imageUrls.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const direction = i > currentIndex ? 1 : -1;
                          setPage([i, direction]);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? (darkMode ? 'bg-teal-400 w-8' : 'bg-blue-600 w-8') : (darkMode ? 'bg-gray-600 hover:bg-gray-500 w-1.5' : 'bg-gray-300 hover:bg-gray-400 w-1.5')}`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className={`flex h-64 items-center justify-center rounded-2xl border ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No preview available</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-6">
            {project.tags?.length ? (
              <section aria-labelledby="tech-heading" className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}>
                <h2 id="tech-heading" className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Technologies
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${darkMode ? 'bg-gray-800 text-teal-300 border border-gray-700 hover:bg-gray-750' : 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100'}`}>
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {hasLinks && (
              <section aria-labelledby="links-heading" className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}>
                <h2 id="links-heading" className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Links
                </h2>
                <div className="flex flex-col gap-3">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${darkMode ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-900/30' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30'} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Visit Live Site</span>
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${darkMode ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Github className="h-4 w-4" />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {project.links?.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${darkMode ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-900/30' : 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/30'} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Video className="h-4 w-4" />
                      <span>Watch Demo</span>
                    </a>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>

        {project.fullDescription && (
          <section aria-labelledby="desc-heading" className={`mt-12 rounded-2xl p-6 border ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}>
            <h2 id="desc-heading" className={`text-sm font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              About
            </h2>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {project.fullDescription}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
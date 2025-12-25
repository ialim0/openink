"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from './projects';
import { useDarkMode } from '@/context/DarkModeContext';

const getYouTubeID = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const HomePage = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <main className="container mx-auto py-12 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className={`mt-2 max-w-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Here are some public AI projects I'm able to share details about.
          </p>
        </header>

        <section aria-label="Project list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`group rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} overflow-hidden shadow-sm transition-all hover:shadow-md focus-within:shadow-md`}
            >
              <Link
                href={`/${project.slug}`}
                aria-label={`View details for ${project.name}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-transparent"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {project.previewType === 'video' && project.links?.video ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeID(project.links.video)}`}
                      title={`YouTube video player for ${project.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : project.imageUrls?.[0] ? (
                    <Image
                      src={project.imageUrls[0]}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={false}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No preview</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold leading-snug">{project.name}</h2>
                  <p className={`mt-2 line-clamp-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${darkMode ? 'bg-gray-700 text-teal-300' : 'bg-blue-50 text-blue-700'}`}>
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
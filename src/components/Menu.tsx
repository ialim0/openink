"use client";
import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import { useDarkMode } from '@/context/DarkModeContext';

// Type definitions
interface SkillCategory {
  category: string;
  skills: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  linkText?: string;
}

interface SectionHeaderProps {
  title: string;
  darkMode?: boolean;
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
  darkMode?: boolean;
}

interface ProjectCardProps {
  project: Project;
  darkMode?: boolean;
}

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverColor: string;
  darkMode?: boolean;
}

// Component for section headers with consistent styling
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, darkMode }) => (
  <h2 className={`text-2xl font-semibold mb-6 border-b pb-2 ${darkMode ? 'border-gray-700 text-gray-100' : 'border-gray-200 text-gray-900'}`}>
    {title}
  </h2>
);

// Component for skill category
const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, darkMode }) => (
  <div className={`p-5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
    <h3 className={`font-medium mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>{title}</h3>
    <ul className="space-y-1 text-sm">
      {skills.map((skill, index) => (
        <li key={index} className="flex items-center">
          <span className={`mr-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span> 
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Simplified project card component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, darkMode }) => (
  <div className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-400' : 'bg-white/80 border-gray-100 hover:border-blue-300'} transition-all duration-300`}>
    <h3 className={`font-semibold text-lg mb-3 flex items-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className={`w-1 h-6 rounded mr-3 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
      {project.title}
    </h3>
    
    <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {project.description}
    </p>
    
    <div className="text-sm space-y-2 mb-4">
      {project.technologies && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-600'}`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
    
    {project.link && (
      <div className={`mt-3 pt-2 border-t border-dashed ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <a
          href={project.link}
          className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'} text-sm font-medium inline-flex items-center transition-colors`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.linkText || "Learn more"} <span className="ml-1">→</span>
        </a>
      </div>
    )}
  </div>
);

// Component for social media links
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, hoverColor, darkMode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : ''} hover:${hoverColor}`}
  >
    <Icon className="text-xl" />
  </a>
);

const Menu: React.FC = () => {
  const { darkMode } = useDarkMode();
  
  // Skills data organization
  const skillsData: SkillCategory[] = [
    {
      category: "Programming",
      skills: ["Python", "Rust", "Go", "JavaScript"]
    },
    {
      category: "Web & Backend",
      skills: ["FastAPI", "Next.js", "PostgreSQL", "GraphQL"]
    },
    {
      category: "AI & ML",
      skills: ["Machine Learning", "LLMs & SLMs", "NLP", "Computer Vision"]
    },
    {
      category: "DevOps & Infrastructure",
      skills: ["AWS", "GCP", "Docker", "Redis", "Git", "Linux"]
    }
  ];

  // Simplified projects data structure
  const projectsData: Project[] = [
    {
      title: "CVBABA –DEMOCRATIZING CAREER ACCESS WITH AI",
      description: "CVBABA is an innovative, multilingual AI assistant that streamlined ATS-optimized résumé and cover letter generation from natural language, solving the challenge of creating beautiful documents regardless of language or design skills.",
      technologies: ["Python", "FastAPI", "AWS", "LLM", "NLP", "Data Analytics"],
      link: "https://youtu.be/qBWWaCel7dI",
      linkText: "See it in action"
    },
    {
      title: "Scandal Detection System",
      description: "NLP platform analyzing 300+ daily French news articles to identify environmental scandals and extract key information for media monitoring and risk assessment.",
      technologies: ["Selenium", "Python", "spaCy", "BERT", "NLP Pipeline"],
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero Section with Image on Top */}
        <section className="flex flex-col items-center mb-16">
          <div className="relative w-40 h-40 mb-8">
            <Image
              src="https://res.cloudinary.com/dlo6yuwt2/image/upload/v1748742663/profile_xmvqia.png"
              alt="Alim Idrissou "
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">Alim Idrissou</h1>
            <p className={`font-medium mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Software Engineer • Applied AI • Tech for Impact
            </p>
            <p className={`max-w-xl text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I build intelligent solutions that simplify complex problems. My passion? Creating technology that works for people, not the other way around.
            </p>
            <div className="flex space-x-4 mt-4 justify-center">
              <SocialLink 
                href="https://linkedin.com/in/ialim" 
                icon={FaLinkedin} 
                hoverColor={darkMode ? 'bg-gray-700' : 'bg-blue-100'} 
                darkMode={darkMode}
              />
              <SocialLink 
                href="https://github.com/ialim0" 
                icon={FaGithub} 
                hoverColor={darkMode ? 'bg-gray-700' : 'bg-gray-100'} 
                darkMode={darkMode}
              />
              <SocialLink 
                href="mailto:i.alim0229@gmail.com" 
                icon={FaEnvelope} 
                hoverColor={darkMode ? 'bg-gray-700' : 'bg-red-100'} 
                darkMode={darkMode}
              />
              <SocialLink 
                href="https://alimidrissou.com" 
                icon={FaGlobe} 
                hoverColor={darkMode ? 'bg-gray-700' : 'bg-green-100'} 
                darkMode={darkMode}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <SectionHeader title="Core Skills" darkMode={darkMode} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsData.map((category, index) => (
              <SkillCategory 
                key={index}
                title={category.category}
                skills={category.skills}
                darkMode={darkMode}
              />
            ))}
          </div>
        </section>

        {/* Projects Section - Simplified */}
        <section className="mb-16">
          <SectionHeader title="Highlighted Projects" darkMode={darkMode} />
          <div className="flex flex-col gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                darkMode={darkMode}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2025 Idrissou Alimoudine. All rights reserved.</p>
            <div className="flex space-x-6">
              <a 
                href="https://linkedin.com/in/ialim" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:${darkMode ? 'text-blue-400' : 'text-blue-500'} transition-colors`}
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://github.com/ialim0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:${darkMode ? 'text-gray-100' : 'text-gray-900'} transition-colors`}
              >
                <FaGithub />
              </a>
              <a 
                href="mailto:i.alim0229@gmail.com" 
                className={`hover:${darkMode ? 'text-red-400' : 'text-red-500'} transition-colors`}
              >
                <FaEnvelope />
              </a>
              <a 
                href="https://alimidrissou.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:${darkMode ? 'text-green-400' : 'text-green-500'} transition-colors`}
              >
                <FaGlobe />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
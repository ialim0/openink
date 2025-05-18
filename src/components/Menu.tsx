"use client";
import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

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
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

interface ProjectCardProps {
  project: Project;
}

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverColor: string;
}

// Component for section headers with consistent styling
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
    {title}
  </h2>
);

// Component for skill category
const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => (
  <div className="p-5 rounded-lg bg-gray-50">
    <h3 className="font-medium mb-3 text-blue-500">{title}</h3>
    <ul className="space-y-1 text-sm">
      {skills.map((skill, index) => (
        <li key={index} className="flex items-center">
          <span className="mr-2 text-xs">•</span> {skill}
        </li>
      ))}
    </ul>
  </div>
);

// Simplified project card component
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="p-6 rounded-lg border border-gray-100 bg-white/80 transition-all duration-300 hover:border-blue-300">
    <h3 className="font-semibold text-lg mb-3 flex items-center">
      <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
      {project.title}
    </h3>
    
    <p className="text-sm mb-4 leading-relaxed">
      {project.description}
    </p>
    
    <div className="text-sm space-y-2 mb-4">
      {project.technologies && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-600">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
    
    {project.link && (
      <div className="mt-3 pt-2 border-t border-dashed border-gray-200">
        <a
          href={project.link}
          className="text-blue-500 text-sm font-medium inline-flex items-center hover:text-blue-600 transition-colors"
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
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, hoverColor }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`p-2 rounded-full transition-colors duration-200 hover:${hoverColor}`}
  >
    <Icon className="text-xl" />
  </a>
);

const Menu: React.FC = () => {
  // Skills data organization
  const skillsData: SkillCategory[] = [
    {
      category: "Programming",
      skills: ["Python", "Rust", "Go", "JavaScript/TypeScript"]
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
      title: "CVBABA – AI Document Intelligence",
      description: "A deep learning system that converts natural language into professionally styled documents, solving the challenge of creating beautiful documents regardless of language or design skills.",
      technologies: ["Python", "FastAPI", "AWS", "Neural Networks", "NLP"],
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero Section with Image on Top */}
        <section className="flex flex-col items-center mb-16">
          <div className="relative w-40 h-40 mb-8">
            <Image
              src="/images/profile.png"
              alt="Idrissou Alimoudine"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">Idrissou Alimoudine</h1>
            <p className="text-blue-500 font-medium mb-3">Software Engineer • Applied AI • Tech for Impact</p>
            <p className="max-w-xl text-base leading-relaxed">
              I build intelligent solutions that simplify complex problems. My passion? Creating technology that works for people, not the other way around.
            </p>
            <div className="flex space-x-4 mt-4 justify-center">
              <SocialLink href="https://linkedin.com/in/ialim" icon={FaLinkedin} hoverColor="bg-blue-100" />
              <SocialLink href="https://github.com/ialim0" icon={FaGithub} hoverColor="bg-gray-100" />
              <SocialLink href="mailto:i.alim0229@gmail.com" icon={FaEnvelope} hoverColor="bg-red-100" />
              <SocialLink href="https://alimidrissou.com" icon={FaGlobe} hoverColor="bg-green-100" />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <SectionHeader title="Core Skills" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsData.map((category, index) => (
              <SkillCategory 
                key={index}
                title={category.category}
                skills={category.skills}
              />
            ))}
          </div>
        </section>

        {/* Projects Section - Simplified */}
        <section className="mb-16">
          <SectionHeader title="Highlighted Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-gray-600">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2025 Idrissou Alimoudine. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://linkedin.com/in/ialim" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://github.com/ialim0" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                <FaGithub />
              </a>
              <a href="mailto:i.alim0229@gmail.com" className="hover:text-red-500 transition-colors">
                <FaEnvelope />
              </a>
              <a href="https://alimidrissou.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
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
"use client";
import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import { useDarkMode } from "@/context/DarkModeContext";

const Menu: React.FC = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <main className="container mx-auto px-6 py-12">
        {/* Intro */}
        <section className="flex flex-col md:flex-row items-center mb-12">
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
            <Image
              src="/images/profile.png"
              alt="Idrissou Alimoudine"
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Idrissou Alimoudine</h1>
            <p className="text-blue-500 mb-2">Software Engineer • Applied AI • Tech for Impact</p>
            <p className="max-w-xl text-base">
              I build intelligent solutions that simplify complex problems. My passion? Creating technology that works for people, not the other way around.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Core Skills</h2>
          <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm list-disc list-inside">
              <li>Python, Rust, Go, JavaScript</li>
              <li>FastAPI, Next.js, PostgreSQL</li>
              <li>Machine Learning, LLMs & SLMs</li>
              <li>AWS, GCP, Docker, Redis</li>
              <li>Edge AI, Ethical AI, Sustainable Tech</li>
              <li>Git, Bash, Linux</li>
            </ul>
          </div>
        </section>

        {/* Featured Work */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Highlighted Projects</h2>
          <div className={`space-y-6`}>
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <h3 className="font-semibold text-lg">CVBABA – AI Document Intelligence</h3>
              <p className="text-sm mb-3">
                I built a deep learning system that converts natural language into professionally styled documents. CVBABA solves the challenge of creating beautiful documents regardless of language or design skills.
              </p>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span><span className="font-medium">Problem:</span> Documents are trapped in rigid formats, creating barriers for non-designers</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span><span className="font-medium">Solution:</span> AI that understands document structure beyond just text</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span><span className="font-medium">Innovation:</span> Preserves design integrity across languages with varying text lengths</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span><span className="font-medium">Tech:</span> Custom neural architecture, Python, FastAPI, AWS</span>
                </div>
              </div>
              <a
                href="https://youtu.be/qBWWaCel7dI"
                className="text-blue-500 text-sm font-medium inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                See it in action <span className="ml-1">→</span>
              </a>
            </div>

            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <h3 className="font-semibold text-lg">News Intelligence System</h3>
              <p className="text-sm mb-3">
                NLP platform processing 300+ daily French news articles, automatically extracting key information and insights.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Entity extraction and topic classification</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Sentiment analysis and scandal detection</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>40% faster analysis than previous systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"}`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex space-x-5 text-2xl mb-4 md:mb-0">
            <a href="https://linkedin.com/in/ialim" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-blue-600" />
            </a>
            <a href="https://github.com/ialim0" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-black" />
            </a>
            <a href="mailto:i.alim0229@gmail.com">
              <FaEnvelope className="hover:text-red-500" />
            </a>
            <a href="https://alimidrissou.com" target="_blank" rel="noopener noreferrer">
              <FaGlobe className="hover:text-green-600" />
            </a>
          </div>
          <p className="text-sm text-center md:text-right">© 2025 Idrissou Alimoudine</p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
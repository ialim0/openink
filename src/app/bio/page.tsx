"use client"

import React from "react"
import Image from "next/image"
import { useDarkMode } from "@/context/DarkModeContext"
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const AboutPage: React.FC = () => {
  const { darkMode } = useDarkMode()

  const container = `max-w-4xl mx-auto p-8 rounded-2xl shadow-xl ${
    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
  }`
  const text = `mb-4 leading-relaxed text-base ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`
  const subheading = `text-2xl font-bold mb-4 mt-8 pb-2 border-l-4 pl-4 ${
    darkMode ? "text-gray-100 border-blue-400" : "text-gray-900 border-blue-500"
  }`
  const link = `inline-flex items-center font-medium hover:underline ${
    darkMode ? "text-blue-300" : "text-blue-600"
  } transition-colors`

  const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      {children}
    </a>
  )

  return (
    <div className={`min-h-screen px-4 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={container}>
        {/* Journey & Philosophy */}
        <h2 className={`${subheading} mt-0`}>Journey & Philosophy</h2>
        <p className={`${text} text-lg`}>
          I enjoy writing code as a way to explore ideas, push boundaries and take on complex challenges that have a meaningful impact, especially for communities that are often left behind by traditional innovation.
        </p>

        {/* Education & Growth */}
        <h2 className={subheading}>Education & Growth</h2>
        <ul className="mb-6 space-y-4">
          <li className={`p-5 rounded-lg shadow-sm transition-shadow hover:shadow-md ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="font-medium">
              <ExternalLink href="https://www.esmt.sn/">ESMT Dakar</ExternalLink>
            </div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>MSc in Digital Transformation Management (2023)</div>
          </li>
          <li className={`p-5 rounded-lg shadow-sm transition-shadow hover:shadow-md ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="font-medium">
              <ExternalLink href="https://uac.bj">FAST (UAC)</ExternalLink>
            </div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>BSc in Mathematical Fundamentals (2021)</div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Independent student; pursued out of passion. Studied concurrently with ENEAM.</div>
          </li>
          <li className={`p-5 rounded-lg shadow-sm transition-shadow hover:shadow-md ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="font-medium">
              <ExternalLink href="https://uac.bj">ENEAM (UAC)</ExternalLink>
            </div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>BSc in Project Planning (2021)</div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>First choice program; studied concurrently with FAST.</div>
          </li>
        </ul>

        {/* Experience */}
        <h2 className={subheading}>Experience</h2>
        <ul className="mb-6 space-y-4">
          <li className={`p-5 rounded-lg shadow-sm ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-start">
              <span className={`mr-3 mt-1 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
              <div>
                <strong>Co-Founder of <ExternalLink href="https://cvbaba.com">CVBABA</ExternalLink></strong>, a multilingual AI platform that transforms natural language into ATS-ready résumés and cover letters—prioritizing creativity, accessibility, and real-world outcomes (2025).
              </div>
            </div>
          </li>
          <li className={`p-5 rounded-lg shadow-sm ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-start">
              <span className={`mr-3 mt-1 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
              <div>
                <strong>01Edu</strong> (2023–2025): Worked on AI and software projects at 01Edu, a global peer-to-peer coding school, supporting hands-on learning for students of diverse backgrounds.
              </div>
            </div>
          </li>
          <li className={`p-5 rounded-lg shadow-sm ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-start">
              <span className={`mr-3 mt-1 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
              <div>
                <strong>Software Engineer freelancer</strong> (since 2023) helping startups in the US, Europe, and beyond launch their businesses.
              </div>
            </div>
          </li>
          <li className={`p-5 rounded-lg shadow-sm ${darkMode ? 'bg-gray-700/40 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-start">
              <span className={`mr-3 mt-1 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
              <div>
                <strong>Mathematics teacher</strong> (2019–2021), supporting private schools in Benin to promote STEM and share a passion for mathematics.
              </div>
            </div>
          </li>
        </ul>

        {/* Mentorship & Community */}
        <h2 className={subheading}>Mentorship & Community</h2>
        <ul className="mb-6 space-y-3">
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>FORCE‑N Senegal Entrepreneur Network</strong> (Rufisque): member (since 2024).</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><ExternalLink href="https://www.turing.com/">Turing.com</ExternalLink>: Part of the vetted engineer network (since 2023).</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><ExternalLink href="https://www.rjbdbenin.com/">RJBD</ExternalLink>: Contributed to building a digital platform connecting Beninese youth worldwide, supported junior developers, and helped design a secure data management system (since 2022).</span>
          </li>
        </ul>

        {/* Awards  */}
        <h2 className={subheading}>Awards</h2>
        <ul className="mb-6 space-y-3">
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>FORCE-N Entrepreneurship Award</strong>, UN-CHK & Mastercard Foundation (2025).</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>National and International Scholarship</strong> awarded by the Ministry of Higher Education and Scientific Research of Benin (2017–2023).</span>
          </li>
        </ul>

        {/* Technical Expertise */}
        <h2 className={subheading}>Technical Expertise</h2>
        <ul className="mb-6 space-y-3">
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>Languages & Frameworks:</strong> Python, Go, Rust, JavaScript, React, Next.js.</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>NLP & ML:</strong> SpaCy, Transformers, Scikit-Learn, embeddings for sentiment & scandal detection.</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>Algorithms:</strong> Graph optimization, DFS/BFS pathfinding, collision detection (SAT).</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span><strong>Cloud & DevOps:</strong> Docker, CI/CD pipelines, AWS.</span>
          </li>
        </ul>

        {/* Beyond the Code */}
        <h2 className={subheading}>Beyond the Code</h2>
        <ul className="mb-6 space-y-3">
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span>Runner, footballer, and PES video game player.</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span>Native in <ExternalLink href="https://foodoabee.com/en/linguistics/an-overview-of-foodo-2009">Foodo</ExternalLink> & French; fluent in <ExternalLink href="https://en.wikipedia.org/wiki/Dendi_language">Dendi</ExternalLink>, <ExternalLink href="https://en.wikipedia.org/wiki/Fon_language">Fon</ExternalLink>, and English.</span>
          </li>
          <li className={`${text} flex items-start`}>
            <span className={`mr-3 text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>•</span>
            <span>Muslim.</span>
          </li>
        </ul>


        {/* Footer Note */}
        <p className={`mt-10 pt-6 border-t text-sm italic ${darkMode ? 'text-gray-500 border-gray-700' : 'text-gray-500 border-gray-300'}`}>
          Note: Legal name is Alimoudine Idrissou.
        </p>

       
      </div>
    </div>
  )
}

export default AboutPage

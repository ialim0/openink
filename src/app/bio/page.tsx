"use client"

import React from "react"
import Image from "next/image"
import { useDarkMode } from "@/context/DarkModeContext"
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const AboutPage: React.FC = () => {
  const { darkMode } = useDarkMode()

  const container = `max-w-3xl mx-auto p-6 rounded-2xl shadow-xl ${
    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
  }`
  const text = `mb-4 leading-relaxed ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`
  const subheading = `text-xl font-semibold mb-3 ${
    darkMode ? "text-gray-100" : "text-gray-900"
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
        <h2 className={subheading}>Journey & Philosophy</h2>
        <p className={text}>
          My journey into software engineering began in an environment where reliable electricity and internet were never guaranteed. Over time, I became someone who is deeply passionate about creating technology that solves real problems. I enjoy writing code as a way to explore ideas, push boundaries and take on complex challenges that have a meaningful impact, especially for communities that are often left behind by traditional innovation.
        </p>

        {/* Education & Growth */}
        <h2 className={subheading}>Education & Growth</h2>
        <ul className="mb-4 space-y-3">
          <li className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/70 border border-gray-200'}`}>
            <div className="font-medium">
              <ExternalLink href="https://www.esmt.sn/">ESMT Dakar</ExternalLink>
            </div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>MSc in Digital Transformation Management (2023)</div>
          </li>
          <li className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/70 border border-gray-200'}`}>
            <div className="font-medium">
              <ExternalLink href="https://uac.bj">FAST (UAC)</ExternalLink>
            </div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>BSc in Mathematical Fundamentals (2021)</div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Independent student; pursued out of passion. Studied concurrently with ENEAM.</div>
          </li>
          <li className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/70 border border-gray-200'}`}>
            <div className="font-medium">
              <ExternalLink href="https://uac.bj">ENEAM (UAC)</ExternalLink>
            </div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>BSc in Strategic Planning (2021)</div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>First choice program; studied concurrently with FAST.</div>
          </li>
        </ul>

        {/* Experience & Impact */}
        <h2 className={subheading}>Experience & Impact</h2>
        <p className={text}>
          • Co-Founder of <strong>CVBABA</strong>, a multilingual AI platform that transforms natural language into ATS-ready résumés and cover letters—prioritizing creativity, accessibility, and real-world outcomes.<br />
        </p>

        {/* Mentorship & Community */}
        <h2 className={subheading}>Mentorship & Community</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className={text}>
            <ExternalLink href="https://www.rjbdbenin.com/">RJBD</ExternalLink>: Contributed to building a digital platform connecting Beninese youth worldwide, supported junior developers, and helped design a secure data management system.
          </li>
          <li className={text}>
            <ExternalLink href="https://www.turing.com/">Turing.com</ExternalLink>: Vetted Software Engineer since 2023 — passed seniority vetting including technical and non‑technical interviews and a live coding challenge.
          </li>
        </ul>

        {/* Awards  */}
        <h2 className={subheading}>Awards </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className={text}>
            <strong>FORCE-N Entrepreneurship Award</strong>, UN-CHK & Mastercard Foundation (2025).
          </li>
          <li className={text}>
            <strong>National and International Scholarship</strong> awarded by the Ministry of Higher Education and Scientific Research of Benin (2017–2023).
          </li>
        </ul>

        {/* Technical Expertise */}
        <h2 className={subheading}>Technical Expertise</h2>
        <p className={text}>
          • Languages & Frameworks: Python, Go, Rust, JavaScript, React, Next.js.<br />
          • NLP & ML: SpaCy, Transformers, Scikit-Learn, embeddings for sentiment & scandal detection.<br />
          • Algorithms: Graph optimization, DFS/BFS pathfinding, collision detection (SAT).<br />
          • Cloud & DevOps: Docker, CI/CD pipelines, AWS.
        </p>

        {/* Beyond the Code */}
        <h2 className={subheading}>Beyond the Code</h2>
        <p className={text}>
          • Runner, footballer, and PES video game player.<br />
          • Native in <ExternalLink href="https://foodoabee.com/en/linguistics/an-overview-of-foodo-2009">Foodo</ExternalLink> & French; fluent in <ExternalLink href="https://en.wikipedia.org/wiki/Dendi_language">Dendi</ExternalLink>, <ExternalLink href="https://en.wikipedia.org/wiki/Fon_language">Fon</ExternalLink>, and English.<br />
          • Muslim.
        </p>


        {/* Footer Note */}
        <p className="mt-8 text-sm italic text-gray-500">
          Note: Legal name is Alimoudine Idrissou.
        </p>

       
      </div>
    </div>
  )
}

export default AboutPage

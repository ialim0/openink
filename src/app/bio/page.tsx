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
          My journey into software engineering began in an environment where reliable electricity and internet were never guaranteed. Learning to code meant late nights with borrowed equipment, unstable connections and a lot of trial and error. Over time, I became someone who is deeply passionate about creating technology that solves real problems. I enjoy writing code as a way to explore ideas, push boundaries and take on complex challenges that have a meaningful impact, especially for communities that are often left behind by traditional innovation.
        </p>

        {/* Education & Growth */}
        <h2 className={subheading}>Education & Growth</h2>
        <p className={text}>
          🎓 <ExternalLink href="https://quantic.edu/ms-software-engineering/">Quantic School of Business and Technology</ExternalLink>: MS in Software Engineering (Leadership & Impact Scholar)<br />
          🎓 <ExternalLink href="https://www.esmt.sn/">ESMT Dakar</ExternalLink>: MSc in Digital Finance (Scholarship)<br />
          🧮 <ExternalLink href="https://uac.bj">UAC</ExternalLink>: BSc in Mathematical Fundamentals<br />
          🚀 <ExternalLink href="https://eneam.uac.bj/">ENEAM</ExternalLink>: BSc in Planning Science
        </p>

        {/* Experience & Impact */}
        <h2 className={subheading}>Experience & Impact</h2>
        <p className={text}>
          • Co-Founder of <strong>CVBABA</strong>, the first “vibe” document designer—making resume and cover letter creation as easy as ChatGPT, Canvas, and Word rolled into one app.<br />
          • Built an NLP-driven News Intelligence platform processing 300+ francophone articles daily with entity recognition, topic classification, sentiment analysis, and scandal detection.<br />
          • Developed AI-powered logistics automation using NLP to optimize customer interactions.<br />
          • Engineered collision-free, memory-efficient navigation algorithms in Rust with area and graph optimization.
        </p>

        {/* Mentorship & Community */}
        <h2 className={subheading}>Mentorship & Community</h2>
        <p className={text}>
          I actively mentor developers across West Africa in web development, product thinking, and career growth, believing in democratizing tech through teaching and community building.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className={text}>
            <ExternalLink href="https://e-smartraining.org/en/">E-Smart Training</ExternalLink>: Guided the first July 2022 cohort in web development, empowering 20+ young Africans from over 7 countries to launch their tech careers.
          </li>
          <li className={text}>
            <ExternalLink href="https://rjbdbenindiaspo.com/">RJBD</ExternalLink>: As a member since 2022 of the leading Beninese youth diaspora engineering community, I designed and implemented the registration management system—covering data handling, administrative workflows, and user onboarding to streamline operations.
          </li>
        </ul>

        {/* Awards  */}
        <h2 className={subheading}>Awards </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className={text}>
            <strong> Impact Scholarship</strong> for academic and career excellence.
          </li>
          <li className={text}>
            <strong>Strada Leadership Scholarship</strong> for leadership and social impact.
          </li>
          <li className={text}>
            <strong>National Scholarship</strong> awarded by the Ministry of Higher Education and Scientific Research of Benin.
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

        {/* Reflection Image */}
        <div className="mt-6 text-center">
          <Image
            src="https://res.cloudinary.com/dlo6yuwt2/image/upload/v1748742680/alim_praying_pwt5sj.png"
            alt="Me in 2022"
            width={320}
            height={220}
            className="rounded-lg shadow-lg mx-auto"
          />
          <p className="mt-2 text-sm text-gray-500 italic">Me in 2022</p>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-sm italic text-gray-500">
          Note: Legal name is Alimoudine Idrissou.
        </p>

        {/* Social Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a href="https://github.com/ialim0" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/ialim0" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com/ialim0" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

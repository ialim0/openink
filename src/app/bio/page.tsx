"use client"

import React from "react"
import Image from "next/image"
import { useDarkMode } from "@/context/DarkModeContext"

const AboutPage: React.FC = () => {
  const { darkMode } = useDarkMode()

  const styles = {
    container: `max-w-3xl mx-auto p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`,
    text: `text-base mb-4 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`,
    heading: `text-2xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`,
    link: `inline-flex items-center ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} font-medium transition-colors duration-300`,
  }

  const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {children}
    </a>
  )

  return (
    <div className={`px-4 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
      <div className={styles.container}>
        <h1 className={styles.heading}>About Me</h1>
        
        <p className={styles.text}>
          Hello, I'm Alim Idrissou. My journey in technology and finance has been shaped by a love for mathematics and a desire to learn continuously.
        </p>

        <p className={styles.text}>
          
        I studied Planning Science at <ExternalLink href="https://eneam.uac.bj/">ENEAM</ExternalLink> and Mathematics Fundamentals at <ExternalLink href="https://uac.bj">UAC</ExternalLink> for my Bachelor's degrees, which taught me valuable lessons in time management and teamwork.  Later, I received a Master's scholarship in Digital Finance at <ExternalLink href="https://www.esmt.sn/">ESMT</ExternalLink> in Senegal, where I explored the intersection of technology and finance.
                  </p>

        <p className={styles.text}>
        I had the privilege of teaching mathematics, an experience I found deeply rewarding. My professional path led me to the <ExternalLink href="https://01-edu.org/">01 Edu</ExternalLink>, where I've been developing skills in Golang, Python, Rust, and JavaScript. I've had the opportunity to work on projects with teams from various countries as remote engineer, introducing me to different aspects of AI and improving my communication skills across cultures.
        </p>

        <p className={styles.text}>
          Since 2022, I've been volunteering with two projects:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li className={styles.text}>
            <ExternalLink href="https://e-smartraining.org/en/">E-smart training</ExternalLink>: Applying technology to real-world problems and learning.
          </li>
          <li className={styles.text}>
            <ExternalLink href="https://rjbdbenindiaspo.com/">RJBD</ExternalLink>: Supporting the Beninese diaspora community.
          </li>
        </ul>

        <p className={styles.text}>
          Outside of work, I enjoy running, playing football and basketball, and strategic video games. I'm a native speaker of <ExternalLink href="https://foodoabee.com/en/linguistics/an-overview-of-foodo-2009">Foodo</ExternalLink> and French, and I'm also fluent in <ExternalLink href="https://en.wikipedia.org/wiki/Dendi_language">Dendi</ExternalLink> and <ExternalLink href="https://en.wikipedia.org/wiki/Fon_language">Fon</ExternalLink>.
        </p>

        <div className="mt-8">
          <p className={styles.text}>
            Here's a moment from 2022 that captures a personal practice important to me:
          </p>
          <figure className="flex flex-col items-center mt-4">
            <Image
              src="/images/alim_praying.png"
              alt="A moment of reflection"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
            <figcaption className="text-center mt-2 text-sm text-gray-500">A moment of reflection</figcaption>
          </figure>
        </div>

        <footer className="mt-8 pt-4 border-t border-gray-300">
          <p className={`${styles.text} text-sm italic`}>
            Note: My legal name is Alimoudine Idrissou.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default AboutPage

"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useDarkMode } from "@/context/DarkModeContext";

const AboutPage: React.FC = () => {
  const { darkMode } = useDarkMode();

  const containerStyles = `max-w-4xl mx-auto p-8 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
    }`;
  const textStyles = `text-lg mb-4 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"
    }`;
  const headingStyles = `text-3xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"
    }`;
  const subheadingStyles = `text-xl font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"
    }`;
  const linkStyles = `inline-flex items-center ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
    } font-semibold transition-colors duration-300`;
  const imageContainerStyles = "flex justify-center items-center mb-4";

  return (
    <>
      <Head>
        <title>Formal Biography</title>
        <meta
          name="description"
          content="Learn about my journey, expertise, and passions beyond coding."
        />
      </Head>
      <div className={`px-6 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
        <div className={containerStyles}>

          <section className="mt-8 max-w-3xl mx-auto">
            <h1 className={`${headingStyles} text-3xl font-bold mb-6`}> Numbers and Code</h1>

            <article className="space-y-6">
              <p className={textStyles}>
                Hi I'm Alim Idrissou. From a young age, mathematics captivated me. This fascination with numbers and problem-solving led me to seek practical applications after high school. In 2017, I discovered Operations Research, a pivotal moment that guided me to the National School of Applied Economics and Management, where I pursued Planning Science.
              </p>


              <p className={textStyles}>
                However, my academic journey took an unexpected turn due to administrative delays. When classes at the National School started late, I found myself with unexpected free time and an eagerness to learn. Not wanting to waste this opportunity, I made a bold decision to enroll simultaneously in the Faculty of Sciences and Technology to study Mathematics Fundamentals.
              </p>

              <p className={textStyles}>
                This decision, born out of a desire to make the most of my time, proved to be transformative. The initial courses in Logic and Set Theory rekindled my passion for mathematics. The depth and rigor of these subjects captivated me so profoundly that I decided to pursue both degrees concurrently. This choice marked a defining moment in my academic journey, setting me on a path that would combine applied and theoretical mathematics .
              </p>

              <p className={textStyles}>
                Balancing two demanding fields taught me the invaluable lesson of in time management, perseverance, teamwork. Without the collaborative efforts and support of my peers, earning my Bachelor's in Mathematics would have been insurmountable. This experience underscored the power of cooperation and mutual support.
              </p>

              <h2 className={`${headingStyles} text-2xl font-semibold mt-8 mb-4`}>From Theory to Practice</h2>

              <p className={textStyles}>
                After my second year, I embraced the opportunity to teach mathematics to first-year high school students. This first foray into professional teaching proved incredibly rewarding, allowing me to manage a classroom and engage with students who felt like younger siblings.
              </p>

              <p className={textStyles}>
                Upon completing my degrees, I was awarded a Master's scholarship in Digital Finance in Senegal in 2021. This opportunity allowed me to explore the practical applications of technology in finance, coinciding with the mobile payment revolution in West Africa.
              </p>

              <h2 className={`${headingStyles} text-2xl font-semibold mt-8 mb-4`}>Embracing Software Engineering</h2>

              <p className={textStyles}>
                My career took another significant turn when I encountered the <a href="https://01-edu.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">01 Edu System</a>, an innovative curriculum in software engineering and programming. Despite my extensive academic background, this program offered a unique opportunity to hone practical skills and delve deeper into technology.
              </p>

              <p className={textStyles}>
                Through 01 Edu, I developed proficiency in Golang, Python, Rust, and JavaScript. Each language presented unique challenges and rewards, broadening my perspective on technology's potential.
              </p>
              <p className={textStyles}>
                Since 2022, I've been actively involved in two volunteer projects:
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li className={textStyles}>
                  <a href="https://e-smartraining.org/en/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">E-smart training</a>: Applying my skills to real-world problems and helping others learn through technology.
                </li>
                <li className={textStyles}>
                  <a href="https://rjbdbenindiaspo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">RJBD</a>: Contributing to initiatives that connect and support the Beninese diaspora community.
                </li>
              </ul>

              <p className={textStyles}>
                These volunteer experiences have not only allowed me to give back to the community but have also enriched my understanding of how technology can be leveraged for social impact.
              </p>

              <h2 className={`${headingStyles} text-2xl font-semibold mt-8 mb-4`}>Balancing Technical and Personal Growth</h2>

              <p className={textStyles}>
                To complement my technical pursuits, I embrace endurance sports like running, and team sports such as football and basketball. I also enjoy strategic video games like PES, FIFA, and Dream League on mobile  ...
              </p>

              <p className={textStyles}>
                As a software engineer, I remain committed to continuous learning. My diverse academic background, coupled with practical training, has equipped me well for future challenges. I'm eager to contribute to innovative projects and collaborate with like-minded individuals passionate about leveraging technology to solve real-world problems.
              </p>

              <p className={textStyles}>
                While English isn't my first language, I'm a native speaker of <a href="https://foodoabee.com/en/linguistics/an-overview-of-foodo-2009" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Foodo</a> and French. I'm also fluent in African languages such as <a href="https://en.wikipedia.org/wiki/Dendi_language" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Dendi</a> and <a href="https://en.wikipedia.org/wiki/Fon_language" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Fon</a>, with some knowledge of <a href="https://en.wikipedia.org/wiki/Wolof_language" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Wolof</a>.
              </p>
            </article>
         
          </section>
          <section className="mt-12">
            <p className={textStyles}>
              I also enjoy engaging in activities that help me relax and rejuvenate. (Pray or Read). Me in 2022 .
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className={imageContainerStyles}>
                <Image
                  src="/images/alim_footing.jpeg"
                  alt="Alim after a run"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md"
                  priority
                />
              </div>
              <div className={imageContainerStyles}>
                <Image
                  src="/images/alim_praying.png"
                  alt="Alim praying"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md"
                  priority
                />
              </div>
            </div>
          </section>

          <footer className="mt-12 pt-4 border-t border-gray-300">
            <p className={`${textStyles} text-sm text-gray-200 italic`}>
              Note: My legal name is Alimoudine Idrissou.
            </p>
          </footer>
         
        </div>
      </div>
    </>
  );
};

export default AboutPage;

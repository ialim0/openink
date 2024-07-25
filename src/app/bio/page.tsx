"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useDarkMode } from "@/context/DarkModeContext";

const AboutPage: React.FC = () => {
  const { darkMode } = useDarkMode();

  const styles = {
    container: `max-w-4xl mx-auto p-8 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`,
    text: `text-lg mb-4 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"
      }`,
    heading: `text-3xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"
      }`,
    subheading: `text-2xl font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"
      }`,
    link: `inline-flex items-center ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
      } font-semibold transition-colors duration-300`,
    imageContainer: "flex justify-center items-center mb-4",
  };

  const Biography = () => (
    <section className="mt-8 max-w-3xl mx-auto">
      <article className="space-y-6">
        <p className={styles.text}>
          Hi, I'm Alim Idrissou. My passion for mathematics led me to study Planning Science and Mathematics Fundamentals concurrently at university for my Bachelor's degrees. This dual focus taught me valuable lessons in time management and teamwork.
        </p>


        <p className={styles.text}>
          I had the opportunity to teach mathematics, which I found incredibly rewarding. After completing my degrees, I received a Master's scholarship in Digital Finance in Senegal, where I explored the practical applications of technology in finance.
        </p>

        <p className={styles.text}>
          My career took a significant turn when I joined the <a href="https://01-edu.org/" target="_blank" rel="noopener noreferrer" className={styles.link}>01 Edu System</a>, where I developed proficiency in Golang, Python, Rust, and JavaScript.
        </p>
        <p className={styles.text}>
          I've had the chance to work on projects with teams from the US, France, and Australia as remote engineers . While I'm still learning, this experience has introduced me to different aspects of AI, from basic machine learning concepts to how AI integrates with other systems.
        </p>
        <p className={styles.text}>
          These projects have been challenging but rewarding. They've pushed me to improve my technical skills and taught me how to communicate better with people from different backgrounds. I'm grateful for these opportunities and am excited to continue learning and growing in this field.
        </p>


        <p className={styles.text}>
          Since 2022, I've been volunteering with two projects:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li className={styles.text}>
            <a href="https://e-smartraining.org/en/" target="_blank" rel="noopener noreferrer" className={styles.link}>E-smart training</a>: Applying technology to solve real-world problems and facilitate learning.
          </li>
          <li className={styles.text}>
            <a href="https://rjbdbenindiaspo.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>RJBD</a>: Supporting initiatives for the Beninese diaspora community.
          </li>
        </ul>


        <p className={styles.text}>
          I enjoy running, playing football and basketball, and playing strategic video games like PES and FIFA. I am committed to continuous learning and eager to contribute to innovative projects.
        </p>

        <p className={styles.text}>
          While English isn't my first language, I'm a native speaker of <a href="https://foodoabee.com/en/linguistics/an-overview-of-foodo-2009" target="_blank" rel="noopener noreferrer" className={styles.link}>Foodo</a> and French. I'm also fluent in African languages such as <a href="https://en.wikipedia.org/wiki/Dendi_language" target="_blank" rel="noopener noreferrer" className={styles.link}>Dendi</a> and <a href="https://en.wikipedia.org/wiki/Fon_language" target="_blank" rel="noopener noreferrer" className={styles.link}>Fon</a>, with some knowledge of <a href="https://en.wikipedia.org/wiki/Wolof_language" target="_blank" rel="noopener noreferrer" className={styles.link}>Wolof</a>.
        </p>
      </article>
    </section>
  );


  const PersonalInterests = () => (
    <section className="mt-12">
      <p className={styles.text}>
        I also enjoy engaging in activities that help me relax and rejuvenate, such as praying or reading. Here is a moment of reflection from 2022:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ImageWithCaption src="/images/alim_praying.png" alt="Alim praying" caption="A moment of reflection" />
      </div>
    </section>
  );

  const ImageWithCaption = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <figure className={styles.imageContainer}>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={200}
        className="rounded-lg shadow-md"
        priority
      />
      <figcaption className="text-center mt-2 text-sm text-gray-500">{caption}</figcaption>
    </figure>
  );

  return (
    <>
      <Head>
        <title>Alim Idrissou - Biography</title>
        <meta
          name="description"
          content="Learn about Alim Idrissou's journey, expertise, and passions beyond coding."
        />
      </Head>
      <div className={`px-6 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
        <div className={styles.container}>
          <Biography />
          <PersonalInterests />
          <footer className="mt-12 pt-4 border-t border-gray-300">
            <p className={`${styles.text} text-sm italic`}>
              Note: My legal name is Alimoudine Idrissou.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
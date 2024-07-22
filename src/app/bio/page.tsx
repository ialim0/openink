"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useDarkMode } from "@/context/DarkModeContext";

const AboutPage: React.FC = () => {
  const { darkMode } = useDarkMode();

  const styles = {
    container: `max-w-4xl mx-auto p-8 rounded-lg shadow-md ${
      darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
    }`,
    text: `text-lg mb-4 leading-relaxed ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`,
    heading: `text-3xl font-bold mb-6 ${
      darkMode ? "text-gray-100" : "text-gray-900"
    }`,
    subheading: `text-2xl font-semibold mb-4 ${
      darkMode ? "text-gray-200" : "text-gray-800"
    }`,
    link: `inline-flex items-center ${
      darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
    } font-semibold transition-colors duration-300`,
    imageContainer: "flex justify-center items-center mb-4",
  };

  const Biography = () => (
    <section className="mt-8 max-w-3xl mx-auto">
    <h1 className={styles.heading}>Numbers and Code</h1>

    <article className="space-y-6">
      <p className={styles.text}>
        Hi, I'm Alim Idrissou. From a young age, mathematics captivated me. This fascination with numbers and problem-solving led me to seek practical applications after high school. In 2017, I discovered Operations Research, a pivotal moment that guided me to the National School of Applied Economics and Management, where I pursued Planning Science.
      </p>

      <p className={styles.text}>
        However, my academic journey took an unexpected turn due to administrative delays. When classes at the National School started late, I found myself with unexpected free time and an eagerness to learn. Not wanting to waste this opportunity, I made a bold decision to enroll simultaneously in the Faculty of Sciences and Technology to study Mathematics Fundamentals.
      </p>

      <p className={styles.text}>
        This decision, born out of a desire to make the most of my time, proved to be transformative. The initial courses in Logic and Set Theory rekindled my passion for mathematics. The depth and rigor of these subjects captivated me so profoundly that I decided to pursue both degrees concurrently. This choice marked a defining moment in my academic journey, setting me on a path that would combine applied and theoretical mathematics.
      </p>

      <p className={styles.text}>
        Balancing two demanding fields taught me the invaluable lessons of time management, perseverance, and teamwork. Without the collaborative efforts and support of my peers, earning my Bachelor's in Mathematics would have been insurmountable. This experience underscored the power of cooperation and mutual support.
      </p>

      <h2 className={styles.subheading}>From Theory to Practice</h2>

      <p className={styles.text}>
        After my second year, I embraced the opportunity to teach mathematics to first-year high school students. This first foray into professional teaching proved incredibly rewarding, allowing me to manage a classroom and engage with students who felt like younger siblings.
      </p>

      <p className={styles.text}>
        Upon completing my degrees, I was awarded a Master's scholarship in Digital Finance in Senegal in 2021. This opportunity allowed me to explore the practical applications of technology in finance, coinciding with the mobile payment revolution in West Africa.
      </p>

      <h2 className={styles.subheading}>Embracing Software Engineering</h2>

      <p className={styles.text}>
        My career took another significant turn when I encountered the <a href="https://01-edu.org/" target="_blank" rel="noopener noreferrer" className={styles.link}>01 Edu System</a>, an innovative curriculum in software engineering and programming. Despite my extensive academic background, this program offered a unique opportunity to hone practical skills and delve deeper into technology.
      </p>

      <p className={styles.text}>
        Through 01 Edu, I developed proficiency in Golang, Python, Rust, and JavaScript. Each language presented unique challenges and rewards, broadening my perspective on technology's potential.
      </p>
      <p className={styles.text}>
        Since 2022, I've been actively involved in two volunteer projects:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li className={styles.text}>
          <a href="https://e-smartraining.org/en/" target="_blank" rel="noopener noreferrer" className={styles.link}>E-smart training</a>: Applying my skills to real-world problems and helping others learn through technology.
        </li>
        <li className={styles.text}>
          <a href="https://rjbdbenindiaspo.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>RJBD</a>: Contributing to initiatives that connect and support the Beninese diaspora community.
        </li>
      </ul>

      <p className={styles.text}>
        These volunteer experiences have not only allowed me to give back to the community but have also enriched my understanding of how technology can be leveraged for social impact.
      </p>

      <h2 className={styles.subheading}>Balancing Technical and Personal Growth</h2>

      <p className={styles.text}>
        To complement my technical pursuits, I embrace endurance sports like running, and team sports such as football and basketball. I also enjoy strategic video games like PES, FIFA, and Dream League on mobile.
      </p>

      <p className={styles.text}>
        As a software engineer, I remain committed to continuous learning. My diverse academic background, coupled with practical training, has equipped me well for future challenges. I'm eager to contribute to innovative projects and collaborate with like-minded individuals passionate about leveraging technology to solve real-world problems.
      </p>

      <p className={styles.text}>
        While English isn't my first language, I'm a native speaker of <a href="https://foodoabee.com/en/linguistics/an-overview-of-foodo-2009" target="_blank" rel="noopener noreferrer" className={styles.link}>Foodo</a> and French. I'm also fluent in African languages such as <a href="https://en.wikipedia.org/wiki/Dendi_language" target="_blank" rel="noopener noreferrer" className={styles.link}>Dendi</a> and <a href="https://en.wikipedia.org/wiki/Fon_language" target="_blank" rel="noopener noreferrer" className={styles.link}>Fon</a>, with some knowledge of <a href="https://en.wikipedia.org/wiki/Wolof_language" target="_blank" rel="noopener noreferrer" className={styles.link}>Wolof</a>.
      </p>
    </article>
  </section>
  );

  const VolunteerProjects = () => (
    <section className="mt-8">
      <h2 className={styles.subheading}>Volunteer Projects</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li className={styles.text}>
          <a href="https://e-smartraining.org/en/" target="_blank" rel="noopener noreferrer" className={styles.link}>E-smart training</a>: Applying my skills to real-world problems and helping others learn through technology.
        </li>
        <li className={styles.text}>
          <a href="https://rjbdbenindiaspo.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>RJBD</a>: Contributing to initiatives that connect and support the Beninese diaspora community.
        </li>
      </ul>
    </section>
  );

  const PersonalInterests = () => (
    <section className="mt-12">
      <h2 className={styles.subheading}>Personal Interests</h2>
      <p className={styles.text}>
        I also enjoy engaging in activities that help me relax and rejuvenate. (Pray or Read). Me in 2022:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ImageWithCaption src="/images/alim_footing.jpeg" alt="Alim after a run" caption="After a refreshing run" />
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
        <title>Alim Idrissou - Formal Biography</title>
        <meta
          name="description"
          content="Learn about Alim Idrissou's journey, expertise, and passions beyond coding."
        />
      </Head>
      <div className={`px-6 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
        <div className={styles.container}>
          <Biography />
          <VolunteerProjects />
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
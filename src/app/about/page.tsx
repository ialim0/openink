
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
        <title>About Me - My Journey and Expertise</title>
        <meta
          name="description"
          content="Learn about my journey, expertise, and passions beyond coding."
        />
      </Head>
      <div className={`px-6 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
        <div className={containerStyles}>

          <section className="mt-8">
            <h1 className={headingStyles}>Bio</h1>
            <article>
              <p className={textStyles}>
                As a child, I found myself drawn to mathematics. This interest led me down an unexpected path - at 19, I had the opportunity to teach high school math. It was challenging, but I learned so much from my students.
              </p>
              <p className={textStyles}>
                Over time, I began to wonder if there were ways to apply mathematical thinking to larger problems. Seeking to deepen my understanding, two B.Sc. degrees - one in Mathematics and Computer Science, another in Planning Sciences - followed by an M.Sc. in Digital Finance. These studies gave me a strong theoretical foundation, but I felt there was still more to learn about practical application in the tech industry.

              </p>
              <p className={textStyles}>
                That's when I discovered the <a href="https://01-edu.org/" target="_blank" rel="noopener noreferrer">01 Edu System</a>, an innovative curriculum in software engineering and programming. Despite my academic background, I embraced this opportunity to enhance my practical skills.
              </p>
              <p className={textStyles}>
                The 01 Edu System's approach was unlike anything I'd experienced before. It offered a collective and co-creative learning process in a professional environment. This industry-leading program opened my eyes to the practical skills needed in the digital world and technology industry. It was challenging, but it ignited a new passion for software engineering that continues to drive me today.
              </p>
              <p className={textStyles}>
              Through 01 Edu, I honed my skills in Golang, Python, Rust, and JavaScript. Each language presented unique challenges and rewards, expanding my perspective on technology's potential.
              </p>
              <p className={textStyles}>
              Balancing technical growth with personal development, I embraced endurance sports like marathon running, and team sports such as football and basketball. These pursuits taught me invaluable lessons in perseverance and teamwork. For mental agility, I enjoy strategic video games like PES and FIFA, which sharpen my decision-making and reflexes.
              </p>
              <p className={textStyles}>
              As a software engineer, I remain committed to continuous learning. My diverse academic background, coupled with 01 Edu's practical training, has equipped me well for the challenges ahead. I'm eager to contribute to innovative projects and collaborate with others who share my passion for leveraging technology to solve real-world problems.
              </p>
              <p className={textStyles}>
              This journey has been full of surprises and challenges, and I'm sure there are many more ahead. But thanks to the strong foundation I've received, I'm excited to face them, one line of code at a time.
              </p>
          
            </article>
          </section>
          <section className="mt-12">
            <h2 className={headingStyles}>When I'm not coding</h2>
            <p className={textStyles}>
              When I'm not coding, I enjoy engaging in activities that help me relax and rejuvenate. Here are some glimpses of my life outside of coding (2022)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className={imageContainerStyles}>
                <Image
                  src="/images/alimoudine_footing.jpeg"
                  alt="Alimoudine after a run"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md"
                  priority
                />
              </div>
              <div className={imageContainerStyles}>
                <Image
                  src="/images/alimoudine_praying.jpeg"
                  alt="Alimoudine praying"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md"
                  priority
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

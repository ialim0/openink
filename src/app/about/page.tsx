import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const containerStyles = 'bg-white p-8 rounded-lg shadow-lg mt-6';
const textStyles = 'text-base mb-4 leading-relaxed';
const headingStyles = 'text-2xl font-semibold mb-6';
const linkStyles = 'text-blue-600 hover:text-blue-800 transition-colors duration-300 flex justify-center';

const AboutPage: React.FC = () => {
  return (
    <div className="px-6 py-8">
      <div className={containerStyles}>
        <Link className={linkStyles} href="/" passHref>
          Go Back to Home
        </Link>
        <h3 className={headingStyles}>Bio</h3>
        <p className={textStyles}>
          My journey began with a deep interest in mathematics that led me to start teaching high school math at the young age
          of 19. While I enjoyed sharing knowledge, I realized I wanted a broader platform to tackle complex challenges and make
          a meaningful impact.
        </p>
        <p className={textStyles}>
          Driven by this desire, I discovered the power of technology and transitioned into software engineering, leveraging my
          analytical skills and eagerness to learn. I have since gained proficiency in languages like Golang, Rust, Solidity,
          Python, and React, allowing me to contribute to creating innovative solutions.
        </p>
        <p className={textStyles}>
          My academic background with an M.Sc. in Digital Finance and a B.Sc. in Mathematics Fundamentals has provided me with a
          solid theoretical foundation to support my technical skills.
        </p>
        <p className={textStyles}>
          Beyond technical abilities, my experiences with endurance activities like marathon running, football (soccer), and
          basketball have instilled in me the importance of collaboration, perseverance, and a strong work ethic. I also enjoy
          friendly competition through video games like PES or FIFA as a way to unwind.
        </p>
        <p className={textStyles}>
          While I am still learning and growing, I believe that my combination of technical knowledge, problem-solving mindset,
          and commitment to teamwork can be an asset to any team. I am driven by a desire to continuously improve and contribute
          to delivering impactful results.
        </p>
      </div>
      <div className={containerStyles}>
        <h3 className={headingStyles}>When I'm not coding</h3>
        <p className="text-base leading-relaxed">
          When I'm not coding, I enjoy engaging in activities that help me relax and rejuvenate. Here are some glimpses of my
          life outside of coding:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex justify-center">
            <Image
              src="/images/alimoudine_footing.jpeg"
              alt="Alimoudine after a run"
              width={300}
              height={150}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/alimoudine_praying.jpeg"
              alt="Alimoudine praying"
              width={300}
              height={150}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

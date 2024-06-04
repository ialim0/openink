import React from "react";
import Image from "next/image";
import Link from "next/link";

const containerStyles = "bg-white p-8 rounded-lg shadow-lg mt-6";
const textStyles = "text-base mb-4 leading-relaxed";
const headingStyles = "text-2xl font-semibold mb-6";
const linkStyles = " text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 flex justify-center items-center";


const AboutPage: React.FC = () => {
  return (
    <div className="px-6 py-8">
      <div className={containerStyles}>
        <Link className={linkStyles} href="/" passHref>
          Go Back to Home
        </Link>
        <h3 className={headingStyles}>Bio</h3>
        <p className={textStyles}>
          My journey began at a young age, when I discovered a deep fascination
          with numbers and patterns. As a child, I would spend hours solving
          complex math problems, captivated by the elegance and logic of the
          discipline. This passion only grew stronger as I progressed through
          school, and by the time I was 19, I had already begun sharing my
          knowledge with others as a high school math teacher.
        </p>
        <p className={textStyles}>
          While I found great joy in helping students unlock the mysteries of
          mathematics, I soon realized that I wanted to apply my analytical
          skills to tackle challenges on a much broader scale. It was then that
          I discovered the transformative power of technology, and I knew that I
          had to be a part of this revolution.
        </p>
        <p className={textStyles}>
          I dove headfirst into the world of software engineering, driven by an
          insatiable curiosity and a desire to learn. I mastered a diverse array
          of programming languages, from the elegant simplicity of Golang to the
          raw power of Rust and Solidity. I also honed my skills in the
          versatile Python and the dynamic React framework, allowing me to
          contribute to a wide range of innovative projects.
        </p>
        <p className={textStyles}>
          My academic background, which includes an M.Sc. in Digital Finance and
          a B.Sc. in Mathematics Fundamentals, has provided me with a solid
          theoretical foundation to support my technical prowess. But I believe
          that true excellence comes not just from knowledge, but from the
          ability to apply it in creative and unexpected ways.
        </p>
        <p className={textStyles}>
          To that end, I have sought out experiences that challenge me both
          physically and mentally. I have pushed my limits through endurance
          activities like marathon running, football (soccer), and basketball,
          learning the value of teamwork, perseverance, and a strong work ethic.
          I also enjoy friendly competition through video games like PES or
          FIFA, where I can put my strategic thinking and quick reflexes to the
          test.
        </p>
        <p className={textStyles}>
          As I continue on my journey, I am driven by a desire to make a
          meaningful impact on the world around me. I believe that my
          combination of technical knowledge, problem-solving mindset, and
          commitment to teamwork can be a powerful asset to any organization. I
          am always eager to learn and grow, to tackle new challenges, and to
          push the boundaries of what is possible.
        </p>
        <p className={textStyles}>
          So if you're curious to learn more about my story, to explore the
          depths of my technical expertise, or to discover how I might be able
          to contribute to your team, I invite you to dive deeper. Let's embark
          on an adventure together, and see what amazing things we can create.
        </p>
      </div>
      <div className={containerStyles}>
        <h3 className={headingStyles}>When I'm not coding</h3>
        <p className="text-base leading-relaxed">
          When I'm not coding, I enjoy engaging in activities that help me relax
          and rejuvenate. Here are some glimpses of my life outside of coding:
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

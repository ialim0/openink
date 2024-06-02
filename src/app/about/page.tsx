import React from 'react';

const AboutPage: React.FC = () => {

  return (

    <div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">Bio</h3>
        <p className="text-sm">

          I'm a software developer with a passion for building innovative solutions using Golang, Rust, Solidity, and Next.js. I thrive on tackling complex problems and continuously learning new technologies. My background in mathematics honed my communication and patience, crucial for explaining complex technical concepts. My insatiable curiosity and willingness to push boundaries fuels my drive to create groundbreaking solutions.
        </p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">When I'm not coding</h3>
        <p className="text-sm">
          When I'm not coding, you can find me exploring new hiking trails, reading science fiction novels, or trying out new recipes in the kitchen.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

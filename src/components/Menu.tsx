"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBrain, FaRobot, FaMicrochip, FaHome, FaBlog, FaUser, FaProjectDiagram, FaMoon, FaSun, FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';

interface Quote {
    quote: string;
    author: string;
}

const aiQuotes: Quote[] = [
    {
        quote: "The development of full artificial intelligence could spell the end of the human race.",
        author: "Stephen Hawking",
    },
    {
        quote: "AI is likely to be either the best or worst thing to happen to humanity.",
        author: "Elon Musk",
    },
    {
        quote: "The pace of progress in artificial intelligence is incredibly fast.",
        author: "Satya Nadella",
    },
    {
        quote: "Artificial intelligence will reach human levels by around 2029.",
        author: "Ray Kurzweil",
    },
    {
        quote: "The key to artificial intelligence has always been the representation.",
        author: "Jeff Hawkins",
    },
];

const Menu: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [currentQuote, setCurrentQuote] = useState<Quote>(aiQuotes[0]);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * aiQuotes.length);
            setCurrentQuote(aiQuotes[randomIndex]);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const isActive = (path: string) => pathname === path;

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
            

            <main className="container mx-auto px-6 py-8">
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
                            <Image
                                src="/images/profile.png"
                                alt="Alimoudine IDRISSOU"
                                width={256}
                                height={256}
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">Alimoudine IDRISSOU</h1>
                            <p className="text-xl text-blue-500 mb-4">AI & Machine Learning Specialist</p>
                            <p className="text-lg max-w-2xl">
                                Pioneering the future of AI and transforming industries through innovative solutions.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">AI & Tech Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FaRobot className="mr-2 text-blue-500" />
                                AI & ML Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Neural Networks'].map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FaMicrochip className="mr-2 text-blue-500" />
                                Tools & Frameworks
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI Gym', 'Keras'].map((tool) => (
                                    <span key={tool} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Education</h2>
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold">Ph.D. in Artificial Intelligence</h3>
                                <p className="text-lg text-blue-500">Stanford University</p>
                                <p className="text-md text-gray-500">2018 - 2022</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">M.S. in Computer Science</h3>
                                <p className="text-lg text-blue-500">Massachusetts Institute of Technology</p>
                                <p className="text-md text-gray-500">2016 - 2018</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">B.S. in Computer Engineering</h3>
                                <p className="text-lg text-blue-500">University of California, Berkeley</p>
                                <p className="text-md text-gray-500">2012 - 2016</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">AI Quote of the Moment</h2>
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <p className="text-xl">{currentQuote.quote}</p>
                        <p className="text-lg text-gray-500 mt-2">- {currentQuote.author}</p>
                    </div>
                </section>
            </main>

            <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} py-8`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <h3 className="text-lg font-semibold">Connect with me</h3>
                            <div className="flex space-x-4 mt-4">
                                <a href="https://www.linkedin.com/in/alimoudine-idrissou/" className="text-blue-500 hover:text-blue-700">
                                    <FaLinkedin className="text-2xl" />
                                </a>
                                <a href="https://github.com/alimoudine-idrissou" className="text-gray-700 hover:text-gray-900">
                                    <FaGithub className="text-2xl" />
                                </a>
                                <a href="https://twitter.com/alimoudine_i" className="text-blue-400 hover:text-blue-600">
                                    <FaTwitter className="text-2xl" />
                                </a>
                                <a href="mailto:alimoudine.idrissou@gmail.com" className="text-red-500 hover:text-red-700">
                                    <FaEnvelope className="text-2xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 mt-8 pt-8 text-sm text-center">
                        <p>&copy; {new Date().getFullYear()} Alimoudine IDRISSOU. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Menu;
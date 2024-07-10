"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {  FaBrain, FaRobot, FaMicrochip, FaHome, FaBlog, FaUser, FaProjectDiagram, FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '@/context/DarkModeContext';

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
    const [currentQuote, setCurrentQuote] = React.useState<Quote>(aiQuotes[0]);
    const pathname = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * aiQuotes.length);
            setCurrentQuote(aiQuotes[randomIndex]);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
            <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaBrain className="text-blue-500 text-2xl" />
                        <span className="text-xl font-bold">AI Innovator</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {['home', 'blog', 'about', 'projects'].map((link) => (
                            <a
                                key={link}
                                href={link === 'home' ? '/' : `/${link}`}
                                className={`text-sm font-medium ${isActive(`/${link}`) ? 'text-blue-500' : `${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`} transition-colors duration-300`}
                            >
                                {link === 'home' && <FaHome className="inline mr-1" />}
                                {link === 'blog' && <FaBlog className="inline mr-1" />}
                                {link === 'about' && <FaUser className="inline mr-1" />}
                                {link === 'projects' && <FaProjectDiagram className="inline mr-1" />}
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                            </a>
                        ))}
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </div>
            </nav>

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
                    <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((project) => (
                            <div key={project} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-transform duration-300 hover:scale-105`}>
                                <h3 className="text-xl font-semibold mb-2">Project {project}</h3>
                                <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <a href="#" className="text-blue-500 hover:underline">Learn more</a>
                            </div>
                        ))}
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

            <footer className={`bg-gray-200 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="container mx-auto px-6 py-3">
                    <p className="text-sm text-center">
                        &copy; {new Date().getFullYear()} Alimoudine IDRISSOU - All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Menu;

"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaRobot, FaMicrochip, FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaCode, FaSyncAlt, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';
import quotes from '@/app/data/quote';



const Menu: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();



    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const cycleQuote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    };

    const currentQuote = quotes[currentQuoteIndex];

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
                            <h1 className="text-4xl font-bold mb-2">Alimoudine I.</h1>
                            <p className="text-xl text-blue-500 mb-4">Software Engineer (AI)</p>
                            <p className="text-lg max-w-2xl">
                                Dedicated to creating innovative solutions through code. </p>
                        </div>
                    </div>
                </section>
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Interests</h2>
                    <div className="space-y-6">
                        {[
                            {
                                title: "Technologies",
                                icon: <FaRobot />,
                                items: ['AI (Retrieval & Search)', 'Cloud (Deployment)', 'Digital Finance (Crypto)']
                            },
                            {
                                title: "Tools & Frameworks",
                                icon: <FaMicrochip />,
                                items: ['Langchain', 'Vector Databases', 'Transformers', 'Hugging Face Spaces', 'PyTorch', 'Scikit-learn', 'React', 'Next.js', 'FastAPI', 'Flask']
                            },
                            {
                                title: "Programming Languages",
                                icon: <FaCode />,
                                items: ['Python', 'Go', 'Rust', 'JavaScript']
                            }
                        ].map((category, index) => (
                            <div key={index} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                                <h3 className="text-xl font-semibold mb-4 flex items-center">
                                    {React.cloneElement(category.icon, { className: "mr-2 text-blue-500" })}
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((item) => (
                                        <span key={item} className={`px-3 py-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} ${darkMode ? 'text-white' : 'text-gray-800'} rounded-full text-sm transition-colors duration-300 hover:bg-blue-500 hover:text-white`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Education</h2>
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold">M.S. in Digital Finance</h3>
                                <a href="https://esmt.sn/" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500 hover:underline">
                                    Ecole Supérieure Multinationale des Télécommunications, Sénégal
                                </a>
                                <p className="text-md text-gray-500">2021 - 2023</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">B.S. in Mathematics and Computer Science</h3>
                                <a href="https://uac.bj/" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500 hover:underline">
                                    Université Abomey Calavi, Bénin
                                </a>
                                <p className="text-md text-gray-500">2017 - 2021</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">B.S. in Planning Sciences</h3>
                                <a href="https://eneam.uac.bj/" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500 hover:underline">
                                    Ecole Nationale d'Economie Appliquée et de Management, Bénin
                                </a>
                                <p className="text-md text-gray-500">2017 - 2020</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Favorite Quotes</h2>
                    <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg relative overflow-hidden`}>
                        <div className="absolute top-3 right-3">
                            <button
                                onClick={cycleQuote}
                                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                                aria-label="Next quote"
                            >
                                <FaSyncAlt className="w-5 h-5" />
                            </button>
                        </div>
                        <blockquote className="relative">
                            <FaQuoteLeft className={`absolute top-0 left-0 w-6 h-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                            <p className="text-xl mt-8 mb-6 mx-8 italic">{currentQuote.quote}</p>
                            <footer className="text-right mr-8">
                                <cite className="text-lg text-gray-500 not-italic">— {currentQuote.author}</cite>
                            </footer>
                            <FaQuoteRight className={`absolute bottom-0 right-0 w-6 h-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                        </blockquote>
                    </div>
                </section>
            </main>
            <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} py-12`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                            <div className="flex space-x-6">
                                <a href="https://www.linkedin.com/in/ialim" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                                    <FaLinkedin className="text-3xl" />
                                </a>
                                <a href="https://github.com/ialim0" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors duration-300`}>
                                    <FaGithub className="text-3xl" />
                                </a>
                                <a href="https://twitter.com/ialim0" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors duration-300">
                                    <FaTwitter className="text-3xl" />
                                </a>
                                <a href="mailto:i.alim0229@gmail.com" className="text-red-500 hover:text-red-700 transition-colors duration-300">
                                    <FaEnvelope className="text-3xl" />
                                </a>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-sm mb-2">Alimoudine I.</p>
                            <p className="text-xs">Software Engineer | AI Enthusiast</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-500 mt-8 pt-8 text-sm text-center">
                        <p>&copy; {new Date().getFullYear()} Alimoudine I. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Menu;
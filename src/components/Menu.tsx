'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaTimes, FaBars, FaEnvelope, FaCode, FaTools, FaLanguage, FaGithub, FaLinkedin, FaMapMarkerAlt, FaBrain, FaRobot, FaMicrochip } from "react-icons/fa";

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
    const [showMenu, setShowMenu] = useState(false);
    const [currentQuote, setCurrentQuote] = useState<Quote>(aiQuotes[0]);
    const pathname = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * aiQuotes.length);
            setCurrentQuote(aiQuotes[randomIndex]);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 font-sans">
            <nav className="p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaBrain className="text-blue-400 text-2xl" />
                        <span className="text-xl font-bold">AI Innovator</span>
                    </div>
                    <ul className="hidden md:flex space-x-8">
                        {["about", "blog", "projects"].map((link) => (
                            <li key={link}>
                                <Link     className={`text-lg font-semibold transition-colors duration-300 ${
                                            isActive(`/${link}`)
                                                ? "text-blue-400 border-b-2 border-blue-400"
                                                : "text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        }`} href={`/${link}`} passHref>
                                
                                        {link.charAt(0).toUpperCase() + link.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`text-gray-300 hover:text-blue-400 focus:outline-none md:hidden ${showMenu ? "open" : ""}`}
                        onClick={toggleMenu}
                        aria-label={showMenu ? "Close menu" : "Open menu"}
                    >
                        {showMenu ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            <div className={`flex-grow overflow-y-auto ${showMenu ? 'block' : 'hidden'} md:block`}>
                <div className="p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-6 mx-4">
                    <blockquote className="italic text-blue-300">
                        &ldquo;{currentQuote.quote}&rdquo;
                        <span className="ml-2 font-semibold text-gray-300">- {currentQuote.author}</span>
                    </blockquote>
                </div>

                <div className="flex flex-col items-center p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-6 mx-4">
                    <div className="w-40 h-40 overflow-hidden rounded-full mb-4 border-4 border-blue-400">
                        <Image
                            src="/images/profile.png"
                            alt="Profile Image"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-blue-400">Alimoudine IDRISSOU</h2>
                        <p className="text-sm text-gray-300">AI & Machine Learning Specialist</p>
                        <p className="text-sm mt-2 text-gray-400">
                            Pioneering the future of AI and transforming industries through innovative solutions.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-6 mx-4">
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">AI & Tech Expertise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center text-gray-200">
                                <FaRobot className="mr-2 text-blue-400" />
                                AI & ML Technologies
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                <li>Deep Learning</li>
                                <li>Natural Language Processing</li>
                                <li>Computer Vision</li>
                                <li>Reinforcement Learning</li>
                                <li>Neural Networks</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center text-gray-200">
                                <FaMicrochip className="mr-2 text-blue-400" />
                                Tools & Frameworks
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                <li>TensorFlow</li>
                                <li>PyTorch</li>
                                <li>Scikit-learn</li>
                                <li>OpenAI Gym</li>
                                <li>Keras</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mx-4">
                    <div className="p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Language Proficiency</h3>
                        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center text-gray-200">
                                <FaLanguage className="mr-2 text-blue-400" />
                                Languages
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                <li>English - Fluent</li>
                                <li>French - Native</li>
                                <li>Foodo - Native</li>
                                <li>Fon - Fluent</li>
                                <li>Dendi - Native</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Connect</h3>
                        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                            <ul className="list-none space-y-2">
                                <li className="flex items-center">
                                    <FaEnvelope className="mr-2 text-blue-400" />
                                    <a href="mailto:alimoudine.idrissou@example.com" className="text-sm text-gray-300 hover:text-blue-400">
                                        alimoudine.idrissou@example.com
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaGithub className="mr-2 text-blue-400" />
                                    <a href="https://github.com/ialim" className="text-sm text-gray-300 hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                                        github.com/ialim
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaLinkedin className="mr-2 text-blue-400" />
                                    <a href="https://linkedin.com/in/ialim0" className="text-sm text-gray-300 hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                                        linkedin.com/in/ialim0
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-blue-400" />
                                    <span className="text-sm text-gray-300">Senegal, Dakar</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;

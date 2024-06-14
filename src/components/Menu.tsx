"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaTimes,FaBars } from "react-icons/fa";
import {
    FaEnvelope,
    FaCode,
    FaTools,
    FaLanguage,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
} from "react-icons/fa";

interface Quote {
    quote: string;
    author: string;
}

const quotes: Quote[] = [
    {
        quote: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
    },
    {
        quote: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis",
    },
    {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
    },
    {
        quote: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Unknown",
    },
];

const Menu: React.FC = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
    const pathname = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex]);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex flex-col h-full shadow-lg bg-gray-50 text-gray-800 font-sans">
            <nav className="p-6 bg-white shadow-md">
                <div className="flex justify-between">
                    <ul className="flex space-x-8">
                        {["about", "blog"].map((link) => (
                            <li key={link}>
                                <Link href={`/${link}`} passHref>
                                    <span
                                        className={`text-lg font-semibold transition-colors duration-300 ${isActive(`/${link}`)
                                                ? "text-blue-800 border-b-2 border-blue-800"
                                                : "text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                            }`}
                                    >
                                        {link.charAt(0).toUpperCase() + link.slice(1)}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`text-gray-600 hover:text-gray-800 focus:outline-none md:hidden ${showMenu ? "open" : ""
                            }`}
                        onClick={toggleMenu}
                    >
                      {showMenu ? (
                <FaTimes />
            ) : (
                <FaBars />
            )}
                    </button>
                </div>
            </nav>

            <div className={`flex-grow overflow-y-auto md:block ${showMenu ? 'block' : 'hidden'} md:block`}>
                <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <blockquote className="italic text-gray-600">
                        &ldquo;{currentQuote.quote}&rdquo;
                        <span className="ml-2 font-semibold">- {currentQuote.author}</span>
                    </blockquote>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md mt-6">
                    <div className="w-40 h-40 overflow-hidden rounded mb-4">
                        <Image
                            src="/images/profile.png"
                            alt="Profile Image"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Alimoudine IDRISSOU</h2>
                        <p className="text-sm">Full Stack Developer</p>
                        <p className="text-sm mt-2">
                            Building innovative solutions for the web and beyond.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <h3 className="text-lg font-semibold mb-4">Tech Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center">
                                <FaCode className="mr-2 text-blue-600" />
                                Programming Languages
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Golang</li>
                                <li>Python</li>
                                <li>JavaScript</li>
                                <li>Solidity</li>
                                <li>Rust</li>
                               

                            </ul>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center">
                                <FaTools className="mr-2 text-blue-600" />
                                Frameworks & Tools
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>React</li>
                                <li>Next.js</li>
                                <li>React Native</li>
                                <li>Git</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md mt-6 flex flex-wrap">
                    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                        <h3 className="text-lg font-semibold mb-4">Language Proficiency</h3>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center">
                                <FaLanguage className="mr-2 text-blue-600" />
                                Languages
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>English - Fluent</li>
                                <li>French - Native</li>
                                <li>Foodo - Native</li>
                                <li>Fon - Fluent</li>
                                <li>Dendi - Native</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <ul className="list-none space-y-2">
                                <li className="flex items-center">
                                    <FaEnvelope className="mr-2 text-blue-600" />
                                    <a href="mailto:alimoudine.idrissou@example.com" className="text-sm text-gray-600">
                                        ialim
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaGithub className="mr-2 text-blue-600" />
                                    <a href="https://github.com/ialim" className="text-sm text-gray-600" target="_blank" rel="noopener noreferrer">
                                        ialim
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaLinkedin className="mr-2 text-blue-600" />
                                    <a href="https://linkedin.com/in/ialim0" className="text-sm text-gray-600" target="_blank" rel="noopener noreferrer">
                                        ialim0
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                                    <span className="text-sm text-gray-600">Senegal, Dakar</span>
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

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaCode, FaTools, FaLanguage, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

interface Quote {
    quote: string;
    author: string;
}

const quotes: Quote[] = [
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { quote: "Don&apos;t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "The harder you work for something, the greater you&apos;ll feel when you achieve it.", author: "Unknown" },
];

const Menu: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
    const pathname = usePathname();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex]);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex flex-col h-full shadow-lg bg-gray-50 text-gray-800 font-sans">
            <nav className="p-6 bg-white shadow-md">
                <ul className="flex justify-center space-x-8">
                    {['about', 'blog'].map((link) => (
                        <li key={link}>
                            <Link href={`/${link}`} passHref>
                                <span
                                    className={`text-lg font-semibold transition-colors duration-300 ${isActive(`/${link}`) ? 'text-blue-800 border-b-2 border-blue-800' : 'text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600'
                                        }`}
                                >
                                    {link.charAt(0).toUpperCase() + link.slice(1)}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                <blockquote className="italic text-gray-600">
                    &ldquo;{currentQuote.quote}&rdquo;
                    <span className="ml-2 font-semibold">- {currentQuote.author}</span>
                </blockquote>
            </div>

            <div className="flex-grow">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md mt-6">
                    <div className="w-40 h-40 overflow-hidden rounded mb-4">
                        <Image
                            src="/images/profile.jpg"
                            alt="Profile Image"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Alimoudine IDRISSOU</h2>
                        <p className="text-sm">Full Stack Developer</p>
                        <p className="text-sm mt-2">Building innovative solutions for the web and beyond.</p>
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
                                <li>Rust</li>
                                <li>Python</li>
                                <li>JavaScript</li>
                                <li>Solidity</li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold mb-2 flex items-center">
                                <FaTools className="mr-2 text-blue-600" />
                                Frameworks & Tools
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Next.js</li>
                                <li>React Native</li>
                                <li>Node.js</li>
                                <li>MongoDB</li>
                                <li>Git</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
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
                                <li>Spanish - Intermediate</li>
                                <li>German - Basic</li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md mt-6 mr-6">
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <FaEnvelope className="text-blue-600" />
                                <span className="text-sm">i.alim0229@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <FaMapMarkerAlt className="text-blue-600" />
                                <span className="text-sm">Senegal, Dakar</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <FaGithub className="text-blue-600" />
                                <span className="text-sm"><a href="https://github.com/yourgithubusername">GitHub</a></span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <FaLinkedin className="text-blue-600" />
                                <span className="text-sm"><a href="https://www.linkedin.com/in/yourlinkedinusername">LinkedIn</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;

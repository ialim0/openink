"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Quote {
    quote: string;
    author: string;
}

const quotes: Quote[] = [
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
];

const Menu: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex]);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full bg-gray-50 shadow-lg">
            <nav className="p-6 border-b border-gray-200 bg-white">
                <ul className="flex justify-center space-x-8">
                    <li>
                        <Link href="/about">
                            <span className="text-lg font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600">About</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog">
                            <span className="text-lg font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600">Blog</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex-grow">
                <div className="flex flex-col items-center p-6 border-b border-gray-200 bg-white">
                    <div className="w-40 h-40 overflow-hidden rounded-full mb-4">
                        <Image
                            src="/images/profile.jpg"
                            alt="Profile Image"
                            width={200}
                            height={200}
                            className="rounded-full"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Alimoudine IDRISSOU</h2>
                        <p className="text-sm text-gray-600">Full Stack Developer</p>
                    </div>
                </div>
                <div className="p-6 border-b border-gray-200 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800">Contact Info</h3>
                    <p className="text-sm text-gray-600 mt-2">Email: i.alim0229@gmail.com</p>
                    {/* <p className="text-sm text-gray-600">Phone: +123456789</p> */}
                </div>
                <div className="p-6 border-b border-gray-200 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tech Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Programming Languages</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Go (Golang)</li>
                                <li>Solidity</li>
                                <li>Rust</li>
                                <li>Python</li>
                                <li>JavaScript</li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Frameworks & Tools</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Next.js</li>
                                <li>React Native</li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-100">
                <blockquote className="italic text-gray-600">
                    &ldquo;{currentQuote.quote}&rdquo;
                    <span className="ml-2 font-semibold">- {currentQuote.author}</span>
                </blockquote>
            </div>
        </div>
    );
};

export default Menu;

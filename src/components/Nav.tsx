import React, { useState } from 'react';
import Link from 'next/link';
import { FaBrain, FaHome, FaBlog, FaUser, FaProjectDiagram, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useDarkMode } from '@/context/DarkModeContext';
import { usePathname } from 'next/navigation';

interface NavProps {
    toggleMenu: () => void;
    menuOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ toggleMenu, menuOpen }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <FaBrain className="text-blue-500 text-2xl" />
                    <span className="text-xl font-bold">AI Innovator</span>
                </div>
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        onClick={toggleMenu}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <div className={`flex-col md:flex-row md:flex md:items-center space-y-4 md:space-y-0 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
                    {['home', 'blog', 'about', 'projects'].map((link) => (
                        <Link
                            key={link}
                            href={link === 'home' ? '/' : `/${link}`}
                            className={`text-sm font-medium ${isActive(`/${link}`) ? 'text-blue-500' : `${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`} transition-colors duration-300`}
                        >
                            {link === 'home' && <FaHome className="inline mr-1" />}
                            {link === 'blog' && <FaBlog className="inline mr-1" />}
                            {link === 'about' && <FaUser className="inline mr-1" />}
                            {link === 'projects' && <FaProjectDiagram className="inline mr-1" />}
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                        </Link>
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
    );
};

export default Nav;

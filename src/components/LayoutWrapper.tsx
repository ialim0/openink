"use client"
import React, { useState, useCallback } from 'react';
import { DarkModeProvider, useDarkMode } from '@/context/DarkModeContext';
import Menu from './Menu';
import { FaBars, FaTimes, FaCode, FaHome, FaUser, FaMoon, FaSun, FaComments } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const isActive = (path: string) => pathname === path;

  const handleLinkClick = useCallback((href: string) => {
    router.push(href);
    setMenuVisible(false);
  }, [router]);

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Header */}
      <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md md:hidden`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCode className="text-blue-500 text-2xl" />
            <span className="text-xl font-bold">Alim Idrissou.</span>
          </div>
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
          >
            {menuVisible ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Combined Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <aside className={`w-full md:w-1/3 flex-shrink-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r border-gray-200 shadow-lg ${menuVisible ? 'fixed inset-0 z-40' : 'hidden'} md:block md:relative`}>
          <div className="h-full overflow-y-auto px-6 pt-6 pb-3">
            {/* Desktop Logo */}
            <div className={`hidden md:flex items-center space-x-2 mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <FaCode className="text-blue-500 text-2xl" />
              <span className="text-xl font-bold">Alim Idrissou.</span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4 mb-8">
              {['home', 'projects', 'bio', 'feedback'].map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link === 'home' ? '/' : `/${link}`)}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                    isActive(`/${link}`) 
                      ? 'bg-blue-500 text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  {link === 'home' && <FaHome className="text-lg" />}
                  {link === 'bio' && <FaUser className="text-lg" />}
                  {link === 'projects' && <FaCode className="text-lg" />}
                  {link === 'feedback' && <FaComments className="text-lg" />}
                  <span>{link.charAt(0).toUpperCase() + link.slice(1)}</span>
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-lg" />
              ) : (
                <FaMoon className="text-gray-600 text-lg" />
              )}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {/* Menu Content */}
            <div className="mt-8">
              <Menu />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="h-full overflow-y-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <DarkModeProvider>
      <LayoutContent>{children}</LayoutContent>
    </DarkModeProvider>
  );
};
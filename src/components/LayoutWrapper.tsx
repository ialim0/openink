"use client"
import React, { useState, useCallback } from 'react';
import { DarkModeProvider, useDarkMode } from '@/context/DarkModeContext';
import Menu from './Menu';
import { FaBars, FaTimes, FaCode, FaHome, FaBlog, FaUser, FaMoon, FaSun } from 'react-icons/fa';
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
      <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCode className="text-blue-500 text-2xl" />
            <span className="text-xl font-bold">Alimoudine I.</span>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
            >
              {menuVisible ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className={`absolute md:relative top-full left-0 right-0 md:top-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} md:bg-transparent ${menuVisible ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0">
              {['home', 'blog', 'about'].map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link === 'home' ? '/' : `/${link}`)}
                  className={`text-sm font-medium ${isActive(`/${link}`) ? 'text-blue-500' : `${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`} transition-colors duration-300 block md:inline-flex items-center`}
                >
                  {link === 'home' && <FaHome className="inline mr-1" />}
                  {link === 'blog' && <FaBlog className="inline mr-1" />}
                  {link === 'about' && <FaUser className="inline mr-1" />}
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors duration-300 block md:inline-block`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`w-full md:w-1/3 flex-shrink-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r border-gray-200 shadow-lg ${menuVisible ? 'fixed inset-0 z-40' : 'hidden'} md:block md:relative`}>
          <div className="h-full overflow-y-auto">
            <Menu />
          </div>
        </aside>
        <main className={`w-full md:w-2/3 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="h-full overflow-y-auto p-8">
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
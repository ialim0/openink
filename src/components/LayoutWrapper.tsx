'use client'

import React from 'react';
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext';
import Menu from './Menu';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <body className={`h-screen flex flex-col md:flex-row ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <aside className={`md:w-1/3 p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r border-gray-200 shadow-lg flex flex-col justify-between overflow-y-auto`}>
        <Menu />
      </aside>
      <main className={`md:w-2/3 flex-1 p-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-y-auto`}>
        {children}
      </main>
    </body>
  );
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <DarkModeProvider>
      <LayoutContent>{children}</LayoutContent>
    </DarkModeProvider>
  );
};
'use client'

import React from 'react';
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext';

interface DarkModeWrapperProps {
  children: (darkMode: boolean) => React.ReactNode;
}

const DarkModeContent: React.FC<DarkModeWrapperProps> = ({ children }) => {
  const { darkMode } = useDarkMode();
  return <>{children(darkMode)}</>;
};

export const DarkModeWrapper: React.FC<DarkModeWrapperProps> = ({ children }) => {
  return (
    <DarkModeProvider>
      <DarkModeContent>{children}</DarkModeContent>
    </DarkModeProvider>
  );
};
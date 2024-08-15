import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/providers /AuthProvider';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { MetaHead } from './MetaHead';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alim Idrissou Software Engineer',
  description: 'This is my blog official blog post.',
};

const metaHeadProps = {
  title: metadata.title,
  description: metadata.description,
  
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="en" className={inter.className}>
    <head>
      <MetaHead date={undefined} imageUrl={undefined} ogUrl={undefined} {...metaHeadProps} />
    </head>
    <body>
      <AuthProvider>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
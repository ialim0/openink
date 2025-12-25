import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { MetaHead } from './MetaHead';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alim Idrissou Software Engineer',
  description: 'A portfolio of projects by Alim Idrissou, a software engineer.',
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
        <LayoutWrapper>
        <GoogleAnalytics />

          {children}
        </LayoutWrapper>
    </body>
  </html>
);

export default RootLayout;
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Imagehub' }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>{`${title} | ImageHub`}</title>
        <meta name="description" content="Advanced Image Processing Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
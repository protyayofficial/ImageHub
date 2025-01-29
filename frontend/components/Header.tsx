import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/process', label: 'Process Image' },
    { href: '/techniques', label: 'Techniques' },
    { href: '/about', label: 'About' }
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-5 px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:text-blue-400 transition-all duration-300">
          <Camera className="text-blue-500" size={32} />
          <span className="text-3xl font-semibold tracking-tight">Imagehub</span>
        </Link>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-10">
            {navItems.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-white hover:text-blue-400 transition-all duration-300"
                >
                  {item.label}
                </Link>
                {/* Hover underline effect */}
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-blue-400 transition-all duration-300"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="bg-gray-900 text-white shadow-md md:hidden">
          <ul className="flex flex-col space-y-5 p-6">
            {navItems.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                  className="text-white hover:text-blue-400 transition-all duration-300"
                >
                  {item.label}
                </Link>
                {/* Hover underline effect for mobile */}
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></div>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

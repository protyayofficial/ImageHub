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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Camera className="text-blue-600" size={32} />
          <span className="text-2xl font-bold text-gray-800">Imagehub</span>
        </Link>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="bg-white shadow-md md:hidden">
          <ul className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

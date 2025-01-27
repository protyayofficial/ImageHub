import React from 'react';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-8">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo and Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Imagehub</h3>
          <p className="text-gray-400">
            Advanced image processing platform enabling seamless transformations and high-quality results for all your image editing needs.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/process" className="text-gray-400 hover:text-white transition-colors duration-200">
                Image Processing
              </Link>
            </li>
            <li>
              <Link href="/techniques" className="text-gray-400 hover:text-white transition-colors duration-200">
                Supported Techniques
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Social Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.github.com/protyayofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/protyaydey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="bg-gray-800 py-4">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Imagehub. All Rights Reserved. | Developed by <span className="text-white font-semibold">Protyay Dey</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

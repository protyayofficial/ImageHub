import React from 'react';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#010b22] text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        
        {/* Left Section: Links */}
        <div className="text-center md:text-left space-y-3">
          <h4 className="text-2xl font-bold">Explore</h4>
          <ul className="space-y-2 text-lg">
            <li>
              <Link
                href="/process"
                className="explore-link hover:text-gray-200 transition-all duration-200 transform hover:scale-110"
              >
                Image Processing
              </Link>
            </li>
            <li>
              <Link
                href="/techniques"
                className="explore-link hover:text-gray-200 transition-all duration-200 transform hover:scale-110"
              >
                Supported Techniques
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="explore-link hover:text-gray-200 transition-all duration-200 transform hover:scale-110"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Center Section: Social Links */}
        <div className="space-y-3 text-center">
          <h4 className="text-2xl font-bold">Connect With Us</h4>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.github.com/protyayofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 p-4 rounded-full border-2 border-transparent hover:border-gray-300 transition-all"
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/protyaydey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 p-4 rounded-full border-2 border-transparent hover:border-gray-300 transition-all"
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Footer Bottom: Copyright and Policy Links */}
      <div className="bg-[#010b22]">
        <div className="container mx-auto flex justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Imagehub. All Rights Reserved.</p>
          <div className="space-x-8"> 
            <p> Developed by Protyay</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

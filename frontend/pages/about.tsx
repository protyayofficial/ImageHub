/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Info, Zap, Github, ArrowRight, Circle, Settings, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  
  const sections = [
    {
      icon: <Info className="w-6 h-6" />,
      title: "Visual Transformation Engine",
      content: (
        <p className="text-gray-600 leading-relaxed text-center max-w-md text-sm md:text-base">
          Our optimized algorithms ensure smooth transformations without compromising quality.
        </p>
      ),
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Intuitive Controls",
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-4 leading-relaxed max-w-md text-sm md:text-base">
            Designed for both casual users and professionals.
          </p>
          <Link 
            href="/techniques" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group text-sm md:text-base"
          >
            Explore Features
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ),
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Workflow Optimized",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-600 text-center">
          <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Circle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium mb-1 text-sm md:text-base">Upload</div>
            <div className="text-xs md:text-sm text-gray-500">Drag & drop support</div>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-8 h-8 mx-auto mb-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <div className="font-medium mb-1 text-sm md:text-base">Adjust</div>
            <div className="text-xs md:text-sm text-gray-500">Live parameters</div>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <div className="font-medium mb-1 text-sm md:text-base">Export</div>
            <div className="text-xs md:text-sm text-gray-500">Processed Images</div>
          </div>
        </div>
      ),
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % sections.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, sections.length]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-8 sm:pt-12 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transforming <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Digital Imagery</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Advanced image processing meets intuitive design in our web-based solution
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-8 sm:mb-12">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-blue-600' : 'w-4 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Content Carousel */}
          <div className="rounded-2xl overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {sections.map((section, index) => (
                <div key={index} className="min-w-full px-4 sm:px-8 py-8 sm:py-16">
                  <div className={`mx-auto max-w-4xl p-6 sm:p-8 rounded-2xl ${section.bg}`}>
                    <div className="flex flex-col items-center mb-6 sm:mb-8">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4 ${section.bg}`}>
                        {React.cloneElement(section.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                      </div>
                      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${section.color}`}>
                        {section.title}
                      </h2>
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & CTA */}
          <div className="text-center sm:mt-8 -mt-4">  {/* Reduced margin and added negative margin */}
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-0">
              Powered By Next.js, Tailwind CSS & FastAPI
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
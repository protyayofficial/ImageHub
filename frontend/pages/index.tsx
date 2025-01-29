import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Image as ImageIcon, Filter, Download } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <ImageIcon size={48} className="text-blue-600" />,
      title: "Image Upload",
      description: "Easily upload images from your device in various formats.",
    },
    {
      icon: <Filter size={48} className="text-green-600" />,
      title: "Advanced Processing",
      description: "Apply multiple image processing techniques with a single click.",
    },
    {
      icon: <Download size={48} className="text-purple-600" />,
      title: "Quick Download",
      description: "Instantly download processed images.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-800 to-indigo-800  text-white text-center py-20 shadow-lg transform-gpu transition-all hover:scale-105 hover:shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 rounded-2xl">
          Transform Your Images with <span className="text-blue-300">Imagehub</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-10">
          A powerful platform for image processing, offering a wide range of transformation techniques.
        </p>
        <Link
          href="/process"
          className="bg-blue-100 text-gray-800 px-10 py-4 rounded-full shadow-lg hover:bg-gray-300 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105"
        >
          <span>Begin Transformation</span>
        </Link>

        {/* Decorative Waves */}
        <div className="absolute inset-0 -z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="0.1"
              d="M0,64L48,101.3C96,139,192,213,288,213.3C384,213,480,139,576,117.3C672,96,768,128,864,160C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Feature Section */}
      <div className="container mx-auto py-16 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-800">
          Why Choose <span className="text-blue-600">Imagehub</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-center"
            >
              <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-16 h-16 mx-auto mb-6 shadow-lg transform hover:scale-110 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

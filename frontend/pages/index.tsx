import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Image as ImageIcon, Filter, Download } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <ImageIcon size={48} className="text-blue-600" />,
      title: "Image Upload",
      description: "Easily upload images from your device in various formats."
    },
    {
      icon: <Filter size={48} className="text-green-600" />,
      title: "Advanced Processing",
      description: "Apply multiple image processing techniques with a single click."
    },
    {
      icon: <Download size={48} className="text-purple-600" />,
      title: "Quick Download",
      description: "Instantly download processed images in high quality."
    }
  ];

  return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Transform Your Images with <span className="text-blue-600">Imagehub</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A powerful platform for image processing, offering a wide range of transformation techniques.
        </p>
        
        <Link 
          href="/process" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Start Processing
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
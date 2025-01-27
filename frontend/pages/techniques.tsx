import React from 'react';
import Layout from '../components/Layout';
import { Zap, Palette, Crop, Contrast, Layers } from 'lucide-react';

const TechniquesPage: React.FC = () => {
  const techniques = [
    {
      icon: <Zap size={48} className="text-blue-600" />,
      title: "Black and White",
      description: "Convert color images to monochrome for classic, timeless look."
    },
    {
      icon: <Palette size={48} className="text-green-600" />,
      title: "Brightness Adjustment",
      description: "Enhance or reduce image brightness for perfect lighting."
    },
    {
      icon: <Crop size={48} className="text-purple-600" />,
      title: "Sharpness",
      description: "Increase image clarity and fine details."
    },
    {
      icon: <Contrast size={48} className="text-red-600" />,
      title: "Contrast Control",
      description: "Modify image contrast for dramatic visual effects."
    },
    {
      icon: <Layers size={48} className="text-yellow-600" />,
      title: "Image Compression",
      description: "Reduce file size while maintaining image quality."
    }
  ];

  return (
    <Layout title="Image Processing Techniques">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Image Processing Techniques
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore a diverse range of image transformation techniques to elevate your visual content.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {techniques.map((technique, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-4">{technique.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{technique.title}</h3>
            <p className="text-gray-600">{technique.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TechniquesPage;
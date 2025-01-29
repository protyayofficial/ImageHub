/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import Layout from "../components/Layout";
import {
  Scale,
  Crop,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Sun,
  Contrast,
  Droplet,
  Palette,
  FlipVertical2,
  CloudFog,
  Zap,
  Wand,
  Aperture,
  Filter,
  PenTool,
  Pencil,
  Layers,
} from "lucide-react";

const TechniquesPage: React.FC = () => {
  const techniques = [
    {
      icon: <Scale />,
      title: "Image Resize",
      description: "Resize images to fit specific dimensions or aspect ratios.",
      color: "from-green-400 to-green-600",
      iconColor: "text-green-100",
    },
    {
      icon: <Crop />,
      title: "Crop an Image",
      description: "Crop images to remove unwanted parts or emphasize specific areas.",
      color: "from-yellow-400 to-yellow-600",
      iconColor: "text-yellow-100",
    },
    {
      icon: <RotateCw />,
      title: "Rotate an Image",
      description: "Rotate images to correct orientation or add a creative twist.",
      color: "from-red-400 to-red-600",
      iconColor: "text-red-100",
    },
    {
      icon: <FlipHorizontal />,
      title: "Flip an Image Horizontally",
      description: "Mirror images horizontally for a reversed perspective.",
      color: "from-blue-400 to-blue-600",
      iconColor: "text-blue-100",
    },
    {
      icon: <FlipVertical />,
      title: "Flip an Image Vertically",
      description: "Flip images upside down for unique effects.",
      color: "from-purple-400 to-purple-600",
      iconColor: "text-purple-100",
    },
    {
      icon: <Sun />,
      title: "Brightness Adjustments",
      description: "Enhance or reduce image brightness for perfect lighting.",
      color: "from-yellow-300 to-yellow-500",
      iconColor: "text-yellow-100",
    },
    {
      icon: <Contrast />,
      title: "Contrast Adjustments",
      description: "Modify image contrast for dramatic visual effects.",
      color: "from-gray-400 to-gray-600",
      iconColor: "text-gray-100",
    },
    {
      icon: <Droplet />,
      title: "Saturation Adjustments",
      description: "Control image saturation to make colors vivid or subdued.",
      color: "from-teal-400 to-teal-600",
      iconColor: "text-teal-100",
    },
    {
      icon: <Palette />,
      title: "Grayscale Conversion",
      description: "Convert color images to grayscale for a timeless look.",
      color: "from-gray-500 to-gray-700",
      iconColor: "text-gray-100",
    },
    {
      icon: <FlipVertical2 />,
      title: "Invert Colors",
      description: "Create stunning effects by inverting image colors.",
      color: "from-pink-400 to-pink-600",
      iconColor: "text-pink-100",
    },
    {
      icon: <CloudFog />,
      title: "Gaussian Blur",
      description: "Apply a soft blur effect for smoothing or artistic touch.",
      color: "from-blue-200 to-blue-400",
      iconColor: "text-blue-100",
    },
    {
      icon: <Zap />,
      title: "Sharpen",
      description: "Increase image clarity and emphasize fine details.",
      color: "from-indigo-400 to-indigo-600",
      iconColor: "text-indigo-100",
    },
    // {
    //   icon: <Wand />,
    //   title: "Edge Detection",
    //   description: "Highlight image edges for analytical or creative purposes.",
    //   color: "from-gray-300 to-gray-500",
    //   iconColor: "text-gray-100",
    // },
    {
      icon: <Aperture />,
      title: "Sepia",
      description: "Add a warm, vintage sepia tone to your photos.",
      color: "from-amber-400 to-amber-600",
      iconColor: "text-amber-100",
    },
    {
      icon: <Filter />,
      title: "Noise Removal",
      description: "Reduce image noise for cleaner, sharper results.",
      color: "from-green-300 to-green-500",
      iconColor: "text-green-100",
    },
    {
      icon: <PenTool />,
      title: "Cartoon Effect",
      description: "Transform photos into colorful, cartoon-like illustrations.",
      color: "from-pink-500 to-pink-700",
      iconColor: "text-pink-100",
    },
    {
      icon: <Pencil />,
      title: "Image Sketch",
      description: "Convert photos into artistic pencil sketches with textures.",
      color: "from-gray-400 to-gray-600",
      iconColor: "text-gray-100",
    },
    {
      icon: <Layers />,
      title: "Posterize",
      description: "Simplify images by reducing the number of colors for a bold effect.",
      color: "from-cyan-400 to-cyan-600",
      iconColor: "text-cyan-100",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Our Image Processing Techniques
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Unleash creativity with our comprehensive suite of image transformation technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((technique, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 border border-white/20 animate-fade-in-up`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${technique.color} opacity-0 group-hover:opacity-80 transition-opacity rounded-2xl`}
                />
                <div className="relative">
                  <div className="mb-4 flex justify-center">
                    <div
                      className={`p-3 bg-gradient-to-br ${technique.color} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform`}
                    >
                      {React.cloneElement(technique.icon, {
                        className: `w-8 h-8 ${technique.iconColor}`,
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {technique.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {technique.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechniquesPage;

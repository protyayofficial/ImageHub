import React from 'react';
import { Info, Zap, Github } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Image Processing App</h1>
          <p className="text-lg text-gray-600">A powerful tool for real-time image manipulation and enhancement</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Info className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Our image processing application provides a suite of powerful tools to transform and enhance your images in real-time. 
            Built with FastAPI and React, it offers a seamless experience for both casual users and professionals.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Zap className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Grayscale Conversion</h3>
              <p className="text-gray-600">Transform your images into classic black and white.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Brightness Adjustment</h3>
              <p className="text-gray-600">Fine-tune the brightness levels of your images.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Sharpness Enhancement</h3>
              <p className="text-gray-600">Enhance the clarity and detail of your images.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Contrast Control</h3>
              <p className="text-gray-600">Adjust the contrast for better visual impact.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Image Compression</h3>
              <p className="text-gray-600">Optimize image size while maintaining quality.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Pencil Sketch Effect</h3>
              <p className="text-gray-600">Transform photos into artistic pencil sketches.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            {/* <Image className="w-6 h-6 text-green-500 mr-2" /> */}
            <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
          </div>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>Upload your image using the intuitive interface</li>
            <li>Select from our variety of processing techniques</li>
            <li>Adjust parameters to fine-tune the effect (if applicable)</li>
            <li>Download your processed image instantly</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Built with ❤️ using FastAPI, React, and advanced image processing libraries
          </p>
          <a 
            href="https://github.com/protyayofficial/imagehub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-blue-500 hover:text-blue-600"
          >
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
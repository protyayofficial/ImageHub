import React from 'react';
import Layout from '../components/Layout';
import ImageUploader from '../components/ImageUploader';

const ProcessImagePage: React.FC = () => {
  return (
    <Layout title="Process Image">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Image Processing Studio
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Upload your image and transform it using our advanced processing techniques.
        </p>
      </div>
      
      <ImageUploader />
    </Layout>
  );
};

export default ProcessImagePage;
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { processImageFromBackend } from '../utils/imageProcessor';

interface ProcessingOption {
  id: string;
  name: string;
}

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedProcessor, setSelectedProcessor] = useState<string>('');

  const processingOptions: ProcessingOption[] = [
    { id: 'grayscale', name: 'Black and White' },
    { id: 'brightness', name: 'Edit Brightness' },
    { id: 'sharpness', name: 'Sharpness' },
    { id: 'contrast', name: 'Contrast' },
    { id: 'compress', name: 'Image Compression' },
    { id: 'sketch', name: 'Image Sketching' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProcessedImage(null);
    }
  };

  const processImage = async () => {
    if (!selectedFile || !selectedProcessor) return;
  
    // console.log('Processing with technique:', selectedProcessor);  // Log the selected processor
  
    try {
      const processed = await processImageFromBackend(selectedFile, selectedProcessor);
      setProcessedImage(processed);
    } catch (error) {
      console.error('Image processing failed', error);
    }
  };
  

  const downloadProcessedImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `processed_${selectedFile?.name || 'image'}`;
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
      </div>

      {selectedFile && (
        <div className="mb-4">
          <select 
            value={selectedProcessor}
            onChange={(e) => {
              const value = e.target.value;
              // console.log('Selected Processor Changed:', value); // Debug log
              setSelectedProcessor(value);
            }}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Processing Option</option>
            {processingOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <button 
            onClick={processImage}
            disabled={!selectedProcessor}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Process Image
          </button>
        </div>
      )}

      <div className="flex space-x-4">
        {selectedFile && (
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-2">Original Image</h3>
            <Image 
              src={URL.createObjectURL(selectedFile)} 
              alt="Original" 
              width={400} 
              height={400} 
              className="rounded-lg"
            />
          </div>
        )}

        {processedImage && (
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-2">Processed Image</h3>
            <Image 
              src={processedImage} 
              alt="Processed" 
              width={400} 
              height={400} 
              className="rounded-lg"
            />
            <button 
              onClick={downloadProcessedImage}
              className="mt-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Download Processed Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
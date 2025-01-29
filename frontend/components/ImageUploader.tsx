/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import Image from 'next/image';
import { processImageFromBackend } from '../utils/imageProcessor';
import ImageCropper from '../components/ImageCropper';
import { Loader2 } from 'lucide-react';

interface ProcessingOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedProcessor, setSelectedProcessor] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizeWidth, setResizeWidth] = useState<number | string>('');
  const [resizeHeight, setResizeHeight] = useState<number | string>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [resizeError, setResizeError] = useState({ width: '', height: '' });
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [sharpnessIntensity, setSharpnessIntensity] = useState<number>(1);
  const [blurRadius, setBlurRadius] = useState<number>(3);
  const [blurSigma, setBlurSigma] = useState<number>(0);
  const [sepiaIntensity, setSepiaIntensity] = useState<number>(100);
  const [contrastFactor, setContrastFactor] = useState<number>(1);
  const [brightnessFactor, setBrightnessFactor] = useState<number>(1);
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [saturationFactor, setSaturationFactor] = useState<number>(1);
  const [denoiseH, setDenoiseH] = useState<number>(10);
  const [denoiseTemplateWindow, setDenoiseTemplateWindow] = useState<number>(7);
  const [denoiseSearchWindow, setDenoiseSearchWindow] = useState<number>(21);
  const [posterizeBits, setPosterizeBits] = useState<number>(4);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processingOptions: ProcessingOption[] = [
    { id: 'resize', name: 'Resize Image' },
    { id: 'crop', name: 'Crop Image' },
    { id: 'rotate', name: 'Rotate Image' },
    { id: 'flip', name: 'Flip Image' },
    { id: 'brightness', name: 'Adjust Brightness' },
    { id: 'contrast', name: 'Adjust Contrast' },
    { id: 'grayscale', name: 'Convert to Grayscale' },
    { id: 'gaussianblur', name: 'Gaussian Blur' },
    { id: 'sharpness', name: 'Sharpen Image' },
    { id: 'sepia', name: 'Sepia Filter' },
    { id: 'sketch', name: 'Pencil Sketch' },
    { id: 'saturation', name: 'Adjust Saturation' },
    { id: 'invert', name: 'Invert Colors' },
    { id: 'denoise', name: 'Remove Noise' },
    { id: 'cartoonize', name: 'Cartoonize Image' },
    { id: 'posterize', name: 'Posterize Image' },
  ];

  const resetState = () => {
    setSelectedProcessor('');
    setProcessedImage(null);
    setResizeWidth('');
    setResizeHeight('');
    setMaintainAspectRatio(true);
    setResizeError({ width: '', height: '' });
    setRotationAngle(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileValidation = (file: File) => {
    const maxFileSize = 4.5 * 1024 * 1024; // 4.5MB in bytes
    if (file.size > maxFileSize) {
      setErrorMessage('File size exceeds 4.5MB. Please select a smaller file.');
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      if (handleFileValidation(file)) {
        setSelectedFile(file);
        setErrorMessage(null);
      }
    } else {
      setErrorMessage('Invalid file type. Please upload an image.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (handleFileValidation(file)) {
        setSelectedFile(file);
        setErrorMessage(null);
      }
    }
  };

  const handleProcessorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcessor(e.target.value);
    setProcessedImage(null);
  };

  const validateResizeInputs = () => {
    const errors = { width: '', height: '' };
    let isValid = true;

    if (!resizeWidth) {
      errors.width = 'Width is required';
      isValid = false;
    } else if (isNaN(Number(resizeWidth)) || Number(resizeWidth) <= 0) {
      errors.width = 'Invalid width value';
      isValid = false;
    }

    if (!resizeHeight) {
      errors.height = 'Height is required';
      isValid = false;
    } else if (isNaN(Number(resizeHeight)) || Number(resizeHeight) <= 0) {
      errors.height = 'Invalid height value';
      isValid = false;
    }

    setResizeError(errors);
    return isValid;
  };

  const processImage = async () => {
    if (!selectedFile || !selectedProcessor) return;

    if (selectedProcessor === 'resize' && !validateResizeInputs()) {
      return;
    }

    setIsProcessing(true);
    const options: Record<string, any> = {};

    switch(selectedProcessor) {
      case 'resize':
        options.width = Number(resizeWidth);
        options.height = Number(resizeHeight);
        options.maintainAspectRatio = maintainAspectRatio;
        break;
      case 'rotate':
        options.angle = rotationAngle;
        break;
      case 'sharpness':
        options.intensity = sharpnessIntensity;
        break;
      case 'gaussianblur':
        options.radius = blurRadius;
        options.sigma = blurSigma;
        break;
      case 'sepia':
        options.intensity = sepiaIntensity;
        break;
      case 'contrast':
        options.factor = contrastFactor;
        break;
      case 'brightness':
        options.factor = brightnessFactor;
        break;
      case 'flip':
        options.direction = flipDirection;
        break;
      case 'saturation':
        options.factor = saturationFactor;
        break;
      case 'denoise':
        options.h = denoiseH;
        options.template_window_size = denoiseTemplateWindow;
        options.search_window_size = denoiseSearchWindow;
        break;
      case 'posterize':
        options.bits = posterizeBits;
        break;
    }

    try {
      const processed = await processImageFromBackend(selectedFile, selectedProcessor, options);
      setProcessedImage(processed);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `processed-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Image Processing Studio</h1>

        {/* File Upload Section */}
        {/* File Upload Section */}
        <div
          className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${!selectedFile ? 'cursor-pointer' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <div className="space-y-4">
              <div className="text-gray-500">
                <p className="text-lg">
                  Drag & drop image <span className="text-sm">(Max size: 4.5MB)</span>
                </p>
                <p className="text-sm mt-1">or</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Browse Files
              </label>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Selected: {selectedFile.name}
              <button
                onClick={() => resetState()}
                className="ml-2 text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}
          {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
        </div>

        {selectedFile && (
          <div className="space-y-8">
            {/* Processing Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Processor Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Processing Option
                </label>
                <select
                  value={selectedProcessor}
                  onChange={handleProcessorChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose processing option...</option>
                  {processingOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>

              {/* Processor Options */}
              <div className="space-y-6">
                {selectedProcessor === 'resize' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Resize Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={resizeWidth}
                          onChange={(e) => setResizeWidth(e.target.value)}
                          className={`w-full p-2 border rounded-md ${
                            resizeError.width ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {resizeError.width && (
                          <p className="text-red-500 text-xs mt-1">{resizeError.width}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={resizeHeight}
                          onChange={(e) => setResizeHeight(e.target.value)}
                          className={`w-full p-2 border rounded-md ${
                            resizeError.height ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {resizeError.height && (
                          <p className="text-red-500 text-xs mt-1">{resizeError.height}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={maintainAspectRatio}
                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-600">
                        Maintain Aspect Ratio
                      </label>
                    </div>
                  </div>
                )}

                {selectedProcessor === 'rotate' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Rotation Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Angle</span>
                        <span className="text-sm font-medium text-blue-600">
                          {rotationAngle}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={rotationAngle}
                        onChange={(e) => setRotationAngle(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {selectedProcessor === 'brightness' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Brightness Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Level</span>
                        <span className="text-sm font-medium text-blue-600">
                          {brightnessFactor}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3"
                        step="0.1"
                        value={brightnessFactor}
                        onChange={(e) => setBrightnessFactor(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {selectedProcessor === 'contrast' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Contrast Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Level</span>
                        <span className="text-sm font-medium text-blue-600">
                          {contrastFactor}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3"
                        step="0.1"
                        value={contrastFactor}
                        onChange={(e) => setContrastFactor(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {selectedProcessor === 'sharpness' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Sharpness Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Intensity</span>
                        <span className="text-sm font-medium text-blue-600">
                          {sharpnessIntensity}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={sharpnessIntensity}
                        onChange={(e) => setSharpnessIntensity(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {selectedProcessor === 'gaussianblur' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Blur Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Radius
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="15"
                          value={blurRadius}
                          onChange={(e) => setBlurRadius(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sigma
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={blurSigma}
                          onChange={(e) => setBlurSigma(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedProcessor === 'sepia' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Sepia Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Intensity</span>
                        <span className="text-sm font-medium text-blue-600">
                          {sepiaIntensity}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sepiaIntensity}
                        onChange={(e) => setSepiaIntensity(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {selectedProcessor === 'flip' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Flip Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          value="horizontal"
                          checked={flipDirection === 'horizontal'}
                          onChange={() => setFlipDirection('horizontal')}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Horizontal Flip</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          value="vertical"
                          checked={flipDirection === 'vertical'}
                          onChange={() => setFlipDirection('vertical')}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Vertical Flip</span>
                      </label>
                    </div>
                  </div>
                )}

                {selectedProcessor === 'crop' && selectedFile && (
                  <div className="mb-4">
                    <ImageCropper 
                      image={selectedFile} 
                      onCroppedImageChange={(croppedImage: string) => setProcessedImage(croppedImage)} 
                    />
                  </div>
                )}

                {selectedProcessor === 'saturation' && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium mb-4">Saturation Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Saturation Level</span>
                                <span className="text-sm font-medium text-blue-600">
                                    {saturationFactor}x
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                step="0.1"
                                value={saturationFactor}
                                onChange={(e) => setSaturationFactor(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}

                {selectedProcessor === 'denoise' && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium mb-4">Denoise Settings</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Strength (h)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    step="1"
                                    value={denoiseH}
                                    onChange={(e) => setDenoiseH(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Template Window
                                </label>
                                <input
                                    type="number"
                                    min="5"
                                    max="15"
                                    step="2"
                                    value={denoiseTemplateWindow}
                                    onChange={(e) => setDenoiseTemplateWindow(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Search Window
                                </label>
                                <input
                                    type="number"
                                    min="5"
                                    max="25"
                                    step="2"
                                    value={denoiseSearchWindow}
                                    onChange={(e) => setDenoiseSearchWindow(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedProcessor === 'posterize' && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium mb-4">Posterize Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Color Bits</span>
                                <span className="text-sm font-medium text-blue-600">
                                    {posterizeBits}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="8"
                                step="1"
                                value={posterizeBits}
                                onChange={(e) => setPosterizeBits(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}

              </div>
            </div>

            {/* Action Buttons */}
            {(selectedProcessor && selectedProcessor !== 'crop') && (
              <div className="flex justify-center">
                <button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    'Apply Processing'
                  )}
                </button>
              </div>
            )}

            {/* Image Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Original Image</h3>
                <div className="relative aspect-square border border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Original"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              {processedImage && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Processed Image</h3>
                    <button
                      onClick={downloadProcessedImage}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                  <div className="relative aspect-square border border-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={processedImage}
                      alt="Processed"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
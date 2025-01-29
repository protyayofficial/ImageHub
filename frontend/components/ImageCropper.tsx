/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
  image: File | null;
  onCroppedImageChange: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCroppedImageChange }) => {
  const cropperRef = useRef<any>(null); // Use `any` to access cropper instance
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Use effect to reset cropped image when new image is passed
  useEffect(() => {
    if (image && cropperRef.current) {
      const imageUrl = URL.createObjectURL(image);
      if (cropperRef.current?.cropper) {
        cropperRef.current.cropper.replace(imageUrl); // Access `cropper` property
      }
    }
  }, [image]);

  // Handle cropping action
  const handleCrop = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      const croppedImageDataUrl = croppedCanvas.toDataURL();
      setCroppedImage(croppedImageDataUrl);
      onCroppedImageChange(croppedImageDataUrl); // Pass cropped image to the parent component
    }
  };

  // Handle image reset
  const handleReset = () => {
    setCroppedImage(null);
    if (image && cropperRef.current?.cropper) {
      cropperRef.current.cropper.replace(URL.createObjectURL(image)); // Reset cropper to original image
    }
  };

  return (
    <div className="container mx-auto my-8">
      {/* Image Cropper */}
      {image && (
        <div className="relative">
          <Cropper
            ref={cropperRef}
            src={URL.createObjectURL(image)} // Ensure this gets the image URL
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            guides={false}
            background={false}
            cropBoxResizable={true}
            cropBoxMovable={true}
            zoomable={true}
          />
        </div>
      )}

      {/* Crop Button */}
      <div className="mt-4">
        <button
          onClick={handleCrop}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Crop Image
        </button>
        <button
          onClick={handleReset}
          className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;

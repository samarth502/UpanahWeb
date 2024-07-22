// src/components/ProductImageZoom.js
import React, { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';

const ProductImageZoom = ({ imageUrls = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === 'ArrowDown') {
      setCurrentImageIndex((prevIndex) => (prevIndex < imageUrls.length - 1 ? prevIndex + 1 : imageUrls.length - 1));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (imageUrls.length === 0) {
    return <div className="text-center text-gray-500">No images available.</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Product Image',
            isFluidWidth: true,
            src: imageUrls[currentImageIndex],
          },
          largeImage: {
            src: imageUrls[currentImageIndex],
            width: 1200,
            height: 1200,
          },
          enlargedImageContainerDimensions: {
            width: '200%',
            height: '200%',
          },
          
        }}
      />
      <div className="flex justify-center mt-2">
        {imageUrls.map((url, index) => (
          <button
            key={index}
            className={`w-16 h-16 mx-1 border rounded ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img src={url} alt={`Thumbnail ${index}`} className="w-full h-full object-cover rounded" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageZoom;

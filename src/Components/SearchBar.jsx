import React, { useState, useRef, useEffect } from 'react';
import { MdCameraAlt } from 'react-icons/md';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCameraSearch = async () => {
    if (isMobile) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const image = canvasRef.current.toDataURL('image/png');

      // Send image data to the server to find the product
      const response = await fetch('http://localhost:5173/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      const result = await response.json();

      if (result.product) {
        alert(`Product found: ${result.product.name}`);
      } else {
        alert('No product found.');
      }

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full p-2 text-gray-700 border border-gray-300 rounded"
      />
      {isMobile && (
        <button
          className="absolute right-0 p-2 m-2 text-gray-500"
          onClick={handleCameraSearch}
          aria-label="Search with Camera"
        >
          <MdCameraAlt className="w-6 h-6" />
        </button>
      )}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
      {stream && (
        <>
          <button onClick={captureImage} className="absolute right-0 bottom-0 p-2 m-2 text-white bg-blue-500 rounded">
            Capture Image
          </button>
          <div className="absolute inset-x-0 top-full flex justify-center p-2 bg-white border-t border-gray-300">
            <video ref={videoRef} autoPlay className="w-full h-full" />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;

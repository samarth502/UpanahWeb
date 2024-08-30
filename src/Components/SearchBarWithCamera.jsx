import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsbarcode from 'jsbarcode';

const SearchBarWithCamera = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const [scannedData, setScannedData] = useState('');
  const [product, setProduct] = useState(null);

  const handleScan = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const capture = async () => {
    const thumbnail = webcamRef.current.getScreenshot();
    if (thumbnail) {
      // Decode barcode from the image source
      const barcodeData = await decodeBarcode(thumbnail);
      setScannedData(barcodeData);
      setIsCameraOpen(false);
    }
  };

  const decodeBarcode = (thumbnail) => {
    // Implement barcode decoding logic here
    // For demonstration purposes, return dummy data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('123456'); // Replace with actual decoding logic
      }, 1000);
    });
  };

  const fetchProduct = async (barcode) => {
    try {
      const response = await fetch(`http://localhost:5000/products?barcode=${barcode}`);
      const data = await response.json();
      if (data.length > 0) {
        setProduct(data[0]);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    if (scannedData) {
      fetchProduct(scannedData);
    }
  }, [scannedData]);

  return (
    <div>
      <div className="flex items-center border rounded-md px-2 py-1 shadow-sm">
        <input
          type="text"
          placeholder="Search for products"
          className="flex-grow px-2 py-1 focus:outline-none"
        />
        <button onClick={handleScan} className="ml-2 text-gray-500 hover:text-gray-700">
          📷
        </button>
      </div>

      {isCameraOpen && (
        <div className="camera-overlay">
          <button onClick={handleCloseCamera} className="close-button">✖</button>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="auto"
          />
          <button onClick={capture} className="capture-button">Capture</button>
        </div>
      )}

      {product && (
        <div className="product-details">
          <h2>Product Details</h2>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Barcode:</strong> {product.barcode}</p>
        </div>
      )}

      {!product && scannedData && (
        <p>No product found with barcode {scannedData}</p>
      )}
    </div>
  );
};

export default SearchBarWithCamera;

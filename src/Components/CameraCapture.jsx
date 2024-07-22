import React, { useRef, useState } from "react";

const CameraCapture = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      setImage(canvas.toDataURL("image/png")); // Convert image to Base64
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const response = await fetch("/api/search-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image }),
        });
        const result = await response.json();
        setResults(result.products); // Adjust based on server response structure
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <video
        ref={videoRef}
        className="w-full max-w-xs h-auto border border-gray-300 rounded"
        autoPlay
        style={{ display: 'none' }} // Hide the video element
      ></video>
      <button
        onClick={startCamera}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Start Camera
      </button>
      <button
        onClick={captureImage}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Capture Image
      </button>
      <button
        onClick={uploadImage}
        className="bg-yellow-500 text-white py-2 px-4 rounded"
      >
        Search Image
      </button>
      <canvas ref={canvasRef} className="hidden"></canvas>
      {image && <img src={image} alt="Captured" className="mt-4 max-w-xs border border-gray-300 rounded" />}
      <div className="mt-4">
        {results.map((product, index) => (
          <div key={index} className="p-2 border border-gray-300 rounded mb-2">
            {product}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraCapture;

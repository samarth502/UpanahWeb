// CameraCapture.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    onCapture(imageSrc); // Pass the captured image to the parent component
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
        videoConstraints={{
          facingMode: 'environment',
        }}
      />
      <button onClick={capture}>Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
    </div>
  );
};

export default CameraCapture;

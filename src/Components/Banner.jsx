// Banner.js
import React from 'react';
import { shoes } from './shoes'; // Import the shoe data

const Banner = () => {
  // Define non-overlapping positions for the bubbles
  const positions = [
    { left: '5%', top: '10%' },
    { left: '30%', top: '20%' },
    { left: '55%', top: '15%' },
    { left: '75%', top: '25%' },
    { left: '15%', top: '40%' },
    { left: '50%', top: '35%' },
    { left: '70%', top: '50%' },
    { left: '20%', top: '60%' },
    { left: '45%', top: '70%' },
    { left: '80%', top: '80%' },
  ];

  return (
    <div className="relative w-full h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      {shoes.map((shoe, index) => (
        <div
          key={index}
          className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg animate-gentleFloat"
          style={{
            left: positions[index].left,
            top: positions[index].top,
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <img
            src={shoe.imageUrl}
            alt={shoe.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;

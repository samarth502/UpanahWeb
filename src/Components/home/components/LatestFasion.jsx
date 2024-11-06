import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import menShoes from '../../../assets/home/mensShoes.jpg';
import kidesShoes from '../../../assets/home/kidsSchool.jpg';
import heels from '../../../assets/home/heels.jpeg';
import sandales from '../../../assets/home/sandales.jpg';

const LatestFashion = () => {
  const products = [
    {
      id: 1,
      imageUrl: menShoes,
      hashtag: "#Trending",
      title: "Latest Fashionable",
      subtitle: "Men Shoes"
    },
    {
      id: 2,
      imageUrl: kidesShoes,
      hashtag: "#SchoolShoes",
      title: "Latest Fashionable",
      subtitle: "Kids/Youth School"
    },
    {
      id: 3,
      imageUrl: sandales,
      hashtag: "#Partywear",
      title: "Latest Fashionable",
      subtitle: "Ladies Sandals"
    },
    {
      id: 4,
      imageUrl: heels,
      hashtag: "#Trending",
      title: "Latest Fashionable",
      subtitle: "Heels/Flats"
    }
  ];

  return (
    <div className=" px-24 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row items-center border p-4 rounded-lg bg-black gap-4">
            {/* Left Box: Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.hashtag}
                className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-md"
              />
            </div>
            {/* Right Box: Text and Button */}
            <div className="w-full md:w-2/3 text-center md:text-left flex flex-col items-center md:items-start gap-2">
              <h4 className="text-sm md:text-lg font-medium text-white">{product.hashtag}</h4>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{product.title}</h1>
              <h2 className="text-xl md:text-2xl text-white">{product.subtitle}</h2>
              <button className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Shop Now <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestFashion;

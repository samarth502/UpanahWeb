import React, { useState, useEffect } from "react";
import { BiChevronDown, BiChevronUp, BiMenu, BiX } from "react-icons/bi";
import upanah_logo from "../../../assets/Upanah-Logo.png";
import { IoCameraSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { FaSearch, FaRegUser } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isStoreListMenuOpen, setIsStoreListMenuOpen] = useState(false);
  const [isAboutUsMenuOpen, setIsAboutUsMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="mt-9">
      <div className="flex flex-row justify-between items-center md:px-20 px-5 w-full ">
        {/* Logo */}
        <div className=" md:h-28 h-20">
          <img src={upanah_logo} className="w-full h-full" alt="Upanah Logo" />
        </div>
        <div className="xl:w-[70%] md:w-[50%] mb-4">
          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-col justify-center items-center h-28 w-[65%] relative">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What are you looking for?"
            />
            <FaSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              size={17}
            />
            <IoCameraSharp
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              size={25}
            />
          </div>

          {/* Desktop Menu Links and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex items-center space-x-16">
              <li>
                <a
                  href="#"
                  className="text-black font-semibold lg:text-xl md:text-lg"
                >
                  Shop
                </a>
              </li>

              {/* My Account Dropdown */}
              <li className="relative">
                <button
                  onMouseEnter={() => setIsAccountMenuOpen(true)}
                  onMouseLeave={() => setIsAccountMenuOpen(false)}
                  className="text-lg font-semibold text-black flex items-center"
                >
                  My Account{" "}
                  {isAccountMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
                </button>
                {isAccountMenuOpen && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        My Order
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Wishlist
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Compare
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Store List Dropdown */}
              <li className="relative">
                <button
                  onMouseEnter={() => setIsStoreListMenuOpen(true)}
                  onMouseLeave={() => setIsStoreListMenuOpen(false)}
                  className="text-lg font-semibold text-black flex items-center"
                >
                  Store List{" "}
                  {isStoreListMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
                </button>
                {isStoreListMenuOpen && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Know Nearest Shop
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <a href="#" className="text-black font-semibold text-lg">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="text-black font-semibold text-lg">
                  Size Chart
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Icons */}
        <div className="md:flex space-x-10 items-center relative  hidden ">
          <span className=" absolute right-28 -top-4 inline-flex items-center mb-7 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            0
          </span>
          <ShoppingCartIcon className="w-6 h-6 text-black" />

          <FaRegUser className="w-6 h-6 text-black" />
          <CiHeart className="w-6 h-6 text-black" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            {isOpen ? <BiX size={50} /> : <BiMenu size={50} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden mt-4 space-y-3">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What are you looking for?"
          />
          <ul className="flex flex-col items-start space-y-4 px-4">
            <li>
              <a href="#" className="text-black font-semibold text-lg">
                Shop
              </a>
            </li>

            {/* Mobile My Account Dropdown */}
            <li>
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="text-black font-semibold text-lg flex items-center"
              >
                My Account{" "}
                {isAccountMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
              </button>
              {isAccountMenuOpen && (
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="block text-gray-700 hover:bg-red-500 hover:text-white rounded px-4 py-2"
                    >
                      My Order
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block text-gray-700 hover:bg-red-500 hover:text-white rounded px-4 py-2"
                    >
                      Wishlist
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Mobile Store List Dropdown */}
            <li>
              <button
                onClick={() => setIsStoreListMenuOpen(!isStoreListMenuOpen)}
                className="text-black font-semibold text-lg flex items-center"
              >
                Store List{" "}
                {isStoreListMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
              </button>
              {isStoreListMenuOpen && (
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="block text-gray-700 hover:bg-red-500 hover:text-white rounded px-4 py-2"
                    >
                      Know Nearest Shop
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="#" className="text-black font-semibold text-lg">
                Cart
              </a>
            </li>
            <li>
              <a href="#" className="text-black font-semibold text-lg">
                Size Chart
              </a>
            </li>
            <div className="flex items-center relative gap-4 ">
              <span className=" absolute  right-14 -top-4 inline-flex items-center mb-7 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                0
              </span>
              <ShoppingCartIcon className="w-6 h-6 text-black" />

              <FaRegUser className="w-6 h-6 text-black" />
              <CiHeart className="w-6 h-6 text-black" />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

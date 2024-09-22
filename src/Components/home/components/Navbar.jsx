import React, { useState, useEffect } from "react";
import { BiChevronDown, BiChevronUp, BiMenu, BiX } from "react-icons/bi";
import upanah_logo from "../../../assets/Upanah-Logo.png";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isStoreListMenuOpen, setIsStoreListMenuOpen] = useState(false);
  const [isAboutUsMenuOpen, setIsAboutUsMenuOpen] = useState(false);
  const [isHoveredAccount, setIsHoveredAccount] = useState(false);
  const [isHoveredStoreList, setIsHoveredStoreList] = useState(false);
  const [isHoveredAboutUs, setIsHoveredAboutUs] = useState(false);

  //   // Handle Account menu hover and timeout for hiding
  useEffect(() => {
    if (!isHoveredAccount) {
      const timer = setTimeout(() => setIsAccountMenuOpen(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isHoveredAccount]);

  //   // Handle Store List menu hover and timeout for hiding
  useEffect(() => {
    if (!isHoveredStoreList) {
      const timer = setTimeout(() => setIsStoreListMenuOpen(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isHoveredStoreList]);

  //   // Handle About Us menu hover and timeout for hiding
  useEffect(() => {
    if (!isHoveredAboutUs) {
      const timer = setTimeout(() => setIsAboutUsMenuOpen(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isHoveredAboutUs]);

  //   // Handlers for the Account menu
  const handleMouseEnterAccount = () => {
    setIsHoveredAccount(true);
    setIsAccountMenuOpen(true);
  };
  const handleMouseLeaveAccount = () => setIsHoveredAccount(false);

  //   // Handlers for the Store List menu
  const handleMouseEnterStoreList = () => {
    setIsHoveredStoreList(true);
    setIsStoreListMenuOpen(true);
  };
  const handleMouseLeaveStoreList = () => setIsHoveredStoreList(false);

  //   // Handlers for the About Us menu
  const handleMouseEnterAboutUs = () => {
    setIsHoveredAboutUs(true);
    setIsAboutUsMenuOpen(true);
  };
  const handleMouseLeaveAboutUs = () => setIsHoveredAboutUs(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" p-4">
      <div className="flex justify-between items-center m-auto  md:m-auto md:w-[90%]">
        <div className="w-28 h-28 ">
          <img
            src={upanah_logo}
            className="w-28 h-28 xs:w-16 xs:h-16 lg:w-28 lg:h-28"
            alt=""
          />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black xs:mb-12 focus:outline-none"
          >
            <svg
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex md:items-center md:static absolute left-0 w-full md:w-auto md:space-x-4 bg-blue-600 md:bg-transparent overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen
              ? "top-[100px] max-h-screen opacity-100"
              : "top-[-490px] max-h-0 opacity-0"
          } md:top-0 md:opacity-100 md:max-h-full`}
        >
          <li className="py-2 md:py-0 relative ">
            <a
              href="#"
              className="text-black font-semibold lg:text-xl md:text-lg"
            >
              Shop
            </a>
          </li>

          {/* My Account Dropdown */}
          <li
            className=" py-2 md:py-0"
            onMouseEnter={handleMouseEnterAccount}
            onMouseLeave={handleMouseLeaveAccount}
          >
            <button className="text-xl font-semibold text-black flex items-center ">
              My Account
              {isAccountMenuOpen ? (
                <BiChevronUp className="ml-2" size={20} />
              ) : (
                <BiChevronDown className="ml-2" size={20} />
              )}
            </button>
            {isAccountMenuOpen && (
              <div className="absolute bg-white z-10 md:left-20 lg:left-[23rem] mt-2 md:mt-4  shadow-lg w-48 ">
                <ul className="py-2">
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
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Wishlist
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Compare
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Store List Dropdown */}
          <li
            className=" py-2 md:py-0"
            onMouseEnter={handleMouseEnterStoreList}
            onMouseLeave={handleMouseLeaveStoreList}
          >
            <button className="font-semibold text-xl  text-black flex items-center">
              Store List
              {isStoreListMenuOpen ? (
                <BiChevronUp className="ml-2" size={20} />
              ) : (
                <BiChevronDown className="ml-2" size={20} />
              )}
            </button>
            {isStoreListMenuOpen && (
              <div className="absolute left-[56rem] md:left-44 lg:left-[32rem] mt-2 md:mt-4 bg-white shadow-lg w-48 z-10">
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Know Nearest Shop
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Compare
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Other Links */}
          <li className="py-2 md:py-0">
            <a href="#" className="font-semibold text-xl  text-black">
              Cart
            </a>
          </li>
          <li className="py-2 md:py-0">
            <a href="#" className=" font-semibold text-xl  text-black">
              Size Chart
            </a>
          </li>
          <li className="py-2 md:py-0">
            <a href="#" className=" font-semibold text-xl  text-black">
              Join Us
            </a>
          </li>
          <li className="py-2 md:py-0">
            <a href="#" className=" text-xl  font-semibold text-black">
              Shoe's 112
            </a>
          </li>

          {/* About Us Dropdown */}
          <li
            className="py-2 md:py-0"
            onMouseEnter={handleMouseEnterAboutUs}
            onMouseLeave={handleMouseLeaveAboutUs}
          >
            <button className="font-semibold  flex items-center text-xl  text-black">
              About Us
              {isAboutUsMenuOpen ? (
                <BiChevronUp className="ml-2" size={20} />
              ) : (
                <BiChevronDown className="ml-2" size={20} />
              )}
            </button>
            {isAboutUsMenuOpen && (
              <div className="absolute right-5 lg:right-96 mt-2 md:mt-4 bg-white shadow-lg w-48 z-10">
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Shipping and Delivery Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-red-500"
                    >
                      Refund and Returns Policy
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        {/* Search bar */}
        <div className="relative text-gray-600">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>

        {/* <Link to="/cart"> */}
        <div className="flex items-center px-5">
          <button
            type="button"
            className="relative rounded-full bg-gray-800 p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {/* <span className="absolute -inset-1.5" /> */}
            {/* <span className="sr-only">View notifications</span> */}
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <span className="inline-flex items-center mb-11 -ml-20 z-10  rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          0
        </span>
      </div>
    </nav>
  );
}

export default Navbar;

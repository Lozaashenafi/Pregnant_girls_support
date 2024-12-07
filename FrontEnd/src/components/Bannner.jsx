import React from "react";
import banner from "../assets/image/banner1.jpg";
import flot from "../assets/image/flot.jpg";

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-white">
      {/* Left: Image with overlay */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-96">
        <img
          src={banner}
          alt="Banner"
          className="object-cover w-2/3  rounded-t-lg lg:rounded-l-lg lg:rounded-none"
        />
      </div>

      {/* Right: Motto Text */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6 lg:p-12 bg-white text-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-tight">
          Supporting Every Step of Your Pregnancy Journey!
        </h1>
        {/* <img src={flot} alt="Banner" className="flot" /> */}
      </div>
    </div>
  );
}

export default Banner;

import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row bg-primary rounded-2xl px-6 md:px-12 pt-10 md:pt-16 m-5 overflow-hidden">

      {/* LEFT SECTION */}
      <div className="flex-1 flex flex-col justify-center gap-6 text-center md:text-left pb-10 md:pb-16">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </h1>

        <div className="flex items-center gap-3 justify-center md:justify-start">
          <img
            className="w-20 sm:w-24 object-contain"
            src={assets.group_profiles}
            alt=""
          />
          <p className="text-white text-sm sm:text-base max-w-md">
            Simply browse through our extensive list of trusted doctors
            and schedule your appointment hassle-free.
          </p>
        </div>

        <a href="#speciality" className="flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full shadow-md hover:scale-95 transition duration-200 w-fit mx-auto md:mx-0">
          Book Appointment
          <img className="w-4" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 relative flex justify-center md:justify-end">
        <img
          className="w-full max-w-sm md:max-w-lg object-contain self-end"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
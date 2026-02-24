import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center justify-center px-6 md:px-12 py-16 gap-6"
    >
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        Find by Speciality
      </h1>

      <p className="text-gray-600 text-center max-w-2xl">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8 w-full max-w-6xl">
        {specialityData.map((item, index) => (
          <Link onClick={()=>{onscroll(0,0)}}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="group bg-white rounded-2xl p-6 flex flex-col items-center 
                       shadow-sm hover:shadow-xl 
                       transition-all duration-300 
                       hover:-translate-y-3"
          >
            <img
              className="w-16 md:w-20 object-contain 
                         transition-transform duration-300 
                         group-hover:scale-110"
              src={item.image}
              alt={item.speciality}
            />
            <p className="mt-4 text-sm md:text-base font-medium text-gray-700 
                          group-hover:text-primary transition-colors duration-300">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
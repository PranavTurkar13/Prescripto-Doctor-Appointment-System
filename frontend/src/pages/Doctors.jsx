import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterdoc, setFilterdoc] = useState([]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterdoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterdoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Browse Doctors by Speciality
      </h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* ========== Sidebar ========== */}
        <div className="md:w-1/4 w-full">
          
          {/* Mobile Horizontal Scroll */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2">
            {specialities.map((spec, index) => (
              <button
                key={index}
                onClick={() => navigate(`/doctors/${spec}`)}
                className={`px-4 py-2 rounded-full md:rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${
                    speciality === spec
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* ========== Doctors Grid ========== */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterdoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="group bg-white rounded-2xl shadow-md 
                         hover:shadow-2xl transition-all duration-300 
                         hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                {/* Availability Badge */}
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  Available
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Doctors;
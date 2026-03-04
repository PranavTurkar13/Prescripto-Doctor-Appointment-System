import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { atoken, doctors, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="p-5 w-full">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        All Doctors
      </h1>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">

        {doctors.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-200 hover:bg-indigo-100"
          >

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
            </div>

            {/* Info */}
            <div className="text-center mt-4">

              <p className="text-base font-semibold text-gray-800">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                {item.speciality}
              </p>

            </div>

            {/* Availability */}
            <div className="flex items-center justify-center gap-2 mt-4">

              <input
                type="checkbox"
                checked={item.available}
                onChange={() => changeAvailability(item._id)}
                className="cursor-pointer accent-indigo-600"
              />

              <span className="text-sm text-gray-600">
                Available
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default DoctorList;
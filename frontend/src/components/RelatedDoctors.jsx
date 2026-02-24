import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {
    const {doctors} = useContext(AppContext);
    const [realDocs, setRealDocs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    if(doctors.length>0){
        const docData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
        setRealDocs(docData);
    }
    }, [doctors,docId,speciality])
  return (
    <div className="px-6 md:px-12 py-16 bg-gray-50 text-center">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Top Doctors to Book
      </h1>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Responsive Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {realDocs.slice(0, 5).map((item, idx) => (
          <div 
            onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={idx}
            className="group bg-white rounded-2xl shadow-sm 
                       hover:shadow-xl transition-all duration-300 
                       hover:-translate-y-3 overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              {/* Availability Badge */}
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                Available
              </span>
            </div>

            {/* Info */}
            <div className="p-5 text-left">
              <p className="font-semibold text-gray-800 text-lg">
                {item.name}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="mt-12 px-8 py-3 bg-primary text-white rounded-full font-medium 
                         hover:opacity-90 transition duration-300">
        View More
      </button>

    </div>
  )
}

export default RelatedDoctors

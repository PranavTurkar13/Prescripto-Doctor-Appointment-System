import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setslotTime] = useState('');
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const getAvailableSlots = () => {
    let slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); 

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        );
        currentDate.setMinutes(0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let daySlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        daySlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(daySlots);
    }

    setDocSlots(slots);
  };
  


  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId])

  useEffect(() => {
  getAvailableSlots();
  }, [docInfo])

  useEffect(() => {
  console.log(docSlots);
  
  }, [docSlots])

  return (
    docInfo && (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          
          {/* Main Section */}
          <div className="flex flex-col md:flex-row">

            {/* ========== Doctor Image ========== */}
            <div className="md:w-1/3  flex items-center justify-center p-6">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="w-75 h-90 object-cover bg-primary rounded-2xl shadow-md"
              />
            </div>

            {/* ========== Doctor Info ========== */}
            <div className="md:w-2/3 p-8 space-y-6">

              {/* Name + Verified */}
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {docInfo.name}
                </h2>
                <img
                  src={assets.verified_icon}
                  alt="verified"
                  className="w-6"
                />
              </div>

              {/* Degree + Speciality */}
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-gray-600 text-lg">
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <span className="bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full">
                  {docInfo.experience}
                </span>
              </div>

              {/* About Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-gray-800 text-lg">
                    About
                  </p>
                  <img
                    src={assets.info_icon}
                    alt="info"
                    className="w-4"
                  />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {docInfo.about}
                </p>
              </div>

              {/* Appointment Fee */}
              <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                <p className="text-gray-700 font-medium">
                  Appointment Fee
                </p>
                <p className="text-xl font-bold text-primary">
                  {currencySymbol} {docInfo.fees}
                </p>
              </div>

              {/* Book Button */}
              <button className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg">
                Book Appointment
              </button>

            </div>
          </div>
        </div>
        {/* ---------- booking Slots --------- */}
        <div className="mt-12 max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

          <h3 className="text-2xl font-bold mb-6">Booking Slots</h3>

          {/* ===== Date Selector ===== */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setslotTime("");
                  }}
                  className={`text-center py-4 px-5 min-w-[70px] rounded-2xl cursor-pointer transition-all duration-300
                  ${
                    slotIndex === index
                      ? "bg-primary text-white shadow-md"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                  </p>
                  <p className="text-lg font-semibold">
                    {item[0] && item[0].dateTime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* ===== Time Slots ===== */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-6">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setslotTime(item.time)}
                  className={`py-2 rounded-xl text-sm border transition-all duration-200
                  ${
                    slotTime === item.time
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>

          {/* ===== Book Button ===== */}
          <div className="mt-8 text-center md:text-left">
            <button
              disabled={!slotTime}
              className={`px-8 py-3 rounded-xl text-white transition-all duration-300
              ${
                slotTime
                  ? "bg-primary hover:bg-blue-700 shadow-md"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {slotTime ? `Book at ${slotTime}` : "Select a Time Slot"}
            </button>
          </div>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
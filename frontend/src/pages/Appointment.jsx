import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctorsData, backendurl } =
    useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  // ✅ FIX 1: Ref to scroll to booking slots when top button is clicked
  const bookingSlotsRef = useRef(null);

  const getAvailableSlots = () => {
    if (!docInfo) return;

    let slots = [];
    let today = new Date();

    // ✅ FIX 5: Get already booked slots from docInfo to filter them out
    const bookedSlots = docInfo.slots_booked || {};

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
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

        // ✅ FIX 5: Build the slotDate key to match backend format
        const dateObj = new Date(currentDate);
        const slotDateKey =
          dateObj.getDate() +
          "_" +
          (dateObj.getMonth() + 1) +
          "_" +
          dateObj.getFullYear();

        // ✅ FIX 5: Only include slot if it's not already booked
        const isBooked =
          bookedSlots[slotDateKey] &&
          bookedSlots[slotDateKey].includes(formattedTime);

        if (!isBooked) {
          daySlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

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

  const bookAppointment = async () => {
    // ✅ FIX 2: Added `return` so it stops execution after redirecting
    if (!token) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }

    try {
      // ✅ FIX 4: Use selected slot's dateTime, not always index [0]
      const date = docSlots[slotIndex].find((s) => s.time === slotTime)?.dateTime;

      if (!date) {
        toast.error("Selected time slot is no longer available.");
        return;
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      // ✅ FIX 3: Changed `Headers` to `headers` (lowercase) so token is sent correctly
      const { data } = await axios.post(
        backendurl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        return navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Main Section */}
          <div className="flex flex-col md:flex-row">

            {/* ========== Doctor Image ========== */}
            <div className="md:w-1/3 flex items-center justify-center p-6">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                // ✅ FIX 5: Replaced invalid Tailwind classes w-75 h-90 with valid ones
                className="w-72 h-80 object-cover bg-primary rounded-2xl shadow-md"
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
                  <p className="font-semibold text-gray-800 text-lg">About</p>
                  <img src={assets.info_icon} alt="info" className="w-4" />
                </div>
                <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
              </div>

              {/* Appointment Fee */}
              <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                <p className="text-gray-700 font-medium">Appointment Fee</p>
                <p className="text-xl font-bold text-primary">
                  {currencySymbol} {docInfo.fees}
                </p>
              </div>

              {/* ✅ FIX 1: Top "Book Appointment" button now scrolls down to the slots section */}
              <button
                onClick={() =>
                  bookingSlotsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
              >
                Book Appointment
              </button>

            </div>
          </div>
        </div>

        {/* ---------- Booking Slots ---------- */}
        {/* ✅ FIX 1: Attached ref so the top button can scroll here */}
        <div
          ref={bookingSlotsRef}
          className="mt-12 max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6">Booking Slots</h3>

          {/* ===== Date Selector ===== */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
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
            {docSlots.length > 0 && docSlots[slotIndex].length > 0 ? (
              docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`py-2 rounded-xl text-sm border transition-all duration-200
                  ${
                    slotTime === item.time
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))
            ) : (
              // ✅ FIX 5: Friendly message when all slots are booked for a day
              <p className="col-span-6 text-gray-500 text-sm text-center py-4">
                No available slots for this day.
              </p>
            )}
          </div>

          {/* ===== Book Button ===== */}
          <div className="mt-8 text-center md:text-left">
            <button
              onClick={bookAppointment}
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
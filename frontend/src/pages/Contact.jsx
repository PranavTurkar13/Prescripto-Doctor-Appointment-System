import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-12 py-16">

      {/* ===== Header ===== */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out to us for any inquiries,
          support, or career opportunities.
        </p>
      </div>

      {/* ===== Contact Section ===== */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact Prescripto"
            className="rounded-3xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Contact Info */}
        <div className="md:w-1/2 bg-white p-10 rounded-3xl shadow-lg space-y-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            Our Office
          </h2>

          <div className="text-gray-600 space-y-2">
            <p>
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p>
              <span className="font-medium text-gray-800">Tel:</span> (415) 555-0132
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span> pranavturkar93@gmail.com
            </p>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Careers at PRESCRIPTO
            </h3>
            <p className="text-gray-600">
              Learn more about our teams and job openings.
            </p>
          </div>

          <button className="mt-4 px-8 py-3 bg-primary text-white rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition duration-300">
            Explore Jobs
          </button>

        </div>
      </div>

    </div>
  );
};

export default Contact;
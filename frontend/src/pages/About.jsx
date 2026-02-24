import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-12 py-16">

      {/* ======= About Header ======= */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About <span className="text-primary">Us</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Learn more about our mission, vision, and commitment to transforming healthcare access.
        </p>
      </div>

      {/* ======= About Content Section ======= */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.about_image}
            alt="About Prescripto"
            className="rounded-3xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 text-gray-700 leading-relaxed">
          <p>
            Welcome to <b>Prescripto</b>, your trusted partner in managing your
            healthcare needs conveniently and efficiently. We understand the
            challenges individuals face when scheduling doctor appointments and
            managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p>
              Our vision is to create a seamless healthcare experience for
              every user. We aim to bridge the gap between patients and
              healthcare providers, making care more accessible and efficient.
            </p>
          </div>
        </div>
      </div>

      {/* ======= Why Choose Us ======= */}
      <div className="mt-24 max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Why <span className="text-primary">Choose Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Efficiency
            </h3>
            <p className="text-gray-600">
              Streamlined appointment scheduling that fits perfectly into your
              busy lifestyle.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Convenience
            </h3>
            <p className="text-gray-600">
              Access to a trusted network of healthcare professionals near you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Personalization
            </h3>
            <p className="text-gray-600">
              Tailored recommendations and reminders to keep your health on
              track.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;
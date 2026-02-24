import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className=" mt-20">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ------- Left Section ------- */}
          <div>
            <img className="w-36 mb-5" src={assets.logo} alt="logo" />

            <p className="text-gray-600 leading-relaxed text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting 
              industry. Lorem Ipsum has been the industry's standard dummy text 
              ever since the 1500s.
            </p>
          </div>

          {/* ------- Center Section ------- */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5 tracking-wide">
              COMPANY
            </h4>

            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-primary cursor-pointer transition">Home</li>
              <li className="hover:text-primary cursor-pointer transition">About us</li>
              <li className="hover:text-primary cursor-pointer transition">Contact us</li>
              <li className="hover:text-primary cursor-pointer transition">Privacy policy</li>
            </ul>
          </div>

          {/* ------- Right Section ------- */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5 tracking-wide">
              GET IN TOUCH
            </h4>

            <ul className="space-y-3 text-gray-600 text-sm">
              <li>+1-212-456-7890</li>
              <li>pranavturkar93@gmail.com</li>
            </ul>
          </div>

        </div>

        {/* ------- Bottom Copyright ------- */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Prescripto. All Rights Reserved.
        </div>

      </div>

    </footer>
  )
}

export default Footer
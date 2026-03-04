import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form action="">
      <div className="m-5 max-w-full">

      <p className="text-xl font-semibold text-gray-800 mb-6">Add Doctor</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

        {/* Upload Section */}
        <div className="flex items-center gap-5  max-w-full mb-8 pb-8 border-b border-gray-100">
          <div className="flex-shrink-0">
            <label htmlFor="doc-img" className="cursor-pointer block">
              <img
                src={assets.upload_area}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors bg-indigo-50"
              />
            </label>
            <input type="file" id="doc-img" hidden />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Upload doctor picture</p>
            <p className="text-xs text-gray-400 mt-1">Click the image to upload. PNG, JPG up to 5MB.</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Doctor name</p>
            <input type="text" placeholder='Name' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Doctor Email</p>
            <input type="email" placeholder='Email' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Doctor Password</p>
            <input type="password" placeholder='Password' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Experience</p>
            <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition">
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Speciality</p>
            <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Education</p>
            <input type="text" placeholder='Education' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition" />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</p>
            <input type="text" placeholder='line 1' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition mb-2" />
            <input type="text" placeholder='line 2' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Fees</p>
            <input type="text" placeholder='Fees' required className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition" />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">About me</p>
            <textarea rows={4} placeholder="Write About Yourself" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition resize-none" />
          </div>

        </div>

        {/* Submit */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-all duration-150 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-px active:translate-y-0">
            Add doctor
          </button>
        </div>

      </div>
    </div>
    </form>
  )
}

export default AddDoctor
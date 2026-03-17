import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";

const MyProfile = () => {
  const {backendurl,token,userData,setUserData,loadUserProfileData} = useContext(AppContext)
  
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {

      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if(image){
        formData.append('image', image)
      }

      const {data} = await axios.post(
        backendurl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return userData && (
    <div className="min-h-screen bg-gray-100 px-4 py-12 flex justify-center">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-lg p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8">

          {
            isEdit
            ? <label htmlFor="image" className="relative cursor-pointer">
              <img
                className="w-40 h-40 rounded-full object-cover"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              {!image && (
                <img
                  className="absolute bottom-0 right-0 w-8"
                  src={assets.upload_icon}
                  alt=""
                />
              )}
              <input
                onChange={(e)=>setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>:
            <img
            src={userData.image}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />
          }
          

          <div className="flex-1 space-y-4 text-center md:text-left">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-2xl font-semibold border-b outline-none w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
            )}

            <button
              onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
              className="px-6 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition"
            >
              {isEdit ? "Save Profile" : "Edit Profile"}
            </button>
          </div>
        </div>

        <hr className="my-8" />

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

          {/* Email */}
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            {isEdit ? (
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500">Address</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2 mb-2"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </>
            ) : (
              <p>
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="text-sm font-medium text-gray-500">Gender</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="mt-1 w-full border rounded-lg px-3 py-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <p className="text-sm font-medium text-gray-500">Birthday</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
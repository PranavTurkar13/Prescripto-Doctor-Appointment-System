import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const {setAtoken,backendurl} = useContext(AdminContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async(event) =>{
    event.preventDefault();
    try {
      const {data} = await axios.post(backendurl + '/api/admin/login',{email,password})
      if( state === 'Admin'){
        if(data.success){
          localStorage.setItem("atoken",data.token)
          setAtoken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }else{

      }
    } catch (error) {
     
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-white px-4">
      
      <form onSubmit={onSubmitHandler} className="bg-white w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-xl transition-all duration-300">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">
            <span className="text-primary">{state}</span> Login
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            onChange={(e)=>{setEmail(e.target.value)}} value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary 
                       focus:border-transparent transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            onChange={(e)=>{setPassword(e.target.value)}} value={password}
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary 
                       focus:border-transparent transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2.5 rounded-lg 
                     font-medium hover:opacity-90 active:scale-[0.98] 
                     transition duration-200"
        >
          Login
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {
            state === 'Admin'
              ? <>Doctor Login? <span 
                    onClick={() => setState('Doctor')} 
                    className="text-primary cursor-pointer font-medium hover:underline">
                    Click here
                 </span></>
              : <>Admin Login? <span 
                    onClick={() => setState('Admin')} 
                    className="text-primary cursor-pointer font-medium hover:underline">
                    Click here
                 </span></>
          }
        </p>

      </form>
    </div>
  )
}

export default Login
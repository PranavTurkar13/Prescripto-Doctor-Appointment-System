import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { backendurl,token,setToken } = useContext(AppContext)
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    console.log({ name, email, password });
    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendurl + '/api/user/register',{name,email,password});
        if(data.success){
          localStorage.setItem("token",data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendurl + '/api/user/login',{email,password});
        if(data.success){
          localStorage.setItem("token",data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
  if(token){
    navigate('/')
  }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <form
        onSubmit={onSubmitHandler}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg space-y-6"
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">

          {state === "Sign Up" && (
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl hover:opacity-90 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <div className="text-center text-sm text-gray-600">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary cursor-pointer font-medium"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary cursor-pointer font-medium"
              >
                Click here
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
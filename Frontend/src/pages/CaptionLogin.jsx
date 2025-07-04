import React, { use, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptionDataContext } from "../context/captionContext";

const CaptionLogin = () => {

  const captionToken = localStorage.getItem("captionToken");
  const navigate = useNavigate();
  useEffect(() =>{
    if(captionToken){
      navigate("/caption-home");
    }
  },[captionToken, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {caption, setCaption} = useContext(CaptionDataContext);


  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/login`, data);
    

    if(response.status === 200){
      const data = response.data;
      setCaption(data.caption);
      localStorage.setItem("captionToken", data.token);
      console.log("Caption logged in successfully:", data);
      navigate("/caption-home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1678964101682-26a0906972ad?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md text-black">
        <div className="flex justify-center mb-6">
          <img
            className="w-40"
            src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-black-700 text-lg font-medium mb-1">
              What is your email
            </label>
            <input
              required
              value={email}
              onChange={(e) => {
                // console.log(e.target.value);
                setEmail(e.target.value);
              }
              }
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-black-700 text-lg font-medium mb-1">
              Enter Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => {
                // console.log(e.target.value);
                setPassword(e.target.value);
              }
              }
              type="password"
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="pt-4 text-lg">Join? <Link to='/caption-signup' className="text-blue-600 font-medium">Register</Link></p>

        <div className="mt-6 text-center">
          <Link to='/user-login' className="flex items-center justify-center bg-green-500 py-2 text-sm font-medium text-white underline hover:text-gray-700">
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptionLogin;

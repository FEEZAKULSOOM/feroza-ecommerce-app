import React, { useState, useContext } from 'react';
import ferozaLogo from '../feroza.svg';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google.png';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import { auth, provider } from "../../utils/Firebase.js";
import { signInWithPopup } from 'firebase/auth';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../component/Loading.jsx';

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  let {getCurrentUser}=useContext(userDataContext)
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful:", result.data);
setLoading(false);
toast.success("Login Successful");
getCurrentUser();
navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };

const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true }
      );

      console.log("Google Login successful:", result.data);
    
      getCurrentUser()
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("User closed the Google auth popup before finishing.");
      } else {
        console.error("Google auth error:", error);
       
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start pb-10">
      
      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={ferozaLogo} className="w-[40px]" alt="Feroza Logo" />
        <h1 className="text-[22px] font-sans">Feroza</h1>
      </div>

      {/* Page Heading */}
      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">Welcome to Feroza, Please Login</span>
      </div>

      {/* Login Card */}
      <div className="max-w-[500px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-md rounded-lg shadow-lg flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full flex flex-col items-center justify-start gap-5">
          
          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-[50px] bg-[#42656cae] hover:bg-[#42656c] transition rounded-lg flex items-center justify-center gap-3 cursor-pointer text-white font-medium"
          >
            <img src={googleLogo} className="w-[20px] h-[20px] rounded-full" alt="Google" />
            Login with Google
          </button>

          {/* OR Divider */}
          <div className="w-full flex items-center justify-center gap-3 my-1">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-[50px] bg-transparent border-2 border-[#96969635] rounded-lg placeholder-[#ffffffc7] px-5 font-semibold outline-none focus:border-[#6060f5]"
              required
            />

            {/* Password with Eye Toggle */}
            <div className="w-full relative flex items-center">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full h-[50px] bg-transparent border-2 border-[#96969635] rounded-lg placeholder-[#ffffffc7] px-5 pr-12 font-semibold outline-none focus:border-[#6060f5]"
                required
              />
              {show ? (
                <IoEyeSharp
                  className="w-5 h-5 cursor-pointer absolute right-4 text-gray-300"
                  onClick={() => setShow(false)}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="w-5 h-5 cursor-pointer absolute right-4 text-gray-300"
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#6060f5] hover:bg-[#4a4ae6] transition rounded-lg flex items-center justify-center mt-2 text-[17px] font-semibold cursor-pointer"
            >
              { loading ? <Loading/> : "Login" }
            </button>

            {/* Register Route Redirect */}
            <p className="flex gap-2 text-sm mt-2">
              Don't have an account?
              <span
                className="text-[#5555f6cf] cursor-pointer font-semibold hover:underline"
                onClick={() => navigate('/signup')}
              >
                Create New Account
              </span>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
import React, { useState, useContext } from 'react';
import ferozaLogo from '../../feroza.svg';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios';
import  {authDataContext} from '../../context/AuthContext.jsx';
import  {adminDataContext} from '../../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import Loading from '../component/Loading.jsx';



function Login() {
  const navigate = useNavigate();
  let  [show, setShow] = useState(false);
  let  [email, setEmail] = useState("");
  let  [password, setPassword] = useState("");
   let { serverUrl} = useContext (authDataContext)
   let  {adminData , getAdmin} = useContext (adminDataContext)
   let [loading , setLoading] = useState(false)
    const adminLogin = async (e) => {
     
      e.preventDefault();
      try {
           setLoading(true)
           
        const result= await axios.post ( serverUrl + "/api/auth/adminlogin" , 
            {
                 email , password 
            },
             {
                 withCredentials:true
             }
        )
          console.log(result.data)
          setLoading(false)
         
          toast.success("Login Successful")
          getAdmin()
          navigate("/")
       
    }
    catch(error){

         console.log (error)
         setLoading(false)
         toast.error("Login Failed")
      
    }
    };
  


  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start pb-10">
      
      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
       
      >
        <img src={ferozaLogo} className="w-[40px]" alt="Feroza Logo" />
        <h1 className="text-[22px] font-sans">Feroza</h1>
      </div>

      {/* Page Heading */}
      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">Welcome to Feroza, Apply 
            to Admin Login
        </span>
      </div>

      {/* Login Card */}
      <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop-blur-md rounded-lg shadow-lg flex items-center justify-center p-6">
        <form className="w-full flex flex-col items-center justify-start gap-5"
          onSubmit={adminLogin}>
          
         
          

          {/* Inputs */}
          <div className="w-full  flex flex-col items-center justify-center gap-4">
            
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

            

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
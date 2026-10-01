import React from 'react'
import { Link } from 'react-router-dom' // Or 'react-router-dom' depending on your router version
import Title from '../component/Title.jsx'
import Footer from '../component/Footer.jsx'

function NotFound() {
  return (
    <div className="top-[70px] relative overflow-x-hidden min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col justify-between">
      
      {/* Decorative Glow Elements matching Feroza background */}
      <div className="absolute top-[20%] left-[10%] w-[250px] h-[250px] bg-[#3bcee8] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-[#0c2025] opacity-30 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main 404 Hero Section */}
      <div className="w-[100vw] min-h-[75vh] flex flex-col items-center justify-center px-4 text-center z-10 py-[60px]">
        
        {/* Animated glowing 404 number */}
        <div className="relative flex items-center justify-center">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#3bcee8] via-[#95b3f8] to-white select-none drop-shadow-[0_10px_20px_rgba(59,206,232,0.2)] animate-pulse">
            404
          </h1>
          <div className="absolute -bottom-2 text-xs sm:text-sm tracking-[0.4em] text-[#3bcee8] uppercase font-semibold bg-[#141414]/80 px-4 py-1 rounded-full border border-[#3bcee848]">
            Out of Fashion Bounds
          </div>
        </div>

        {/* Title Component matching your homepage */}
        <div className="mt-8 py-[10px]">
          <Title text1="PAGE NOT" text2="FOUND" />
        </div>

        {/* Brand Copy */}
        <p className="text-slate-300 max-w-[500px] text-[15px] sm:text-[18px] leading-relaxed mt-2 font-light px-4">
          The style destination you are looking for has been moved, renamed, or never existed in the <span className="text-[#3bcee8] font-medium">Feroza</span> collection.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
          <Link
            to="/"
            className="text-[16px] sm:text-[18px] cursor-pointer bg-[#3bcee848] hover:bg-[#3bcee870] active:bg-slate-500 py-[12px] px-[40px] rounded-2xl text-white font-medium flex items-center justify-center gap-3 border-[1px] border-[#80808049] transition-all duration-300 shadow-lg shadow-[#3bcee820] hover:scale-105"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            BACK TO HOME
          </Link>

          <Link
            to="/collections" // Replace with your shop/products route
            className="text-[16px] sm:text-[18px] cursor-pointer bg-slate-800/60 hover:bg-slate-700/80 active:bg-slate-500 py-[12px] px-[40px] rounded-2xl text-slate-200 font-medium flex items-center justify-center gap-2 border-[1px] border-[#80808049] transition-all duration-300 hover:scale-105"
           >
            EXPLORE COLLECTION
          </Link>
        </div>

      </div>

      {/* Footer component */}
      <Footer />
    </div>
  )
}

export default NotFound
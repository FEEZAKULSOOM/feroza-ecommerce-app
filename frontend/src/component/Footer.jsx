import React from 'react'
import feroza from '../feroza.svg'

function Footer() {
  return (
    <footer className="w-full bg-[#aff4d2ec] text-[#1e2223] mb-[77px] md:mb-0">
      
      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-8 md:py-12 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
        
        {/* Column 1: Brand Info */}
        <div className="w-full md:w-[35%] flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <img
              alt="Feroza Logo"
              className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]"
              src={feroza}
            />
            <span className="text-[20px] md:text-[22px] font-bold text-black tracking-wide">
              Feroza
            </span>
          </div>

          <p className="text-[14px] md:text-[15px] leading-relaxed text-[#1e2223] hidden md:block">
            Feroza is your all-in-one online shopping destination, offering quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier.
          </p>

          <p className="text-[13px] text-[#1e2223] block md:hidden">
            Fast. Easy. Feroza Shopping
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="w-full md:w-[25%] flex flex-col items-start md:items-center text-left md:text-center gap-2">
          <p className="text-[16px] md:text-[18px] font-bold uppercase tracking-wider text-black">
            COMPANY
          </p>
          <ul className="flex flex-col gap-1.5 text-[13px] md:text-[15px]">
            <li className="cursor-pointer hover:underline hidden md:block">Home</li>
            <li className="cursor-pointer hover:underline">About us</li>
            <li className="cursor-pointer hover:underline hidden md:block">Delivery</li>
            <li className="cursor-pointer hover:underline">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="w-full md:w-[30%] flex flex-col items-start md:items-center text-left md:text-center gap-2">
          <p className="text-[16px] md:text-[18px] font-bold uppercase tracking-wider text-black">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1.5 text-[13px] md:text-[15px]">
            <li>+92-319085856</li>
            <li>contact@feroza.com</li>
            <li className="hidden md:block">+92-3402077761</li>
            <li className="hidden md:block">admin@feroza.com</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-400/40"></div>

      {/* Copyright Bar */}
      <div className="w-full py-4 text-center text-[12px] md:text-[14px] text-[#1e2223]">
        Copyright 2026@feroza.com - All Rights Reserved
      </div>

    </footer>
  )
}

export default Footer
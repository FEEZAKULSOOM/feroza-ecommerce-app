import React from 'react'
import feroza from '../feroza.svg'
function Footer() {
  return (
   <div className="w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]">

    <div className="w-[100%] md:h-[30vh] h-[15vh]  md:mb-[0px] bg-[#aff4d2ec] flex items-center justify-center md:px-[50px] px-[5px]">

        <div className="md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px]">

            <div className="flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]">

                <img
                    alt=""
                    className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
                    src={feroza}
                />

                <p className="text-[19px] md:text-[20px] text-[black]">
                    Feroza
                </p>

            </div>

            <p className="text-[15px] text-[#1e2223] hidden md:block">
                Feroza is your all-in-one online shopping destination, offering quality products,
                
                 unbeatable deals, and fast delivery—all backed by trusted service designed to 
                 make your life easier.
            </p>

            <p className="text-[13px] text-[#1e2223] flex md:hidden">
                Fast. Easy. Feroza Shopping
            </p>

        </div>


        <div className="md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center">

            <div className="flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]">

                <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans">
                    COMPANY
                </p>

            </div>

            <ul>

                <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
                    Home
                </li>

                <li className=" text-[13px] md:text-[15px] text-[#1e2223] cursor-pointer">
                    About us
                </li>

                <li className= "text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
                    Delivery
                </li>

                <li className="text-[13px] md:text-[15px] text-[#1e2223] cursor-pointer">
                    Privacy Policy
                </li>

            </ul>

        </div>


        <div className="md:w-[25%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center">

            <div className="flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]">

                <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans">
                    GET IN TOUCH
                </p>

            </div>

            <ul>

                <li className="text-[13px] md:text-[15px] text-[#1e2223]">
                    +92-319085856
                </li>

                <li className="text-[13px] md:text-[15px] text-[#1e2223]">
                    contact@feroza.com
                </li>

                <li className="text-[15px] text-[#1e2223] hidden md:block">
                    +92-3402077761
                </li>

                <li className="text-[15px] text-[#1e2223] hidden md:block">
                    admin@feroza.com
                </li>

            </ul>

        </div>

    </div>


    <div className="w-[100%] h-[1px] bg-slate-400"></div>


    <div className="w-[100%] h-[5vh] md:h-[6vh] bg-[#aff4d2ec] flex items-center justify-center
    text-[14px] lg:text-[16px]">

        Copyright 2026@feroza.com-All Rights Reserved

    </div>

</div>
  )
}

export default Footer

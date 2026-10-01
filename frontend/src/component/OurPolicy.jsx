import React from 'react'
import Title from "./Title"
import { RiExchangeFundsLine } from "react-icons/ri"
import { BiSupport } from "react-icons/bi"
import { TbRosetteDiscountCheckFilled } from "react-icons/tb"

function OurPolicy() {
  return (
    <div className="w-full min-h-fit py-16 flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-10 px-4">
      
      {/* Title Header */}
      <div className="w-full text-center">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] text-blue-100 mt-2">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Cards Container */}
      <div className="w-full max-w-[1200px] flex items-center justify-center flex-wrap gap-8 lg:gap-12 my-4">
        
        {/* Card 1 */}
        <div className="w-[300px] sm:w-[350px] flex items-center justify-center flex-col gap-3 p-4">
          <RiExchangeFundsLine className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] text-[#90b9ff]" />
          <p className="font-semibold text-[19px] md:text-[22px] text-[#a5e8f7] text-center">
            Easy Exchange Policy
          </p>
          <p className="font-semibold text-[13px] md:text-[15px] text-[aliceblue] text-center">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-[300px] sm:w-[350px] flex items-center justify-center flex-col gap-3 p-4">
          <TbRosetteDiscountCheckFilled className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] text-[#90b9ff]" />
          <p className="font-semibold text-[19px] md:text-[22px] text-[#a5e8f7] text-center">
            7 Days Return Policy
          </p>
          <p className="font-semibold text-[13px] md:text-[15px] text-[aliceblue] text-center">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-[300px] sm:w-[350px] flex items-center justify-center flex-col gap-3 p-4">
          <BiSupport className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] text-[#90b9ff]" />
          <p className="font-semibold text-[19px] md:text-[22px] text-[#a5e8f7] text-center">
            Best Customer Support
          </p>
          <p className="font-semibold text-[13px] md:text-[15px] text-[aliceblue] text-center">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>

    </div>
  )
}

export default OurPolicy
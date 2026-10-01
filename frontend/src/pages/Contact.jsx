import React from 'react'
import contact from '../assets/contact.png'

function Contact() {
  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]">
      <div className="inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px]">
        <p className="text-blue-100">CONTACT <span className="text-[#a5faf7]">US</span></p>
      </div>
      <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row">
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center">
          <img alt="" className="lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm"
           src={contact} />
        </div>
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]">
          <p className="lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px]">Our Store</p>
          <div className="lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]">
            <p>Chehla Ward 30</p>
            <p>Muzaffarabad , AJK , Pakistan</p>
          </div>
          <div className="lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]">
            <p>tel: +92-3190857856</p>
            <p>Email: admin@feroza.com</p>
          </div>
          <p className="lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold">Careers at Feroza</p>
          <p className="lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]">Learn more about our teams and job openings</p>
          <button className="px-[30px] py-[20px] flex items-center justify-center text-[white] bg-transparent border active:bg-slate-600 rounded-md">View Opportunities</button>
        </div>
      </div>
      <div className="w-[100%] h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-[10px] flex-col">
        <p className="md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px]">Subscribe now &amp; get 20% off</p>
        <p className="md:text-[18px] text-[14px] text-center text-blue-100 font-semibold px-[20px]">Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.</p>
        <form action="" className="w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] px-[20px]">
          <input placeholder="Enter Your Email" className="placeholder:text-[black] bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black" required="" type="text" />
          <button type="submit" className="text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] rounded-lg shadow-sm shadow-black">Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
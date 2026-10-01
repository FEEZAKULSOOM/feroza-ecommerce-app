import React, { useState } from 'react';
import Title from '../component/Title';
import about from '../assets/about.svg';

function About() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 pt-[80px] pb-16 overflow-x-hidden">
      
      {/* Page Title */}
      <Title text1={"ABOUT"} text2={"US"} />

      {/* About Section: Image + Text */}
      <div className="w-full max-w-[1200px] px-6 flex items-center justify-center flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={about}
            alt="About OneCart"
            className="w-[80%] lg:w-[85%] max-w-[500px] shadow-lg shadow-black/60 rounded-md object-cover"
          />
        </div>

        {/* Right Side: Text Description */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-4 text-white">
          <p className="w-full text-[13px] md:text-[16px] leading-relaxed text-slate-200">
            OneCart was born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className="w-full text-[13px] md:text-[16px] leading-relaxed text-slate-200">
            Built for modern shoppers, we combine style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          
          <p className="text-[16px] md:text-[18px] font-bold text-[#a5faf7] mt-2">
            Our Mission
          </p>
          <p className="w-full text-[13px] md:text-[16px] leading-relaxed text-slate-200">
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full flex items-center justify-center flex-col gap-6 mt-8">
        <div className="inline-flex gap-2 items-center text-center text-[30px] md:text-[36px] font-semibold">
          <p className="text-blue-100">
            WHY <span className="text-[#a5faf7]">CHOOSE US</span>
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="w-full max-w-[1200px] px-6 flex items-stretch justify-center flex-col lg:flex-row gap-6 py-6">
          
          {/* Card 1 */}
          <div className="w-full lg:w-1/3 min-h-[220px] border border-gray-500/30 rounded-lg flex items-center justify-center gap-4 flex-col px-8 py-6 text-white text-center backdrop-blur-md bg-white/[0.04]">
            <b className="text-[20px] font-semibold text-[#bff1f9]">Quality Assurance</b>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full lg:w-1/3 min-h-[220px] border border-gray-500/30 rounded-lg flex items-center justify-center gap-4 flex-col px-8 py-6 text-white text-center backdrop-blur-md bg-white/[0.04]">
            <b className="text-[20px] font-semibold text-[#bff1f9]">Convenience</b>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full lg:w-1/3 min-h-[220px] border border-gray-500/30 rounded-lg flex items-center justify-center gap-4 flex-col px-8 py-6 text-white text-center backdrop-blur-md bg-white/[0.04]">
            <b className="text-[20px] font-semibold text-[#bff1f9]">Exceptional Customer Service</b>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>

        </div>
      </div>

      {/* Newsletter Subscription Banner */}
      <div className="w-full py-12 flex items-center justify-center gap-3 flex-col px-4 text-center mt-6">
        <p className="text-[22px] md:text-[30px] text-[#a5faf7] font-semibold">
          Subscribe now &amp; get 20% off
        </p>
        <p className="text-[14px] md:text-[16px] text-blue-100 max-w-[600px]">
          Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
        </p>

        <form onSubmit={handleSubscribe} className="w-full max-w-[600px] flex items-center justify-center flex-col sm:flex-row gap-3 mt-4 px-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="bg-slate-200 text-slate-900 placeholder:text-slate-600 w-full h-[45px] px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a5faf7]"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto text-[15px] px-8 py-3 bg-[#2e3030] hover:bg-slate-700 cursor-pointer text-white font-medium flex items-center justify-center border border-gray-600 rounded-lg shadow-md transition-colors duration-200 shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>

    </div>
  );
}

export default About;
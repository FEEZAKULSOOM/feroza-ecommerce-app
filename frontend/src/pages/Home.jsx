import React from 'react'
import Nav from '../component/Nav'
import { useState } from 'react'
import Background from '../component/Background.jsx'
import Hero from '../component/Hero.jsx'
import { useEffect } from 'react'
import Product from './Product.jsx'
import OurPolicy from '../component/OurPolicy.jsx'
import NewLetterBox from '../component/NewLetterBox.jsx'
import Footer from '../component/Footer.jsx'

function Home() {
  let heroData =[
     { text1:"30% OFF" , text2:"Style Yourself"}
     ,
      {  text1:"Discover Your Perfect Fit" , text2:"Live Your Best Life!"},
      {text1:"Explore the Latest Trends" , text2:"Shop Now!"},
      {text1:"On this Platform" , text2:"Your Style, Your Way!"}
  ]

  let [heroIndex , setHeroIndex] = useState(0)

useEffect(() => {
    let interval = setInterval(() => {
        setHeroIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 3000);

    return () => clearInterval(interval);

}, [])
  return (
      <div  className= "top-[70px] relative overflow-x-hidden">
    <div className='w-[100vw]  lg:h-[100vh] md:h-[50vh]
    sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <Background heroCount={heroIndex} />
      <Hero  heroCount={heroIndex} heroData={heroData[heroIndex]} setHeroCount={setHeroIndex} />
  
    </div>
    <Product/>
     <OurPolicy/>
     <NewLetterBox/>
     <Footer/>
     </div>
  )
}

export default Home
import react from'react'
import  banner1 from '../assets/banner1.png'
import  banner2 from '../assets/banner2.png'
import  banner3 from '../assets/banner3.png'
import  banner4 from '../assets/banner4.png'
function Background ({heroCount}) 
{
         if (heroCount === 0)  
         { 
            return   <img src={banner1} alt="" className="w-[100%] h-[100%] float-left
            overflow-auto object-cover" />
         }
         else if (heroCount === 1)  {
            return <img src={banner2} alt="" className="w-[100%] h-[100%] float-left
            overflow-auto object-cover" />

         }
         else if (heroCount === 2)  {
            return <img src={banner3} alt="" className="w-[100%] h-[100%] float-left
            overflow-auto object-cover" />

         }
         else { 
            return <img src={banner4} alt="" className="w-[100%] h-[100%] float-left
            overflow-auto object-cover" />}




}

 export default Background
import React from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'
import { useNavigate } from 'react-router';
function Card( {name , price , image ,id}) {
     let { currency } = useContext(ShopDataContext);
     let navigate = useNavigate()
  return (
  <div
  onClick= {()=>navigate(`/productdetail/${id}`)} className="w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a]
   backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]">

                    <img
                        alt=""
                        className="w-[100%] h-[75%] rounded-sm object-cover"
                        src={image}
                    />

                    <div className="text-[#c3f6fa] text-[18px] py-[10px]">
                        {name}
                      
                    </div>

                    <div className="text-[#f3fafa] text-[14px]">
                       {currency}.{price}
                     
                    </div>

                </div>
  )
}

export default Card


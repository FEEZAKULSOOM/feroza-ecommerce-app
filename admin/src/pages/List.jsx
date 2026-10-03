import React from 'react'
import Nav from '../component/Nav'
import SideBar from '../component/SideBar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../../context/AuthContext.jsx'
import axios from 'axios'
import { useEffect } from 'react'

export default function List() {

    let [list , setList] = useState([])
     let { serverUrl} = useContext(authDataContext)

     const removeProduct = async (id) =>  {
          try {
               let result = await axios.post(serverUrl + `/api/product/removeproduct/${id}`
                 ,{},
                 {withCredentials: true})

                  if(result.data) 
                     {
                          fetchList()
                     }
                  else {
                      console.log("Failed to remove product")
                  }
              
          }
          catch (error)  {
              console.log(error)
          }

          
          
     }

     const fetchList = async () =>  {
          try {

              let result = await axios.get(serverUrl + "/api/product/listProduct" , {withCredentials: true})
              console.log(result.data)
              setList(result.data.product)

          }
           catch (error) {

               console.log(error)

           }
     }


     useEffect(() =>  {
          fetchList()
 } , [])
  return (
    <div   className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] 
      to-[#0c2025] text-[white] relative ">
           <Nav/>
             <div className="w-[100%] h-[100%] flex items-center justify-start">
                <SideBar/>

                <div className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]"> <div className="w-[400px] h-[50px] text-[28px] 
                md:text-[40px] mb-[20px] text-white"> All Listed Products </div>
                  


        {
    list?.length > 0 ? (

        list.map((item, index) => (

            <div
                className="w-[90%] md:h-[120px] 
                min-h-[90px] h-auto bg-slate-600 rounded-xl flex items-center justify-start gap-[10px] md:gap-[30px] p-[10px] md:px-[30px]"
                key={index}
            >
                <img
                    src={item.image1}
                    alt=""
                    className="w-[60px] h-[60px] md:w-[120px] md:h-[90%] shrink-0 object-cover rounded-lg"
                />

                <div className="w-[80%] flex-1 min-w-0 flex flex-col items-start justify-center
                gap-[2px]">
                     <div 
                        title={item.name}
                        className="w-[100%] md:text-[20px] text-[15px] text-[#bef0f3] truncate"
                     >
                        {item.name}
                        </div>
                        <div className="md:text-[17px] text-[15px] text-[#bef3da] truncate w-full">
                            {item.category}
                            </div>
                            <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                                Rs.{item.price}
                            </div>


                     
                    </div>
                    <div className="w-[10%] shrink-0 h-[100%] bg-transparent flex 
                    items-center justify-center"> <span className="w-[35px] h-[30%] flex items-center justify-center rounded-md
                     md:hover:bg-red-300 md:hover:text-black cursor-pointer"
                     onClick={() =>removeProduct(item._id)}>🗑️ </span> </div>


                
            </div>



        ))

    )
    : (
        <div className="text-white text-lg">
            No Products Available.
        </div>
    )
}


                </div>



             </div>


          
       
    </div>
  )
}
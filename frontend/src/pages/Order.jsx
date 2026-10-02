import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'
import Title from '../component/Title.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import { useEffect } from 'react'
import ferozaLogo from '../feroza.svg'
import { useNavigate } from 'react-router-dom'

function Order() {
   let [ orderData , setOrderData] = useState([])
   let { currency } = useContext(ShopDataContext)
   let { serverUrl } = useContext(authDataContext)
   const navigate = useNavigate()

    const loadOrderData = async () => {
        try {
            const result = await axios.post(
                serverUrl + "/api/orders/userorders",
                {},
                {
                    withCredentials: true,
                }
            )
            let allOrderItems = []
            result.data.map((order) => {
                order.items.map((item) =>  {
                  item['status'] = order.status
                  item['payment']= order.payment
                  item ['paymentMethod']= order.paymentMethod
                  item['date'] = order.date
                  allOrderItems.push(item)

                })
            })
            setOrderData(allOrderItems.reverse())
        } catch (error) {
          console.log(error)
          
        }
          
        }

        useEffect (()=> {
          loadOrderData()
        }   ,[])



  return (
   <div class="w-[99vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden
    bg-gradient-to-l from-[#141414] to-[#0c2025]">
  <div class="h-[8%] w-[100%] text-center mt-[80px]">
   <Title text1={"MY"} text2={"ORDERS"} />
  </div>

  <div class="w-[100%] h-[92%] flex flex-wrap gap-[20px]">
     {
        orderData.length === 0 ? (
          <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
            <img 
              src={ferozaLogo} 
              alt="Feroza" 
              className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] mb-6 drop-shadow-[0_0_25px_rgba(86,219,252,0.4)]"
            />
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide mb-2">
              No Orders Found
            </h2>
            <p className="text-[#a0c5c5] text-sm sm:text-base max-w-[400px] mb-8 font-light">
              You haven't placed any orders yet. Discover our curated collections and book your first order today.
            </p>
            <button
              onClick={() => navigate('/collections')}
              className="text-[16px] sm:text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[12px] px-[40px] sm:px-[50px] rounded-2xl text-white border-[1px] border-[#9ff9f966] transition-all"
            >
              EXPLORE COLLECTIONS
            </button>
          </div>
        ) : (
          orderData.map((item , index) => 
          (
                <div key = {index} class="w-[100%] h-[10%] border-t border-b">
        <div class="w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative">
          
          <img
            alt=""
            class="w-[130px] h-[130px] rounded-md"
            src={item.image1}
          />

          <div class="flex items-start justify-center flex-col gap-[5px]">
            <p class="md:text-[25px] text-[20px] text-[#f3f9fc]">
              {item.name}
            </p>

            <div class="flex items-center gap-[8px] md:gap-[20px]">
              <p class="md:text-[18px] text-[12px] text-[#aaf4e7]">
                {currency} {item.price}.00
              </p>

              <p class="md:text-[18px] text-[12px] text-[#aaf4e7]">
                {item.quantity}
              </p>

              <p class="md:text-[18px] text-[12px] text-[#aaf4e7]">
                 {item.size}
              </p>
            </div>

            <div class="flex items-center">
              <p class="md:text-[18px] text-[12px] text-[#aaf4e7]">
                Date:
                <span class="text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]">
                  { new Date(item.date).toDateString()}
                </span>
              </p>
            </div>

            <div class="flex items-center">
              <p class="md:text-[16px] text-[12px] text-[#aaf4e7]">
                {item.paymentMethod}
              </p>
            </div>

            <div class="absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]">
              <div class="flex items-center gap-[5px]">
                <p class="min-w-2 h-2 rounded-full bg-green-500"></p>

                <p class="md:text-[17px] text-[10px] text-[#f3f9fc]">
                  {item.status}
                </p>
              </div>
            </div>

            <div class="absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]">
              <button class="md:px-[15px] px-[5px] py-[3px] md:py-[7px] rounded-md bg-[#101919]
               text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500"
               onClick = {loadOrderData}>
                Track Order
              </button>
            </div>

          </div>
        </div>
      </div>


    )) 
        )
     }

  </div>
</div>
  )
}

export default Order
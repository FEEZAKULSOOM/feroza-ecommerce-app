import React from 'react'
import Nav from '../component/Nav.jsx'
import SideBar from '../component/SideBar.jsx'
import {useState} from 'react'
import { useContext } from 'react'
import { authDataContext } from '../../context/AuthContext.jsx'
import axios from 'axios'
import { useEffect } from 'react'
import {SiEbox} from 'react-icons/si';

function Orders() {
   let [orders , setOrders] = useState([])
   let {serverUrl } = useContext(authDataContext)

   const fetchAllOrders = async ()=> {
     try {
       const result= await axios.post (serverUrl +"/api/orders/list" , {},
           { withCredentials: true}
       )
       setOrders(result.data.reverse())
     }
       catch (error) {
          console.error(error.message)
       }
   }

    const statusHandler = async(e , orderId) => {
        try {
          const result= await axios.post (serverUrl +"/api/orders/status" , 
            {orderId , status : e.target.value},
              { withCredentials: true}
          )
          if (result.data) {
               fetchAllOrders()
          }
        }
          catch (error) {
             console.error(error.message)
          }
    }

   useEffect (() => {
       fetchAllOrders()
   } , [])

  return (
    <div  className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]
     text-[white] overflow-x-hidden'>
      <Nav/>
      <div 
      className ="w-[100%] h-[100%] flex items-start lg:justify-start justify-center">
          <SideBar/>

          <div className="w-[calc(100vw-80px)] sm:w-[82%] lg:w-[85%] md:w-[70%] h-[100%] ml-[75px] sm:ml-[100px] md:ml-[250px] lg:ml-[310px] mt-[60px] md:mt-[70px]
           flex flex-col gap-[20px] md:gap-[30px] overflow-x-hidden py-[30px] md:py-[50px] px-2 sm:px-4">
  <div className="w-full max-w-[400px] text-[22px] sm:text-[28px] md:text-[40px] mb-[10px] md:mb-[20px]
   text-white font-medium">All Orders List</div>
  
       {
         orders.length === 0 ? (
           <div className="w-full max-w-[900px] bg-slate-600 rounded-xl flex flex-col items-center justify-center p-[25px] sm:p-[40px] gap-[15px] border-[1px] border-[#96eef333]">
             <SiEbox className='w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] text-black p-[10px] rounded-xl bg-white' />
             <p className="text-[18px] sm:text-[22px] font-semibold text-white">No Orders Found</p>
             <p className="text-[13px] sm:text-[15px] text-[#aaf5fa] text-center">There are currently no customer orders placed.</p>
           </div>
         ) : (
           orders.map ((order , index) => (

           <div key={index} className="w-full max-w-[900px] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[15px] md:px-[20px] gap-[15px] md:gap-[20px]">
       <SiEbox
          className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] shrink-0 text-black p-[5px] rounded-lg
          bg-[white]'/>
     <div className="flex-1 min-w-0 flex flex-col gap-2">
       <div className="flex items-start justify-center flex-col gap-[3px] md:gap-[5px]
        text-[14px] sm:text-[16px] text-[#56dbfc] break-words w-full">
           {
             order.items.map ((item , itemIndex) => {
                if(itemIndex === order.items.length - 1) {
                  return (
                    <p key={itemIndex} className="break-words">
                      {item.name.toUpperCase()} {item.quantity}
                      <span>{item.size} </span>
                    </p>
                  )
                }
                else {
                  return (
                    <p key={itemIndex} className="break-words">
                      {item.name.toUpperCase()} {item.quantity}
                      <span>{item.size} </span>
                      ,
                    </p>
                  )
                }
             })
           }

       </div>
       <div className="text-[13px] sm:text-[15px] text-green-100 break-words w-full">
         <p className="font-semibold">{order.address.fname +" " + order.address.lname}</p>
         <p>{order.address.street + ", " }</p>
         <p>{order.address.city + ", " + order.address.state + ", "
          + order.address.country + ", " + order.address.pincode}</p>
         <p>{order.address.phone}</p>
       </div>
     </div>
     <div className="text-[13px] sm:text-[15px] text-green-100 flex flex-col gap-0.5">
       <p>Items : {order.items.length}</p>
       <p>Method : {order.paymentMethod}</p>
       <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
       <p>Date : {new Date(order.date).toDateString()}</p>
       <p className="text-[17px] sm:text-[20px] font-bold text-[white]">RS  {order.amount}.00</p>
     </div>
     <select 
     onChange = { (e) => statusHandler(e , order._id)}
     value={order.status}
     className="w-full sm:w-auto px-[10px] py-[8px] sm:py-[10px] bg-slate-500 rounded-lg border-[1px] border-[#96eef3] text-[14px] cursor-pointer">
       <option value="Order Placed">Order Placed</option>
       <option value="Packing">Packing</option>
       <option value="Shipped">Shipped</option>
       <option value="Out for delivery">Out for delivery</option>
       <option value="Delivered">Delivered</option>
     </select>
   </div>
            ))
          )
        }

</div>

      </div>
      
    </div>
  )
}

export default Orders
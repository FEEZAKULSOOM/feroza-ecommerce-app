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
    <div  className ='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]
     text-[white]'>
      <Nav/>
      <div 
      className ="w-[100%] h-[100%] flex items-center lg:justify-start justify-center">
          <SideBar/>

          <div class="lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] 
          md:ml-[250px] mt-[70px]
           flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]">
  <div class="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px]
   text-white">All Orders List</div>
  
       {
         orders.length === 0 ? (
           <div class="w-[90%] bg-slate-600 rounded-xl flex flex-col items-center justify-center p-[40px] gap-[15px] border-[1px] border-[#96eef333]">
             <SiEbox className='w-[70px] h-[70px] text-black p-[10px] rounded-xl bg-white' />
             <p class="text-[22px] font-semibold text-white">No Orders Found</p>
             <p class="text-[15px] text-[#aaf5fa]">There are currently no customer orders placed.</p>
           </div>
         ) : (
           orders.map ((order , index) => (

           <div key={index} class="w-[90%] h-[40%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[10px] md:px-[20px] gap-[20px]">
       <SiEbox
          className='w-[60px] h-[60px] text-black p-[5px] rounded-lg
          bg-[white]'/>
     <div>
       <div class="flex items-start justify-center flex-col gap-[5px]
        text-[16px] text-[#56dbfc]">
           {
             order.items.map ((item , index) => {
               if(index === order.items.length - 1) {
                 return (
                   <p key={index}>
                     {item.name.toUpperCase()} {item.quantity}
                     <span>{item.size} </span>
                   </p>
                 )
               }
               else {
                 return (
                   <p key={index}>
                     {item.name.toUpperCase()} {item.quantity}
                     <span>{item.size} </span>
                     ,
                   </p>
                 )
               }
             })
           }

       </div>
       <div class="text-[15px] text-green-100">
         <p>{order.address.fname +" " + order.address.lname}</p>
         <p>{order.address.street + ", " }</p>
         <p>{order.address.city + ", " + order.address.state + ", "
          + order.address.country + ", " + order.address.pincode}</p>
         <p>{order.address.phone}</p>
       </div>
     </div>
     <div class="text-[15px] text-green-100">
       <p>Items : {order.items.length}</p>
       <p>Method : {order.paymentMethod}</p>
       <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
       <p>Date : {new Date(order.date).toDateString()}</p>
       <p class="text-[20px] text-[white]">RS  {order.amount}.00</p>
     </div>
     <select 
     onChange = { (e) => statusHandler(e , order._id)}
     value={order.status}
     class="px-[5px] py-[10px] bg-slate-500 rounded-lg border-[1px] border-[#96eef3]">
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
import React from 'react'
import Nav from '../component/Nav.jsx'
import SideBar from '../component/SideBar.jsx'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../../context/AuthContext.jsx'
import { useEffect } from 'react'
import axios from 'axios'




export default function Home() {
  
  let [ totalProducts , setTotalProducts] = useState(0);
  let [ totalOrders , setTotalOrders]= useState(0);
  let { serverUrl} = useContext(authDataContext)
const fetchCount = async () => {
  try {
    // 1. Fetch Products List
    const productsRes = await axios.get(`${serverUrl}/api/product/listproduct`, {
      withCredentials: true
    });

    console.log("Full products response payload:", productsRes.data);

    let productsList = [];

    if (Array.isArray(productsRes.data)) {
      productsList = productsRes.data;
    } else if (typeof productsRes.data === 'object' && productsRes.data !== null) {
      // Added productsRes.data.product (singular) to match your backend response
      productsList = 
        productsRes.data.product || 
        productsRes.data.products || 
        productsRes.data.productList ||
        productsRes.data.data || 
        productsRes.data.items || 
        [];
    }

    setTotalProducts(productsList.length);

    // 2. Fetch Orders List
    const ordersRes = await axios.post(`${serverUrl}/api/orders/list`, {}, {
      withCredentials: true
    });

    console.log("Full orders response payload:", ordersRes.data);

    let ordersList = [];

    if (Array.isArray(ordersRes.data)) {
      ordersList = ordersRes.data;
    } else if (typeof ordersRes.data === 'object' && ordersRes.data !== null) {
      ordersList = 
        ordersRes.data.orders || 
        ordersRes.data.orderList ||
        ordersRes.data.data || 
        ordersRes.data.items || 
        [];
    }

    setTotalOrders(ordersList.length);

  } catch (error) {
    console.log("Failed to fetch count data:", error);
  }
};

 useEffect(() => {
    fetchCount()
 }, [])

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414]
     to-[#0c2025] text-[white] relative overflow-x-hidden">

  <Nav/>

  <SideBar/>
  
  <div className="w-[calc(100vw-80px)] sm:w-[70vw] min-h-[100vh] absolute left-[75px] sm:left-[22%] md:left-[25%] flex items-start justify-start flex-col 
  gap-[25px] sm:gap-[40px] pt-[75px] sm:pt-[100px] pb-[40px] px-2 sm:px-0">

    <h1 className="text-[24px] sm:text-[35px] text-[#afe2f2] font-medium">
      OneCart Admin Panel
    </h1>

    <div className="flex items-center justify-start gap-[20px] sm:gap-[50px] flex-col md:flex-row w-full">

      <div className="text-[#dcfafd] w-full sm:w-[400px] max-w-[95%] sm:max-w-[90%] h-[150px] sm:h-[200px] bg-[#0000002e] 
      flex items-center justify-center flex-col gap-[12px] sm:gap-[20px] rounded-lg shadow-sm shadow-black backdrop-blur-lg md:text-[25px] text-[17px] sm:text-[20px] border-[1px] border-[#969595]">
        Total No. of Products :

        <span className="px-[16px] sm:px-[20px] py-[6px] sm:py-[10px] bg-[#030e11] rounded-lg flex items-center
         justify-center border-[1px] border-[#969595] text-[16px] sm:text-[22px]">
          {totalProducts}
        </span>
      </div>

      <div className="text-[#dcfafd] w-full sm:w-[400px] max-w-[95%] sm:max-w-[90%] h-[150px] sm:h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[12px] sm:gap-[20px] rounded-lg shadow-sm shadow-black backdrop-blur-lg md:text-[25px] text-[17px] sm:text-[20px] border-[1px] border-[#969595]">
        Total No. of Orders :

        <span className="px-[16px] sm:px-[20px] py-[6px] sm:py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595] text-[16px] sm:text-[22px]">
          {totalOrders}
        </span>
      </div>

    </div>

  </div>

</div>
  )
}
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'
import { useState } from 'react'
import Card from './Card.jsx'
import Title from './Title.jsx'
function BestSeller() {


     let {products} =useContext(ShopDataContext);
     let [bestSeller , setBestSeller] = useState([]);

     useEffect(() => {

         let filteredProducts = products.filter(product => product.bestSeller === true);
         setBestSeller(filteredProducts);
         
     } , [products])
  return  (

     <div>


            <div className="h-[8%] w-[100%] text-center mt-[50px]">

                  <Title text1={"BEST"} text2={"SELLER"} />

                <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
                    Tried, Tested, Loved – Discover Our All-Time Best Sellers.
                </p>
    </div>
                 <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center
                  flex-wrap gap-[50px]">
                    {
   bestSeller.map((item , index) => 
                    <Card key={index} name={item.name} price={item.price} image={item.image1} id={item._id} />)
                    }
                  </div>


            
            </div>


            





           

  )
}

export default BestSeller

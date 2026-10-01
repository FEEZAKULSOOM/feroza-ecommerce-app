import React from 'react'
import Title from './Title.jsx'
import { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'

function CardTotal() {
    const { currency , delivery_fee , getCartAmount } = useContext(ShopDataContext);
  return (
    
     <>
   
    <div className="w-full lg:ml-[30px] ">
      <div className="text-xl text-center md:text-start md:ml-[8px] py-[10px]">
        <Title text1={'CARD'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]">
        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>

        <hr />

        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>

        <hr />

        <div className="flex justify-between text-white text-[18px] p-[10px]">
          <b>Total</b>
          <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
    </div>

  
  </>

  )
}

export default CardTotal

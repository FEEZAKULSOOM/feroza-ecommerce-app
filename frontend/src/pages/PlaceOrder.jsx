import React from 'react'
import Title from '../component/Title.jsx'
import {useState} from 'react'
import CardTotal from '../component/CardTotal.jsx'
import safe from '../assets/safe.png'
import { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading.jsx'

function PlaceOrder() {


    let [method , setMethod] = useState("COD")
    let [loading , setLoading] = useState(false)
    let navigate =useNavigate()
     let  [formData , setFormData] = useState({
         fname : "",
         lname : "",
         email : "",
         phone : "",
         address : "",
         city : "",
         state : "",
         pincode : "",
         country : "",
         
     })
     const  { cartItem , setCartItem , getCartAmount , 
          delivery_fee , currency , products} = useContext(ShopDataContext)
     
      let {serverUrl} = useContext(authDataContext)


     const handleChange = (e) => {
const name = e.target.name;
    const  value = e.target.value;
         setFormData({...formData , [name] : value})
     }

      const handleSubmit =  async(e) => {
        e.preventDefault();

         try {

             setLoading(true)
             let orderItems =[]
             for (const items in cartItem) {
                 for ( const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
const product = products.find((product) => product._id === items)

if (product) {
    const itemInfo = structuredClone(product)
    itemInfo.size = item
    itemInfo.quantity = cartItem[items][item]
    orderItems.push(itemInfo)
}
                    }
                 }
             }
              let orderData =  {
                 address : formData,
                 items: orderItems,
                 delivery_fee : delivery_fee,
                 total : getCartAmount() + delivery_fee
             }

             switch (method) 
             {
                 case "COD" :
                    const result =await  axios.post(serverUrl + "/api/orders/placeorder", {orderData} , 
                        { withCredentials :true} )
                         console.log(result.data)
                         setLoading(false)
                      


                          if (result.data) {
                               toast.success("Order Placed Successfully")
                              
                              setCartItem({})
                              navigate("/order")
                          }
                          else {
                            console.log(result.data.message)
                            setLoading(false)
                            toast.error(result.data?.message || "Order placement failed")
                          }
                         break;

case "safepay": 
    const result2 = await axios.post(
        serverUrl + "/api/orders/orderbysafepay",
        {orderData},
        { withCredentials :true }
    )

    setLoading(false)
    console.log(result2.data)
   

    if (result2.data.checkoutURL) {
       toast.info("Redirecting to payment gateway...")
        window.location.href = result2.data.checkoutURL
    }

    break;


                         default:
                             break;
                     
                     
         }
        }
          catch (error) {
             console.log(error)
              setLoading(false)
              toast.error("Order Failed")
          }
      }


    
  return (
   <div className="w-[100vw] min-h-[100vh]
    bg-gradient-to-l from-[#141414] to-[#0c2025]
    flex items-center justify-center flex-col md:flex-row gap-[50px] relative
   pt-[70px]">

 <div className="lg:w-[50%] w-[100%] min-h-[100%] flex items-center 
  justify-center gap-[30px] ">
    <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center
     justify-center gap-[10px] flex-col">

     <CardTotal />

      <div className="py-[10px] mt-[30px] md:mt-[0px] ">
      <Title text1="PAYMENT" text2="METHOD"  />
      </div>

      <div className="w-[100%] h-[10vh] lg:h-[100px] flex items-start lg:mt-[0px] justify-center gap-[50px]">

        <button type="button" className={`w-[150px] h-[50px] rounded-sm ${method === "safepay" ? "border-[5px] border-blue-900" : ""}`}
         onClick = {()=>setMethod("safepay")}>
          <img
            className={`w-[100%] h-[100%] object-fill rounded-sm`}
           
            alt=""
            src={safe}
          />
        </button>

        <button className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8]
         to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold 
           ${method === "COD"  ? "border-[5px] border-blue-900 rounded-sm" : ""}`}
           onClick = {()=>setMethod("COD")}>
          CASH ON DELIVERY
        </button>

      </div>


    </div>
  </div>
  <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center 
  lg:mt-[0px]  md:pt-[35px] pb-[83px] md:pb-[0px]  ">
    <form action="" className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
    id="place-order-form"
     onSubmit={handleSubmit}>

      <div className="py-[10px] text-center md:text-start">
  <Title text1="SHIPPING" text2="ASSRESS" />
      </div>

      <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
        <input
          placeholder="First name"
          className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
          required
          type="text"
         
          
          onChange = {handleChange}
             name = "fname" value = {formData.fname}        />

        <input
          placeholder="Last name"
          className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
              onChange = {handleChange}
             name = "lname" value = {formData.lname}   
        />
      </div>

      <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
        <input
          placeholder="Email address"
          className="w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700
           placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="email"
           onChange = {handleChange}
             name = "email" value = {formData.email}   
        />
      </div>

      <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
        <input
          placeholder="street"
          className="w-[100%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434]
           placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
              onChange = {handleChange}
             name = "address" value = {formData.address}   
        />
      </div>

      <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
        <input
          placeholder="City"
          className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
              onChange = {handleChange}
             name = "city" value = {formData.city}   
        />

        <input
          placeholder="State"
          className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
               onChange = {handleChange}
             name = "state" value = {formData.state}   
        />
      </div>

      <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
        <input
          placeholder="Pincode"
          className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
             onChange = {handleChange}
             name = "pincode" value = {formData.pincode}   
        />

        <input
          placeholder="Country"
          className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
     onChange = {handleChange}
             name = "country" value = {formData.country}   
        />
      </div>

      <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
        <input
          placeholder="Phone"
          className="w-[100%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
          required
          type="text"
              onChange = {handleChange}
             name = "phone" value = {formData.phone}   
        />
      </div>


            <div className="w-full flex justify-center mt-[20px] mb-[20px]">
    <button
        type="submit"
        form="place-order-form"
        className="text-[18px] active:bg-slate-500 cursor-pointer
        bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white
        flex items-center justify-center gap-[20px]
        border-[1px] border-[#80808049]"
  >
        { loading ? <Loading/> : "Place Order"}
    </button>
</div>



    </form>
  </div>

 

</div>
  )
}

export default PlaceOrder

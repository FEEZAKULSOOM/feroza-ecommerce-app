import React, { createContext, useState, useContext, useEffect } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext.jsx'

export const ShopDataContext = createContext()

function ShopContext({ children }) {
    let [products, setProducts] = useState([])
    let [search, setSearch] = useState("")
    let [showSearch , setShowSearch] = useState(false)
    let { serverUrl } = useContext(authDataContext)
    let [cartItem , setCartItem] = useState({})
    let { userData} = useContext(userDataContext)

    let currency = "Rs"
    let delivery_fee = 100


      const addToCart   = async ( itemId , size) => {
          if(!size) {
            console.log("Please select a size")
            return;

              
          }

           let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
         if(cartData[itemId][size]) {
             cartData[itemId][size] += 1;
         }
         else {
             cartData[itemId][size] = 1;
         }
    }
    else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
    if (userData)  {
          try {
             let res= await axios.post(serverUrl + "/api/cart/addtocart" ,  {
                itemId , size  
              } , {
                withCredentials: true})
                 console.log(res)
          }
          catch (err) {
              console.log(err)
          }
    }
    else {
         console.log("add error")
    }
    setCartItem(cartData);
    console.log(cartData)



      }


const getUserCart = async () => {

    try {
        let res = await axios.post(
            serverUrl + "/api/cart/getusercart",
            {},
            {
                withCredentials: true
            }
        )

        setCartItem(res.data.userData.cartData)

        console.log(res.data.userData.cartData)
    }
    catch (err) {
        console.log(err)
    }

}
       const getCardCount = () => {

        let totalCount=0;
        for(const items in cartItem) {
            for(const item in cartItem[items]) {
                try {
                    if(cartItem[items][item]>0) {
                        totalCount += cartItem[items][item]
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        return totalCount
           
       }
      const updateQuantity = async (itemId , size , quantity) => {

         let cartData = structuredClone(cartItem);
         cartData[itemId][size] = quantity;
         setCartItem(cartData);
          if (userData) {
                       try {
              let res = await axios.post(serverUrl + "/api/cart/updatecart" , {
                  itemId , size , quantity
              } , {
                  withCredentials: true
              })
              console.log(res)
          }
          catch (err) {
              console.log(err)
          }

          }

      }




    const getProducts = async () => {
        try {
            let response = await axios.get(serverUrl + "/api/product/listproduct")
            
            // Check if backend wraps array inside response.data.products or response.data
           if (response.data && Array.isArray(response.data.product)) {
    setProducts(response.data.product)
} else if (Array.isArray(response.data)) {
    setProducts(response.data)
} else {
    setProducts([])
    console.warn("API response is not an array:", response.data)
}
            console.log("Fetched Products:", response.data)
        } catch (error) {
            console.error("Error in getProducts:", error)
            setProducts([]) // Fallback to empty array on error
        }
    }

    useEffect(() => {
        if (serverUrl) {
            getProducts()
        }
    }, [serverUrl])

    useEffect(() => {
        if (userData) {
            getUserCart()
        }
    }, [userData])

  const getCartAmount  =  () => {
           let cartAmount = 0
           for (const items in cartItem) {
           
               
                 let itemInfo= products.find((product) => product._id === items)
                 for (const item in cartItem[items]) {
                      try {
                          if (cartItem[items][item] > 0) {
                              cartAmount += itemInfo.price * cartItem[items][item]
                      }
                    }
                    catch ( error ) 
                        {
                            console.log(error)

                        }
                     
                 }
                
             
           }
           return cartAmount

     }

    let value = { 
        products,
        currency,
        delivery_fee,
        getProducts
        ,  
        search,
        setSearch,
        showSearch,
        setShowSearch
        ,
        addToCart,
        cartItem,
        getCardCount,
        setCartItem ,
        updateQuantity,
        getCartAmount
    }

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    )
}

export default ShopContext
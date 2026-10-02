import React, { useContext, useEffect } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { MdDeleteSweep } from "react-icons/md"
import Title from '../component/Title.jsx'
import CardTotal from '../component/CardTotal.jsx'
import ferozaLogo from '../feroza.svg'
import { toast } from 'react-toastify'

function Cart() {

    const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext)

    const [cartData, setCartData] = useState([])

    const navigate = useNavigate()

  useEffect(() => {

    const tempData = [];

    for (const items in cartItem) {

        for (const item in cartItem[items]) {

            if (cartItem[items][item] > 0) {

                tempData.push({
                    _id: items,
                    size: item,
                    quantity: cartItem[items][item]
                });

            }

        }

    }

    setCartData(tempData);

}, [cartItem]);

    return (

<div
    className="
        w-full
        min-h-[100vh]
        p-[10px]
        sm:p-[15px]
        md:p-[20px]
        pb-[100px]
        md:pb-[20px]
        overflow-hidden
        bg-gradient-to-l
        from-[#141414]
        to-[#0c2025]
    "
>

            {/* ================= CART TITLE ================= */}

            <div
                className="
                    h-auto
                    w-full
                    text-center
                    mt-[80px]
                    mb-[20px]
                "
            >

                <Title text1={'YOUR'} text2={'CART'} />

            </div>

            {/* ================= EMPTY STATE WITH FEROZA LOGO ================= */}
            {cartData.length === 0 ? (
                <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                    <img 
                        src={ferozaLogo} 
                        alt="Feroza" 
                        className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] mb-6 drop-shadow-[0_0_25px_rgba(86,219,252,0.4)]"
                    />
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide mb-2">
                        Your Cart is Empty
                    </h2>
                    <p className="text-[#a0c5c5] text-sm sm:text-base max-w-[380px] mb-8 font-light">
                        There are currently no items in your cart. Explore our latest arrivals to find something you love.
                    </p>
                    <button
                        onClick={() => navigate('/collections')}
                        className="text-[16px] sm:text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[12px] px-[40px] sm:px-[50px] rounded-2xl text-white border-[1px] border-[#9ff9f966] transition-all"
                    >
                        EXPLORE COLLECTIONS
                    </button>
                </div>
            ) : (
                <>
                    {/* ================= CART CONTENT ================= */}

                    <div
                        className="
                            w-full
                            h-auto
                            flex
                            flex-col
                            gap-[20px]
                        "
                    >

                        {
                            cartData.map((item, index) => {

                                const productData = products.find(
                                    product => product._id === item._id
                                )

                                if (!productData) return null

                                return (

                                    <div
                                        key={index}
                                        className="
                                            w-full
                                            min-h-[125px]
                                            border-t
                                            border-b
                                        "
                                    >

                                        <div
                                            className="
                                                w-full
                                                min-h-[115px]
                                                flex
                                                items-center
                                                gap-3
                                                sm:gap-4
                                                md:gap-6
                                                bg-[#51808048]
                                                py-[10px]
                                                px-[10px]
                                                sm:px-[15px]
                                                md:px-[20px]
                                                rounded-2xl
                                                relative
                                            "
                                        >

                                            <img
                                                className="
                                                    w-[60px]
                                                    h-[60px]
                                                    sm:w-[80px]
                                                    sm:h-[80px]
                                                    md:w-[100px]
                                                    md:h-[100px]
                                                    rounded-md
                                                    object-cover
                                                    shrink-0
                                                "
                                                alt=""
                                                src={productData.image1}
                                            />


                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-center
                                                    flex-col
                                                    gap-[7px]
                                                    sm:gap-[10px]
                                                    min-w-0
                                                    pr-[85px]
                                                    sm:pr-[100px]
                                                    md:pr-0
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-[15px]
                                                        sm:text-[20px]
                                                        md:text-[25px]
                                                        text-[#f3f9fc]
                                                        truncate
                                                        max-w-[130px]
                                                        sm:max-w-[250px]
                                                        md:max-w-none
                                                    "
                                                >
                                                    {productData.name}
                                                </p>


                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-[8px]
                                                        sm:gap-[15px]
                                                        md:gap-[20px]
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-[14px]
                                                            sm:text-[17px]
                                                            md:text-[20px]
                                                            text-[#aaf4e7]
                                                        "
                                                    >
                                                        {currency} {productData.price}
                                                    </p>


                                                    {/* SIZE */}

                                                    <p
                                                        className="
                                                            w-[32px]
                                                            h-[32px]
                                                            sm:w-[36px]
                                                            sm:h-[36px]
                                                            md:w-[40px]
                                                            md:h-[40px]
                                                            text-[13px]
                                                            sm:text-[15px]
                                                            md:text-[16px]
                                                            text-[white]
                                                            bg-[#518080b4]
                                                            rounded-md
                                                            mt-[5px]
                                                            flex
                                                            items-center
                                                            justify-center
                                                            border-[1px]
                                                            border-[#9ff9f9]
                                                            shrink-0
                                                        "
                                                    >
                                                        {item.size}
                                                    </p>

                                                </div>

                                            </div>


                                            <input
                                                min="1"
                                                value={item.quantity}
                                                className="
                                                    w-[40px]
                                                    sm:w-[50px]
                                                    md:max-w-20
                                                    md:w-auto
                                                    py-[5px]
                                                    sm:py-[7px]
                                                    md:py-2
                                                    px-[5px]
                                                    sm:px-2
                                                    text-[white]
                                                    text-[15px]
                                                    sm:text-[17px]
                                                    md:text-[18px]
                                                    font-semibold
                                                    bg-[#518080b4]
                                                    absolute
                                                    top-[50%]
                                                    -translate-y-1/2
                                                    right-[45px]
                                                    sm:right-[65px]
                                                    md:top-[40%]
                                                    md:left-[50%]
                                                    md:right-auto
                                                    border-[1px]
                                                    border-[#9ff9f9]
                                                    rounded-md
                                                    mt-[20px]    
                                                    md:mt-[35px]                                                              mt-[15px]
                                                 
                                                "
                                                type="number"

                                                onChange={(e) =>
                                                    e.target.value === " " ||
                                                    e.target.value === '0'
                                                        ? null
                                                        : updateQuantity(
                                                            item._id,
                                                            item.size,
                                                            Number(e.target.value)
                                                        )
                                                }
                                            />


                                            <MdDeleteSweep
                                                className="
                                                    text-[#9ff9f9]
                                                    w-[22px]
                                                    h-[22px]
                                                    sm:w-[25px]
                                                    sm:h-[25px]
                                                    absolute
                                                    top-[50%]
                                                    -translate-y-1/2
                                                    right-[8px]
                                                    sm:right-[15px]
                                                    md:top-[40%]
                                                    md:right-[5%]
                                                    mt-[20px]
                                                    md:mt-[35px]

                                                "
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        item.size,
                                                        0
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>

                                )

                            })
                        }

                    </div>

                    <div className="flex justify-start items-end my-20">
                        <div className="w-full sm:w-[450px]">
                            <CardTotal />
                            <button 
                                onClick={() => { 
                                    if (cartData.length > 0) {
                                        navigate('/placeorder')
                                        toast.success("Proceeding to checkout")
                                    }
                                }}
                                className="text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>

    )

}

export default Cart
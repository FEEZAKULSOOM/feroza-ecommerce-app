
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import { ShopDataContext } from "../context/ShopContext.jsx";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

function OrderConfirmation() {

    const { serverUrl } = useContext(authDataContext);
    const { setCartItem } = useContext(ShopDataContext);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your payment...");


useEffect(() => {

  const checkPayment = async () => {
    try {
        const receiptId = searchParams.get("order_id");
        const trackerToken = searchParams.get("tracker");

        console.log("Order ID:", receiptId);
        console.log("Tracker:", trackerToken);

        if (!receiptId || !trackerToken) {
            setStatus("failed");
            setMessage("Payment information is missing.");
            return;
        }

        // Verify payment with backend
        const { data } = await axios.post(
            serverUrl + "/api/orders/verifysafepay",
            {
                receiptId,
                trackerToken
            },
            {
                withCredentials: true
            }
        );

        console.log("SafePay verification:", data);

        if (data.status) {
            // Clear frontend cart
            setCartItem({});

            setStatus("success");
            setMessage("Your payment has been successfully completed.");
        } else {
            setStatus("failed");
            setMessage(
                data.message || "Payment verification failed."
            );
        }

    } catch (error) {
        console.log(
            "SafePay verification error:",
            error.response?.data || error.message
        );

        setStatus("failed");

        setMessage(
            error.response?.data?.message ||
            "Unable to verify your payment."
        );
    }
};

    checkPayment();

}, []);





    return (

        <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#07171b] flex items-center justify-center px-4">

            <div className="w-full max-w-[500px] bg-[#111b1f] border border-[#2b4449] rounded-2xl shadow-2xl p-8 sm:p-10 text-white text-center">

                {/* Icon */}

                {status === "verifying" && (

                    <div className="flex justify-center mb-6">

                        <div className="w-20 h-20 rounded-full border-4 border-[#56dbfc] border-t-transparent animate-spin"></div>

                    </div>

                )}

                {status === "success" && (

                    <div className="flex justify-center mb-6">

                        <FaCheckCircle className="text-green-400 text-[75px]" />

                    </div>

                )}

                {status === "failed" && (

                    <div className="flex justify-center mb-6">

                        <FaTimesCircle className="text-red-400 text-[75px]" />

                    </div>

                )}

                {/* Heading */}

                {status === "verifying" && (

                    <h1 className="text-2xl sm:text-3xl font-semibold mb-3">

                        Verifying Payment

                    </h1>

                )}

                {status === "success" && (

                    <h1 className="text-2xl sm:text-3xl font-semibold mb-3 text-green-300">

                        Payment Successful

                    </h1>

                )}

                {status === "failed" && (

                    <h1 className="text-2xl sm:text-3xl font-semibold mb-3 text-red-300">

                        Payment Verification Failed

                    </h1>

                )}

                {/* Message */}

                <p className="text-gray-300 text-sm sm:text-base leading-6 mb-8">

                    {message}

                </p>

                {/* Payment information */}

                <div className="bg-[#17272c] rounded-xl p-4 mb-7 flex items-center gap-4 text-left">

                    <div className="w-11 h-11 rounded-lg bg-[#56dbfc] flex items-center justify-center shrink-0">

                        <MdPayment className="text-[#0c2025] text-2xl" />

                    </div>

                    <div>

                        <p className="text-sm text-gray-400">

                            Payment Method

                        </p>

                        <p className="font-medium text-white">

                            SafePay

                        </p>

                    </div>

                </div>

                {/* Buttons */}

                {status === "success" && (

                    <button
                        onClick={() => navigate("/order")}
                        className="w-full py-3 rounded-lg bg-[#56dbfc] text-[#0c2025] font-semibold hover:bg-[#8be7ff] transition-all duration-200"
                    >
                        View My Orders
                    </button>

                )}

                {status === "failed" && (

                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 rounded-lg bg-[#56dbfc] text-[#0c2025] font-semibold hover:bg-[#8be7ff] transition-all duration-200"
                    >
                        Return to Home
                    </button>

                )}

                {status === "verifying" && (

                    <div className="text-sm text-gray-500">

                        Please wait while we confirm your payment.

                    </div>

                )}

            </div>

        </div>

    );
}

export default OrderConfirmation;


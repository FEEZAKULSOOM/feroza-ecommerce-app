import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import safepay from "../config/safepay.js";




const currency = "PKR";

 




export const verifySafePay = async (req, res) => {
    try {
        // 1. Extract receipt ID and tracker token (handling both direct frontend payload and webhook structures)
        const receiptId =
            req.body?.receiptId ||
            req.body?.data?.order_id ||
            req.body?.order_id;

        const trackerToken =
            req.body?.trackerToken ||
            req.body?.data?.tracker?.token ||
            req.body?.tracker?.token ||
            req.body?.tracker;

        // 2. Validate required fields
        if (!receiptId || !trackerToken) {
            return res.status(400).json({
                status: false,
                message: "Order ID or tracker token missing from request"
            });
        }

        // 3. Find the order in the database
        const order = await Order.findById(receiptId);

        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        // 4. Mark payment as complete and store the tracker token as receipt
        order.payment = true;
        order.receipt = trackerToken;

        await order.save();

        // 5. Clear user's cart
        await User.findByIdAndUpdate(
            order.userId,
            {
                cartData: {}
            }
        );

        return res.status(200).json({
            status: true,
            message: "Payment successful"
        });

    } catch (error) {
        console.log("SafePay verification error:", error);

        return res.status(500).json({
            status: false,
            message: "Payment verification error",
            error: error.message
        });
    }
};









export const placeOrderSafePay = async (req, res) => {
  try {
    const { items, total, address } = req.body.orderData || req.body;
    const userId = req.userId;

    if (!items || !total || !address) {
      return res.status(400).json({
        message: "Incomplete order data: items, total, and address are required"
      });
    }

    // 1. Save the order to MongoDB
    const orderData = {
      items,
      amount: total,
      address,
      userId,
      paymentMethod: "safepay",
      payment: false,
      date: Date.now()
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // 2. Request a payment tracker token from Safepay (Sanitized PKR minor units)
    const amountInCents = Math.round(Number(total) * 100);
    const { token } = await safepay.payments.create({
      amount: amountInCents,
      currency: "PKR" // ✅ Fixed: Defined currency as "PKR" directly
    });

    // 3. Generate Safepay Hosted Checkout URL with correct user-facing endpoints
    const checkoutURL = safepay.checkout.create({
      token,
      orderId: newOrder._id.toString(),
      cancelUrl: "https://feroza-ecommerce-app-frontend.onrender.com/placeorder", // ✅ Points to frontend placeorder
      redirectUrl: "https://feroza-ecommerce-app-frontend.onrender.com/order-confirmation",
      source: "custom",
      webhooks: true
    });

    // 4. Return response
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: newOrder._id,
      checkoutURL
    });

  } catch (error) {
    console.error("Order placement error:", error);
    return res.status(500).json({
      success: false,
      message: "Order placement error",
      error: error.message
    });
  }
};









export const placeOrder = async (req, res) => {

    try {

        const { items, total, address } = req.body.orderData;

        const userId = req.userId;

        const orderData = {
            items,
            amount: total,
            address,
            userId,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);

        await newOrder.save();

        await User.findByIdAndUpdate(
            userId,
            { cartData: {} }
        );

        return res.status(200).json({
            message: "Order placed successfully"
        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Order placement error",
            error: error.message
        });

    }

}
//for user
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await Order.find({ userId });

        return res.status(200).json(orders);
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "User orders error",
            error: error.message
        });
    }
}

//for admin
export const allOrders = async (req, res) => {

     try {

        const orders = await Order.find({});

        return res.status(200).json(orders);
     }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "All orders error",
            error: error.message
        });
    }
}


//for admin
 export const updateOrderStatus = async (req, res) => {


      try {
            const { orderId  , status } = req.body;

             await Order.findByIdAndUpdate(orderId, { status });

             return res.status(200).json({ message: "Order status updated successfully" });
      }
     catch (error) {

         console.log(error);

         return res.status(500).json({
             message: "Order status update error",
             error: error.message
         });
     }
 }
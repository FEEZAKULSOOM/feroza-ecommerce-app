
import  uploadOnCloudinary  from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try {
          let { name, description, price, category,
            sizes , bestSeller, subCategory , date } = req.body

            let image1= await uploadOnCloudinary(req.files.image1[0].path)
            let image2= await uploadOnCloudinary(req.files.image2[0].path)
            let image3= await uploadOnCloudinary(req.files.image3[0].path)
            let image4= await uploadOnCloudinary(req.files.image4[0].path)

             let productData = {
                 name,
                 description,
                 price : Number(price),
                 category,
                 sizes: JSON.parse(sizes),
                 bestSeller : bestSeller === "true" ? true : false,
                 subCategory,
                 image1,
                 image2,
                 image3,
                 image4,
                  date: Date.now()
                
             }

             let product = await Product.create(productData)
             return res.status(200).json({ message: "Product added successfully", product })


    }
   catch(error) {
     console.log("Add product error"  , error)
     return res.status(500).json({ message: "Internal server error", error: error.message });
    
   }
    
}
export const listProduct = async (req, res) => {


    try {
         const product = await Product.find({})
         return res.status(200).json({ message: "Product list", product })


    }
   catch(error) {
     console.log("List product error"  , error)
     return res.status(500).json({ message: "Internal server error", error: error.message });

   }
    
}
// export const getProduct = async (req, res) => {
//     try {

//     }
//    catch() {

//    }
    
// }
export const removeProduct = async (req, res) => {

    try {
          let { id } = req.params
             const product = await Product.findByIdAndDelete(id)
             return res.status(200).json({ message: "Product removed successfully", product })

    }
   catch(error) {
     console.log("Remove product error"  , error)
     return res.status(500).json({ message: "Internal server error", error: error.message });

   }
    
}

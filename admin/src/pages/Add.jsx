import react, { useState } from 'react'
import Nav from '../component/Nav'
import SideBar from '../component/SideBar'
import upload from '../assets/upload.png'
import { useContext } from 'react'
 import { authDataContext } from '../../context/AuthContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';
import Loading from '../component/Loading.jsx'

export default function Add() {
    let [image1, setImage1] = useState(false)
    let [image2, setImage2] = useState(false)
    let [image3, setImage3] = useState(false)
    let [image4, setImage4] = useState(false)
    let [name, setName] = useState("")
    let [description, setDescription] = useState("")
    let [price, setPrice] = useState("")
    let [category, setCategory] = useState("Men")
    let [bestSeller, setBestSeller] = useState(false)
    let [subCategory, setSubCategory] = useState("TopWear")
    let [sizes, setSizes] = useState([])
    let { serverUrl } = useContext(authDataContext)
    let [ loading , setLoading] = useState(false)

    const handleAddProduct = async (e) => {

        e.preventDefault();
        setLoading(true);
         try {
            let formData = new FormData();
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);
            formData.append("image4", image4);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("bestSeller", bestSeller);
            formData.append("subCategory", subCategory);
            formData.append("sizes", JSON.stringify(sizes));

            let result= await axios.post(serverUrl + "/api/product/addproduct", 
               formData
                , {
                    withCredentials: true
                }
            );
            console.log(result.data)
         
            setLoading(false)


            if (result.data) {
                   toast.success("Product Added Successfully")
                 setName("")
                 setDescription("")
                 setPrice("")
                 setCategory("Men")
                 setBestSeller(false)
                 setSubCategory("TopWear")
                 setSizes([])
                 setImage1(false)
                 setImage2(false)
                 setImage3(false)
                 setImage4(false)
            }
         }

          catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("Failed to Add Product")

          }




    }
    return (
       <div
    className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] 
to-[#0c2025] text-[white] relative overflow-x-hidden"
>
    <Nav />
    <SideBar />

    <div
        className="w-[calc(100vw-70px)] sm:w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden 
absolute right-0 bottom-0 sm:bottom-[5%]"
    >
        <form
            onSubmit={handleAddProduct}
            action=""
            className="w-[100%] md:w-[90%] h-[100%] mt-[60px] md:mt-[70px] flex flex-col gap-[20px] md:gap-[30px] 
py-[40px] md:py-[90px] px-[15px] sm:px-[30px] md:px-[60px]"
        >
            <div className="w-full max-w-[400px] h-auto min-h-[40px] md:h-[50px] text-[22px] sm:text-[25px] md:text-[40px] text-white">
                Add Product Page
            </div>

            <div
                className="w-full sm:w-[80%] h-auto min-h-[110px] md:h-[130px] flex items-start justify-center flex-col mt-[10px] md:mt-[20px] gap-[10px]"
            >
                <p className="text-[18px] sm:text-[20px] md:text-[25px] font-semibold">
                    Upload Images
                </p>

                <div className="w-[100%] h-[100%] flex items-center justify-start gap-1 sm:gap-2">
                    <label
                        htmlFor="image1"
                        className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
                    >
                        <img
                            alt=""
                            className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d]
border-[2px]"
                            src={!image1 ? upload : URL.createObjectURL(image1)}
                        />

                        <input
                            id="image1"
                            hidden
                            required
                            type="file"
                            onChange={(e) => setImage1(e.target.files[0])}
                        />
                    </label>

                    <label
                        htmlFor="image2"
                        className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
                    >
                        <img
                            alt=""
                            className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]"
                            src={!image2 ? upload : URL.createObjectURL(image2)}
                        />

                        <input
                            id="image2"
                            hidden
                            required
                            type="file"
                            onChange={(e) => setImage2(e.target.files[0])}
                        />
                    </label>

                    <label
                        htmlFor="image3"
                        className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
                    >
                        <img
                            alt=""
                            className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]"
                            src={!image3 ? upload : URL.createObjectURL(image3)}
                        />

                        <input
                            id="image3"
                            hidden
                            required
                            type="file"
                            onChange={(e) => setImage3(e.target.files[0])}
                        />
                    </label>

                    <label
                        htmlFor="image4"
                        className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
                    >
                        <img
                            alt=""
                            className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]"
                            src={!image4 ? upload : URL.createObjectURL(image4)}
                        />

                        <input
                            id="image4"
                            hidden
                            required
                            type="file"
                            onChange={(e) => setImage4(e.target.files[0])}
                        />
                    </label>
                </div>
            </div>

            <div
                className="w-full sm:w-[80%] h-auto min-h-[80px] md:h-[100px] flex items-start justify-center flex-col gap-[8px] md:gap-[10px]"
            >
                <p className="text-[18px] sm:text-[20px] md:text-[25px] font-semibold">
                    Product Name
                </p>

                <input
                    placeholder="Type here"
                    className="w-full md:w-[600px] max-w-[98%] h-[40px] rounded-lg 
hover:border-[#46d1f7] border-[2px] cursor-pointer
bg-slate-600 px-[15px] md:px-[20px] text-[16px] md:text-[18px] placeholder:text-[#ffffffc2]"
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>

            <div
                className="w-full sm:w-[80%] flex items-start justify-center flex-col gap-[8px] md:gap-[10px]"
            >
                <p className="text-[18px] sm:text-[20px] md:text-[25px] font-semibold">
                    Product Description
                </p>

                <textarea
                    type="text"
                    placeholder="Type here"
                    className="w-full md:w-[600px] max-w-[98%] h-[90px] md:h-[100px] rounded-lg
hover:border-[#46d1f7] border-[2px] cursor-pointer
bg-slate-600 px-[15px] md:px-[20px] py-[10px] text-[16px] md:text-[18px] placeholder:text-[#ffffffc2]"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
            </div>

           <div className="w-[80%] flex items-start md:items-end gap-[15px] md:gap-[30px] flex-wrap md:flex-nowrap">
    
    {/* Product Category */}
    <div className="w-[100%] md:w-auto flex items-start flex-col gap-[10px]">
        <p className="text-[20px] md:text-[25px] font-semibold whitespace-nowrap">
            Product Category
        </p>

        <select
            name=""
            id=""
            className="bg-slate-600 w-[60%] md:w-[170px] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]"
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
        </select>
    </div>

    {/* Sub-Category */}
    <div className="w-[100%] md:w-auto flex items-start flex-col gap-[10px]">
        <p className="text-[20px] md:text-[25px] font-semibold whitespace-nowrap">
            Sub-Category
        </p>

        <select
            name=""
            id=""
            className="bg-slate-600 w-[60%] md:w-[170px] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]"
            onChange={(e) => setSubCategory(e.target.value)}
        >
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="WinterWear">WinterWear</option>
        </select>
    </div>

</div>

            <div className="w-full sm:w-[80%] h-auto min-h-[80px] md:h-[100px] flex 
items-start justify-center flex-col gap-[8px] md:gap-[10px]">
                <p className="text-[18px] sm:text-[20px] md:text-[25px] font-semibold">
                    Product Price
                </p>

                <input
                    placeholder="Rs 2000"
                    className="w-full md:w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] 
border-[2px] cursor-pointer bg-slate-600 px-[15px] md:px-[20px] text-[16px] md:text-[18px] 
placeholder:text-[#ffffffc2]"
                    required
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div
                className="w-full sm:w-[80%] h-auto min-h-[140px] md:h-[100px] flex items-start
justify-center flex-col gap-[8px] md:gap-[10px] py-[5px] md:py-[0px]"
            >
                <p className="text-[18px] sm:text-[20px] md:text-[25px] font-semibold">
                    Product Size
                </p>

                <div className="flex items-center justify-start gap-[8px] sm:gap-[15px] flex-wrap">

                    {/* S */}
                    <div
                        className={`px-[15px] sm:px-[20px] py-[5px] sm:py-[7px] rounded-lg bg-slate-600
text-[16px] sm:text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
${sizes.includes("S")
                                ? "bg-green-200 text-black border-[#46d1f7]"
                                : ""
                            }`}
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("S")
                                    ? prev.filter((item) => item !== "S")
                                    : [...prev, "S"]
                            )
                        }
                    >
                        S
                    </div>

                    {/* M */}
                    <div
                        className={`px-[15px] sm:px-[20px] py-[5px] sm:py-[7px] rounded-lg bg-slate-600
text-[16px] sm:text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
${sizes.includes("M")
                                ? "bg-green-200 text-black border-[#46d1f7]"
                                : ""
                            }`}
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("M")
                                    ? prev.filter((item) => item !== "M")
                                    : [...prev, "M"]
                            )
                        }
                    >
                        M
                    </div>

                    {/* L */}
                    <div
                        className={`px-[15px] sm:px-[20px] py-[5px] sm:py-[7px] rounded-lg bg-slate-600
text-[16px] sm:text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
${sizes.includes("L")
                                ? "bg-green-200 text-black border-[#46d1f7]"
                                : ""
                            }`}
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("L")
                                    ? prev.filter((item) => item !== "L")
                                    : [...prev, "L"]
                            )
                        }
                    >
                        L
                    </div>

                    {/* XL */}
                    <div
                        className={`px-[15px] sm:px-[20px] py-[5px] sm:py-[7px] rounded-lg bg-slate-600
text-[16px] sm:text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
${sizes.includes("XL")
                                ? "bg-green-200 text-black border-[#46d1f7]"
                                : ""
                            }`}
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("XL")
                                    ? prev.filter((item) => item !== "XL")
                                    : [...prev, "XL"]
                            )
                        }
                    >
                        XL
                    </div>

                    {/* XXL */}
                    <div
                        className={`px-[15px] sm:px-[20px] py-[5px] sm:py-[7px] rounded-lg bg-slate-600
text-[16px] sm:text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
${sizes.includes("XXL")
                                ? "bg-green-200 text-black border-[#46d1f7]"
                                : ""
                            }`}
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("XXL")
                                    ? prev.filter((item) => item !== "XXL")
                                    : [...prev, "XXL"]
                            )
                        }
                    >
                        XXL
                    </div>

                </div>
            </div>

            <div className="w-full sm:w-[80%] flex items-center justify-start
gap-[10px] mt-[10px] md:mt-[20px]">
                <input
                    id="checkbox"
                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer"
                    type="checkbox"
                    onChange={(e) => setBestSeller(prev => !prev)}
                />

                <label
                    htmlFor="checkbox"
                    className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold cursor-pointer"
                >
                    Add to BestSeller
                </label>
            </div>

            <button
                className="w-[130px] sm:w-[140px] px-[15px] 
                sm:px-[20px] py-[14px] sm:py-[20px] 
rounded-xl bg-[#65d8f7] flex items-center justify-center
gap-[10px] text-black active:bg-slate-700
active:text-white active:border-[2px] border-white 
cursor-pointer font-medium mb-[50px] md:mb-0"
            >
                {loading ? <Loading/> : "Add Product"}
            </button>
        </form>
    </div>
</div>
    )
}
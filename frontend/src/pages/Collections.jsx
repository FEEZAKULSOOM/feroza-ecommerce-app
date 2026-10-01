import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { ShopDataContext } from '../context/ShopContext.jsx';
import Card from '../component/Card.jsx';



function Collections() {

  let [showfilter , setShowFilter] = useState(false);
  let  {products , search , showSearch}  = useContext(ShopDataContext)
  let [ filterProduct  , setFilterProduct] = useState([])
  let [category , setCategory] = useState([]);
  let [subCategory , setSubCategory] = useState([]);
  let  [sortType , setSortType]  = useState("relavent")


   const applyFilter =() => {
       if (showSearch && search ) {
         productCopy = productCopy.filter  (item => item.name.toLowerCase()
        .includes(search.toLowerCase()))
       }
      let productCopy = products.slice()
      if (category.length  > 0) {
          
         productCopy=productCopy.filter (item => category.includes(item.category))
      }
      if (subCategory.length  > 0) {
          
         productCopy=productCopy.filter (item => subCategory.includes(item.subCategory))
      }

       setFilterProduct(productCopy)
   }


    const  toggleCategory = (e) => {
         if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
           
         }
        else {
            setCategory(prev => [...prev , e.target.value])
        }
    }

     const toggleSubCategory = (e) => {
         if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
           
         }
        else {
            setSubCategory(prev => [...prev , e.target.value])
        }
    }


  
     

    const sortProduct =()=> {
          let fbCopy= filterProduct.slice()
          switch (sortType) {
          
              case "low-high":
                fbCopy.sort((a , b) => a.price - b.price)
                setFilterProduct(fbCopy)
                break;
                case "high-low":
                  fbCopy.sort((a , b) => b.price - a.price)
                  setFilterProduct(fbCopy)
                  break;
                  default:
                    applyFilter()
                    break;

                
              
              
          }
    }


     useEffect(() => {
      setFilterProduct(products)
     }, [products])

     useEffect(() => {
      applyFilter()
     }, [category , subCategory , search , showSearch])


     useEffect(() => {
      sortProduct()
     }, [sortType])

  return (
    <div
      className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]
       flex items-start flex-col justify-start pt-[70px] overflow-x-hidden z-[2] pb-[110px]">


          <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] 
           p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed
           ${showfilter ? 'h-[60vh]': 'h-[8vh]'}`}>
             <p className="text-[25px] font-semibold flex gap-[5px] items-center 
             justify-start cursor-pointer"
             onClick={()=>setShowFilter(prev => !prev)}>
            FILTERS
      { !showfilter ?   <FaChevronRight
             className="text-[18px] md:hidden"/>  :   <FaChevronDown
               className="text-[18px] md:hidden"/>}

        </p>
         
         
         
           
                  <div className=  {`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md
                   bg-slate-600  md:block ${showfilter ? "" : "hidden"}`}>

            <p className="text-[18px] text-[#f8fafa]">
                CATEGORIES
            </p>
            <div className="w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col">
                               <p class="flex items-center justify-center gap-[10px] text-[16px] 
                               font-light">
                    <input class="w-3" type="checkbox" value="Men" 
                    onChange={toggleCategory}/>
                    Men
                </p>

                <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
                    <input class="w-3" type="checkbox" value="Women" 
                    onChange={toggleCategory}/>
                    Women
                </p>

                <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
                    <input class="w-3" type="checkbox" value="Kids" 
                    onChange={toggleCategory}/>
                    Kids
                </p>
            </div>




            


        </div>
    

      <div class={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 
       md:block   ${showfilter ? "" : "hidden"}`}>

            <p className={`text-[18px] text-[#f8fafa] `}
         >
                SUB-CATEGORIES
            </p>

            <div className="w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col">

                <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
                    <input class="w-3" type="checkbox" value="TopWear" 
                    onClick={toggleSubCategory} />
                    TopWear
                </p>

                <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
                    <input class="w-3" type="checkbox" value="BottomWear"
                       onClick={toggleSubCategory} />
                    BottomWear
                </p>

                <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
                    <input class="w-3" type="checkbox" value="WinterWear" 
                    onClick={toggleSubCategory} />
                    WinterWear
                </p>

            </div>
        </div>

    </div>

      

      <div className="lg:pl-[20%] md:py-[10px]">

        <div className="md:w-[80vw] w-[100vw]
         p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]">

             <Title  text1={"ALL"} text2={"COLLECTIONS"}/>

            <select
                name=""
                id=""
                className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] 
                px-[10px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px]"
               onChange={(e)=>setSortType(e.target.value)}>
                <option
                    value="relavent"
                    className="w-[100%] h-[100%]"
               >
                    Sort By: Relavent
                </option>

                <option
                    value="low-high"
                    className="w-[100%] h-[100%]"
                >
                    Sort By: Low to High
                </option>

                <option
                    value="high-low"
                    className="w-[100%] h-[100%]"
                >
                    Sort By: High to Low
                </option>
            </select>
            </div>


             <div class="lg:w-[80vw] md:w-[60vw] w-[100vw]
              min-h-[70vh] flex items-center justify-center flex-wrap 
              gap-[30px]">
                   {

                    filterProduct.map((item , index) => 
                    <Card key={index} name={item.name} price={item.price} image={item.image1} id={item._id} />)

                   }

              </div>

            </div>



        
           </div>


      
  
  )
}

export default Collections

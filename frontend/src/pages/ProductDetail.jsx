
import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { ShopDataContext } from '../context/ShopContext.jsx';

import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';

import RelatedProducts from '../component/RelatedProducts.jsx';


function ProductDetail() {

  let { productId } = useParams();

  let { products, currency  , addToCart} = useContext(ShopDataContext);

  let [productData, setProductData] = useState(false);

  let [image1, setImage1] = useState('');
  let [image2, setImage2] = useState('');
  let [image3, setImage3] = useState('');
  let [image4, setImage4] = useState('');

  let [size, setSize] = useState('');
  let [image, setImage] = useState('');


  const fetchProductData = () => {

    products.map((item) => {

      if (item._id === productId) {

        setProductData(item);

        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);

        setSize(item.sizes?.[0] || '');

        setImage(item.image1);

        return null;
      }

      return null;
    });
  };


  useEffect(() => {

    fetchProductData();

  }, [productId, products]);


  return productData ? (

    <div>

      {/* ================= PRODUCT SECTION ================= */}

      <div
        className="
          w-[99vw]
          min-h-[100vh]
          md:min-h-[100vh]
          bg-gradient-to-l
          from-[#141414]
          to-[#0c2025]
          flex
          items-start
          justify-start
          flex-col
          lg:flex-row
          gap-[20px]
        "
      >

        {/* ================= PRODUCT IMAGES ================= */}

        <div
          className="
            lg:w-[50vw]
            md:w-[90vw]
            lg:h-[90vh]
            h-[80vh]
            mt-[50px]
            lg:mt-[40px]
            flex
          
            items-center
            justify-center
            md:gap-[10px]
            gap-[20px]
            flex-col-reverse
            lg:flex-row
          "
        >

          {/* THUMBNAILS */}

          <div
            className="
              lg:w-[18%]
              md:w-[80%]
              h-auto
              lg:h-[75%]
              flex
              items-center
              justify-start
              gap-[10px]
              lg:gap-[12px]
              lg:flex-col
              flex-wrap
              shrink-0
            "
          >

            <div
              className="
                md:w-[70px]
                w-[40px]
                h-[40px]
                md:h-[80px]
                bg-slate-300
                border-[1px]
                border-[#80808049]
                rounded-md
                overflow-hidden
                cursor-pointer
                shrink-0
              "
              onClick={() => setImage(image1)}
            >
              <img
                alt="Thumbnail 1"
                className="w-full h-full object-cover rounded-md"
                src={image1}
              />
            </div>


            <div
              className="
                md:w-[70px]
                w-[40px]
                h-[40px]
                md:h-[80px]
                bg-slate-300
                border-[1px]
                border-[#80808049]
                rounded-md
                overflow-hidden
                cursor-pointer
                shrink-0
              "
              onClick={() => setImage(image2)}
            >
              <img
                alt="Thumbnail 2"
                className="w-full h-full object-cover rounded-md"
                src={image2}
              />
            </div>


            <div
              className="
                md:w-[70px]
                w-[40px]
                h-[40px]
                md:h-[80px]
                bg-slate-300
                border-[1px]
                border-[#80808049]
                rounded-md
                overflow-hidden
                cursor-pointer
                shrink-0
              "
              onClick={() => setImage(image3)}
            >
              <img
                alt="Thumbnail 3"
                className="w-full h-full object-cover rounded-md"
                src={image3}
              />
            </div>


            <div
              className="
                md:w-[70px]
                w-[40px]
                h-[40px]
                md:h-[80px]
                bg-slate-300
                border-[1px]
                border-[#80808049]
                rounded-md
                overflow-hidden
                cursor-pointer
                shrink-0
              "
              onClick={() => setImage(image4)}
            >
              <img
                alt="Thumbnail 4"
                className="w-full h-full object-cover rounded-md"
                src={image4}
              />
            </div>

          </div>


          {/* MAIN IMAGE */}

          <div
            className="
              lg:w-[58%]
              w-[90%]
              lg:h-[75%]
              h-[75%]
              border-[1px]
              border-[#80808049]
              rounded-md
              overflow-hidden
            "
          >

            <img
              alt="Main Product"
              className="
                w-full
                h-full
                text-[30px]
                text-white
                text-center
                rounded-md
                object-cover
              "
              src={image}
            />

          </div>

        </div>


        {/* ================= PRODUCT INFORMATION ================= */}

        <div
          className="
            lg:w-[50vw]
            w-[100vw]
            lg:min-h-[75vh]
            min-h-[50vh]
            mt-[30px]
            lg:mt-[100px]
            flex
            items-start
            justify-start
            flex-col
            py-[20px]
            px-[30px]
            md:pb-[20px]
            md:pl-[20px]
            lg:pl-[0px]
            lg:px-[0px]
            lg:py-[0px]
            gap-[10px]
          "
        >

          {/* PRODUCT NAME */}

          <h1
            className="
              
            text-[26px]
            md:text-[30px]
              font-semibold
              text-[aliceblue]
            "
          >
            {productData.name.toUpperCase()}
          </h1>


          {/* RATING */}

          <div className="flex items-center gap-1">

            <FaStar className="text-[20px] text-yellow-400" />
            <FaStar className="text-[20px] text-yellow-400" />
            <FaStar className="text-[20px] text-yellow-400" />
            <FaStar className="text-[20px] text-yellow-400" />

            <FaStarHalfAlt className="text-[20px] text-yellow-400" />

            <p className="text-[18px] font-semibold pl-[5px] text-white">
              (124)
            </p>

          </div>


          {/* PRICE */}

          <p
            className="
            text-[22px]
              md:text-[26px]
           
              font-semibold
              pl-[5px]
              text-white
            "
          >
            {currency} {productData.price}
          </p>


          {/* SHORT DESCRIPTION */}

          <p
            className="
              w-[80%]
              md:w-[60%]
              text-[16px]
              md:text-[18px]
              font-semibold
              pl-[5px]
              text-white
              leading-relaxed
            "
          >
            {productData.description}
          </p>


          {/* SIZE */}

          <div
            className="
              flex
              flex-col
              gap-[10px]
              my-[10px]
            "
          >

            <p
              className="
                text-[25px]
                font-semibold
                pl-[5px]
                text-white
              "
            >
              Select Size
            </p>


            <div className="flex gap-2 flex-wrap">

              {productData.sizes?.map((item, index) => (

                <button
                  key={index}
                  className={`
                    border
                    py-2
                    px-4
                    bg-slate-300
                    text-black
                    rounded-md
                    cursor-pointer

                    ${
                      item === size
                        ? 'bg-black text-[#2f97f1] text-[20px]'
                        : ''
                    }
                  `}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>

              ))}

            </div>


            {/* ADD TO CART */}

            <button
              className="
                text-[16px]
                active:bg-slate-500
                cursor-pointer
                bg-[#495b61c9]
                py-[10px]
                px-[20px]
                rounded-2xl
                mt-[10px]
                border-[1px]
                border-[#80808049]
                text-white
                shadow-md
                shadow-black
                w-fit
              "
            onClick={()=>addToCart(productData._id , size)}>
              Add to Cart
            </button>

          </div>


          {/* LINE */}

          <div
            className="
              w-[90%]
              h-[1px]
              bg-slate-700
            "
          ></div>


          {/* PRODUCT INFORMATION */}

          <div
            className="
              w-[80%]
              text-[16px]
              text-white
              leading-7
            "
          >

            <p>100% Original Product.</p>

            <p>
              Cash on delivery is available on this product.
            </p>

            <p>
              Easy return and exchange policy within 7 days.
            </p>

          </div>

        </div>

      </div>


      {/* ================= DESCRIPTION SECTION ================= */}

      <div
        className="
          w-full
          min-h-[70vh]
          bg-gradient-to-l
          from-[#141414]
          to-[#0c2025]
          flex
          items-start
          justify-start
          flex-col
          overflow-x-hidden
          pb-[50px]
        "
      >

        {/* DESCRIPTION / REVIEWS TABS */}

        <div
          className="
            flex
            px-[20px]
            mt-[90px]
            lg:ml-[80px]
            ml-[0px]
            lg:mt-[0px]
          "
        >

          <p
            className="
              border
              px-5
              py-3
              text-sm
              text-white
            "
          >
            Description
          </p>

          <p
            className="
              border
              px-5
              py-3
              text-sm
              text-white
            "
          >
            Reviews (124)
          </p>

        </div>


        {/* DESCRIPTION BOX */}

        <div
          className="
            w-[80%]
            min-h-[150px]
            bg-[#3336397c]
            border
            text-white
            text-[13px]
            md:text-[15px]
            lg:text-[20px]
            px-[15px]
            md:px-[30px]
            py-[20px]
            lg:ml-[100px]
            ml-[20px]
            mt-[20px]
            rounded-md
          "
        >

          <p
            className="
              w-full
              leading-relaxed
            "
          >
            Upgrade your wardrobe with this stylish slim-fit cotton
            shirt, available now on Feroza. Crafted from breathable,
            high-quality fabric, it offers all-day comfort and
            effortless style. Easy to maintain and perfect for any
            setting, this shirt is a must-have essential for those
            who value both fashion and function.
          </p>

        </div>


        {/* RELATED PRODUCTS */}

        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />

      </div>

    </div>

  ) : (

    <div className="opacity-0">
      Product Not Found
    </div>

  );
}


export default ProductDetail;


import React, { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext.jsx'
import { useState, useEffect } from 'react'
import Title from './Title.jsx'
import Card from './Card.jsx'

function RelatedProducts({ category, subCategory, currentProductId }) {

  let { products } = useContext(ShopDataContext)

  let [related, setRelated] = useState([])

  useEffect(() => {

    if (products.length > 0) {

      let productsCopy = products.slice()

      if (category && category.length > 0) {

        productsCopy = productsCopy.filter(
          (item) => category === item.category
        )

      }

      productsCopy = productsCopy.filter(
        (item) => item._id !== currentProductId
      )

      setRelated(productsCopy.slice(0, 4))

    }

  }, [products, category, currentProductId])

  return (

    <div className="my-[130px] md:my-[40px] md:px-[60px]">

      <div className="ml-[20px] lg:ml-[80px]">

        <Title
          text1={'RELATED'}
          text2={'PRODUCTS'}
        />

      </div>

      <div className="w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">

        {
          related.map((item, index) => (

            <Card
              key={index}
              name={item.name}
              price={item.price}
              image={item.image1}
              id={item._id}
            />

          ))
        }

      </div>

    </div>

  )
}

export default RelatedProducts
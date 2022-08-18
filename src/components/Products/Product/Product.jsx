import React, {useState} from 'react'
import {GiShoppingCart} from 'react-icons/gi'

const Product = ({product, addToCart}) => {
    // console.log(product)
    const [showCart, setShowCart] = useState(false);

    const displayCart = () => {
        if(!showCart){
            return 'hidden'
        }else{
            return 'flex justify-center items-center gap-3 py-1 px-6 rounded-md shadow-2xl border-2 border-orange-500 bg-orange-500'
        }
    }

    const handleAddToCart = () => {
        addToCart(product.id, 1);
    }
    const handleCart = () => {
        setShowCart(true)
    }
  return (
        <div onMouseOver={handleCart} className=' bg-white lg:w-[290px] md:w-[245px] xs:w-[250px] w-[350px] border-white shadow-lg border-2 '>
            <img className='w-full h-[220px] xs:h-[180px] object-cover' src={product.image.url} alt='running shoes'/>
            <div className='flex justify-between mx-2'><div className='flex flex-col'>
                <div className='text-lg'>{product.name}</div>
            <div className='text-sm' dangerouslySetInnerHTML={{__html: product.description}}></div>
            </div>
            <div className='text-xs'>
                {product.price.formatted_with_symbol}
            </div>
            </div>
            <div className='flex justify-center items-end my-6'>
                <button className='flex justify-center items-center gap-3 py-1 px-6 rounded-md shadow-2xl border-2 border-orange-500 bg-orange-500' onClick={handleAddToCart}><p>Add To Cart</p><GiShoppingCart color='white'/></button>
            </div>
        </div>
  )
}

export default Product
import React from 'react'
import { UseGlobalContext } from '../../../context'

const CartItem = ({item}) => {
    const {removeItem, updateCartQty} = UseGlobalContext()

  return (
    <div className='w-[250px] sm:w-[220px] h-[320px] border-2 border-white shadow-lg'>  
            <div className=''><img className='w-full object-cover h-[200px]' src={item.image.url} alt={item.name}/></div>
            <div className='flex justify-between mx-2 items-center'>
                <p>{item.name}</p>
                <p className='text-sm'>{item.line_total.formatted_with_symbol}</p>
            </div>
            <div className='flex gap-12 pt-6 ml-2'>
                <div className='flex justify-center items-center'>
                    <button className='border-2 my-2 px-1 bg-gray-50' onClick={() => updateCartQty(item.id, item.quantity - 1)} >-</button>
                    <p className='mx-2'>{item.quantity}</p>
                    <button className='border-2 my-2 px-1 bg-gray-50' onClick={() => updateCartQty(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            </div>
    </div>
  )
}

export default CartItem
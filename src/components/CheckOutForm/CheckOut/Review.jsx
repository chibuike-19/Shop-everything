import React from 'react'
import { UseGlobalContext } from '../../../context'

const Review = () => {
    const {checkoutToken} = UseGlobalContext()
  return (
    <div className='font-raleway'>
        <p className='text-xl'>Order Summary</p>
        
            {checkoutToken.live.line_items.map(product => (
                <>
                <div key={product.name} className='flex justify-between items-center'>
                    <div className='my-4'>
                        <p>{product.name}</p>
                        <p className='text-sm text-gray-400'>{`Quantity: ${product.quantity}`}</p>

                    </div>
                    <div>
                        {product.line_total.formatted_with_symbol}
                    </div>
                </div>
                
                </>
            ))}
            <div>
                <p>Total</p>
                <p>
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                </p>
            </div>
        
    </div>
  )
}

export default Review
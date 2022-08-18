import React from 'react'
import { UseGlobalContext } from '../../context'
import NavBar from '../Navbar/NavBar';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
    const {cart, emptyCart} = UseGlobalContext();
    console.log(cart.line_items)
    const noCartItem = () => {
        return <div>
            <p className='text-2xl'>you have no item in your shopping cart, <Link to='/' className='text-orange-600 cursor-pointer'>add some!</Link></p>
        </div>
    } 
    const filledCart = () => {
        return <div className='w-full '>
            <div className='flex justify-center mb-8 text-3xl sm:text-4xl'>
                <p>Your Shopping Cart</p>
            </div>
            <div className='flex justify-center items-center'><div className='sm:grid flex flex-col gap-8 md:grid-cols-3 sm:grid-cols-2'>{cart.line_items.map(item => {
                return <CartItem key={item.id} item={item}/>
            })}</div></div>
            <div className='my-8'>
            <div className='flex sm:flex-row flex-col sm:gap-0 gap-4 sm:justify-between items-center'>
                <div>
                    <p>SubTotal: {cart.subtotal.formatted_with_symbol}</p>
                </div>
                <div><button onClick={emptyCart} className='border-2 border-red-500 bg-red-500 text-white sm:text-base text-sm px-3 py-1 rounded-sm'>
                    <p>Empty Cart</p>
                </button>
                <button className='ml-5 border-2 border-blue-500 bg-blue-500 text-white px-3 py-1 sm:text-base text-sm rounded-sm'>
                    <Link to='/checkout'>Checkout</Link>
                </button></div>
            </div>
        </div>
        </div>
    }
  return (
    <>
        <NavBar/>
        <div className='pt-12 mx-8'>
            {(cart.line_items.length === 0) ? <div>{noCartItem()}</div> : <div>{filledCart()}</div> }
        </div>
    </>
    
  )
}

export default Cart
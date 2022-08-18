import React from 'react'
import {GiShoppingCart} from 'react-icons/gi'
import { UseGlobalContext } from '../../context'
import { Link, useLocation } from 'react-router-dom'
// import Cart from '../Cart/Cart'

const NavBar = () => {
  const {cart} = UseGlobalContext();
  const location = useLocation();

  const cartDisplay = () => {
    if(cart.total_items === 0 ){
      return 'hidden'
    }else{
      return 'w-4 h-4 rounded-full text-xs text-white bg-red-600 absolute right-0 top-2 '
    }
  }
 
  return (
    <div className='fixed w-full h-[40px] border-b-2 bg-white border-slate-50'>
        <div className='flex items-center justify-between mx-4'><div>
            <Link to='/'><p className='text-2xl text-orange-600 font-alex-brush font-bold'>Shop Everything</p></Link>
        </div>
        <div className='relative h-full'>
            {location.pathname === '/' && <Link to='/cart'><button className='mt-4'><GiShoppingCart size={20}/><p className={cartDisplay()}>{cart.total_items}</p></button></Link>}
        </div></div>
    </div>
  )
}

export default NavBar
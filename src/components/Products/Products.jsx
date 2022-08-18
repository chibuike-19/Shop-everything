import React from 'react'
import Product from './Product/Product'
import {UseGlobalContext} from '../../context'
import NavBar from '../Navbar/NavBar';


// const products = [
//     {id: 1, price: '#25,000', name: 'Men Sheos', desc: 'running shoes', image: require('../../assests/running_shoe.jpg')},
//     {id: 2, price: '#450,000', name: 'Macbook Pro', desc: 'apple macbook', image: require('../../assests/macbook_pro.jpg')}
// ]

function Products() {
  const {products, AddToCart} = UseGlobalContext();
  
  return (
    <>
      <NavBar/>
      <div className='w-full font-raleway'>
          <div className='flex'><div className='grid lg:grid-cols-4 md:grid-cols-3 gap-6 mx-auto md:gap-3 lg:gap-5'>{products.map(product => {
             return <Product key={product.id} product={product} addToCart={AddToCart}/> 
          })}</div></div>
      </div>
    </>
  )
}

export default Products
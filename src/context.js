import { useContext, useState } from "react";
import {commerce} from './lib/commerce'
import PaystackPop from '@paystack/inline-js'
import React from 'react'


const AppContext = React.createContext()

export const AppProvider = ({children}) => {
   const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [shippingData, setShippingData] = useState({});
  const [fullname, setFullname] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [reference, setReference] = useState('')
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingOption, setShippingOption] = useState('');
  const [order, setOrder] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [checkoutToken, setCheckoutToken] = useState(null);

  const getProducts = async() => {
    const response = await commerce.products.list()
    setProducts(response.data)
  }

  const fetchCart = async() => {
    const shop = await commerce.cart.retrieve()
    setCart(shop) 
  }

  const AddToCart = async(productId, quantity)=> {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  const updateCartQty = async(productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity})
    setCart(cart)
  }

  const removeItem = async(productId) => {
    const {cart} = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const emptyCart = async() => {
    const {cart} = await commerce.cart.empty()
    setCart(cart)
  }

  const reshreshCart = async() => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }

   const payWithPaystack = () => {
    // e.preventDefault()
    const paystack = new PaystackPop()
    const Order = () => {commerce.checkout.getLive(checkoutToken.id).then(data => {
    var amountRef = data.total_with_tax.raw
    var currencyCode = data.currency.code
    paystack.newTransaction({
      key: 'pk_test_0897342ff00d0f9067eac095b1221acabfbde631',
      amount: parseFloat(amountRef) * 100 ,
      email: email,
      currency: currencyCode,
      firstname: fullname,
      onSucess(transaction){
        setReference(transaction.reference)
      }
    })
  })};

  Order()

  const orderData = {
    line_items: checkoutToken.live.line_items,
    customer: {
      firstname:fullname,
      lastname: fullname,
      email: email
    },
    billing: {
      name:'Primary', street: address, town_city: city, county_state: shippingSubdivision, country: shippingCountry, postal_zip_code: zipCode
    },
    shipping: {
      name:'Primary', street: address, town_city: city, county_state: shippingSubdivision, country: shippingCountry, postal_zip_code: zipCode
    },
    fulfillment: {shipping_method: shippingOption},
    payment: {
      gateway: 'paystack',
      paystack: {
        reference:reference
      }
    }
  }
  const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
     await commerce.checkout.capture(checkoutTokenId, newOrder).then(order => console.log(order))
    // setOrder(incomingOrder)
    reshreshCart()
    
  }
   handleCaptureCheckout(checkoutToken.id, orderData)
    
  }

  return (
    <AppContext.Provider value={{products, cart, AddToCart, fetchCart, getProducts, updateCartQty, emptyCart, removeItem, shippingData, setShippingData, setFullname, fullname,setAddress,setCity,setEmail,setZipCode,address,city,email,zipCode, setReference, reference,setShippingCountry, setShippingSubdivision, shippingCountry, shippingSubdivision,setShippingOption, shippingOption, order, error, setError, reshreshCart, payWithPaystack, success, setSuccess, setOrder, checkoutToken, setCheckoutToken}}>
        {children}
    </AppContext.Provider>
  )
}

export const UseGlobalContext = () => {
  return useContext(AppContext)
}



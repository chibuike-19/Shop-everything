import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from "react";
import { UseGlobalContext } from "./context";
import CheckOut from "./components/CheckOutForm/CheckOut/CheckOut";




const App = () => {

  const {getProducts, fetchCart} = UseGlobalContext();
  useEffect(() => {
    getProducts()
    fetchCart()
  }, [])
  
  // console.log(cart)
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

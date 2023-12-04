"use client"
import {SessionProvider} from "next-auth/react"
import { createContext, useEffect, useState } from 'react';
import toast from "react-hot-toast"


export const CartContext = createContext({});
//uso:   const cart = useContext(CartContext);
export function cartProductPrice(cartProduct){ //función fuera del Provider
 //calcular el total para un sólo productos
  let price=cartProduct?.basePrice
  if (cartProduct?.size) {price +=cartProduct.size.price}
  if (cartProduct?.extras?.length >0) {
    cartProduct.extras.map(extra => price +=extra.price)
    }
  return price;
}

export function AppProvider({children}){
  const [cartProducts, setCartProducts] = useState([]);
  const ls=typeof window !== 'undefined' ? window.localStorage:null //si existe ls en mi navegador

  function saveCartProductsToLocalStorage(cartProducts){
    if (ls) ls.setItem('cart', JSON.stringify(cartProducts));
  }
  // useEffect(() => { //grabo en LS si cambia algo en el carro
  //   saveCartProductsToLocalStorage()
  // }, [cartProducts]);

  useEffect(() => { //leo del carro y lo cargo al contexto mío al montar este componente
    if (ls && ls.getItem('cart')){
      const cartProducts = JSON.parse(ls.getItem('cart'));
      if (cartProducts) {
        setCartProducts(cartProducts);
      }
    }
  }, [ls]);

  function clearCart(){
    setCartProducts([])
    saveCartProductsToLocalStorage([])
  }

  function removeCartProduct(indexToRemove){
    setCartProducts(prevProducts => {
      const newProducts=prevProducts
      .filter((product,index)=>index!==indexToRemove)
      saveCartProductsToLocalStorage(newProducts)
      return newProducts         // setCartProducts(newProducts) //rob
    })
    toast.success('Product removed')
  }

  function addToCart(product, size=null, extras=[]){
    setCartProducts(prevProducts => {
      const cartProduct={...product,size,extras}
      const newProducts=[...prevProducts,cartProduct]   
      saveCartProductsToLocalStorage(newProducts)
      return newProducts // setCartProducts(newProducts) //rob
    })
  };
  return(
    <SessionProvider>
      <CartContext.Provider value={{cartProducts,setCartProducts,addToCart,removeCartProduct,clearCart}}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}
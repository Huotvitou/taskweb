import { createContext, useContext, useEffect, useState } from 'react'
const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState([])
  useEffect(()=>{
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem('cart')
    if (raw) setCart(JSON.parse(raw))
  },[])
  useEffect(()=>{
    if (typeof window === 'undefined') return
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])
  const addToCart = (item)=> setCart(prev=> [...prev, item])
  const removeFromCart = (slug)=> setCart(prev=> prev.filter(p=> p.slug !== slug))
  const clearCart = ()=> setCart([])
  return <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>{children}</CartContext.Provider>
}
export function useCart(){ return useContext(CartContext) }

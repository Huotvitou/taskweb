import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../store/CartContext'

export default function ProductDetail(){
  const router = useRouter()
  const { slug } = router.query
  const [product,setProduct]=useState(null)
  const { addToCart } = useCart() || { addToCart: ()=>{} }

  useEffect(()=>{
    if(!slug) return
    fetch('/api/products').then(r=>r.json()).then(items=>{
      setProduct(items.find(i=> i.slug===slug))
    })
  },[slug])

  if(!product) return <div className="p-6">Loading...</div>

  const buyNow = ()=>{
    const url = (process.env.NEXT_PUBLIC_TELEGRAM || 'https://t.me/Vitouhuot')
    window.location.href = url
  }

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.name} className="w-full rounded border"/>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-xl mb-4">${product.price}</div>
        <button className="px-4 py-2 bg-black text-white rounded mr-3" onClick={()=>addToCart(product)}>Add to Cart</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={buyNow}>Buy via Telegram</button>
      </div>
    </div>
  )
}

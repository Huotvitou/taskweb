import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Products(){
  const [items,setItems]=useState([])
  useEffect(()=>{ fetch('/api/products').then(r=>r.json()).then(setItems) },[])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map(p=> (
          <Link key={p._id} href={`/products/${p.slug}`} className="border rounded p-3 hover:shadow">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover"/>
            <div className="mt-2 font-semibold">{p.name}</div>
            <div>${p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

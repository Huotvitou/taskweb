import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home(){
  const [hot,setHot]=useState([])
  const [latest,setLatest]=useState([])
  useEffect(()=>{
    fetch('/api/products').then(r=>r.json()).then(items=>{
      setLatest(items)
      setHot(items.filter(i=>i.isHot))
    })
  },[])
  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-3">🔥 Hot Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hot.map(p=> (
            <Link key={p._id} href={`/products/${p.slug}`} className="border rounded p-3 hover:shadow">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover"/>
              <div className="mt-2 font-semibold">{p.name}</div>
              <div>${p.price}</div>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-3">🆕 Latest Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {latest.map(p=> (
            <Link key={p._id} href={`/products/${p.slug}`} className="border rounded p-3 hover:shadow">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover"/>
              <div className="mt-2 font-semibold">{p.name}</div>
              <div>${p.price}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

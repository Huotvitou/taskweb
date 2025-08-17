import { useEffect, useState } from 'react'

export default function Admin(){
  const [items,setItems]=useState([])
  const [form,setForm]=useState({ name:'', slug:'', image:'', price:0, category:'General', isHot:false })

  useEffect(()=>{ fetch('/api/products').then(r=>r.json()).then(setItems) },[])

  const create = async()=>{
    const r = await fetch('/api/products',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if(r.ok){
      const p = await r.json()
      setItems([p, ...items])
      setForm({ name:'', slug:'', image:'', price:0, category:'General', isHot:false })
    } else {
      alert('Create failed (check login / server logs)')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Create Product</h2>
          <div className="space-y-2">
            {['name','slug','image','category'].map(k=>(
              <input key={k} className="w-full border p-2" placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>
            ))}
            <input type="number" className="w-full border p-2" placeholder="price" value={form.price} onChange={e=>setForm({...form,price: Number(e.target.value)})}/>
            <label className="flex items-center space-x-2"><input type="checkbox" checked={form.isHot} onChange={e=>setForm({...form,isHot:e.target.checked})}/><span>Hot item</span></label>
            <button className="px-4 py-2 bg-black text-white rounded" onClick={create}>Create</button>
          </div>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Products</h2>
          <ul className="space-y-2 max-h-[60vh] overflow-auto">
            {items.map(p=> (<li key={p._id} className="flex items-center justify-between border rounded p-2">
              <div className="flex items-center space-x-2"><img src={p.image} className="w-10 h-10 object-cover rounded"/><div>{p.name}</div></div>
              <div>${p.price}</div>
            </li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}

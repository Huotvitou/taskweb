import { useState } from 'react'
import Router from 'next/router'

export default function Login(){
  const [email,setEmail]=useState('admin@vitou.store')
  const [password,setPassword]=useState('123456')
  const [err,setErr]=useState('')

  const submit=async(e)=>{
    e.preventDefault()
    setErr('')
    const r = await fetch('/api/auth/login',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email,password }) })
    if(r.ok){ Router.push('/admin') } else { setErr('Invalid credentials') }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input className="w-full border p-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        {err && <div className="text-red-600">{err}</div>}
        <button className="w-full bg-black text-white py-2">Login</button>
      </form>
    </div>
  )
}

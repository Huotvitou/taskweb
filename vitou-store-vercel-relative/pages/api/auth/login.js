import { signToken } from '../../../lib/auth'
import cookie from 'cookie'

export default async function handler(req, res){
  const { email, password } = req.body || {}
  if ((email || '').toLowerCase() === (process.env.ADMIN_EMAIL || 'admin@vitou.store') 
      && password === (process.env.ADMIN_PASSWORD || '123456')){
    const token = signToken({ email })
    res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true, path: '/', maxAge: 60*60*24*7 }))
    return res.json({ ok: true })
  }
  res.status(401).json({ error: 'Invalid credentials' })
}

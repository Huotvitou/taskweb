import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export function signToken(payload){
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
}
export function verifyToken(req){
  try{
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies.token
    if(!token) return null
    return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
  }catch(e){ return null }
}

import { verifyToken } from '../../../lib/auth'
export default function handler(req,res){
  const user = verifyToken(req)
  if(!user) return res.status(401).json({})
  res.json({ user })
}

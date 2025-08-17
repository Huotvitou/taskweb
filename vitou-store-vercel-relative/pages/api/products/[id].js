import dbConnect from '../../../lib/db'
import Product from '../../../lib/models/Product'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res){
  await dbConnect()
  const { id } = req.query
  if (req.method === 'GET'){
    const p = await Product.findById(id)
    return res.json(p)
  }
  if (req.method === 'PUT'){
    const auth = verifyToken(req)
    if (!auth) return res.status(401).json({ error: 'Unauthorized' })
    const p = await Product.findByIdAndUpdate(id, req.body, { new: true })
    return res.json(p)
  }
  if (req.method === 'DELETE'){
    const auth = verifyToken(req)
    if (!auth) return res.status(401).json({ error: 'Unauthorized' })
    await Product.findByIdAndDelete(id)
    return res.json({ ok: true })
  }
  res.status(405).end()
}

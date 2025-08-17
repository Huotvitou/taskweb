import dbConnect from '../../../lib/db'
import Product from '../../../lib/models/Product'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res){
  await dbConnect()
  if (req.method === 'GET'){
    const items = await Product.find({}).sort({ createdAt: -1 })
    return res.json(items)
  }
  if (req.method === 'POST'){
    const auth = verifyToken(req)
    if (!auth) return res.status(401).json({ error: 'Unauthorized' })
    const p = await Product.create(req.body)
    return res.status(201).json(p)
  }
  res.status(405).end()
}

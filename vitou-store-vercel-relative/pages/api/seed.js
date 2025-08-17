import dbConnect from '../../lib/db'
import Product from '../../lib/models/Product'

export default async function handler(req, res){
  await dbConnect()
  await Product.deleteMany({})
  const cats = ['Electronics','Fashion','Books','Games']
  const docs = Array.from({ length: 20 }).map((_,i)=> ({
    name: `Sample Product ${i+1}`,
    slug: `sample-product-${i+1}`,
    image: `https://via.placeholder.com/600x600?text=Product+${i+1}`,
    price: (i+1)*5,
    category: cats[i % cats.length],
    isHot: i < 5
  }))
  await Product.insertMany(docs)
  res.json({ ok: true, count: docs.length })
}

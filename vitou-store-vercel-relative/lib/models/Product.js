import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  isHot: { type: Boolean, default: false }
}, { timestamps: true })
export default mongoose.models.Product || mongoose.model('Product', ProductSchema)

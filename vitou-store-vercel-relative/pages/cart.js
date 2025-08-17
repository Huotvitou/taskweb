import { useCart } from '../store/CartContext'

export default function CartPage(){
  const { cart = [], removeFromCart, clearCart } = useCart() || {}

  const buyNow = ()=>{
    const url = (process.env.NEXT_PUBLIC_TELEGRAM || 'https://t.me/Vitouhuot')
    window.location.href = url
  }

  const total = cart.reduce((sum,i)=> sum + (i.price||0), 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <div className="space-y-4">
          {cart.map((p,idx)=>(
            <div key={idx} className="flex items-center justify-between border rounded p-3">
              <div className="flex items-center space-x-3">
                <img src={p.image} className="w-16 h-16 object-cover rounded"/>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div>${p.price}</div>
                </div>
              </div>
              <button className="px-3 py-1 border rounded" onClick={()=>removeFromCart?.(p.slug)}>Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between font-semibold text-lg">
            <div>Total</div><div>${total}</div>
          </div>
          <div className="space-x-3">
            <button className="px-4 py-2 border rounded" onClick={()=>clearCart?.()}>Clear</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={buyNow}>Buy via Telegram</button>
          </div>
        </div>
      )}
    </div>
  )
}

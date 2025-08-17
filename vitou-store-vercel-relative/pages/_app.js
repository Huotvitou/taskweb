import '../styles/globals.css'
import { CartProvider } from '../store/CartContext'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }){
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartProvider>
  )
}

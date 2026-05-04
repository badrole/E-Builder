import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const subtotal = cart.reduce((t, c) => t + c.price * c.quantity, 0);
  const delivery = cart.length > 0 ? 50000 : 0;
  if (cart.length === 0) return <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-4"><span className="material-symbols-outlined text-7xl text-outline">shopping_cart</span><h2 className="text-h3 font-bold">Keranjang Kosong</h2><p className="text-on-surface-variant">Belum ada produk di keranjang Anda.</p><Link to="/materials" className="btn-primary inline-block">Belanja Sekarang</Link></div>;
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-h2 font-bold text-primary">Keranjang ({cart.length})</h1><button onClick={clearCart} className="text-sm text-error font-semibold hover:underline">Hapus Semua</button></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">{cart.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-outline-variant p-4 flex gap-4 items-center">
            <img className="w-20 h-20 rounded-xl object-cover" src={c.image} alt={c.name} />
            <div className="flex-1"><h4 className="font-bold text-sm">{c.name}</h4><p className="text-caption text-outline">{c.storeName}</p><p className="text-primary font-bold mt-1">{formatRupiah(c.price)}/{c.unit}</p></div>
            <div className="flex items-center border border-outline-variant rounded-lg"><button onClick={() => updateCartQuantity(c.id, c.quantity-1)} className="px-2 py-1 text-sm">-</button><span className="px-3 py-1 font-bold border-x border-outline-variant text-sm">{c.quantity}</span><button onClick={() => updateCartQuantity(c.id, c.quantity+1)} className="px-2 py-1 text-sm">+</button></div>
            <p className="font-bold text-primary min-w-[100px] text-right">{formatRupiah(c.price * c.quantity)}</p>
            <button onClick={() => removeFromCart(c.id)} className="text-error hover:bg-red-50 p-2 rounded-lg"><span className="material-symbols-outlined text-sm">delete</span></button>
          </div>
        ))}</div>
        <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4 sticky top-24 h-fit">
          <h3 className="font-bold text-lg">Ringkasan</h3>
          <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatRupiah(subtotal)}</span></div><div className="flex justify-between"><span>Ongkos Kirim</span><span className="font-semibold">{formatRupiah(delivery)}</span></div></div>
          <div className="border-t border-outline-variant pt-4 flex justify-between"><span className="font-bold">Total</span><span className="text-xl font-black text-primary">{formatRupiah(subtotal + delivery)}</span></div>
          <Link to="/checkout" className="btn-cta w-full text-center block">Checkout</Link>
        </div>
      </div>
    </div>
  );
}

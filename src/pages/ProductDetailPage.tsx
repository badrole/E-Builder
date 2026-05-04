import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';
import PriceCountUp from '../components/PriceCountUp';

export default function ProductDetailPage() {
  const { id } = useParams();
  const p = products.find(p => p.id === id) || products[0];
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();
  const related = products.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4);
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Link to="/materials" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden"><img className="w-full h-full object-cover" src={p.image} alt={p.name} /></div>
        <div className="space-y-6">
          <div><span className="chip mb-2 inline-block">{p.category}</span><h1 className="text-h2 font-bold">{p.name}</h1><p className="text-on-surface-variant mt-2">Dari <Link to={`/materials/store/${p.storeId}`} className="text-primary font-semibold hover:underline">{p.storeName}</Link></p></div>
          <div className="p-6 bg-primary/5 rounded-2xl"><p className="text-4xl font-black text-primary"><PriceCountUp value={p.price} /></p><p className="text-on-surface-variant">per {p.unit}</p></div>
          <div className="space-y-2"><p className="text-sm"><strong>Spesifikasi:</strong> {p.spec}</p><p className="text-sm"><strong>Stok:</strong> {p.stock} {p.unit}</p><p className="text-sm"><strong>Estimasi pengiriman:</strong> {p.delivery}</p></div>
          <div className="flex items-center gap-4"><span className="font-semibold">Jumlah:</span><div className="flex items-center border border-outline-variant rounded-lg"><button onClick={() => setQty(Math.max(1, qty-1))} className="px-3 py-2 hover:bg-surface-container">-</button><span className="px-4 py-2 font-bold border-x border-outline-variant">{qty}</span><button onClick={() => setQty(qty+1)} className="px-3 py-2 hover:bg-surface-container">+</button></div></div>
          <div className="flex gap-3"><button onClick={() => addToCart({productId:p.id,name:p.name,price:p.price,quantity:qty,unit:p.unit,image:p.image,storeName:p.storeName})} className="btn-cta flex-1 flex items-center justify-center gap-2"><span className="material-symbols-outlined">add_shopping_cart</span>Tambah ke Keranjang</button></div>
        </div>
      </div>
      {related.length > 0 && <section><h2 className="text-h3 font-bold mb-4">Produk Terkait</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{related.map(r => (<Link key={r.id} to={`/materials/product/${r.id}`} className="bg-white rounded-2xl border border-outline-variant p-3 hover:shadow-md"><div className="aspect-square bg-surface-container rounded-xl overflow-hidden mb-2"><img className="w-full h-full object-cover" src={r.image} alt={r.name} /></div><h4 className="font-bold text-sm line-clamp-2">{r.name}</h4><p className="text-primary font-bold text-sm mt-1">{formatRupiah(r.price)}</p></Link>))}</div></section>}
    </div>
  );
}

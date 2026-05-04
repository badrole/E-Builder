import { useParams, Link } from 'react-router-dom';
import { stores, products } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';

export default function StoreDetailPage() {
  const { id } = useParams();
  const s = stores.find(s => s.id === id) || stores[0];
  const storeProducts = products.filter(p => p.storeId === s.id);
  const { addToCart } = useStore();
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Link to="/materials" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden"><div className="h-48 bg-surface-container"><img className="w-full h-full object-cover" src={s.image} alt={s.name} /></div>
        <div className="p-6 space-y-3"><h1 className="text-h2 font-bold">{s.name}</h1><p className="text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span>{s.address}</p><div className="flex items-center gap-4"><div className="flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span><span className="font-bold">{s.rating}</span><span className="text-outline">({s.reviews} ulasan)</span></div><span className={`px-3 py-1 rounded-full text-xs font-bold ${s.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.open ? 'Buka' : 'Tutup'}</span></div><div className="flex flex-wrap gap-2">{s.categories.map(c => <span key={c} className="chip">{c}</span>)}</div></div>
      </div>
      <h2 className="text-h3 font-bold">Produk ({storeProducts.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{storeProducts.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border border-outline-variant p-3 hover:shadow-md transition-all"><Link to={`/materials/product/${p.id}`}><div className="aspect-square bg-surface-container rounded-xl overflow-hidden mb-3"><img className="w-full h-full object-cover" src={p.image} alt={p.name} /></div><h4 className="font-bold text-sm line-clamp-2">{p.name}</h4></Link><p className="text-primary font-bold mt-2">{formatRupiah(p.price)}/{p.unit}</p><button onClick={() => addToCart({productId:p.id,name:p.name,price:p.price,quantity:1,unit:p.unit,image:p.image,storeName:p.storeName})} className="w-full bg-royal-blue text-white py-2 rounded-lg text-xs font-semibold mt-2">+ Keranjang</button></div>
      ))}</div>
    </div>
  );
}

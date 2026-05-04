import { Link } from 'react-router-dom';
import { useState } from 'react';
import { products, stores } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';

const materialCategories = ['Semua','Semen','Cat','Keramik','Plumbing','Listrik','Kayu','Pasir & Bata','Sanitary'];

export default function MaterialsPage() {
  const [cat, setCat] = useState('Semua');
  const [search, setSearch] = useState('');
  const { addToCart } = useStore();
  const filtered = products.filter(p => { if (cat !== 'Semua' && p.category !== cat) return false; if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false; return true; });

  return (
    <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto"><h1 className="text-h1 font-bold text-primary">Marketplace Material</h1><p className="text-body-lg text-on-surface-variant mt-2">Material bangunan berkualitas dari supplier terpercaya.</p></div>
      {/* Stores */}
      <section><h2 className="text-h3 font-bold mb-4">Toko Terpercaya</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{stores.map(s => (
        <Link key={s.id} to={`/materials/store/${s.id}`} className="bg-white rounded-2xl border border-outline-variant overflow-hidden hover:shadow-md transition-all">
          <div className="h-32 bg-surface-container"><img className="w-full h-full object-cover" src={s.image} alt={s.name} /></div>
          <div className="p-4 space-y-2"><h3 className="font-bold text-sm">{s.name}</h3><p className="text-caption text-outline">{s.city}</p><div className="flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span><span className="text-sm font-semibold">{s.rating}</span><span className="text-caption text-outline">({s.reviews})</span></div><div className="flex gap-1 flex-wrap">{s.categories.slice(0,2).map(c => <span key={c} className="text-[10px] bg-chip-bg px-2 py-0.5 rounded-full font-semibold">{c}</span>)}</div></div>
        </Link>
      ))}</div></section>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3"><div className="flex-1 relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-12" placeholder="Cari material..." /></div></div>
      <div className="flex flex-wrap gap-2">{materialCategories.map(c => <button key={c} onClick={() => setCat(c)} className={c === cat ? 'chip-active' : 'chip'}>{c}</button>)}</div>
      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-outline-variant overflow-hidden hover:shadow-md transition-all group flex flex-col min-w-0">
            <Link to={`/materials/product/${p.id}`}><div className="aspect-square bg-surface-container overflow-hidden"><img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={p.image} alt={p.name} /></div></Link>
            <div className="p-3 flex-1 flex flex-col space-y-2">
              <p className="text-[10px] font-bold text-outline uppercase">{p.category}</p>
              <Link to={`/materials/product/${p.id}`}><h4 className="font-bold text-sm line-clamp-2 hover:text-primary transition-colors">{p.name}</h4></Link>
              <p className="text-xs text-on-surface-variant break-words">{p.storeName}</p>
              <div className="flex-1"></div>
              <p className="text-primary font-extrabold price-text">{formatRupiah(p.price)}<span className="text-xs text-outline font-normal">/{p.unit}</span></p>
              <button onClick={() => addToCart({ productId: p.id, name: p.name, price: p.price, quantity: 1, unit: p.unit, image: p.image, storeName: p.storeName })} className="w-full bg-royal-blue text-white py-2 rounded-lg text-xs font-semibold hover:bg-primary transition-all flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm">add_shopping_cart</span>Keranjang</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

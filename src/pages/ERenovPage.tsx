import { Link } from 'react-router-dom';
import { useState } from 'react';
import { categories, workers } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';

export default function ERenovPage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [minRating, setMinRating] = useState(0);
  const cities = ['Jakarta','Bandung','Surabaya','Sidoarjo','Malang','Yogyakarta','Semarang','Bekasi'];

  const filtered = workers.filter(w => {
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCat && w.category !== selectedCat) return false;
    if (selectedCity && w.city !== selectedCity) return false;
    if (minRating && w.rating < minRating) return false;
    return true;
  });

  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-[200px] sm:h-[300px] shadow-xl">
        <img className="w-full h-full object-cover" src={workers[0]?.portfolio?.[0] || ''} alt="E-Renov" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
          <div className="text-white"><span className="bg-cta-amber text-on-background px-3 py-1 rounded-full text-caption font-semibold">Premium</span><h1 className="text-h2 sm:text-h1 font-bold mt-2">E-Renov</h1><p className="text-body-lg opacity-90">Temukan spesialis renovasi terbaik di kotamu.</p></div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-12" placeholder="Cari layanan atau pekerja..." /></div>
          <button className="btn-cta">Cari</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="chip cursor-pointer border-none text-sm"><option value="">Semua Kota</option>{cities.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} className="chip cursor-pointer border-none text-sm"><option value="">Semua Kategori</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
          <select value={minRating.toString()} onChange={e => setMinRating(Number(e.target.value))} className="chip cursor-pointer border-none text-sm"><option value="0">Rating</option><option value="4">4+ ⭐</option><option value="4.5">4.5+ ⭐</option><option value="4.8">4.8+ ⭐</option></select>
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-6"><h2 className="text-h2 font-bold">Kategori Renovasi</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.slice(0, 16).map(c => (
            <Link key={c.id} to={`/e-renov/category/${c.id}`} className="group p-4 bg-white rounded-2xl border border-outline-variant/30 hover:border-royal-blue transition-all cursor-pointer text-center space-y-2 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 mx-auto bg-primary-fixed/30 rounded-xl flex items-center justify-center text-royal-blue group-hover:scale-110 transition-transform"><span className="material-symbols-outlined">{c.icon}</span></div>
              <p className="text-xs font-semibold">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Workers */}
      <section>
        <h2 className="text-h2 font-bold mb-6">Pekerja Tersedia ({filtered.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(w => (
            <div key={w.id} className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col">
              <div className="relative h-44"><img className="w-full h-full object-cover" src={w.image} alt={w.name} />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span><span className="font-semibold text-caption">{w.rating}</span></div>
                {w.verified && <div className="absolute top-3 left-3"><span className="material-symbols-outlined text-royal-blue bg-white/90 rounded-full p-1 text-sm material-icon-filled">verified</span></div>}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div><h4 className="font-bold">{w.name}</h4><p className="text-caption text-outline font-semibold uppercase">{w.spec} • {w.city}</p><p className="text-caption text-on-surface-variant mt-1">{w.jobs} pekerjaan selesai</p></div>
                <div className="flex flex-wrap gap-1">{w.verified && <span className="text-[10px] bg-blue-50 text-royal-blue px-2 py-0.5 rounded-full font-semibold">Verified</span>}{w.recommended && <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Recommended</span>}{w.fastResponse && <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">Fast Response</span>}</div>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                  <div className="text-royal-blue font-bold text-sm">{formatRupiah(w.price)}<span className="text-caption text-outline font-normal">{w.priceUnit}</span></div>
                  <div className="flex gap-2">
                    <Link to={`/worker/${w.id}`} className="px-3 py-1.5 text-xs font-semibold border border-royal-blue text-royal-blue rounded-lg hover:bg-blue-50">Profil</Link>
                    <Link to={`/booking/${w.id}`} className="px-3 py-1.5 text-xs font-semibold bg-royal-blue text-white rounded-lg">Pesan</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { categories, workers } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';

export default function CategoryWorkersPage() {
  const { id } = useParams();
  const cat = categories.find(c => c.id === id);
  const filtered = cat ? workers.filter(w => w.category === cat.name) : workers;

  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3"><Link to="/e-renov" className="material-symbols-outlined text-outline hover:text-primary">arrow_back</Link><div><h1 className="text-h2 font-bold text-primary">{cat?.name || 'Kategori'}</h1><p className="text-on-surface-variant">{filtered.length} pekerja tersedia</p></div></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(w => (
          <div key={w.id} className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="relative h-44"><img className="w-full h-full object-cover" src={w.image} alt={w.name} /><div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span><span className="font-semibold text-caption">{w.rating}</span></div></div>
            <div className="p-5 space-y-3"><h4 className="font-bold">{w.name}</h4><p className="text-caption text-outline">{w.spec} • {w.city}</p>
              <div className="flex items-center justify-between"><span className="font-bold text-primary">{formatRupiah(w.price)}{w.priceUnit}</span><Link to={`/booking/${w.id}`} className="bg-royal-blue text-white px-4 py-2 rounded-lg text-sm font-semibold">Pesan</Link></div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center py-12"><span className="material-symbols-outlined text-6xl text-outline">search_off</span><p className="text-on-surface-variant mt-4">Belum ada pekerja untuk kategori ini.</p></div>}
      </div>
    </div>
  );
}

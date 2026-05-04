import { Link } from 'react-router-dom';
import { promoPackages } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';

export default function PromotionsPage() {
  return (
    <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-10">
      <div className="text-center bg-gradient-to-r from-royal-blue to-secondary text-white rounded-2xl p-8 sm:p-12"><h1 className="text-h1 font-bold">Promo & Paket Hemat</h1><p className="text-blue-100 mt-2 text-lg">Hemat lebih banyak dengan paket layanan pilihan.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{promoPackages.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border border-outline-variant overflow-hidden hover:shadow-card-hover transition-all flex flex-col">
          <div className="relative h-48"><img className="w-full h-full object-cover" src={p.image} alt={p.name} /><div className="absolute top-4 right-4 bg-error text-white px-3 py-1 rounded-full font-bold text-sm">-{p.discount}%</div></div>
          <div className="p-6 flex-1 flex flex-col space-y-3">
            <h3 className="text-h3 font-bold">{p.name}</h3>
            <ul className="space-y-1 flex-1">{p.services.map(s => <li key={s} className="flex items-start gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>{s}</li>)}</ul>
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-outline text-sm">schedule</span><span className="text-sm text-on-surface-variant">{p.duration}</span></div>
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-outline text-sm">verified_user</span><span className="text-sm text-on-surface-variant">Garansi: {p.warranty}</span></div>
            <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
              <div className="min-w-0"><p className="text-sm text-outline line-through price-text">{formatRupiah(Math.round(p.price / (1 - p.discount / 100)))}</p><p className="text-2xl md:text-3xl font-black text-primary price-text-strong">{formatRupiah(p.price)}</p></div>
              <Link to="/e-renov" className="bg-cta-amber text-on-background px-4 py-2 rounded-lg font-bold text-sm">Pesan</Link>
            </div>
          </div>
        </div>
      ))}</div>
    </div>
  );
}

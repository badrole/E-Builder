import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { workers, reviews } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';
import PriceCountUp from '../components/PriceCountUp';
import { fetchPartnerById, mapPartnerToWorker } from '../lib/partners';
import { openWhatsApp } from '../utils/formatters';

export default function WorkerDetailPage() {
  const { id } = useParams();
  const mockWorker = workers.find(w => w.id === id);
  const [supabaseWorker, setSupabaseWorker] = useState<any | null>(null);
  const [loading, setLoading] = useState(!mockWorker);
  const w = supabaseWorker || mockWorker || workers[0];
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.workers.includes(w.id);
  const workerReviews = reviews.filter(r => r.workerId === w.id);

  useEffect(() => {
    if (!id || mockWorker) return;
    fetchPartnerById(id)
      .then(partner => {
        if (partner?.type === 'Worker' && partner.status === 'active') setSupabaseWorker(mapPartnerToWorker(partner));
      })
      .catch(error => console.error('Supabase worker detail fetch failed:', error))
      .finally(() => setLoading(false));
  }, [id, mockWorker]);

  if (loading) return <div className="max-w-container mx-auto px-4 sm:px-8 py-16 text-on-surface-variant">Memuat profil mitra...</div>;

  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Link to="/e-renov" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8">
            <div className="flex flex-wrap gap-6 items-start">
              <img className="w-24 h-24 rounded-2xl object-cover shadow-md" src={w.image} alt={w.name} />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2"><h1 className="text-h3 font-bold">{w.name}</h1>{w.verified && <span className="material-symbols-outlined text-primary material-icon-filled">verified</span>}</div>
                <p className="text-on-surface-variant font-semibold">{w.spec}</p>
                <div className="flex flex-wrap gap-2">{w.verified && <span className="chip text-xs">✓ Verified</span>}{w.recommended && <span className="chip text-xs bg-amber-50 text-amber-700">★ Recommended</span>}{w.fastResponse && <span className="chip text-xs bg-green-50 text-green-700">⚡ Fast Response</span>}</div>
                <div className="flex gap-6 mt-4 text-sm"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span>{w.rating} ({w.reviews} ulasan)</span><span>{w.jobs} pekerjaan</span><span>{w.exp}</span><span>{w.city}</span></div>
              </div>
              <button onClick={() => toggleFavorite('workers', w.id)} className="p-2 rounded-full hover:bg-red-50"><span className={`material-symbols-outlined text-2xl ${isFav ? 'text-red-500 material-icon-filled' : 'text-outline'}`}>favorite</span></button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold mb-4">Portfolio</h3><div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{w.portfolio.map((img: string, i: number) => <img key={i} className="rounded-xl h-36 w-full object-cover" src={img} alt="portfolio" />)}</div></div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold mb-4">Ulasan ({workerReviews.length})</h3>
            {workerReviews.length > 0 ? workerReviews.map(r => (
              <div key={r.id} className="py-4 border-b border-outline-variant/30 last:border-0"><div className="flex items-center gap-2 mb-2"><div className="flex">{[...Array(r.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span>)}</div><span className="text-caption text-outline">{r.date}</span></div><p className="text-sm font-semibold">{r.user}</p><p className="text-sm text-on-surface-variant">{r.text}</p></div>
            )) : <p className="text-on-surface-variant">Belum ada ulasan.</p>}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4 sticky top-24">
            <h3 className="font-bold text-lg">Ringkasan Harga</h3>
            <div className="p-4 bg-primary/5 rounded-xl"><p className="text-3xl font-black text-primary"><PriceCountUp value={w.price} /></p><p className="text-sm text-on-surface-variant">{w.priceUnit}</p></div>
            <div className="space-y-2 text-sm"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{w.warranty}</div><div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">phone</span>{w.phone}</div></div>
            <Link to={`/booking/${w.id}`} className="btn-cta w-full text-center block">Booking Sekarang</Link>
            <button onClick={() => openWhatsApp(w.whatsappNumber || w.phone, 'Halo, saya pelanggan E-Builder. Saya ingin berkonsultasi tentang layanan.')} className="btn-outline w-full text-center block">Chat WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

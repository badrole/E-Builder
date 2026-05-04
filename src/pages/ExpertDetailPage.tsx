import { useParams, Link } from 'react-router-dom';
import { experts } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import PriceCountUp from '../components/PriceCountUp';

export default function ExpertDetailPage() {
  const { id } = useParams();
  const e = experts.find(e => e.id === id) || experts[0];
  return (
    <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
      <Link to="/consultation" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 flex flex-wrap gap-6 items-start">
            <img className="w-24 h-24 rounded-2xl object-cover shadow-md" src={e.image} alt={e.name} />
            <div className="flex-1 space-y-2"><div className="flex items-center gap-2"><h1 className="text-h3 font-bold">{e.name}</h1>{e.verified && <span className="material-symbols-outlined text-primary material-icon-filled">verified</span>}</div><p className="text-on-surface-variant font-semibold">{e.spec} — {e.subSpec}</p><span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase">{e.badge}</span><div className="flex gap-4 text-sm mt-2"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span>{e.rating} ({e.reviews})</span><span>{e.exp}</span></div></div>
          </div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3"><h3 className="font-bold">Tentang</h3><p className="text-on-surface-variant text-sm">{e.bio}</p><p className="text-sm"><strong>Lisensi:</strong> {e.license}</p></div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3"><h3 className="font-bold">Topik Konsultasi</h3><div className="flex flex-wrap gap-2">{e.topics.map(t => <span key={t} className="chip">{t}</span>)}</div></div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3"><h3 className="font-bold">Jadwal Tersedia</h3><ul className="space-y-2">{e.schedule.map((s, i) => <li key={i} className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-primary text-sm">schedule</span>{s}</li>)}</ul></div>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4 sticky top-24 h-fit">
          <div className="p-4 bg-primary/5 rounded-xl text-center overflow-hidden"><p className="text-sm text-outline font-semibold">Biaya Konsultasi</p><p className="text-2xl md:text-4xl lg:text-5xl font-black text-primary price-text-strong"><PriceCountUp value={e.fee} /></p><p className="text-sm text-on-surface-variant">{e.feeUnit}</p></div>
          <Link to={`/consultation/book/${e.id}`} className="btn-cta w-full text-center block">Booking Konsultasi</Link>
          <a href={`https://wa.me/62${e.phone.slice(1)}`} target="_blank" rel="noreferrer" className="btn-outline w-full text-center block">Chat WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

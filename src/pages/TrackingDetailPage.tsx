import { useParams, Link } from 'react-router-dom';
import { trackingProjects } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';

export default function TrackingDetailPage() {
  const { projectId } = useParams();
  const p = trackingProjects.find(p => p.id === projectId) || trackingProjects[0];
  if (!p) return <div className="text-center py-16"><p>Proyek tidak ditemukan.</p><Link to="/tracking" className="btn-primary mt-4 inline-block">Kembali</Link></div>;
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Link to="/tracking" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <div className="flex flex-wrap justify-between items-start gap-4"><div><h1 className="text-h2 font-bold text-primary">{p.name}</h1><p className="text-on-surface-variant">{p.type} • {p.location} • Pekerja: {p.worker}</p></div><span className="bg-blue-100 text-primary px-4 py-2 rounded-full font-bold">{p.status}</span></div>
      <div className="w-full bg-surface-container rounded-full h-4"><div className="bg-royal-blue h-4 rounded-full transition-all flex items-center justify-end pr-2" style={{ width: `${p.progress}%` }}><span className="text-white text-xs font-bold">{p.progress}%</span></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold text-lg mb-4">Timeline Milestone</h3><div className="space-y-6">
            {p.milestones.map((m, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-0"><div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm ${m.status === 'done' ? 'bg-green-500' : m.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`}></div>{i < p.milestones.length - 1 && <div className="w-0.5 h-12 bg-slate-200 ml-[11px]"></div>}</div>
                <div><p className={`text-xs font-bold uppercase tracking-wider ${m.status === 'done' ? 'text-green-600' : m.status === 'current' ? 'text-blue-600' : 'text-outline'}`}>{m.status === 'done' ? '✓ SELESAI' : m.status === 'current' ? '⏳ SEDANG DIKERJAKAN' : 'MENDATANG'}</p><h4 className="font-bold">{m.name}</h4><p className="text-caption text-on-surface-variant">{m.date}</p></div>
              </div>
            ))}
          </div></div>
          {p.updates.length > 0 && <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold text-lg mb-4">Update Terbaru</h3>{p.updates.map((u, i) => (<div key={i} className="flex gap-4 py-3 border-b border-outline-variant/30 last:border-0"><img className="w-20 h-20 rounded-xl object-cover" src={u.image} alt="update" /><div><p className="text-caption text-outline">{u.date}</p><p className="text-sm">{u.note}</p></div></div>))}</div>}
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3">
            <h3 className="font-bold">Milestone Pembayaran</h3>
            {p.payments.map((pay, i) => (<div key={i} className="flex justify-between items-center py-2 border-b border-outline-variant/30 last:border-0"><div><p className="font-semibold text-sm">{pay.name}</p><p className={`text-xs font-bold ${pay.status === 'Lunas' ? 'text-green-600' : 'text-amber-600'}`}>{pay.status}</p></div><span className="font-bold">{formatRupiah(pay.amount)}</span></div>))}
          </div>
          <div className="space-y-2"><a href="https://wa.me/6285749780759" target="_blank" rel="noreferrer" className="btn-outline w-full text-center block flex items-center justify-center gap-2"><span className="material-symbols-outlined text-sm">chat</span>Hubungi Support</a><Link to="/help/complaint" className="btn-outline w-full text-center block text-error border-error">Laporkan Masalah</Link></div>
        </div>
      </div>
    </div>
  );
}

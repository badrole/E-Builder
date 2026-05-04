import { useParams, Link } from 'react-router-dom';
import { constructPackages } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import PriceCountUp from '../components/PriceCountUp';

export default function PackageDetailPage() {
  const { id } = useParams();
  const pkg = constructPackages.find(p => p.id === id) || constructPackages[0];
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Link to="/e-construct" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-64 rounded-2xl overflow-hidden"><img className="w-full h-full object-cover" src={pkg.image} alt={pkg.name} /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div><h1 className="absolute bottom-6 left-6 text-white text-h2 font-bold">{pkg.name}</h1></div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4"><h3 className="font-bold text-lg">Tahapan Proyek</h3><div className="space-y-3">{pkg.phases.map((p, i) => (<div key={i} className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{i+1}</div><p className="font-semibold">{p}</p></div>))}</div></div>
          <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold text-lg mb-4">Tim Profesional</h3><div className="flex flex-wrap gap-2">{pkg.team.map(t => <span key={t} className="chip">{t}</span>)}</div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold text-lg mb-4 text-green-700">✓ Termasuk</h3><ul className="space-y-2">{pkg.included.map(i => <li key={i} className="flex items-start gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>{i}</li>)}</ul></div>
            <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold text-lg mb-4 text-red-600">✕ Tidak Termasuk</h3><ul className="space-y-2">{pkg.excluded.map(i => <li key={i} className="flex items-start gap-2 text-sm"><span className="material-symbols-outlined text-red-400 text-sm mt-0.5">cancel</span>{i}</li>)}</ul></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant p-6 sticky top-24 space-y-4">
            <div className="p-4 bg-primary/5 rounded-xl"><p className="text-sm text-outline font-semibold">Mulai dari</p><p className="text-3xl font-black text-primary"><PriceCountUp value={pkg.price} /></p><p className="text-sm text-on-surface-variant">{pkg.duration}</p></div>
            <div><h4 className="font-semibold mb-2">Milestone Pembayaran</h4>{pkg.milestones.map((m, i) => <div key={i} className="flex justify-between text-sm py-2 border-b border-outline-variant/30 last:border-0"><span>{m.name}</span><span className="font-bold">{m.pct}%</span></div>)}</div>
            <Link to={`/e-construct/survey?pkgId=${pkg.id}`} className="btn-cta w-full text-center block">Minta Survei Gratis</Link>
            <Link to="/consultation" className="btn-outline w-full text-center block">Konsultasi Dulu</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

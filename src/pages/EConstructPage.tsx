import { Link } from 'react-router-dom';
import { constructPackages } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';

export default function EConstructPage() {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto"><span className="chip-active mx-auto mb-4">KONSTRUKSI TERINTEGRASI</span><h1 className="text-h1 font-bold text-primary mt-4">E-Construct</h1><p className="text-body-lg text-on-surface-variant mt-4">Paket konstruksi lengkap dengan tim profesional terverifikasi, dari perencanaan hingga serah terima.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {constructPackages.map((pkg, i) => (
          <div key={pkg.id} className={`bg-white rounded-2xl border-2 overflow-hidden flex flex-col transition-all hover:shadow-xl ${i === 2 ? 'border-cta-amber shadow-lg scale-[1.02]' : 'border-outline-variant shadow-card'}`}>
            {i === 2 && <div className="bg-cta-amber text-on-background text-center py-2 text-sm font-bold uppercase tracking-widest">🏆 PALING POPULER</div>}
            <div className="relative h-48"><img className="w-full h-full object-cover" src={pkg.image} alt={pkg.name} /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div><h3 className="absolute bottom-4 left-6 text-white text-h3 font-bold">{pkg.name}</h3></div>
            <div className="p-6 flex-1 flex flex-col space-y-4">
              <p className="text-on-surface-variant text-sm">{pkg.suitable}</p>
              <div className="p-4 bg-primary/5 rounded-xl"><p className="text-caption text-outline font-semibold uppercase">Mulai dari</p><p className="text-2xl font-black text-primary">{formatRupiah(pkg.price)}</p><p className="text-caption text-on-surface-variant">{pkg.duration}</p></div>
              <div><h4 className="font-semibold text-sm mb-2">Tim:</h4><div className="flex flex-wrap gap-1">{pkg.team.map(t => <span key={t} className="chip text-xs">{t}</span>)}</div></div>
              <div><h4 className="font-semibold text-sm mb-2 text-green-700">✓ Termasuk:</h4><ul className="space-y-1">{pkg.included.map(i => <li key={i} className="text-xs text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-green-500 text-sm">check</span>{i}</li>)}</ul></div>
              <div className="flex-1"></div>
              <Link to={`/e-construct/package/${pkg.id}`} className={`w-full text-center block py-3 rounded-xl font-bold transition-all ${i === 2 ? 'bg-cta-amber text-on-background hover:shadow-lg' : 'bg-royal-blue text-white hover:bg-primary'}`}>Lihat Detail</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-royal-blue rounded-2xl p-8 sm:p-12 text-white text-center"><h3 className="text-h3 font-bold mb-4">Butuh Konsultasi Gratis?</h3><p className="text-blue-100 mb-6 max-w-xl mx-auto">Tim kami siap membantu Anda merencanakan proyek konstruksi. Jadwalkan survei lokasi gratis sekarang.</p><Link to="/e-construct/survey" className="btn-cta inline-block">Minta Survei Gratis</Link></div>
    </div>
  );
}

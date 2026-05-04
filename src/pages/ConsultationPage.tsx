import { Link } from 'react-router-dom';
import { experts } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useState } from 'react';

const specFilters = ['Semua', 'Arsitek', 'Interior Designer', 'Civil Engineer', 'Konsultan RAB'];

export default function ConsultationPage() {
  const [filter, setFilter] = useState('Semua');
  const filtered = filter === 'Semua' ? experts : experts.filter(e => e.spec === filter);
  const flowSteps = [{ icon: 'person_search', title: 'Pilih Ahli' }, { icon: 'calendar_month', title: 'Atur Jadwal' }, { icon: 'payments', title: 'Pembayaran' }, { icon: 'forum', title: 'Mulai Diskusi' }];

  return (
    <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto"><h1 className="text-h1 font-bold text-primary">Konsultasi Ahli</h1><p className="text-body-lg text-on-surface-variant mt-2">Rancang hunian impian bersama arsitek dan profesional terbaik.</p></div>
      {/* Flow */}
      <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">{flowSteps.map((s, i) => (<div key={i} className="flex items-center gap-2 sm:gap-4"><div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-primary">{s.icon}</span></div><span className="text-xs font-semibold text-center">{s.title}</span></div>{i < 3 && <span className="material-symbols-outlined text-outline hidden sm:block">arrow_forward</span>}</div>))}</div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">{specFilters.map(f => <button key={f} onClick={() => setFilter(f)} className={f === filter ? 'chip-active' : 'chip'}>{f}</button>)}</div>
      {/* Experts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{filtered.map(e => (
        <div key={e.id} className="bg-white rounded-xl shadow-card border-t-4 border-royal-blue overflow-hidden flex flex-col hover:shadow-card-hover transition-all">
          <div className="p-6 flex-1 space-y-3">
            <div className="flex justify-between items-start"><div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden border-2 border-white shadow-sm"><img className="w-full h-full object-cover" src={e.image} alt={e.name} /></div><span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded-full text-[10px] font-bold uppercase">{e.badge}</span></div>
            <div><h3 className="font-semibold text-sm">{e.name}</h3><p className="text-caption text-on-surface-variant">{e.spec} • {e.subSpec}</p></div>
            <div className="flex items-center gap-1"><span className="material-symbols-outlined text-amber-500 text-sm material-icon-filled">star</span><span className="font-semibold text-sm">{e.rating}</span><span className="text-caption text-outline">({e.reviews} ulasan)</span></div>
            <p className="text-xs text-on-surface-variant">{e.exp} pengalaman</p>
            <div className="flex flex-wrap gap-1">{e.topics.slice(0, 3).map(t => <span key={t} className="text-[10px] bg-chip-bg px-2 py-0.5 rounded-full font-semibold">{t}</span>)}</div>
          </div>
          <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-outline-variant/30">
            <div className="min-w-0"><p className="text-caption text-outline uppercase font-bold">Biaya Sesi</p><p className="font-semibold text-primary price-text">{formatRupiah(e.fee)}<span className="text-xs font-normal">{e.feeUnit}</span></p></div>
            <div className="flex gap-2"><Link to={`/consultation/expert/${e.id}`} className="px-3 py-1.5 text-xs font-semibold border border-royal-blue text-royal-blue rounded-lg">Profil</Link><Link to={`/consultation/book/${e.id}`} className="px-3 py-1.5 text-xs font-semibold bg-cta-amber text-on-background rounded-lg">Booking</Link></div>
          </div>
        </div>
      ))}</div>
    </div>
  );
}

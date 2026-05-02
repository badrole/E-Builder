import { Link } from 'react-router-dom';
import { IMAGES } from '../data/images';
import { categories, workers, products, experts, trackingProjects } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useState, useEffect } from 'react';

const banners = [
  { title: 'Renovasi Premium 2026', sub: 'Diskon hingga 20% untuk semua layanan renovasi', bg: 'from-royal-blue to-primary' },
  { title: 'Material Berkualitas', sub: 'Belanja material bangunan dengan harga terbaik', bg: 'from-secondary to-royal-blue' },
  { title: 'Konsultasi Gratis', sub: 'Konsultasi pertama GRATIS dengan arsitek profesional', bg: 'from-tertiary-container to-royal-blue' },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  useEffect(() => { const t = setInterval(() => setSlide(s => (s + 1) % banners.length), 4000); return () => clearInterval(t); }, []);

  const featureBubbles = [
    { name: 'E-Renov', icon: 'home_repair_service', to: '/e-renov' },
    { name: 'E-Construct', icon: 'architecture', to: '/e-construct' },
    { name: 'Marketplace', icon: 'storefront', to: '/materials' },
    { name: 'Estimasi RAB', icon: 'calculate', to: '/rab' },
    { name: 'Konsultasi', icon: 'support_agent', to: '/consultation' },
    { name: 'Tracking', icon: 'monitoring', to: '/tracking' },
    { name: 'Promo', icon: 'local_offer', to: '/promotions' },
    { name: 'Darurat', icon: 'emergency', to: '/emergency' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative px-4 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-container mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-xs mb-6">ARSITEKTUR & KONSTRUKSI DIGITAL</span>
            <h1 className="text-h1 font-bold text-primary mb-6 leading-tight">Bangun Impian Anda dengan <br/><span className="text-secondary">Presisi Arsitektur.</span></h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl mb-8">Platform digital premium untuk renovasi, konstruksi, dan project tracking. Temukan tenaga ahli terverifikasi dan material berkualitas.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/e-renov" className="btn-cta flex items-center gap-2"><span className="material-symbols-outlined">explore</span>Cari Jasa</Link>
              <Link to="/rab" className="btn-outline flex items-center gap-2"><span className="material-symbols-outlined">calculate</span>Hitung RAB</Link>
              <Link to="/consultation" className="btn-outline flex items-center gap-2"><span className="material-symbols-outlined">support_agent</span>Konsultasi</Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-royal-blue/20 to-transparent rounded-[32px] -rotate-3 translate-x-4"></div>
            <div className="absolute inset-0 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant">
              <img alt="Modern Architecture" className="w-full h-full object-cover" src={IMAGES.hero} />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 glass-card p-4 sm:p-6 rounded-2xl">
                <p className="text-caption font-semibold text-primary mb-1">SEDANG DIPROMOSIKAN</p>
                <p className="text-h3 font-semibold">Renovasi Premium 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Carousel */}
      <section className="max-w-container mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="relative overflow-hidden rounded-2xl">
          <div className={`bg-gradient-to-r ${banners[slide].bg} p-8 sm:p-12 text-white transition-all duration-500`}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{banners[slide].title}</h3>
            <p className="text-blue-100 text-lg">{banners[slide].sub}</p>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => <button key={i} onClick={() => setSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? 'bg-white w-6' : 'bg-white/50'}`} />)}
          </div>
        </div>
      </section>

      {/* Feature Bubbles */}
      <section className="py-16 sm:py-24 max-w-container mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {featureBubbles.map(f => (
            <Link key={f.name} to={f.to} className="group flex flex-col items-center gap-3 cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-outline-variant flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary transition-all">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">{f.icon}</span>
              </div>
              <span className="text-label-bold text-primary text-center">{f.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <div><h2 className="text-h2 font-bold text-primary">Layanan Renovasi</h2><p className="text-on-surface-variant mt-2">Profesional terverifikasi untuk perbaikan rumah Anda.</p></div>
            <Link to="/e-renov" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">Lihat semua <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.slice(0, 3).map(w => (
              <div key={w.id} className="group card-base overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img alt={w.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={w.image} />
                  <div className="absolute top-4 right-4 bg-cta-amber text-on-background px-3 py-1 rounded-full text-xs font-bold shadow-md">{w.category.split('/')[0].trim().toUpperCase()}</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-sm">{w.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                      <div><h4 className="font-bold text-sm">{w.name}</h4><div className="flex items-center gap-1 text-xs text-on-surface-variant"><span className="material-symbols-outlined text-sm text-yellow-500 material-icon-filled">star</span>{w.rating} ({w.reviews})</div></div>
                    </div>
                    {w.verified && <span className="material-symbols-outlined text-primary material-icon-filled">verified</span>}
                  </div>
                  <p className="text-caption text-on-surface-variant line-clamp-2 mb-4">{w.spec} • {w.city}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">Mulai {formatRupiah(w.price)}</span>
                    <Link to={`/worker/${w.id}`} className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-all">Lihat Profil</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Widget */}
      <section className="py-16 sm:py-24 max-w-container mx-auto px-4 sm:px-8">
        <div className="bg-royal-blue rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-h2 font-bold mb-6 text-white">Project Tracking <br/><span className="text-cta-amber">Reimagined.</span></h2>
              <p className="text-body-lg text-blue-100 mb-8">Pantau progres proyek secara real-time. Milestone, foto update, dan kontrol anggaran dalam satu dashboard.</p>
              <Link to="/tracking" className="btn-cta inline-flex items-center gap-2">Buka Dashboard <span className="material-symbols-outlined">arrow_forward</span></Link>
            </div>
            <div className="glass-card rounded-2xl p-6 text-on-surface shadow-2xl">
              {trackingProjects[0] && (
                <>
                  <div className="flex justify-between items-center mb-6"><h4 className="font-bold text-primary">{trackingProjects[0].name}</h4><span className="px-3 py-1 bg-blue-100 text-primary text-xs font-bold rounded-full">PROGRES {trackingProjects[0].progress}%</span></div>
                  <div className="space-y-4">
                    {trackingProjects[0].milestones.slice(0, 3).map((m, i) => (
                      <div key={i} className="relative pl-8 border-l-2 border-blue-100">
                        <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-4 border-white ${m.status === 'done' ? 'bg-green-500' : m.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`}></div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${m.status === 'current' ? 'text-blue-500' : 'text-outline'}`}>{m.status === 'done' ? 'SELESAI' : m.status === 'current' ? 'SEDANG DIKERJAKAN' : 'MENDATANG'}</p>
                        <p className={`font-bold text-sm ${m.status === 'upcoming' ? 'text-slate-400' : ''}`}>{m.name}</p>
                      </div>
                    ))}
                  </div>
                  <Link to={`/tracking/${trackingProjects[0].id}`} className="block w-full mt-6 py-3 bg-primary text-white rounded-lg font-bold text-center text-sm">Lihat Detail</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 max-w-container mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div><h2 className="text-h2 font-bold text-primary">Marketplace Material</h2><p className="text-on-surface-variant mt-2">Material bangunan berkualitas dari supplier terpercaya.</p></div>
          <Link to="/materials" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">Lihat semua <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.slice(0, 5).map(p => (
            <Link key={p.id} to={`/materials/product/${p.id}`} className="group bg-white p-3 sm:p-4 rounded-2xl border border-outline-variant hover:shadow-lg transition-all">
              <div className="aspect-square bg-surface-container rounded-xl overflow-hidden mb-3"><img alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={p.image} /></div>
              <p className="text-xs font-bold text-outline uppercase mb-1">{p.category}</p>
              <h4 className="font-bold text-xs sm:text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.name}</h4>
              <p className="text-primary font-extrabold text-sm">{formatRupiah(p.price)} <span className="text-xs text-on-surface-variant font-normal">/{p.unit}</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* RAB Widget */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 glass-card p-8 sm:p-10 rounded-[32px] shadow-xl border border-outline-variant">
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white"><span className="material-symbols-outlined">calculate</span></div><h3 className="text-h3 font-semibold text-primary">Estimasi RAB Cerdas</h3></div>
              <p className="text-on-surface-variant mb-6">Hitung estimasi biaya renovasi dan konstruksi dengan akurat menggunakan data harga pasar terkini.</p>
              <div className="p-6 bg-royal-blue/5 rounded-xl border border-royal-blue/10 mb-6">
                <p className="text-on-surface-variant text-sm mb-1">Contoh Estimasi</p>
                <p className="text-3xl font-black text-primary">Rp21.600.000</p>
                <p className="text-xs text-on-surface-variant mt-1">Renovasi Kamar Mandi • Standard • 12m²</p>
              </div>
              <Link to="/rab" className="btn-cta w-full text-center block">Mulai Hitung RAB</Link>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-semibold text-xs mb-6">MESIN ESTIMASI</span>
              <h2 className="text-h2 font-bold text-primary mb-6">Anggaran dengan Presisi Arsitektur.</h2>
              <p className="text-body-lg text-on-surface-variant mb-8">Engine RAB kami menganalisis data pasar real-time untuk memberikan estimasi biaya konstruksi paling akurat.</p>
              <ul className="space-y-3">
                {['Indeks harga material real-time','Penyesuaian biaya regional','Itemisasi struktural lengkap'].map(t => (
                  <li key={t} className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="py-16 max-w-container mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-8"><div><h2 className="text-h2 font-bold text-primary">Konsultasi Ahli</h2><p className="text-on-surface-variant mt-2">Rancang hunian impian bersama profesional terbaik.</p></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map(e => (
            <div key={e.id} className="bg-white rounded-xl shadow-card border-t-4 border-royal-blue overflow-hidden flex flex-col">
              <div className="p-6 flex-1 space-y-3">
                <div className="flex justify-between items-start"><div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden border-2 border-white shadow-sm"><img className="w-full h-full object-cover" src={e.image} alt={e.name} /></div><span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded-full text-[10px] font-bold uppercase">{e.badge}</span></div>
                <div><h3 className="font-semibold text-sm">{e.name}</h3><p className="text-caption text-on-surface-variant">{e.spec}</p></div>
                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-amber-500 text-sm material-icon-filled">star</span><span className="font-semibold text-sm">{e.rating}</span><span className="text-caption text-outline">({e.reviews})</span></div>
              </div>
              <div className="p-4 bg-slate-50 flex items-center justify-between">
                <div><p className="text-caption text-outline uppercase font-bold">Biaya Sesi</p><p className="font-semibold text-primary">{formatRupiah(e.fee)}<span className="text-xs font-normal">{e.feeUnit}</span></p></div>
                <Link to={`/consultation/book/${e.id}`} className="bg-cta-amber text-on-background px-4 py-2 rounded-lg font-semibold text-sm active:scale-95 transition-all">Booking</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

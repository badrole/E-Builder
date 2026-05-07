import { Link } from 'react-router-dom';
import { IMAGES } from '../data/images';
import { categories, workers, products, experts, trackingProjects } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { name: 'Darurat', icon: 'emergency', to: '/emergency', highlight: true },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 z-10"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-xs mb-6"
            >
              ARSITEKTUR & KONSTRUKSI DIGITAL
            </motion.span>
            <h1 className="text-h1 font-bold text-primary mb-6 leading-tight">
              Bangun Impian Anda dengan <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary-fixed-dim">
                Presisi Arsitektur.
              </span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl mb-8">Platform digital premium untuk renovasi, konstruksi, dan project tracking. Temukan tenaga ahli terverifikasi dan material berkualitas.</p>
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/e-renov" className="btn-cta flex items-center gap-2"><span className="material-symbols-outlined">explore</span>Cari Jasa</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/rab" className="btn-outline flex items-center gap-2 bg-white"><span className="material-symbols-outlined">calculate</span>Hitung RAB</Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-primary/10 rounded-[2rem] -rotate-3 translate-x-4 animate-soft-float blur-sm"></div>
            <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-outline-variant/50">
              <img alt="Modern Architecture" className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110" src={IMAGES.hero} />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 glass-card p-4 sm:p-6 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <p className="text-[10px] font-bold tracking-widest text-primary uppercase">Sedang Dipromosikan</p>
                </div>
                <p className="text-xl sm:text-2xl font-black text-on-surface">Renovasi Premium 2026</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Banner Carousel */}
      <section className="max-w-container mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(17,31,162,0.15)]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={slide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`bg-gradient-to-r ${banners[slide].bg} p-8 sm:p-12 text-white relative`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-4xl font-black mb-3">{banners[slide].title}</h3>
                <p className="text-blue-100 text-lg font-medium">{banners[slide].sub}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setSlide(i)} 
                className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Bubbles */}
      <section className="py-16 sm:py-24 max-w-container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 sm:gap-8 justify-items-center">
          {featureBubbles.map((f, i) => (
            <motion.div 
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={f.to} className="group flex flex-col items-center gap-3 cursor-pointer">
                <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[1.2rem] bg-white border flex items-center justify-center transition-all duration-300 relative ${f.highlight ? 'border-error/30 shadow-[0_4px_20px_rgba(186,26,26,0.15)] group-hover:bg-error group-hover:border-error' : 'border-outline-variant shadow-sm group-hover:shadow-md group-hover:border-primary group-hover:bg-primary-fixed/30'}`}>
                  {f.highlight && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                    </span>
                  )}
                  <span className={`material-symbols-outlined text-2xl sm:text-3xl transition-colors ${f.highlight ? 'text-error group-hover:text-white' : 'text-primary group-hover:scale-110'}`}>{f.icon}</span>
                </div>
                <span className={`text-xs sm:text-sm font-bold text-center ${f.highlight ? 'text-error' : 'text-primary'}`}>{f.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-surface/50 to-white pointer-events-none"></div>
        <div className="max-w-container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <div>
              <h2 className="text-h2 font-black text-primary">Tenaga Profesional Terverifikasi</h2>
              <p className="text-on-surface-variant mt-2 text-lg">Solusi perbaikan dan pembangunan rumah Anda.</p>
            </div>
            <Link to="/e-renov" className="hidden sm:flex text-primary font-bold text-sm items-center gap-1 hover:gap-2 transition-all bg-primary-fixed/50 px-4 py-2 rounded-full">
              Lihat semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {workers.slice(0, 3).map((w, i) => (
              <motion.div 
                key={w.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-base overflow-hidden flex flex-col border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(17,31,162,0.1)]"
              >
                <div className="h-56 relative overflow-hidden">
                  <img alt={w.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={w.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-cta-amber text-on-background px-3 py-1.5 rounded-full text-xs font-black tracking-wider shadow-md">
                    {w.category.split('/')[0].trim().toUpperCase()}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold">
                        <span className="material-symbols-outlined text-sm text-yellow-400 material-icon-filled">star</span>
                        {w.rating} ({w.reviews})
                      </div>
                      <span className="bg-primary px-3 py-1 rounded-md font-black text-sm shadow-md">
                        Mulai {formatRupiah(w.price).replace('Rp', '')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary font-black text-lg border border-primary-fixed">
                        {w.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-on-surface leading-tight">{w.name}</h4>
                        <p className="text-sm font-semibold text-primary flex items-center gap-1">
                          {w.verified && <span className="material-symbols-outlined text-xs material-icon-filled text-blue-500">verified</span>}
                          Terverifikasi
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 font-medium mt-2">{w.spec} • Berlokasi di {w.city}</p>
                  
                  <div className="mt-auto pt-4 border-t border-outline-variant/50">
                    <Link to={`/worker/${w.id}`} className="flex items-center justify-center gap-2 w-full py-3 bg-surface hover:bg-primary hover:text-white text-primary rounded-xl font-bold transition-all border border-primary/20 hover:border-transparent">
                      Lihat Profil Lengkap <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
             <Link to="/e-renov" className="inline-flex text-primary font-bold text-sm items-center gap-2 bg-primary-fixed/50 px-6 py-3 rounded-full">
              Lihat semua layanan <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tracking Widget */}
      <section className="py-16 sm:py-24 max-w-container mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-secondary/40 to-transparent pointer-events-none"></div>
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-xs mb-6 border border-white/20 tracking-wider">FITUR UNGGULAN</span>
              <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                Project Tracking <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta-amber to-yellow-300">
                  Transparan & Real-time.
                </span>
              </h2>
              <p className="text-lg text-primary-fixed mb-10 font-medium">Pantau progres proyek pembangunan atau renovasi rumah Anda secara real-time. Milestone, laporan foto harian, dan kontrol anggaran dalam satu genggaman.</p>
              <Link to="/tracking" className="btn-cta inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,181,71,0.4)]">
                Buka Tracking Dashboard <span className="material-symbols-outlined">monitoring</span>
              </Link>
            </div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              {trackingProjects[0] && (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-xs text-primary-fixed uppercase font-bold tracking-wider mb-1">PROYEK AKTIF</p>
                      <h4 className="text-xl font-black text-white">{trackingProjects[0].name}</h4>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-black rounded-xl shadow-lg border border-green-300">
                      {trackingProjects[0].progress}%
                    </div>
                  </div>
                  
                  <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/20">
                    {trackingProjects[0].milestones.slice(0, 3).map((m, i) => (
                      <div key={i} className="relative pl-10">
                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-primary flex items-center justify-center z-10 ${m.status === 'done' ? 'bg-green-400' : m.status === 'current' ? 'bg-blue-400 animate-pulse' : 'bg-surface-variant'}`}>
                          {m.status === 'done' && <span className="material-symbols-outlined text-[10px] text-primary font-black">check</span>}
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-wider mb-1 ${m.status === 'current' ? 'text-blue-300' : 'text-primary-fixed-dim'}`}>
                          {m.status === 'done' ? 'SELESAI' : m.status === 'current' ? 'SEDANG DIKERJAKAN' : 'MENDATANG'}
                        </p>
                        <p className={`font-bold text-base ${m.status === 'upcoming' ? 'text-white/50' : 'text-white'}`}>{m.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link to={`/tracking/${trackingProjects[0].id}`} className="block w-full mt-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-center text-sm transition-colors border border-white/10">
                    Lihat Detail Progress Lengkap
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Materials Marketplace */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <div>
              <h2 className="text-h2 font-black text-primary">Marketplace Material</h2>
              <p className="text-on-surface-variant mt-2 text-lg">Belanja bahan bangunan dari supplier terverifikasi.</p>
            </div>
            <Link to="/materials" className="hidden sm:flex text-primary font-bold text-sm items-center gap-1 hover:gap-2 transition-all">
              Katalog Lengkap <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.slice(0, 5).map((p, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={p.id}
              >
                <Link to={`/materials/product/${p.id}`} className="group bg-white p-4 rounded-2xl border border-outline-variant hover:shadow-xl transition-all hover:border-primary/30 flex flex-col h-full">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-surface">
                    <img alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={p.image} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-1">{p.category}</p>
                  <h4 className="font-bold text-sm mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight flex-1">{p.name}</h4>
                  <p className="text-primary font-black text-lg">{formatRupiah(p.price)} <span className="text-[10px] text-outline font-bold uppercase">/{p.unit}</span></p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RAB Estimator */}
      <section className="py-16 sm:py-24 max-w-container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed to-secondary-fixed rounded-[3rem] -rotate-6 scale-95 blur-sm opacity-50"></div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative glass-card p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-inner">
                    <span className="material-symbols-outlined text-3xl">calculate</span>
                  </div>
                  <h3 className="text-2xl font-black text-primary">Estimasi Cerdas</h3>
                </div>
                <span className="bg-green-100 text-green-700 font-bold text-xs px-3 py-1 rounded-full border border-green-200">AI Powered</span>
              </div>
              
              <div className="p-8 bg-gradient-to-b from-white to-surface rounded-2xl border border-outline-variant shadow-sm mb-8 text-center">
                <p className="text-outline font-bold text-xs uppercase tracking-widest mb-2">Simulasi Real-time</p>
                <motion.p 
                  key="price"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"
                >
                  Rp21.600.000
                </motion.p>
                <p className="text-sm font-semibold text-on-surface-variant">Renovasi Kamar Mandi • Standard • 12m²</p>
              </div>
              <Link to="/rab" className="btn-cta w-full text-center block text-lg py-4 shadow-[0_4px_14px_0_rgba(255,181,71,0.39)]">Hitung RAB Proyek Saya</Link>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 lg:pl-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-bold text-xs mb-6 tracking-wider">RAB ENGINE V2.0</span>
            <h2 className="text-4xl sm:text-5xl font-black text-primary mb-6 leading-tight">Keuangan Akurat, <br/>Tanpa Biaya Siluman.</h2>
            <p className="text-lg text-on-surface-variant mb-8 font-medium">Algoritma cerdas kami menganalisis data harga material dan jasa tukang secara real-time di kota Anda untuk menghasilkan estimasi RAB yang presisi.</p>
            <ul className="space-y-4">
              {[
                { title: 'Database Harga Real-time', desc: 'Sinkronisasi langsung dengan toko bangunan lokal.' },
                { title: 'Itemisasi Transparan', desc: 'Detail kebutuhan semen, pasir, hingga baut terkecil.' },
                { title: 'Otomatisasi PDF', desc: 'Export dokumen RAB standar perbankan dalam 1 klik.' }
              ].map((t, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-green-500 bg-green-50 p-2 rounded-xl text-2xl">check_circle</span>
                  <div>
                    <h4 className="font-bold text-on-surface">{t.title}</h4>
                    <p className="text-sm text-on-surface-variant mt-1">{t.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

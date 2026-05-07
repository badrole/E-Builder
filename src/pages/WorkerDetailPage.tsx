import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { workers, reviews } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';
import PriceCountUp from '../components/PriceCountUp';
import { fetchPartnerById, mapPartnerToWorker } from '../lib/partners';
import { openWhatsApp } from '../utils/formatters';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WorkerDetailPage() {
  const { id } = useParams();
  const mockWorker = workers.find(w => w.id === id);
  const [supabaseWorker, setSupabaseWorker] = useState<any | null>(null);
  const [loading, setLoading] = useState(!mockWorker);
  const w = supabaseWorker || mockWorker || workers[0];
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.workers.includes(w.id);
  const workerReviews = reviews.filter(r => r.workerId === w.id);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    if (!id || mockWorker) return;
    fetchPartnerById(id)
      .then(partner => {
        if (partner?.type === 'Worker' && partner.status === 'active') setSupabaseWorker(mapPartnerToWorker(partner));
      })
      .catch(error => console.error('Supabase worker detail fetch failed:', error))
      .finally(() => setLoading(false));
  }, [id, mockWorker]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-fixed border-t-royal-blue rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-surface pb-24">
      {/* Hero Banner Area */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-primary">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 z-10"></div>
          {/* Abstract background pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </motion.div>
        
        <div className="absolute top-0 left-0 w-full z-20 p-6">
          <div className="max-w-container mx-auto">
            <Link to="/e-renov" className="inline-flex items-center gap-2 text-white hover:text-secondary-fixed transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full font-semibold text-sm">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-8 -mt-32 relative z-30">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Profile & Info */}
          <div className="xl:col-span-2 space-y-8">
            {/* Main Profile Card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-card border border-outline-variant relative overflow-hidden"
            >
              <button 
                onClick={() => toggleFavorite('workers', w.id)} 
                className={`absolute top-6 right-6 p-4 rounded-full transition-all shadow-sm ${isFav ? 'bg-red-50 hover:bg-red-100' : 'bg-surface hover:bg-surface-variant'}`}
              >
                <span className={`material-symbols-outlined text-3xl ${isFav ? 'text-red-500 material-icon-filled' : 'text-outline'}`}>favorite</span>
              </button>

              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                <div className="relative">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] object-cover shadow-xl border-4 border-white z-10 relative" 
                    src={w.image} 
                    alt={w.name} 
                  />
                  {w.verified && (
                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-yellow-400 to-amber-600 text-white p-2 rounded-full border-4 border-white shadow-lg z-20 tooltip" data-tip="Identitas Terverifikasi">
                      <span className="material-symbols-outlined text-xl">verified</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center sm:text-left pt-2">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2">
                    <h1 className="text-3xl font-black text-primary">{w.name}</h1>
                    {w.recommended && (
                      <span className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm material-icon-filled">military_tech</span> TOP RATED
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg text-on-surface-variant font-medium mb-4">{w.spec}</p>
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                    {w.fastResponse && (
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-green-200">
                        <span className="material-symbols-outlined text-[14px]">bolt</span> Fast Response
                      </span>
                    )}
                    <span className="bg-surface text-on-surface-variant px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-outline-variant">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> {w.city}
                    </span>
                    <span className="bg-surface text-on-surface-variant px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-outline-variant">
                      <span className="material-symbols-outlined text-[14px]">work_history</span> {w.exp}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-outline-variant pt-6">
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-1">
                        <span className="material-symbols-outlined material-icon-filled">star</span>
                        <span className="text-xl font-black text-on-surface">{w.rating}</span>
                      </div>
                      <p className="text-xs font-bold text-outline uppercase">{w.reviews} Ulasan</p>
                    </div>
                    <div className="text-center sm:text-left border-l border-outline-variant pl-4">
                      <p className="text-xl font-black text-on-surface mb-1">{w.jobs}</p>
                      <p className="text-xs font-bold text-outline uppercase">Pekerjaan</p>
                    </div>
                    <div className="text-center sm:text-left border-l border-outline-variant pl-4">
                      <p className="text-xl font-black text-on-surface mb-1">100%</p>
                      <p className="text-xs font-bold text-outline uppercase">Penyelesaian</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Portfolio */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-card border border-outline-variant"
            >
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-xl font-black text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">photo_library</span> Portfolio Keahlian
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">Hasil kerja nyata yang telah diselesaikan.</p>
                </div>
              </div>
              
              <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {w.portfolio.map((img: string, i: number) => (
                  <motion.div 
                    whileHover={{ y: -5 }}
                    key={i} 
                    className="min-w-[280px] sm:min-w-[320px] h-48 sm:h-64 rounded-2xl overflow-hidden snap-center relative group"
                  >
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img} alt={`Portfolio ${i+1}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">Proyek #{i+1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contextual Reviews */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-card border border-outline-variant"
            >
              <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">forum</span> Apa Kata Klien
              </h3>
              
              {workerReviews.length > 0 ? (
                <div className="space-y-6">
                  {workerReviews.map(r => (
                    <div key={r.id} className="p-6 rounded-2xl bg-surface-container-low border border-surface-variant">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {r.user.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{r.user}</p>
                            <p className="text-xs text-outline font-semibold">{r.date}</p>
                          </div>
                        </div>
                        <div className="flex bg-white px-2 py-1 rounded-full shadow-sm">
                          {[...Array(r.rating)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-on-surface-variant italic font-medium">"{r.text}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-surface-container rounded-2xl border border-dashed border-outline">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">sentiment_dissatisfied</span>
                  <p className="font-bold text-on-surface-variant">Belum ada ulasan untuk mitra ini.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Sticky Action Card */}
          <div className="xl:sticky xl:top-24 space-y-6">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(17,31,162,0.08)] border-2 border-primary/5"
            >
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-2">Estimasi Biaya Mulai</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-primary">
                  <PriceCountUp value={w.price} />
                </span>
                <span className="text-sm font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-md">{w.priceUnit}</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="material-symbols-outlined text-green-600 mt-0.5">verified_user</span>
                  <div>
                    <p className="font-bold text-green-900 text-sm">Garansi Pekerjaan</p>
                    <p className="text-xs text-green-700">{w.warranty}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center p-3 bg-surface rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <p className="font-semibold text-on-surface text-sm">Pembayaran Aman via Escrow</p>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  to={`/booking/${w.id}`} 
                  className="bg-primary hover:bg-secondary text-white w-full py-4 rounded-xl font-bold text-center block transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Booking Sekarang
                </Link>
                <button 
                  onClick={() => openWhatsApp(w.whatsappNumber || w.phone, 'Halo, saya pelanggan E-Builder. Saya ingin berkonsultasi tentang layanan.')} 
                  className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 w-full py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Tanya via WhatsApp
                </button>
              </div>
              
              <p className="text-center text-xs text-outline mt-6 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">info</span>
                Harga akhir menyesuaikan hasil survei lokasi
              </p>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* CSS for hide-scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

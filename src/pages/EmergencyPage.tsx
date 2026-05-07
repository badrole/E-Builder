import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { emergencyCategories, emergencyTechnicians } from '../data/mockData';
import { formatRupiah, openProviderWhatsApp } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmergencyPage() {
  const [selectedCat, setSelectedCat] = useState('');
  const [form, setForm] = useState({ address: '', phone: '', urgency: 'normal', details: '' });
  const [doneId, setDoneId] = useState<string | null>(null);
  const [isPulsing, setIsPulsing] = useState(true);
  const { addEmergencyRequest } = useStore();
  
  const filtered = selectedCat ? emergencyTechnicians.filter(t => t.category.includes(selectedCat)) : emergencyTechnicians;
  
  const handleSubmit = (techId: string) => { 
    addEmergencyRequest({ ...form, category: selectedCat, technicianId: techId }); 
    setDoneId(techId); 
  };

  useEffect(() => {
    const pulseTimer = setInterval(() => setIsPulsing(p => !p), 1500);
    return () => clearInterval(pulseTimer);
  }, []);

  if (doneId) {
    const t = emergencyTechnicians.find(x => x.id === doneId)!;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto px-4 py-16 text-center space-y-8"
      >
        <div className="relative w-28 h-28 mx-auto">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-green-200 rounded-full"
          />
          <div className="relative w-full h-full bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            <span className="material-symbols-outlined text-6xl text-green-600">check_circle</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-extrabold text-primary mb-2">S.O.S Diterima!</h2>
          <p className="text-body-lg text-on-surface-variant">
            Teknisi <strong>{t.name}</strong> sedang bersiap menuju lokasi Anda.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-lg text-left">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-outline-variant">
            <div className="flex items-center gap-4">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary-fixed" />
              <div>
                <p className="font-bold text-lg text-primary">{t.name}</p>
                <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">moped</span> Menuju Lokasi
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-outline font-bold uppercase mb-1">Estimasi Tiba</p>
              <p className="text-2xl font-black text-secondary">{t.arrival}</p>
            </div>
          </div>
          
          {/* Tracking Progress Bar */}
          <div className="w-full bg-surface-container rounded-full h-3 mb-2 overflow-hidden">
            <motion.div 
              initial={{ width: "10%" }}
              animate={{ width: "40%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="bg-secondary h-full rounded-full relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white opacity-30 animate-pulse"></div>
            </motion.div>
          </div>
          <div className="flex justify-between text-xs font-bold text-outline uppercase">
            <span className="text-secondary">Persiapan</span>
            <span>Di Jalan</span>
            <span>Tiba</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center pt-4">
          <button onClick={() => openProviderWhatsApp(t.whatsappNumber, "Halo, saya pelanggan E-Builder. Saya sudah melakukan pemesanan layanan darurat. Tolong segera datang.")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            <span className="material-symbols-outlined">chat</span>
            Hubungi Teknisi via WhatsApp
          </button>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="bg-surface-container hover:bg-surface-variant text-primary font-bold py-3 px-6 rounded-xl flex-1 transition-colors">
              Lihat Dashboard
            </Link>
            <a href="https://wa.me/6285749780759" target="_blank" rel="noreferrer" className="border-2 border-outline-variant hover:border-primary hover:text-primary font-bold py-3 px-6 rounded-xl flex-1 transition-colors">
              Bantuan CS
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low pb-24">
      {/* Panic Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-error text-white py-12 px-4 sm:px-8 relative overflow-hidden"
      >
        <motion.div 
          animate={{ scale: isPulsing ? 1.05 : 1, opacity: isPulsing ? 0.3 : 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-red-600"
        ></motion.div>
        
        <div className="max-w-container mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div 
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span className="material-symbols-outlined text-5xl">emergency</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">LAYANAN DARURAT</h1>
          <p className="text-lg text-red-100 max-w-xl mx-auto font-medium">Bantuan teknis mendesak 24/7. Teknisi terdekat akan segera meluncur ke lokasi Anda.</p>
        </div>
      </motion.div>

      <div className="max-w-container mx-auto px-4 sm:px-8 -mt-8 relative z-20 space-y-8">
        {/* Visual Problem Isolation */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-outline-variant"
        >
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">1</span>
            Pilih Jenis Kendala
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {emergencyCategories.map(c => {
              const catCode = c.name.split(' ')[0];
              const isSelected = selectedCat === catCode;
              return (
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  key={c.id} 
                  onClick={() => setSelectedCat(catCode)} 
                  className={`relative p-5 rounded-2xl border-2 text-center flex flex-col items-center gap-3 transition-all ${isSelected ? 'border-error bg-red-50 shadow-md' : 'border-outline-variant bg-white hover:border-error/50'}`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-error rounded-full animate-ping"></div>
                  )}
                  <span className={`material-symbols-outlined text-4xl ${isSelected ? 'text-error' : 'text-on-surface-variant'}`}>{c.icon}</span>
                  <p className={`text-sm font-bold ${isSelected ? 'text-error' : 'text-on-surface'}`}>{c.name}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Location & Details Form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-outline-variant"
        >
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">2</span>
            Informasi Lokasi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-bold text-on-surface-variant block mb-2">Alamat Lengkap</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                <input 
                  value={form.address} 
                  onChange={e => setForm({...form, address: e.target.value})} 
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-error focus:border-error bg-surface font-medium transition-all" 
                  placeholder="Jl. Sudirman No. 123..." 
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-on-surface-variant block mb-2">No. Telepon / WhatsApp aktif</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">call</span>
                <input 
                  value={form.phone} 
                  onChange={e => setForm({...form, phone: e.target.value})} 
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-error focus:border-error bg-surface font-medium transition-all" 
                  placeholder="0812xxxx..." 
                  type="tel"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-on-surface-variant block mb-2">Detail Masalah (Opsional)</label>
            <textarea 
              value={form.details} 
              onChange={e => setForm({...form, details: e.target.value})} 
              className="w-full p-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-error focus:border-error bg-surface font-medium transition-all min-h-[100px]" 
              placeholder="Ceritakan singkat kendala yang terjadi agar teknisi dapat menyiapkan alat yang tepat..." 
            />
          </div>
        </motion.div>

        {/* Available Technicians */}
        <AnimatePresence>
          {selectedCat && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">3</span>
                Pilih Teknisi Siaga
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.filter(t => t.available).map((t, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={t.id} 
                    className="bg-white rounded-3xl border border-error/20 p-6 shadow-[0_8px_30px_rgb(186,26,26,0.08)] relative overflow-hidden flex flex-col h-full"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-error"></div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img className="w-16 h-16 rounded-2xl object-cover border-2 border-surface-variant shadow-sm" src={t.image} alt={t.name} />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-[10px] text-white">bolt</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-primary">{t.name}</h4>
                        <p className="text-xs font-bold text-error uppercase tracking-wider mb-1">{t.category}</p>
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">
                          <span className="material-symbols-outlined text-sm material-icon-filled text-amber-500">star</span>{t.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-surface p-3 rounded-xl flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-lg">schedule</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-outline uppercase">Estimasi Tiba</p>
                          <p className="font-black text-secondary">{t.arrival}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
                      <div>
                        <p className="text-[10px] font-bold text-outline uppercase">Biaya Panggilan</p>
                        <span className="font-black text-xl text-primary">{formatRupiah(t.fee)}</span>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSubmit(t.id)} 
                        className="bg-error hover:bg-red-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-colors"
                      >
                        PANGGIL
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
                {filtered.filter(t => t.available).length === 0 && (
                  <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-outline-variant">
                    <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">person_off</span>
                    <h4 className="text-xl font-bold text-primary mb-2">Tidak ada teknisi siaga</h4>
                    <p className="text-on-surface-variant">Mohon maaf, saat ini tidak ada teknisi untuk kategori ini yang sedang siaga.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

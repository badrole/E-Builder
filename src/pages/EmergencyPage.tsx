import { useState } from 'react';
import { Link } from 'react-router-dom';
import { emergencyCategories, emergencyTechnicians } from '../data/mockData';
import { formatRupiah, openProviderWhatsApp } from '../utils/helpers';
import { useStore } from '../store/useStore';

export default function EmergencyPage() {
  const [selectedCat, setSelectedCat] = useState('');
  const [form, setForm] = useState({ address: '', phone: '', urgency: 'normal', details: '' });
  const [doneId, setDoneId] = useState<string | null>(null);
  const { addEmergencyRequest } = useStore();
  const filtered = selectedCat ? emergencyTechnicians.filter(t => t.category === selectedCat) : emergencyTechnicians;
  const handleSubmit = (techId: string) => { addEmergencyRequest({ ...form, category: selectedCat, technicianId: techId }); setDoneId(techId); };

  if (doneId) {
    const t = emergencyTechnicians.find(x => x.id === doneId)!;
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div>
        <h2 className="text-h3 font-bold text-primary">Permintaan Darurat Terkirim!</h2>
        <p className="text-on-surface-variant">Teknisi <strong>{t.name}</strong> akan segera menghubungi dan menuju ke lokasi Anda.</p>
        <div className="flex flex-col gap-3 justify-center">
          <button onClick={() => openProviderWhatsApp(t.whatsappNumber, "Halo, saya pelanggan E-Builder. Saya sudah melakukan pemesanan layanan darurat.")} className="btn-error w-full flex items-center justify-center gap-2"><span className="material-symbols-outlined">chat</span>Chat Teknisi via WhatsApp</button>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="btn-primary flex-1">Lihat Dashboard</Link>
            <a href="https://wa.me/6285749780759?text=Halo%20Customer%20Service%20E-Builder%2C%20saya%20butuh%20bantuan." target="_blank" rel="noreferrer" className="btn-outline flex-1 text-center">Butuh Bantuan CS?</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="text-center bg-red-50 rounded-2xl p-8"><span className="material-symbols-outlined text-5xl text-error">emergency</span><h1 className="text-h1 font-bold text-error mt-4">Layanan Darurat</h1><p className="text-on-surface-variant mt-2">Bantuan teknis mendesak 24/7 untuk masalah rumah Anda.</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{emergencyCategories.map(c => (<button key={c.id} onClick={() => setSelectedCat(c.name.split(' ')[0])} className={`p-4 rounded-2xl border-2 text-center space-y-2 transition-all ${selectedCat === c.name.split(' ')[0] ? 'border-error bg-red-50' : 'border-outline-variant bg-white hover:border-error/50'}`}><span className="material-symbols-outlined text-2xl text-error">{c.icon}</span><p className="text-xs font-bold">{c.name}</p></button>))}</div>
      <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4"><h3 className="font-bold">Informasi Lokasi</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="text-sm font-semibold block mb-1">Alamat</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field" placeholder="Alamat lengkap..." /></div><div><label className="text-sm font-semibold block mb-1">No. Telepon</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" placeholder="08xxx" /></div></div><div><label className="text-sm font-semibold block mb-1">Detail Masalah</label><textarea value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="input-field" placeholder="Jelaskan masalah..." /></div></div>
      <h3 className="font-bold text-lg">Teknisi Tersedia</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.filter(t => t.available).map(t => (
        <div key={t.id} className="bg-white rounded-2xl border border-outline-variant p-4 space-y-3"><div className="flex items-center gap-3"><img className="w-12 h-12 rounded-full object-cover" src={t.image} alt={t.name} /><div><h4 className="font-bold">{t.name}</h4><p className="text-caption text-outline">{t.category}</p></div></div><div className="flex justify-between text-sm"><span>⏱ Estimasi tiba: {t.arrival}</span><span className="flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber text-sm material-icon-filled">star</span>{t.rating}</span></div><div className="flex justify-between items-center"><span className="font-bold text-primary">{formatRupiah(t.fee)}</span><button onClick={() => handleSubmit(t.id)} className="bg-error text-white px-4 py-2 rounded-lg text-sm font-bold">Panggil Sekarang</button></div></div>
      ))}</div>
    </div>
  );
}

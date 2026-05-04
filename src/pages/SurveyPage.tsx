import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { constructPackages } from '../data/mockData';
import { openProviderWhatsApp } from '../utils/helpers';

export default function SurveyPage() {
  const { addSurveyRequest } = useStore();
  const [searchParams] = useSearchParams();
  const pkgId = searchParams.get('pkgId');
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', type: 'Renovasi', details: '', preferredDate: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); addSurveyRequest({ ...form, pkgId }); setDone(true); };
  
  if (done) {
    const pkg = pkgId ? constructPackages.find(p => p.id === pkgId) : null;
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div>
        <h2 className="text-h3 font-bold text-primary">Permintaan Survei Terkirim!</h2>
        <p className="text-on-surface-variant">Tim kami akan menghubungi Anda dalam 1x24 jam untuk menjadwalkan survei lokasi.</p>
        <div className="flex flex-col gap-3 justify-center">
          {pkg && (
            <button onClick={() => openProviderWhatsApp(pkg.whatsappNumber, `Halo tim ${pkg.name}, saya telah meminta survei lokasi melalui E-Builder.`)} className="btn-cta w-full flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">chat</span>Chat Tim {pkg.name} via WhatsApp
            </button>
          )}
          <div className="flex gap-3 justify-center mt-2">
            <Link to="/dashboard" className="btn-primary flex-1">Lihat Dashboard</Link>
            {!pkg && <a href="https://wa.me/6285749780759?text=Halo%20Customer%20Service%20E-Builder%2C%20saya%20butuh%20bantuan." target="_blank" rel="noreferrer" className="btn-outline flex-1 text-center">Tanya CS E-Builder</a>}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <Link to="/e-construct" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <h1 className="text-h2 font-bold text-primary">Minta Survei Lokasi</h1>
      <p className="text-on-surface-variant">Isi formulir berikut dan tim kami akan menghubungi Anda untuk menjadwalkan survei gratis.</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-semibold block mb-1">Nama Lengkap *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-1">No. Telepon *</label><input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" /></div>
        </div>
        <div><label className="text-sm font-semibold block mb-1">Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" /></div>
        <div><label className="text-sm font-semibold block mb-1">Alamat Lokasi *</label><textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field min-h-[80px]" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-semibold block mb-1">Tipe Proyek</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field"><option>Renovasi</option><option>Bangun Baru</option><option>Perbaikan</option></select></div>
          <div><label className="text-sm font-semibold block mb-1">Tanggal Preferensi</label><input type="date" value={form.preferredDate} onChange={e => setForm({...form, preferredDate: e.target.value})} className="input-field" /></div>
        </div>
        <div><label className="text-sm font-semibold block mb-1">Detail Kebutuhan</label><textarea value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="input-field min-h-[100px]" placeholder="Ceritakan kebutuhan proyek Anda..." /></div>
        <button type="submit" className="btn-cta w-full">Kirim Permintaan Survei</button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function BecomePartnerPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', skill: '', city: '', experience: '', portfolio: '' });
  const [done, setDone] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); login(form.name, form.email, 'partner'); setDone(true); };
  if (done) return <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6"><div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">handshake</span></div><h2 className="text-h3 font-bold text-primary">Pendaftaran Berhasil!</h2><p className="text-on-surface-variant">Selamat bergabung sebagai Mitra E-Builder. Tim kami akan memverifikasi akun Anda.</p><button onClick={() => navigate('/partner-dashboard')} className="btn-primary">Dashboard Mitra</button></div>;
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <div className="text-center"><h1 className="text-h1 font-bold text-primary">Jadi Mitra E-Builder</h1><p className="text-on-surface-variant mt-2">Gabung sebagai pekerja profesional dan dapatkan proyek.</p></div>
      <div className="bg-gradient-to-r from-royal-blue to-secondary rounded-2xl p-6 text-white grid grid-cols-3 gap-4 text-center"><div><p className="text-2xl font-black">500+</p><p className="text-xs text-blue-100">Mitra Aktif</p></div><div><p className="text-2xl font-black">Rp89jt</p><p className="text-xs text-blue-100">Rata-rata/bulan</p></div><div><p className="text-2xl font-black">4.8★</p><p className="text-xs text-blue-100">Rating Platform</p></div></div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="text-sm font-semibold block mb-1">Nama *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div><div><label className="text-sm font-semibold block mb-1">Email *</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" /></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="text-sm font-semibold block mb-1">Telepon *</label><input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" /></div><div><label className="text-sm font-semibold block mb-1">Kota *</label><input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="input-field" /></div></div>
        <div><label className="text-sm font-semibold block mb-1">Keahlian Utama *</label><select required value={form.skill} onChange={e => setForm({...form, skill: e.target.value})} className="input-field"><option value="">Pilih keahlian</option><option>Plumbing</option><option>Listrik</option><option>Pengecatan</option><option>Keramik</option><option>Renovasi</option><option>Konstruksi</option><option>Arsitektur</option></select></div>
        <div><label className="text-sm font-semibold block mb-1">Pengalaman</label><input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="input-field" placeholder="Contoh: 5 tahun" /></div>
        <button type="submit" className="btn-cta w-full text-lg">Daftar Jadi Mitra</button>
      </form>
    </div>
  );
}

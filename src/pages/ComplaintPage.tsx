import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ComplaintPage() {
  const { addComplaint } = useStore();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ orderId: '', category: 'Kualitas Pekerjaan', description: '', contactNumber: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); addComplaint(form); setDone(true); };
  if (done) return <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6"><div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div><h2 className="text-h3 font-bold text-primary">Komplain Terkirim!</h2><p className="text-on-surface-variant">Tim kami akan menindaklanjuti dalam 1x24 jam.</p><Link to="/dashboard" className="btn-primary inline-block">Dashboard</Link></div>;
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <Link to="/help" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <h1 className="text-h2 font-bold text-primary">Formulir Komplain</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-4">
        <div><label className="text-sm font-semibold block mb-1">ID Pesanan / Booking</label><input value={form.orderId} onChange={e => setForm({...form, orderId: e.target.value})} className="input-field" placeholder="Contoh: ORD-123" /></div>
        <div><label className="text-sm font-semibold block mb-1">Kategori</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field"><option>Kualitas Pekerjaan</option><option>Keterlambatan</option><option>Pembayaran</option><option>Material</option><option>Lainnya</option></select></div>
        <div><label className="text-sm font-semibold block mb-1">Deskripsi *</label><textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field min-h-[120px]" placeholder="Jelaskan masalah Anda..." /></div>
        <div><label className="text-sm font-semibold block mb-1">No. Kontak</label><input value={form.contactNumber} onChange={e => setForm({...form, contactNumber: e.target.value})} className="input-field" placeholder="08xxx" /></div>
        <button type="submit" className="btn-cta w-full">Kirim Komplain</button>
      </form>
    </div>
  );
}

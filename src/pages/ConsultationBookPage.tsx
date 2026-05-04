import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { experts } from '../data/mockData';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';

export default function ConsultationBookPage() {
  const { id } = useParams();
  const e = experts.find(e => e.id === id) || experts[0];
  const navigate = useNavigate();
  const { addConsultation } = useStore();
  const [form, setForm] = useState({ topic: e.topics[0], date: '', time: '09:00', description: '', phone: '', paymentMethod: 'transfer' });

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    addConsultation({ expertId: e.id, expertName: e.name, topic: form.topic, date: form.date, time: form.time, description: form.description, phone: form.phone, paymentMethod: form.paymentMethod, fee: e.fee, status: 'Menunggu Pembayaran' });
    navigate('/consultation/payment');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <Link to={`/consultation/expert/${e.id}`} className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <h1 className="text-h2 font-bold text-primary">Booking Konsultasi</h1>
      <div className="bg-white rounded-2xl border border-outline-variant p-4 flex items-center gap-4"><img className="w-14 h-14 rounded-xl object-cover" src={e.image} alt={e.name} /><div><h3 className="font-bold">{e.name}</h3><p className="text-caption text-on-surface-variant">{e.spec} • {formatRupiah(e.fee)}{e.feeUnit}</p></div></div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-4">
        <div><label className="text-sm font-semibold block mb-1">Topik</label><select value={form.topic} onChange={ev => setForm({...form, topic: ev.target.value})} className="input-field">{e.topics.map(t => <option key={t}>{t}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-semibold block mb-1">Tanggal</label><input type="date" required value={form.date} onChange={ev => setForm({...form, date: ev.target.value})} className="input-field" min={new Date(Date.now()+86400000).toISOString().split('T')[0]} /></div><div><label className="text-sm font-semibold block mb-1">Waktu</label><select value={form.time} onChange={ev => setForm({...form, time: ev.target.value})} className="input-field">{['09:00','10:00','11:00','13:00','14:00','15:00','16:00'].map(t => <option key={t}>{t}</option>)}</select></div></div>
        <div><label className="text-sm font-semibold block mb-1">No. WhatsApp</label><input required value={form.phone} onChange={ev => setForm({...form, phone: ev.target.value})} className="input-field" placeholder="08xxx" /></div>
        <div><label className="text-sm font-semibold block mb-1">Deskripsi Kebutuhan</label><textarea required value={form.description} onChange={ev => setForm({...form, description: ev.target.value})} className="input-field min-h-[100px]" placeholder="Ceritakan kebutuhan konsultasi Anda..." /></div>
        <div className="p-4 bg-primary/5 rounded-xl flex justify-between items-center"><span className="font-semibold">Biaya Konsultasi</span><span className="text-2xl font-black text-primary">{formatRupiah(e.fee)}</span></div>
        <button type="submit" className="btn-cta w-full text-lg">Lanjut ke Pembayaran</button>
      </form>
    </div>
  );
}

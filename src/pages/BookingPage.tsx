import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { workers, categories } from '../data/mockData';
import { formatRupiah, openProviderWhatsApp } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { fetchPartnerById, insertBooking, mapPartnerToWorker } from '../lib/partners';
import { isValidIndonesianWhatsApp } from '../utils/formatters';

export default function BookingPage() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const mockWorker = workers.find(w => w.id === workerId);
  const [supabaseWorker, setSupabaseWorker] = useState<any | null>(null);
  const [loading, setLoading] = useState(!mockWorker);
  const w = supabaseWorker || mockWorker || workers[0];
  const { addBooking } = useStore();
  const [form, setForm] = useState({ customerName: '', customerPhone: '', category: w.category, date: '', time: '09:00', address: '', details: '', paymentMethod: 'transfer' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!workerId || mockWorker) return;
    fetchPartnerById(workerId)
      .then(partner => {
        if (partner?.type === 'Worker' && partner.status === 'active') {
          const mapped = mapPartnerToWorker(partner);
          setSupabaseWorker(mapped);
          setForm(current => ({ ...current, category: mapped.category }));
        }
      })
      .catch(error => console.error('Supabase booking partner fetch failed:', error))
      .finally(() => setLoading(false));
  }, [workerId, mockWorker]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.customerName.trim()) return setError('Nama pelanggan wajib diisi.');
    if (!isValidIndonesianWhatsApp(form.customerPhone)) return setError('Nomor WhatsApp harus nomor Indonesia yang valid.');
    if (!form.date) return setError('Tanggal booking wajib diisi.');
    if (!form.address.trim()) return setError('Alamat wajib diisi.');
    try {
      if (supabaseWorker?.supabaseId) {
        await insertBooking({
          customer_name: form.customerName,
          customer_phone: form.customerPhone,
          service_type: form.category,
          partner_id: supabaseWorker.supabaseId,
          booking_date: `${form.date} ${form.time}`,
          address: form.address,
          notes: form.details,
          status: 'pending',
        });
      } else {
        addBooking({ workerId: w.id, workerName: w.name, category: form.category, date: form.date, time: form.time, address: form.address, details: form.details, estimatedPrice: w.price, paymentMethod: form.paymentMethod, status: 'Menunggu Konfirmasi' });
      }
      setShowSuccess(true);
    } catch (error) {
      console.error('Supabase booking insert failed:', error);
      setError('Booking belum berhasil dikirim. Silakan coba lagi.');
    }
  };

  if (loading) return <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 text-on-surface-variant">Memuat data mitra...</div>;

  if (showSuccess) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div>
      <h2 className="text-h3 font-bold text-primary">Booking Berhasil!</h2>
      <p className="text-on-surface-variant">Booking Anda dengan <strong>{w.name}</strong> telah berhasil dibuat. Anda akan menerima konfirmasi segera.</p>
      <div className="bg-white rounded-2xl border border-outline-variant p-6 text-left space-y-2">
        <p className="text-sm"><strong>Kategori:</strong> {form.category}</p><p className="text-sm"><strong>Tanggal:</strong> {form.date}</p><p className="text-sm"><strong>Waktu:</strong> {form.time}</p><p className="text-sm"><strong>Alamat:</strong> {form.address}</p><p className="text-sm"><strong>Estimasi:</strong> {formatRupiah(w.price)}</p>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <button onClick={() => openProviderWhatsApp(w.whatsappNumber, "Halo, saya pelanggan E-Builder. Saya sudah melakukan pemesanan layanan.")} className="btn-cta w-full flex items-center justify-center gap-2"><span className="material-symbols-outlined">chat</span>Chat Mitra via WhatsApp</button>
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary flex-1">Lihat Dashboard</Link>
          <a href="https://wa.me/6285749780759?text=Halo%20Customer%20Service%20E-Builder%2C%20saya%20butuh%20bantuan." target="_blank" rel="noreferrer" className="btn-outline flex-1 text-center">Butuh Bantuan CS?</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <Link to={`/worker/${w.id}`} className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <h1 className="text-h2 font-bold text-primary">Booking Jasa</h1>
      <div className="bg-white rounded-2xl border border-outline-variant p-4 flex items-center gap-4"><img className="w-16 h-16 rounded-xl object-cover" src={w.image} alt={w.name} /><div><h3 className="font-bold">{w.name}</h3><p className="text-caption text-on-surface-variant">{w.spec} • {w.city}</p><p className="text-primary font-bold">{formatRupiah(w.price)}{w.priceUnit}</p></div></div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
        {error && <div className="bg-red-50 text-red-700 rounded-xl border border-red-200 p-3 text-sm">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-semibold block mb-2">Nama Pelanggan</label><input required value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} className="input-field" placeholder="Nama lengkap" /></div>
          <div><label className="text-sm font-semibold block mb-2">No. WhatsApp</label><input required value={form.customerPhone} onChange={e => setForm({...form, customerPhone: e.target.value})} className="input-field" placeholder="08xxx" /></div>
        </div>
        <div><label className="text-sm font-semibold block mb-2">Kategori Layanan</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-semibold block mb-2">Tanggal</label><input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field" min={new Date(Date.now()+86400000).toISOString().split('T')[0]} /></div>
          <div><label className="text-sm font-semibold block mb-2">Waktu</label><select value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="input-field">{['07:00','08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        </div>
        <div><label className="text-sm font-semibold block mb-2">Alamat Lengkap</label><textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field min-h-[80px]" placeholder="Jl. Contoh No. 123, Kota..." /></div>
        <div><label className="text-sm font-semibold block mb-2">Detail Pekerjaan</label><textarea value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="input-field min-h-[80px]" placeholder="Jelaskan detail pekerjaan yang diinginkan..." /></div>
        <div><label className="text-sm font-semibold block mb-2">Metode Pembayaran</label><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[{v:'transfer',l:'Bank Transfer',i:'account_balance'},{v:'qris',l:'QRIS',i:'qr_code_2'},{v:'ewallet',l:'E-Wallet',i:'account_balance_wallet'}].map(m => (
            <label key={m.v} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === m.v ? 'border-royal-blue bg-blue-50' : 'border-outline-variant'}`}><input type="radio" name="payment" value={m.v} checked={form.paymentMethod === m.v} onChange={e => setForm({...form, paymentMethod: e.target.value})} className="sr-only" /><span className="material-symbols-outlined text-primary">{m.i}</span><span className="font-semibold text-sm">{m.l}</span></label>
          ))}
        </div></div>
        <div className="p-4 bg-primary/5 rounded-xl flex justify-between items-center"><span className="font-semibold">Estimasi Biaya</span><span className="text-2xl font-black text-primary">{formatRupiah(w.price)}</span></div>
        <button type="submit" className="btn-cta w-full text-center text-lg">Konfirmasi Booking</button>
      </form>
    </div>
  );
}

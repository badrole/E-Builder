import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';

export default function CheckoutPage() {
  const { cart, clearCart, addMaterialOrder } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '', paymentMethod: 'transfer', delivery: 'regular' });
  const [done, setDone] = useState(false);
  const subtotal = cart.reduce((t, c) => t + c.price * c.quantity, 0);
  const deliveryCost = form.delivery === 'express' ? 100000 : 50000;
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); addMaterialOrder({ ...form, items: cart, total: subtotal + deliveryCost }); clearCart(); setDone(true); };
  if (done) return <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6"><div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div><h2 className="text-h3 font-bold text-primary">Pesanan Berhasil!</h2><p className="text-on-surface-variant">Pesanan Anda sedang diproses. Silakan lakukan pembayaran.</p><div className="flex gap-3 justify-center"><Link to="/dashboard" className="btn-primary">Dashboard</Link><Link to="/materials" className="btn-outline">Belanja Lagi</Link></div></div>;
  if (cart.length === 0) { navigate('/cart'); return null; }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <h1 className="text-h2 font-bold text-primary">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4">
          <h3 className="font-bold">Informasi Pengiriman</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="text-sm font-semibold block mb-1">Nama *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div><div><label className="text-sm font-semibold block mb-1">Telepon *</label><input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" /></div></div>
          <div><label className="text-sm font-semibold block mb-1">Alamat *</label><textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field min-h-[80px]" /></div>
          <div><label className="text-sm font-semibold block mb-1">Catatan</label><input value={form.note} onChange={e => setForm({...form, note: e.target.value})} className="input-field" /></div>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4"><h3 className="font-bold">Pengiriman</h3><div className="grid grid-cols-2 gap-3">{[{v:'regular',l:'Regular (1-3 hari)',p:50000},{v:'express',l:'Express (1 hari)',p:100000}].map(d => <label key={d.v} className={`p-4 rounded-xl border-2 cursor-pointer ${form.delivery===d.v?'border-royal-blue bg-blue-50':'border-outline-variant'}`}><input type="radio" name="delivery" value={d.v} checked={form.delivery===d.v} onChange={e=>setForm({...form,delivery:e.target.value})} className="sr-only" /><p className="font-semibold text-sm">{d.l}</p><p className="text-primary font-bold">{formatRupiah(d.p)}</p></label>)}</div></div>
        <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4"><h3 className="font-bold">Pembayaran</h3><div className="grid grid-cols-3 gap-3">{[{v:'transfer',l:'Bank Transfer'},{v:'qris',l:'QRIS'},{v:'ewallet',l:'E-Wallet'}].map(m => <label key={m.v} className={`p-3 rounded-xl border-2 cursor-pointer text-center ${form.paymentMethod===m.v?'border-royal-blue bg-blue-50':'border-outline-variant'}`}><input type="radio" name="payment" value={m.v} checked={form.paymentMethod===m.v} onChange={e=>setForm({...form,paymentMethod:e.target.value})} className="sr-only" /><p className="font-semibold text-sm">{m.l}</p></label>)}</div></div>
        <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3">
          <h3 className="font-bold">Ringkasan</h3>{cart.map(c => <div key={c.id} className="flex justify-between text-sm"><span>{c.name} x{c.quantity}</span><span className="font-semibold">{formatRupiah(c.price*c.quantity)}</span></div>)}
          <div className="border-t border-outline-variant pt-3"><div className="flex justify-between text-sm"><span>Ongkir</span><span>{formatRupiah(deliveryCost)}</span></div><div className="flex justify-between mt-2"><span className="font-bold">Total</span><span className="text-xl font-black text-primary">{formatRupiah(subtotal+deliveryCost)}</span></div></div>
        </div>
        <button type="submit" className="btn-cta w-full text-lg">Bayar {formatRupiah(subtotal+deliveryCost)}</button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { IMAGES } from '../data/images';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const { login } = useStore();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); login(form.name, form.email, 'customer'); navigate('/dashboard'); };
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center"><img src={IMAGES.logo} alt="E-Builder" className="h-10 mx-auto mb-4" /><h1 className="text-h2 font-bold text-primary">Daftar</h1><p className="text-on-surface-variant">Buat akun E-Builder baru</p></div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-4 shadow-card">
          <div><label className="text-sm font-semibold block mb-1">Nama Lengkap</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-1">Email</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-1">No. Telepon</label><input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-1">Password</label><input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-field" /></div>
          <button type="submit" className="btn-cta w-full text-lg">Daftar</button>
          <p className="text-center text-sm text-on-surface-variant">Sudah punya akun? <Link to="/login" className="text-primary font-semibold hover:underline">Masuk</Link></p>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { IMAGES } from '../data/images';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); login(email.split('@')[0] || 'User', email, 'customer'); navigate('/dashboard'); };
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center"><img src={IMAGES.logo} alt="E-Builder" className="h-10 mx-auto mb-4" /><h1 className="text-h2 font-bold text-primary">Masuk</h1><p className="text-on-surface-variant">Masuk ke akun E-Builder Anda</p></div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-4 shadow-card">
          <div><label className="text-sm font-semibold block mb-1">Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="email@contoh.com" /></div>
          <div><label className="text-sm font-semibold block mb-1">Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="••••••••" /></div>
          <button type="submit" className="btn-cta w-full text-lg">Masuk</button>
          <p className="text-center text-sm text-on-surface-variant">Belum punya akun? <Link to="/register" className="text-primary font-semibold hover:underline">Daftar</Link></p>
        </form>
      </div>
    </div>
  );
}

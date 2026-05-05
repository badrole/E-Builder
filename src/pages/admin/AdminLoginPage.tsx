import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { isAdminLoggedIn } from './AdminShell';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAdminLoggedIn()) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const { data, error } = await supabase
      .from('admin_users')
      .select('id,email')
      .eq('email', cleanEmail)
      .eq('password', cleanPassword)
      .maybeSingle();
    setLoading(false);
    if (error) {
      console.error('Admin login Supabase error:', error);
      setError(`Supabase admin_users belum bisa dibaca: ${error.message}`);
      return;
    }
    if (!data) {
      setError('Email atau password admin salah.');
      return;
    }
    localStorage.setItem('ebuilder_admin_session', 'true');
    localStorage.setItem('ebuilder_admin_email', cleanEmail);
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-5 shadow-card">
        <div><h1 className="text-h3 font-bold text-primary">Login Admin</h1><p className="text-sm text-on-surface-variant">Masuk untuk mengelola mitra E-Builder.</p></div>
        {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3 text-sm">{error}</div>}
        <div><label className="text-sm font-semibold block mb-2">Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input-field" /></div>
        <div><label className="text-sm font-semibold block mb-2">Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="input-field" /></div>
        <button disabled={loading} className="btn-cta w-full">{loading ? 'Memeriksa...' : 'Login'}</button>
      </form>
    </div>
  );
}

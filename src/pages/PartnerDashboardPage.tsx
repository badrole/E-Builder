import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function PartnerDashboardPage() {
  const { isLoggedIn, userName } = useStore();
  const mockJobs = [
    { id: 'j1', client: 'Ibu Sari', category: 'Renovasi Kamar Mandi', location: 'Surabaya', date: '2026-05-10', budget: 'Rp12.000.000', status: 'pending' },
    { id: 'j2', client: 'Pak Andi', category: 'Perbaikan Listrik', location: 'Jakarta', date: '2026-05-12', budget: 'Rp2.500.000', status: 'pending' },
  ];
  const mockEarnings = { thisMonth: 15500000, total: 89000000, jobs: 64, rating: 4.8 };

  if (!isLoggedIn) return <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6"><span className="material-symbols-outlined text-6xl text-outline">lock</span><h2 className="text-h3 font-bold">Akses Mitra</h2><p className="text-on-surface-variant">Login sebagai mitra untuk mengakses dashboard.</p><Link to="/login" className="btn-primary inline-block">Masuk</Link></div>;

  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div><h1 className="text-h2 font-bold text-primary">Dashboard Mitra</h1><p className="text-on-surface-variant">Selamat datang, {userName}!</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant p-4"><p className="text-caption text-outline">Bulan Ini</p><p className="text-2xl font-black text-primary">Rp15,5jt</p></div>
        <div className="bg-white rounded-2xl border border-outline-variant p-4"><p className="text-caption text-outline">Total Pendapatan</p><p className="text-2xl font-black">Rp89jt</p></div>
        <div className="bg-white rounded-2xl border border-outline-variant p-4"><p className="text-caption text-outline">Pekerjaan</p><p className="text-2xl font-black">{mockEarnings.jobs}</p></div>
        <div className="bg-white rounded-2xl border border-outline-variant p-4"><p className="text-caption text-outline">Rating</p><p className="text-2xl font-black flex items-center gap-1"><span className="material-symbols-outlined text-warm-amber material-icon-filled">star</span>{mockEarnings.rating}</p></div>
      </div>
      <section className="bg-white rounded-2xl border border-outline-variant p-6"><h2 className="font-bold text-lg mb-4">Permintaan Pekerjaan</h2>
        {mockJobs.map(j => (<div key={j.id} className="flex flex-wrap items-center justify-between py-4 border-b border-outline-variant/30 last:border-0 gap-3">
          <div><h4 className="font-semibold">{j.category}</h4><p className="text-caption text-outline">{j.client} • {j.location} • {j.date}</p><p className="text-primary font-bold text-sm">{j.budget}</p></div>
          <div className="flex gap-2"><button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Terima</button><button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold">Tolak</button></div>
        </div>))}
      </section>
    </div>
  );
}

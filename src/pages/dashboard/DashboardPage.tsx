import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { formatRupiah } from '../../utils/helpers';

export default function DashboardPage() {
  const { isLoggedIn, userName, bookings, consultations, savedProjects, materialOrders, cart, favorites } = useStore();
  if (!isLoggedIn) return <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6"><span className="material-symbols-outlined text-6xl text-outline">lock</span><h2 className="text-h3 font-bold">Silakan Masuk</h2><p className="text-on-surface-variant">Login untuk mengakses dashboard Anda.</p><Link to="/login" className="btn-primary inline-block">Masuk</Link></div>;

  const stats = [
    { label: 'Booking Aktif', value: bookings.filter(b => b.status !== 'Selesai' && b.status !== 'Dibatalkan').length, icon: 'calendar_month', color: 'bg-blue-50 text-blue-600' },
    { label: 'Konsultasi', value: consultations.length, icon: 'support_agent', color: 'bg-purple-50 text-purple-600' },
    { label: 'Proyek Tersimpan', value: savedProjects.length, icon: 'folder', color: 'bg-green-50 text-green-600' },
    { label: 'Pesanan Material', value: materialOrders.length, icon: 'shopping_bag', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
      <div><h1 className="text-h2 font-bold text-primary">Dashboard</h1><p className="text-on-surface-variant">Selamat datang, {userName}!</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">{stats.map(s => (<div key={s.label} className="bg-white rounded-2xl border border-outline-variant p-4 space-y-2 overflow-hidden"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><span className="material-symbols-outlined">{s.icon}</span></div><p className="text-2xl font-black price-text">{s.value}</p><p className="text-caption text-outline break-words">{s.label}</p></div>))}</div>

      {/* Recent Bookings */}
      <section className="bg-white rounded-2xl border border-outline-variant p-6">
        <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg">Booking Terbaru</h2></div>
        {bookings.length === 0 ? <p className="text-on-surface-variant text-sm">Belum ada booking.</p> : (
          <div className="space-y-3">{bookings.slice(-5).reverse().map(b => (
            <div key={b.id} className="flex items-center justify-between py-3 border-b border-outline-variant/30 last:border-0">
              <div><h4 className="font-semibold text-sm">{b.category}</h4><p className="text-caption text-outline">{b.workerName} • {b.date}</p></div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === 'Selesai' ? 'bg-green-100 text-green-700' : b.status === 'Dibatalkan' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-primary'}`}>{b.status}</span>
            </div>
          ))}</div>
        )}
      </section>

      {/* Saved Projects */}
      {savedProjects.length > 0 && <section className="bg-white rounded-2xl border border-outline-variant p-6">
        <h2 className="font-bold text-lg mb-4">Proyek RAB Tersimpan</h2>
        <div className="space-y-3">{savedProjects.map(p => (
          <div key={p.id} className="flex items-center justify-between py-3 border-b border-outline-variant/30 last:border-0">
            <div><h4 className="font-semibold text-sm">{p.name}</h4><p className="text-caption text-outline">{p.category} • {p.area}m² • {p.quality}</p></div>
            <span className="font-bold text-primary price-text-strong text-right">{formatRupiah(p.totalEstimate)}</span>
          </div>
        ))}</div>
      </section>}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/e-renov" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md transition-all"><span className="material-symbols-outlined text-2xl text-primary">search</span><p className="text-xs font-bold mt-2">Cari Jasa</p></Link>
        <Link to="/rab" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md transition-all"><span className="material-symbols-outlined text-2xl text-primary">calculate</span><p className="text-xs font-bold mt-2">Hitung RAB</p></Link>
        <Link to="/tracking" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md transition-all"><span className="material-symbols-outlined text-2xl text-primary">monitoring</span><p className="text-xs font-bold mt-2">Tracking</p></Link>
        <Link to="/help" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md transition-all"><span className="material-symbols-outlined text-2xl text-primary">help</span><p className="text-xs font-bold mt-2">Bantuan</p></Link>
      </div>
    </div>
  );
}

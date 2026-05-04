import { Link } from 'react-router-dom';
import { trackingProjects } from '../data/mockData';
import { useStore } from '../store/useStore';

export default function TrackingPage() {
  const { bookings } = useStore();
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="text-center"><h1 className="text-h1 font-bold text-primary">Project Tracking</h1><p className="text-on-surface-variant mt-2">Pantau progres proyek Anda secara real-time.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trackingProjects.map(p => (
          <Link key={p.id} to={`/tracking/${p.id}`} className="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-card-hover transition-all space-y-4">
            <div className="flex justify-between items-start"><div><h3 className="font-bold text-lg">{p.name}</h3><p className="text-caption text-outline">{p.type} • {p.location}</p></div><span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-bold">{p.status}</span></div>
            <div className="w-full bg-surface-container rounded-full h-3"><div className="bg-royal-blue h-3 rounded-full transition-all" style={{ width: `${p.progress}%` }}></div></div>
            <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Pekerja: {p.worker}</span><span className="font-bold text-primary">{p.progress}%</span></div>
          </Link>
        ))}
        {bookings.filter(b => b.status === 'Dikonfirmasi' || b.status === 'Dalam Pengerjaan').map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3">
            <div className="flex justify-between items-start"><h3 className="font-bold">{b.category}</h3><span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === 'Dalam Pengerjaan' ? 'bg-blue-100 text-primary' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span></div>
            <p className="text-sm text-on-surface-variant">Pekerja: {b.workerName} • {b.date}</p>
          </div>
        ))}
      </div>
      {trackingProjects.length === 0 && bookings.length === 0 && <div className="text-center py-12"><span className="material-symbols-outlined text-6xl text-outline">monitoring</span><p className="text-on-surface-variant mt-4">Belum ada proyek aktif.</p><Link to="/e-renov" className="btn-primary mt-4 inline-block">Mulai Proyek</Link></div>}
    </div>
  );
}

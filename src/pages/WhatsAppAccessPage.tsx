import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function WhatsAppAccessPage() {
  const { consultations } = useStore();
  const latest = consultations[consultations.length - 1];
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div>
      <h2 className="text-h3 font-bold text-primary">Pembayaran Berhasil!</h2>
      <p className="text-on-surface-variant">Anda dapat langsung memulai konsultasi dengan {latest?.expertName || 'ahli'} melalui WhatsApp.</p>
      <a href={`https://wa.me/6281345678901?text=Halo, saya ingin konsultasi tentang ${latest?.topic || 'proyek saya'}`} target="_blank" rel="noreferrer" className="btn-cta inline-flex items-center gap-2 text-lg"><span className="material-symbols-outlined">chat</span>Buka WhatsApp</a>
      <Link to="/dashboard" className="block text-primary font-semibold hover:underline">Kembali ke Dashboard</Link>
    </div>
  );
}

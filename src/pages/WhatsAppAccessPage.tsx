import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { experts } from '../data/mockData';
import { openProviderWhatsApp } from '../utils/helpers';

export default function WhatsAppAccessPage() {
  const { consultations } = useStore();
  const latest = consultations[consultations.length - 1];
  const expert = experts.find(e => e.id === latest?.expertId);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-green-600">check_circle</span></div>
      <h2 className="text-h3 font-bold text-primary">Pembayaran Berhasil!</h2>
      <p className="text-on-surface-variant">Anda dapat langsung memulai konsultasi dengan <strong>{latest?.expertName || 'ahli'}</strong> melalui WhatsApp.</p>
      <div className="flex flex-col gap-3 justify-center">
        {expert && <button onClick={() => openProviderWhatsApp(expert.whatsappNumber, `Halo, saya pelanggan E-Builder. Saya sudah melakukan pembayaran konsultasi untuk topik ${latest?.topic || 'proyek saya'}.`)} className="btn-cta w-full flex items-center justify-center gap-2"><span className="material-symbols-outlined">chat</span>Chat {expert.name} via WhatsApp</button>}
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary flex-1">Lihat Dashboard</Link>
          <a href="https://wa.me/6285749780759?text=Halo%20Customer%20Service%20E-Builder%2C%20saya%20butuh%20bantuan." target="_blank" rel="noreferrer" className="btn-outline flex-1 text-center">Butuh Bantuan CS?</a>
        </div>
      </div>
    </div>
  );
}

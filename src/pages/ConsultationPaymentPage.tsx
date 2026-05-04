import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatRupiah } from '../utils/helpers';

export default function ConsultationPaymentPage() {
  const { consultations, updateConsultationStatus, showToast } = useStore();
  const navigate = useNavigate();
  const latest = consultations[consultations.length - 1];
  if (!latest) return <div className="text-center py-16"><p>Tidak ada konsultasi aktif.</p><Link to="/consultation" className="btn-primary mt-4 inline-block">Cari Ahli</Link></div>;
  const handlePay = () => { updateConsultationStatus(latest.id, 'Dibayar'); showToast('Pembayaran berhasil!'); navigate('/consultation/wa'); };
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-h2 font-bold text-primary text-center">Pembayaran Konsultasi</h1>
      <div className="bg-white rounded-2xl border border-outline-variant p-6 space-y-4">
        <div className="space-y-2 text-sm"><p><strong>Ahli:</strong> {latest.expertName}</p><p><strong>Topik:</strong> {latest.topic}</p><p><strong>Tanggal:</strong> {latest.date} • {latest.time}</p></div>
        <div className="p-4 bg-primary/5 rounded-xl text-center overflow-hidden"><p className="text-sm text-outline">Total Pembayaran</p><p className="text-2xl md:text-4xl lg:text-5xl font-black text-primary price-text-strong">{formatRupiah(latest.fee)}</p></div>
        <div className="space-y-2"><p className="font-semibold text-sm">Transfer ke:</p><div className="p-3 bg-surface-container rounded-xl space-y-1"><p className="font-mono font-bold">BCA 1234567890</p><p className="text-sm text-on-surface-variant">a.n. PT E-Builder Digital</p></div></div>
        <button onClick={handlePay} className="btn-cta w-full text-lg">Konfirmasi Pembayaran</button>
      </div>
    </div>
  );
}

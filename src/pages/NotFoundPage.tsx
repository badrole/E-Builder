import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <span className="material-symbols-outlined text-8xl text-outline">construction</span>
        <h1 className="text-h1 font-bold text-primary">404</h1>
        <p className="text-body-lg text-on-surface-variant">Halaman yang Anda cari tidak ditemukan.</p>
        <Link to="/" className="btn-cta inline-block">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}

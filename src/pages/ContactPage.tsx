import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div className="text-center"><h1 className="text-h1 font-bold text-primary">Hubungi Kami</h1><p className="text-on-surface-variant mt-2">Tim kami siap membantu Anda.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a href="mailto:help@builder.id" className="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-md transition-all flex items-center gap-4"><div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-primary">mail</span></div><div><h3 className="font-bold">Email</h3><p className="text-primary">help@builder.id</p></div></a>
        <a href="https://wa.me/6285749780759" target="_blank" rel="noreferrer" className="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-md transition-all flex items-center gap-4"><div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-green-600">chat</span></div><div><h3 className="font-bold">WhatsApp</h3><p className="text-green-600">085749780759</p></div></a>
        <a href="tel:085749780759" className="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-md transition-all flex items-center gap-4"><div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-amber-600">call</span></div><div><h3 className="font-bold">Telepon</h3><p className="text-amber-600">085749780759</p></div></a>
        <Link to="/customer-service/whatsapp" className="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-md transition-all flex items-center gap-4"><div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-primary">smart_toy</span></div><div><h3 className="font-bold">Live Chat</h3><p className="text-primary">CS Online 24/7</p></div></Link>
      </div>
      <div className="bg-white rounded-2xl border border-outline-variant p-6"><h3 className="font-bold mb-2">Alamat Kantor</h3><p className="text-on-surface-variant">Jl. Raya Digital No. 1, Jakarta Selatan, Indonesia 12345</p><p className="text-on-surface-variant text-sm mt-1">Senin - Jumat: 08:00 - 17:00 WIB</p></div>
    </div>
  );
}

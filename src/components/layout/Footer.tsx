import { Link } from 'react-router-dom';
import { IMAGES } from '../../data/images';

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-16 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4 sm:px-8 max-w-container mx-auto">
        <div>
          <img alt="E-Builder" className="h-8 w-auto mb-6" src={IMAGES.logo} />
          <p className="text-slate-600 text-sm leading-relaxed mb-6">Platform digital premium untuk renovasi, konstruksi, dan marketplace material bangunan di Indonesia.</p>
          <div className="flex gap-4">
            <a href="mailto:help@builder.id" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-royal-blue hover:text-white transition-all"><span className="material-symbols-outlined text-sm">mail</span></a>
            <a href="https://wa.me/6285749780759" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"><span className="material-symbols-outlined text-sm">chat</span></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Layanan</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/e-renov" className="text-slate-600 hover:text-royal-blue transition-all">E-Renov</Link></li>
            <li><Link to="/e-construct" className="text-slate-600 hover:text-royal-blue transition-all">E-Construct</Link></li>
            <li><Link to="/materials" className="text-slate-600 hover:text-royal-blue transition-all">Marketplace Material</Link></li>
            <li><Link to="/emergency" className="text-slate-600 hover:text-royal-blue transition-all">Layanan Darurat</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/rab" className="text-slate-600 hover:text-royal-blue transition-all">Estimasi RAB</Link></li>
            <li><Link to="/consultation" className="text-slate-600 hover:text-royal-blue transition-all">Konsultasi Ahli</Link></li>
            <li><Link to="/tracking" className="text-slate-600 hover:text-royal-blue transition-all">Project Tracking</Link></li>
            <li><Link to="/become-partner" className="text-slate-600 hover:text-royal-blue transition-all">Jadi Mitra</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Hubungi Kami</h4>
          <p className="text-slate-600 text-sm mb-2">Email: help@builder.id</p>
          <p className="text-slate-600 text-sm mb-4">WhatsApp: 085749780759</p>
          <div className="flex gap-2">
            <Link to="/help" className="text-sm text-royal-blue font-semibold hover:underline">Pusat Bantuan</Link>
            <span className="text-slate-300">|</span>
            <Link to="/contact" className="text-sm text-royal-blue font-semibold hover:underline">Kontak</Link>
          </div>
        </div>
      </div>
      <div className="max-w-container mx-auto px-8 mt-16 pt-8 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">© 2026 E-Builder Digital Marketplace. Built with architectural precision.</p>
      </div>
    </footer>
  );
}

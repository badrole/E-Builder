import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { IMAGES } from '../../data/images';
import { getSearchRoute } from '../../utils/helpers';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isLoggedIn, userName, cart, logout } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(getSearchRoute(searchQuery));
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-nav sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-4 md:px-6 lg:px-8 py-3 max-w-container mx-auto">
        <div className="flex items-center gap-6 lg:gap-12 flex-1">
          <Link to="/"><img alt="E-Builder Logo" className="h-8 sm:h-10 w-auto" src={IMAGES.logo} /></Link>
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold tracking-tight">
            <div className="relative" onMouseEnter={() => setShowServicesDropdown(true)} onMouseLeave={() => setShowServicesDropdown(false)}>
              <button className="text-slate-500 hover:text-royal-blue transition-colors flex items-center gap-1">Layanan <span className="material-symbols-outlined text-sm">expand_more</span></button>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 bg-white rounded-xl shadow-card-hover border border-outline-variant p-2 min-w-[200px] z-50">
                  <Link to="/e-renov" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm">E-Renov</Link>
                  <Link to="/e-construct" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm">E-Construct</Link>
                  <Link to="/emergency" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm">Layanan Darurat</Link>
                  <Link to="/promotions" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm">Promo & Paket</Link>
                </div>
              )}
            </div>
            <Link to="/materials" className="text-slate-500 hover:text-royal-blue transition-colors">Material</Link>
            <Link to="/rab" className="text-slate-500 hover:text-royal-blue transition-colors">Estimasi RAB</Link>
            <Link to="/consultation" className="text-slate-500 hover:text-royal-blue transition-colors">Konsultasi Ahli</Link>
            <Link to="/about" className="text-slate-500 hover:text-royal-blue transition-colors">Tentang</Link>
            <Link to="/help" className="text-slate-500 hover:text-royal-blue transition-colors">Bantuan</Link>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <form onSubmit={handleSearch} className="relative hidden xl:block mr-2">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary text-sm w-56" placeholder="Cari layanan..." />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
          </form>
          <Link to="/cart" className="relative p-2 hover:bg-surface-container rounded-lg">
            <span className="material-symbols-outlined text-slate-600">shopping_cart</span>
            {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta-amber text-xs font-bold rounded-full flex items-center justify-center">{cart.length}</span>}
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="text-sm font-semibold text-royal-blue hidden sm:block">{userName}</Link>
              <button onClick={logout} className="text-sm text-slate-500 hover:text-error hidden sm:block">Keluar</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-royal-blue font-bold px-3 py-2 hover:bg-blue-50 rounded-lg transition-all text-sm hidden sm:block">Masuk</Link>
              <Link to="/register" className="bg-royal-blue text-white px-4 sm:px-6 py-2 rounded-lg font-bold shadow-md hover:bg-primary transition-all text-sm">Daftar</Link>
            </>
          )}
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2"><span className="material-symbols-outlined">menu</span></button>
        </div>
      </nav>
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          <Link to="/e-renov" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">E-Renov</Link>
          <Link to="/e-construct" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">E-Construct</Link>
          <Link to="/materials" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">Material</Link>
          <Link to="/rab" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">Estimasi RAB</Link>
          <Link to="/consultation" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">Konsultasi</Link>
          <Link to="/tracking" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">Tracking</Link>
          <Link to="/help" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold">Bantuan</Link>
          <Link to="/become-partner" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 hover:bg-surface-container rounded-lg text-sm font-semibold text-cta-amber">Jadi Mitra</Link>
        </div>
      )}
    </header>
  );
}

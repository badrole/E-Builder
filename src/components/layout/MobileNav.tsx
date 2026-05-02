import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const { pathname } = useLocation();
  const items = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/e-renov', icon: 'architecture', label: 'Build' },
    { to: '/materials', icon: 'shopping_cart', label: 'Material' },
    { to: '/tracking', icon: 'account_tree', label: 'Tracking' },
    { to: '/dashboard', icon: 'person', label: 'Akun' },
  ];
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 md:hidden bg-white border-t border-slate-100 shadow-mobile-nav z-50 rounded-t-2xl">
      {items.map(item => {
        const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
        return (
          <Link key={item.to} to={item.to} className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${active ? 'text-royal-blue bg-blue-50' : 'text-slate-400'}`}>
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

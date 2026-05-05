import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

export function isAdminLoggedIn() {
  return localStorage.getItem('ebuilder_admin_session') === 'true';
}

export default function AdminShell() {
  const navigate = useNavigate();
  if (!isAdminLoggedIn()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem('ebuilder_admin_session');
    localStorage.removeItem('ebuilder_admin_email');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-8 space-y-6">
      <div className="bg-white rounded-2xl border border-outline-variant p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-h3 font-bold text-primary">Admin E-Builder</h1><p className="text-sm text-on-surface-variant">{localStorage.getItem('ebuilder_admin_email')}</p></div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/dashboard" className="chip">Dashboard</Link>
          <Link to="/admin/partners" className="chip">Mitra</Link>
          <Link to="/admin/partners/add" className="btn-cta py-2">Tambah Mitra</Link>
          <button onClick={logout} className="btn-outline py-2">Logout</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}


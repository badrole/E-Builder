import { useEffect, useState } from 'react';
import { fetchBookings, fetchPartners, SupabaseBooking, SupabasePartner } from '../../lib/partners';
import { formatIndonesianDate } from '../../utils/formatters';

export default function AdminDashboardPage() {
  const [partners, setPartners] = useState<SupabasePartner[]>([]);
  const [bookings, setBookings] = useState<SupabaseBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadDashboard() {
      setLoading(true);
      const nextErrors: string[] = [];

      try {
        const partnerData = await fetchPartners();
        if (mounted) setPartners(partnerData);
      } catch (error: any) {
        console.error('Admin partners summary fetch failed:', error);
        nextErrors.push(`Data mitra belum dapat dimuat: ${error?.message || 'error Supabase'}`);
      }

      try {
        const bookingData = await fetchBookings();
        if (mounted) setBookings(bookingData);
      } catch (error: any) {
        console.error('Admin bookings summary fetch failed:', error);
        nextErrors.push(`Data booking belum dapat dimuat: ${error?.message || 'error Supabase'}`);
      }

      if (mounted) {
        setErrors(nextErrors);
        setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  const cards = [
    ['Total Mitra', partners.length],
    ['Mitra Aktif', partners.filter(p => p.status === 'active').length],
    ['Mitra Pending', partners.filter(p => p.status === 'pending').length],
    ['Total Booking', bookings.length],
    ['Booking Pending', bookings.filter(b => b.status === 'pending').length],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2 font-bold text-primary">Dashboard Admin</h2>
        <p className="text-on-surface-variant text-sm">Ringkasan data mitra dan booking dari Supabase.</p>
      </div>
      {loading && <div className="bg-white rounded-2xl border border-outline-variant p-6">Memuat dashboard...</div>}
      {errors.map(error => <div key={error} className="bg-red-50 text-red-700 rounded-2xl border border-red-200 p-4">{error}</div>)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">{cards.map(([label, value]) => (
        <div key={label} className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm"><p className="text-caption text-outline uppercase font-bold">{label}</p><p className="text-3xl font-black text-primary mt-2">{value}</p></div>
      ))}</div>
      <div className="bg-white rounded-2xl border border-outline-variant p-6 overflow-x-auto">
        <h2 className="text-h3 font-bold mb-4">Booking Terbaru</h2>
        {bookings.length === 0 ? <p className="text-on-surface-variant">Belum ada booking.</p> : (
          <table className="w-full text-sm">
            <thead><tr className="text-left text-outline border-b border-outline-variant"><th className="py-3">Pelanggan</th><th>Layanan</th><th>Tanggal</th><th>Status</th></tr></thead>
            <tbody>{bookings.slice(0, 8).map(b => <tr key={b.id} className="border-b border-outline-variant/30"><td className="py-3 font-semibold">{b.customer_name}<br /><span className="text-caption text-outline">{b.customer_phone}</span></td><td>{b.service_type}</td><td>{formatIndonesianDate(b.booking_date)}</td><td><span className="chip text-xs inline-flex">{b.status}</span></td></tr>)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

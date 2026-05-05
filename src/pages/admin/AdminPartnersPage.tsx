import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPartners, SupabasePartner } from '../../lib/partners';
import { supabase } from '../../lib/supabase';
import { formatIDR } from '../../utils/formatters';
import { useStore } from '../../store/useStore';
import { workers, experts, stores, constructPackages } from '../../data/mockData';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<SupabasePartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [importing, setImporting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SupabasePartner | null>(null);
  const { showToast } = useStore();

  const load = () => {
    setLoading(true);
    fetchPartners()
      .then(setPartners)
      .catch(error => {
        console.error('Admin partners fetch failed:', error);
        setError('Data mitra belum dapat dimuat.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleStatus = async (partner: SupabasePartner) => {
    const nextStatus = partner.status === 'active' ? 'inactive' : 'active';
    const { error } = await supabase.from('partners').update({ status: nextStatus }).eq('id', partner.id);
    if (error) return setError('Status mitra gagal diperbarui.');
    load();
  };

  const deletePartner = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('partners').delete().eq('id', deleteTarget.id);
    if (error) {
      setError('Mitra gagal dihapus.');
      return;
    }
    setDeleteTarget(null);
    showToast('Mitra berhasil dihapus.');
    load();
  };

  const importStitchData = async () => {
    setImporting(true);
    setError('');
    try {
      const existingKeys = new Set(partners.map(p => `${p.type}|${p.name}|${p.category}|${p.city}`.toLowerCase()));
      const payload = [
        ...workers.map(w => ({
          name: w.name,
          type: 'Worker',
          category: w.category,
          city: w.city,
          service_area: w.city,
          whatsapp_number: w.whatsappNumber || w.phone,
          price_from: w.price,
          rating: w.rating,
          experience: w.exp,
          description: w.spec,
          image_url: w.image,
          status: 'active',
        })),
        ...experts.map(e => ({
          name: e.name,
          type: 'Expert',
          category: e.spec,
          city: 'Online',
          service_area: e.subSpec,
          whatsapp_number: e.whatsappNumber || e.phone,
          price_from: e.fee,
          rating: e.rating,
          experience: e.exp,
          description: e.bio,
          image_url: e.image,
          status: 'active',
        })),
        ...constructPackages.map(pkg => ({
          name: pkg.name,
          type: 'Contractor',
          category: pkg.team[0] || 'Kontraktor',
          city: 'Indonesia',
          service_area: pkg.suitable,
          whatsapp_number: pkg.whatsappNumber,
          price_from: pkg.price,
          rating: 4.8,
          experience: pkg.duration,
          description: pkg.included.join(', '),
          image_url: pkg.image,
          status: 'active',
        })),
        ...stores.map(s => ({
          name: s.name,
          type: 'Material Store',
          category: s.categories[0] || 'Material',
          city: s.city,
          service_area: s.address,
          whatsapp_number: s.whatsappNumber,
          price_from: 0,
          rating: s.rating,
          experience: 'Toko material terpercaya',
          description: s.categories.join(', '),
          image_url: s.image,
          status: 'active',
        })),
      ].filter(item => !existingKeys.has(`${item.type}|${item.name}|${item.category}|${item.city}`.toLowerCase()));

      if (payload.length === 0) {
        showToast('Semua data Stitch sudah ada di Supabase.');
        return;
      }

      const { error } = await supabase.from('partners').insert(payload);
      if (error) throw error;
      showToast(`${payload.length} data mitra Stitch berhasil diimport.`);
      load();
    } catch (error: any) {
      console.error('Import Stitch partners failed:', error);
      setError(`Import data gagal: ${error?.message || 'error Supabase'}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-h3 font-bold text-primary">Mitra</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={importStitchData} disabled={importing} className="btn-outline py-2">{importing ? 'Mengimport...' : 'Import Data Stitch'}</button>
          <Link to="/admin/partners/add" className="btn-cta">Tambah Mitra</Link>
        </div>
      </div>
      {loading && <div className="bg-white rounded-2xl border border-outline-variant p-6">Memuat mitra...</div>}
      {error && <div className="bg-red-50 text-red-700 rounded-2xl border border-red-200 p-4">{error}</div>}
      {!loading && partners.length === 0 && <div className="bg-white rounded-2xl border border-outline-variant p-6 text-on-surface-variant">Belum ada mitra.</div>}
      <div className="bg-white rounded-2xl border border-outline-variant overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-outline border-b border-outline-variant"><th className="p-4">Nama</th><th>Type</th><th>Kategori</th><th>Kota</th><th>WhatsApp</th><th>Harga</th><th>Rating</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>{partners.map(p => (
            <tr key={p.id} className="border-b border-outline-variant/30">
              <td className="p-4 font-semibold">{p.name}</td><td>{p.type}</td><td>{p.category}</td><td>{p.city}</td><td>{p.whatsapp_number}</td><td>{formatIDR(p.price_from)}</td><td>{p.rating}</td><td><span className="chip text-xs inline-flex">{p.status}</span></td>
              <td><div className="flex flex-wrap gap-2"><Link to={`/admin/partners/edit/${p.id}`} className="px-3 py-1.5 text-xs font-semibold border border-royal-blue text-royal-blue rounded-lg">Edit</Link><button onClick={() => toggleStatus(p)} className="px-3 py-1.5 text-xs font-semibold bg-royal-blue text-white rounded-lg">{p.status === 'active' ? 'Deactivate' : 'Activate'}</button><button onClick={() => setDeleteTarget(p)} className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg">Delete</button></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {deleteTarget && <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"><div className="bg-white rounded-2xl border border-outline-variant p-6 max-w-sm w-full space-y-4"><h3 className="font-bold text-lg">Hapus mitra?</h3><p className="text-sm text-on-surface-variant">Mitra {deleteTarget.name} akan dihapus dari Supabase.</p><div className="flex gap-3 justify-end"><button onClick={() => setDeleteTarget(null)} className="btn-outline py-2">Batal</button><button onClick={deletePartner} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold">Hapus</button></div></div></div>}
    </div>
  );
}

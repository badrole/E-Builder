import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPartnerById, PartnerStatus, PartnerType } from '../../lib/partners';
import { supabase } from '../../lib/supabase';
import { formatWhatsAppNumber, isValidIndonesianWhatsApp } from '../../utils/formatters';
import { useStore } from '../../store/useStore';

const types: PartnerType[] = ['Worker', 'Contractor', 'Expert', 'Material Store'];
const statuses: PartnerStatus[] = ['active', 'pending', 'inactive'];

export default function AdminPartnerFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useStore();
  const [form, setForm] = useState({
    name: '', type: 'Worker' as PartnerType, category: '', city: '', service_area: '', whatsapp_number: '', price_from: '0', rating: '0', experience: '', description: '', image_url: '', status: 'active' as PartnerStatus,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchPartnerById(id)
      .then(partner => {
        if (!partner) return setError('Mitra tidak ditemukan.');
        setForm({
          name: partner.name || '', type: partner.type, category: partner.category || '', city: partner.city || '', service_area: partner.service_area || '', whatsapp_number: partner.whatsapp_number || '', price_from: String(partner.price_from || 0), rating: String(partner.rating || 0), experience: partner.experience || '', description: partner.description || '', image_url: partner.image_url || '', status: partner.status,
        });
      })
      .catch(error => {
        console.error('Admin partner detail fetch failed:', error);
        setError('Data mitra belum dapat dimuat.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = (key: string, value: string) => setForm(current => ({ ...current, [key]: value }));

  const validate = () => {
    if (!form.name.trim()) return 'Nama mitra wajib diisi.';
    if (!form.category.trim()) return 'Kategori wajib diisi.';
    if (!form.city.trim()) return 'Kota wajib diisi.';
    if (!isValidIndonesianWhatsApp(form.whatsapp_number)) return 'Nomor WhatsApp harus nomor Indonesia yang valid.';
    if (Number(form.price_from) < 0 || Number.isNaN(Number(form.price_from))) return 'Harga mulai harus angka minimal 0.';
    if (Number(form.rating) < 0 || Number(form.rating) > 5 || Number.isNaN(Number(form.rating))) return 'Rating harus antara 0 sampai 5.';
    return '';
  };

  const uploadImage = async () => {
    if (!image) return form.image_url;
    const ext = image.name.split('.').pop() || 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('partner-images').upload(path, image, { upsert: false });
    if (error) throw new Error(`Upload gambar gagal: ${error.message}`);
    const { data } = supabase.storage.from('partner-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);
    setSaving(true);
    setError('');
    try {
      const imageUrl = await uploadImage();
      const payload = {
        name: form.name.trim(),
        type: form.type,
        category: form.category.trim(),
        city: form.city.trim(),
        service_area: form.service_area.trim(),
        whatsapp_number: formatWhatsAppNumber(form.whatsapp_number),
        price_from: Number(form.price_from),
        rating: Number(form.rating),
        experience: form.experience.trim(),
        description: form.description.trim(),
        image_url: imageUrl,
        status: form.status,
      };
      const result = isEdit
        ? await supabase.from('partners').update(payload).eq('id', id)
        : await supabase.from('partners').insert(payload);
      if (result.error) throw new Error(`Simpan database gagal: ${result.error.message}`);
      showToast(isEdit ? 'Data mitra berhasil diperbarui.' : 'Mitra berhasil ditambahkan.');
      navigate('/admin/partners');
    } catch (error: any) {
      console.error('Admin partner save failed:', error);
      setError(error?.message || 'Data mitra gagal disimpan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="bg-white rounded-2xl border border-outline-variant p-6">Memuat data mitra...</div>;

  return (
    <div className="space-y-6">
      <Link to="/admin/partners" className="inline-flex items-center gap-2 text-primary font-semibold"><span className="material-symbols-outlined">arrow_back</span>Kembali</Link>
      <form onSubmit={submit} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-5">
        <h2 className="text-h3 font-bold text-primary">{isEdit ? 'Edit Mitra' : 'Tambah Mitra'}</h2>
        {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3 text-sm">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-semibold block mb-2">Partner Type</label><select value={form.type} onChange={e => setField('type', e.target.value)} className="input-field">{types.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="text-sm font-semibold block mb-2">Status</label><select value={form.status} onChange={e => setField('status', e.target.value)} className="input-field">{statuses.map(s => <option key={s}>{s}</option>)}</select><p className="text-caption text-on-surface-variant mt-1">Hanya status active yang tampil di halaman publik.</p></div>
          <div><label className="text-sm font-semibold block mb-2">Nama</label><input required value={form.name} onChange={e => setField('name', e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-2">Kategori / Spesialisasi</label><input required value={form.category} onChange={e => setField('category', e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-2">Kota</label><input required value={form.city} onChange={e => setField('city', e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-2">Area Layanan</label><input value={form.service_area} onChange={e => setField('service_area', e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-2">WhatsApp</label><input required value={form.whatsapp_number} onChange={e => setField('whatsapp_number', e.target.value)} className="input-field" placeholder="08xxx" /></div>
          <div><label className="text-sm font-semibold block mb-2">Harga Mulai</label><input type="number" min="0" required value={form.price_from} onChange={e => setField('price_from', e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-2">Rating</label><input type="number" min="0" max="5" step="0.1" required value={form.rating} onChange={e => setField('rating', e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-semibold block mb-2">Pengalaman</label><input value={form.experience} onChange={e => setField('experience', e.target.value)} className="input-field" /></div>
        </div>
        <div><label className="text-sm font-semibold block mb-2">Deskripsi</label><textarea value={form.description} onChange={e => setField('description', e.target.value)} className="input-field min-h-[100px]" /></div>
        <div><label className="text-sm font-semibold block mb-2">Upload Gambar</label><input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="input-field" />{form.image_url && <img src={form.image_url} alt={form.name} className="mt-3 w-24 h-24 object-cover rounded-xl" />}</div>
        <button disabled={saving} className="btn-cta w-full">{saving ? 'Menyimpan...' : 'Simpan Mitra'}</button>
      </form>
    </div>
  );
}

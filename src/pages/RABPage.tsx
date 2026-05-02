import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { categories } from '../data/mockData';

const qualityMultipliers = { Standard: 1, Menengah: 1.25, Premium: 1.6 };
const defaultItems = [
  { name: 'Semen Portland 50kg', unit: 'sak', qty: 20, price: 68000 },
  { name: 'Pasir Halus', unit: 'm³', qty: 3, price: 450000 },
  { name: 'Keramik Lantai 40x40', unit: 'dus', qty: 15, price: 85000 },
  { name: 'Cat Interior 5kg', unit: 'kaleng', qty: 8, price: 145000 },
  { name: 'Pipa PVC 3 inch', unit: 'batang', qty: 10, price: 52000 },
];

export default function RABPage() {
  const [step, setStep] = useState(0);
  const [project, setProject] = useState({ name: 'Renovasi Kamar Mandi', type: 'Renovasi', category: 'Renovasi Kamar Mandi', area: 12, quality: 'Standard' as keyof typeof qualityMultipliers });
  const [items, setItems] = useState(defaultItems.map((d, i) => ({ ...d, id: i })));
  const [newItem, setNewItem] = useState({ name: '', unit: '', qty: 1, price: 0 });
  const { saveProject, showToast } = useStore();

  const multiplier = qualityMultipliers[project.quality];
  const materialTotal = items.reduce((t, i) => t + i.qty * i.price, 0);
  const laborCost = project.area * 150000;
  const overhead = (materialTotal + laborCost) * 0.1;
  const rawTotal = materialTotal + laborCost + overhead;
  const total = Math.round(rawTotal * multiplier);
  const duration = Math.ceil(project.area / 3);

  const addItem = () => { if (newItem.name && newItem.price > 0) { setItems([...items, { ...newItem, id: items.length }]); setNewItem({ name: '', unit: '', qty: 1, price: 0 }); } };
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  const handleSave = () => {
    saveProject({ name: project.name, type: project.type, category: project.category, area: project.area, quality: project.quality, totalEstimate: total, items });
  };

  const steps = ['Info Proyek', 'Material & Biaya', 'Hasil Estimasi'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="text-center"><h1 className="text-h1 font-bold text-primary">Smart RAB Calculator</h1><p className="text-on-surface-variant mt-2">Estimasi biaya renovasi & konstruksi dengan presisi arsitektur.</p></div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2">{steps.map((s, i) => (<div key={i} className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-royal-blue text-white' : 'bg-chip-bg text-outline'}`}>{i + 1}</div><span className={`text-sm font-semibold hidden sm:block ${i <= step ? 'text-primary' : 'text-outline'}`}>{s}</span>{i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${i < step ? 'bg-royal-blue' : 'bg-chip-bg'}`}></div>}</div>))}</div>

      {step === 0 && (
        <div className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
          <h2 className="text-h3 font-bold">Informasi Proyek</h2>
          <div><label className="text-sm font-semibold block mb-1">Nama Proyek</label><input value={project.name} onChange={e => setProject({...project, name: e.target.value})} className="input-field" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold block mb-1">Tipe</label><select value={project.type} onChange={e => setProject({...project, type: e.target.value})} className="input-field"><option>Renovasi</option><option>Bangun Baru</option><option>Perbaikan</option></select></div>
            <div><label className="text-sm font-semibold block mb-1">Kategori</label><select value={project.category} onChange={e => setProject({...project, category: e.target.value})} className="input-field">{categories.map(c => <option key={c.id}>{c.name}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold block mb-1">Luas Area (m²)</label><input type="number" value={project.area} onChange={e => setProject({...project, area: Number(e.target.value)})} className="input-field" min={1} /></div>
            <div><label className="text-sm font-semibold block mb-1">Kualitas Material</label><div className="grid grid-cols-3 gap-2">{(['Standard','Menengah','Premium'] as const).map(q => <button key={q} type="button" onClick={() => setProject({...project, quality: q})} className={`py-3 rounded-xl font-semibold text-sm border-2 transition-all ${project.quality === q ? 'border-royal-blue bg-blue-50 text-primary' : 'border-outline-variant'}`}>{q}<br/><span className="text-xs text-outline">x{qualityMultipliers[q]}</span></button>)}</div></div>
          </div>
          <button onClick={() => setStep(1)} className="btn-cta w-full">Lanjutkan</button>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
          <h2 className="text-h3 font-bold">Daftar Material & Biaya</h2>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-surface-container"><th className="text-left p-3">Item</th><th className="p-3">Satuan</th><th className="p-3">Qty</th><th className="p-3">Harga</th><th className="p-3">Subtotal</th><th className="p-3"></th></tr></thead><tbody>{items.map(i => (<tr key={i.id} className="border-b border-outline-variant/30"><td className="p-3">{i.name}</td><td className="p-3 text-center">{i.unit}</td><td className="p-3 text-center">{i.qty}</td><td className="p-3 text-right">{formatRupiah(i.price)}</td><td className="p-3 text-right font-semibold">{formatRupiah(i.qty * i.price)}</td><td className="p-3"><button onClick={() => removeItem(i.id)} className="text-error"><span className="material-symbols-outlined text-sm">delete</span></button></td></tr>))}</tbody></table></div>
          <div className="flex flex-wrap gap-2 items-end"><input placeholder="Nama item" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="input-field flex-1 min-w-[120px]" /><input placeholder="Satuan" value={newItem.unit} onChange={e => setNewItem({...newItem, unit: e.target.value})} className="input-field w-20" /><input type="number" placeholder="Qty" value={newItem.qty || ''} onChange={e => setNewItem({...newItem, qty: Number(e.target.value)})} className="input-field w-20" /><input type="number" placeholder="Harga" value={newItem.price || ''} onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} className="input-field w-32" /><button onClick={addItem} className="btn-primary">+ Tambah</button></div>
          <div className="flex gap-3"><button onClick={() => setStep(0)} className="btn-outline flex-1">Kembali</button><button onClick={() => setStep(2)} className="btn-cta flex-1">Lihat Hasil</button></div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <h2 className="text-h3 font-bold">Hasil Estimasi RAB</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-xl text-center"><p className="text-caption text-outline font-semibold uppercase">Total Estimasi</p><p className="text-3xl font-black text-primary">{formatRupiah(total)}</p></div>
              <div className="p-4 bg-surface-container rounded-xl text-center"><p className="text-caption text-outline font-semibold uppercase">Durasi</p><p className="text-2xl font-bold">{duration} hari</p></div>
              <div className="p-4 bg-surface-container rounded-xl text-center"><p className="text-caption text-outline font-semibold uppercase">Kualitas</p><p className="text-2xl font-bold">{project.quality}</p></div>
            </div>
            <div className="space-y-2 text-sm"><div className="flex justify-between py-2 border-b border-outline-variant/30"><span>Material</span><span className="font-semibold">{formatRupiah(materialTotal)}</span></div><div className="flex justify-between py-2 border-b border-outline-variant/30"><span>Upah Tenaga Kerja ({project.area}m² × Rp150.000)</span><span className="font-semibold">{formatRupiah(laborCost)}</span></div><div className="flex justify-between py-2 border-b border-outline-variant/30"><span>Overhead (10%)</span><span className="font-semibold">{formatRupiah(Math.round(overhead))}</span></div><div className="flex justify-between py-2 border-b border-outline-variant/30"><span>Multiplier Kualitas</span><span className="font-semibold">×{multiplier}</span></div><div className="flex justify-between py-2 font-bold text-lg"><span>TOTAL</span><span className="text-primary">{formatRupiah(total)}</span></div></div>
          </div>
          <div className="flex flex-wrap gap-3"><button onClick={handleSave} className="btn-cta flex items-center gap-2"><span className="material-symbols-outlined">save</span>Simpan Proyek</button><button onClick={() => window.print()} className="btn-outline flex items-center gap-2"><span className="material-symbols-outlined">print</span>Cetak / PDF</button><button onClick={() => setStep(0)} className="btn-outline">Hitung Ulang</button><Link to="/e-renov" className="btn-outline flex items-center gap-2"><span className="material-symbols-outlined">handyman</span>Cari Pekerja</Link></div>
        </div>
      )}
    </div>
  );
}

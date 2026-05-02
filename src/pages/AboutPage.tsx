import { IMAGES } from '../data/images';

export default function AboutPage() {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto"><h1 className="text-h1 font-bold text-primary">Tentang E-Builder</h1><p className="text-body-lg text-on-surface-variant mt-4">Platform digital premium untuk ekosistem layanan arsitektur dan konstruksi di Indonesia. Dibangun dengan presisi arsitektur.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><div className="space-y-6"><h2 className="text-h2 font-bold text-primary">Visi Kami</h2><p className="text-body-lg text-on-surface-variant">Menjadi platform digital #1 di Indonesia yang menghubungkan pemilik properti dengan profesional konstruksi terverifikasi, material berkualitas, dan teknologi smart estimation.</p><div className="grid grid-cols-2 gap-4"><div className="p-4 bg-primary/5 rounded-xl text-center"><p className="text-3xl font-black text-primary">500+</p><p className="text-sm text-outline">Mitra Profesional</p></div><div className="p-4 bg-primary/5 rounded-xl text-center"><p className="text-3xl font-black text-primary">10K+</p><p className="text-sm text-outline">Proyek Selesai</p></div><div className="p-4 bg-primary/5 rounded-xl text-center"><p className="text-3xl font-black text-primary">4.8★</p><p className="text-sm text-outline">Rating Pengguna</p></div><div className="p-4 bg-primary/5 rounded-xl text-center"><p className="text-3xl font-black text-primary">25+</p><p className="text-sm text-outline">Kota Layanan</p></div></div></div><img src={IMAGES.hero} alt="E-Builder" className="rounded-2xl shadow-xl" /></div>
      <div className="bg-royal-blue rounded-2xl p-8 sm:p-12 text-white text-center"><h2 className="text-h2 font-bold">Built with Architectural Precision.</h2><p className="text-blue-100 mt-4 text-lg max-w-xl mx-auto">Setiap fitur dirancang dengan standar presisi arsitektur untuk memberikan pengalaman terbaik bagi pengguna dan mitra.</p></div>
    </div>
  );
}

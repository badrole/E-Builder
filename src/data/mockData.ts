import { IMAGES } from './images';

export const workers = [
  { id: 'w1', name: 'Dimas Hafif Maulana, S.T', category: 'Plumbing / Saluran Air', spec: 'Spesialis Pipa & Sanitasi', city: 'Surabaya', rating: 4.8, reviews: 124, jobs: 142, price: 150000, priceUnit: '/hari', status: 'idle' as const, verified: true, recommended: true, fastResponse: true, exp: '12 tahun', image: IMAGES.worker1, phone: '081234567890', warranty: '30 hari garansi', bookedDates: ['2026-05-05', '2026-05-10'], pendingDates: ['2026-05-07'], portfolio: [IMAGES.bathroom, IMAGES.kitchen] },
  { id: 'w2', name: 'Jefran Andofian, S.T', category: 'Perbaikan Listrik', spec: 'Teknisi Listrik Bersertifikat', city: 'Jakarta', rating: 4.9, reviews: 89, jobs: 98, price: 200000, priceUnit: '/hari', status: 'idle' as const, verified: true, recommended: true, fastResponse: false, exp: '8 tahun', image: IMAGES.worker2, phone: '081234567891', warranty: '14 hari garansi', bookedDates: ['2026-05-06'], pendingDates: [], portfolio: [IMAGES.electrical] },
  { id: 'w3', name: 'Ir. Noor Mahfud Idova, S.T', category: 'Renovasi Kamar Mandi', spec: 'Renovasi Full Kamar Mandi', city: 'Bandung', rating: 5.0, reviews: 56, jobs: 67, price: 1500000, priceUnit: '/proyek', status: 'idle' as const, verified: true, recommended: false, fastResponse: true, exp: '10 tahun', image: IMAGES.expert3, phone: '081234567892', warranty: '60 hari garansi', bookedDates: ['2026-05-08', '2026-05-09'], pendingDates: ['2026-05-11'], portfolio: [IMAGES.bathReno] },
  { id: 'w4', name: 'Dimas Hafif Maulana, S.T', category: 'Pengecatan Rumah', spec: 'Cat Interior & Eksterior', city: 'Sidoarjo', rating: 4.7, reviews: 45, jobs: 78, price: 25000, priceUnit: '/m²', status: 'booked' as const, verified: true, recommended: true, fastResponse: false, exp: '15 tahun', image: IMAGES.worker1, phone: '081234567893', warranty: '90 hari garansi', bookedDates: ['2026-05-04', '2026-05-05', '2026-05-06'], pendingDates: [], portfolio: [IMAGES.livingRoom, IMAGES.paint] },
  { id: 'w5', name: 'Thufail Abbad Bilfaj, S.T M.T', category: 'Perbaikan Atap', spec: 'Atap & Rangka Baja Ringan', city: 'Malang', rating: 4.6, reviews: 38, jobs: 55, price: 350000, priceUnit: '/hari', status: 'idle' as const, verified: false, recommended: false, fastResponse: true, exp: '7 tahun', image: IMAGES.expert1, phone: '081234567894', warranty: '30 hari garansi', bookedDates: [], pendingDates: ['2026-05-12'], portfolio: [IMAGES.hero] },
  { id: 'w6', name: 'Jefran Andofian, S.T', category: 'Pemasangan Keramik', spec: 'Keramik & Granit Presisi', city: 'Yogyakarta', rating: 4.9, reviews: 67, jobs: 91, price: 45000, priceUnit: '/m²', status: 'idle' as const, verified: true, recommended: true, fastResponse: true, exp: '11 tahun', image: IMAGES.worker2, phone: '081234567895', warranty: '60 hari garansi', bookedDates: ['2026-05-15'], pendingDates: [], portfolio: [IMAGES.bathroom, IMAGES.kitchen] },
  { id: 'w7', name: 'Ir. Noor Mahfud Idova, S.T', category: 'Perbaikan Dinding', spec: 'Dinding & Plesteran', city: 'Semarang', rating: 4.5, reviews: 29, jobs: 43, price: 180000, priceUnit: '/hari', status: 'idle' as const, verified: true, recommended: false, fastResponse: false, exp: '9 tahun', image: IMAGES.expert3, phone: '081234567896', warranty: '30 hari garansi', bookedDates: [], pendingDates: [], portfolio: [IMAGES.hero] },
  { id: 'w8', name: 'Dimas Hafif Maulana, S.T', category: 'Renovasi Dapur', spec: 'Dapur Modern & Minimalis', city: 'Bekasi', rating: 4.8, reviews: 52, jobs: 64, price: 2500000, priceUnit: '/proyek', status: 'pending' as const, verified: true, recommended: true, fastResponse: true, exp: '13 tahun', image: IMAGES.worker1, phone: '081234567897', warranty: '60 hari garansi', bookedDates: ['2026-05-20'], pendingDates: ['2026-05-18'], portfolio: [IMAGES.kitchenReno, IMAGES.kitchen] },
];

export const experts = [
  { id: 'e1', name: 'Anastasya Putrika, S.Ars', spec: 'Arsitek', subSpec: 'Modern Minimalis', rating: 4.9, reviews: 124, exp: '15 tahun', fee: 250000, feeUnit: '/sesi', verified: true, badge: 'Premium Ahli', image: IMAGES.expert2, phone: '081345678901', bio: 'Arsitek utama dengan spesialisasi desain modern minimalis dan sustainable architecture.', topics: ['Desain Rumah', 'Renovasi', 'Tata Ruang', 'IMB'], license: 'Lisensi IAI Aktif', schedule: ['Senin 09:00-17:00', 'Rabu 09:00-17:00', 'Jumat 09:00-12:00'] },
  { id: 'e2', name: 'Anastasya Putrika, S.Ars', spec: 'Interior Designer', subSpec: 'Luxury Residential', rating: 4.8, reviews: 89, exp: '8 tahun', fee: 200000, feeUnit: '/sesi', verified: true, badge: 'Rising Star', image: IMAGES.expert2, phone: '081345678902', bio: 'Desainer interior dengan fokus pada hunian mewah dan ruang fungsional.', topics: ['Interior', 'Furniture', 'Lighting', 'Material'], license: 'Lisensi HDII Aktif', schedule: ['Selasa 10:00-16:00', 'Kamis 10:00-16:00'] },
  { id: 'e3', name: 'Ir. Noor Mahfud Idova, S.T', spec: 'Civil Engineer', subSpec: 'Struktur & High Rise', rating: 5.0, reviews: 210, exp: '20 tahun', fee: 300000, feeUnit: '/sesi', verified: true, badge: 'Ekspertis', image: IMAGES.expert3, phone: '081345678903', bio: 'Ahli struktur berpengalaman dalam proyek high-rise dan infrastruktur.', topics: ['Struktur', 'Pondasi', 'Beton', 'Baja'], license: 'SKA Madya', schedule: ['Senin-Jumat 08:00-15:00'] },
  { id: 'e4', name: 'Thufail Abbad Bilfaj, S.T M.T', spec: 'Konsultan RAB', subSpec: 'Estimasi Biaya Konstruksi', rating: 4.7, reviews: 56, exp: '10 tahun', fee: 150000, feeUnit: '/sesi', verified: true, badge: 'Spesialis', image: IMAGES.expert1, phone: '081345678904', bio: 'Konsultan RAB dengan keahlian estimasi biaya proyek konstruksi dan renovasi.', topics: ['RAB', 'Anggaran', 'Material', 'Tender'], license: 'Sertifikasi QS', schedule: ['Senin-Sabtu 09:00-17:00'] },
];

export const stores = [
  { id: 's1', name: 'Mitra Bangunan Jaya', city: 'Surabaya', rating: 4.8, reviews: 234, categories: ['Semen', 'Pasir & Bata', 'Baja Ringan'], delivery: true, open: true, image: IMAGES.concrete, address: 'Jl. Raya Darmo No. 45, Surabaya' },
  { id: 's2', name: 'Sumber Material Abadi', city: 'Jakarta', rating: 4.7, reviews: 189, categories: ['Cat', 'Keramik', 'Sanitary'], delivery: true, open: true, image: IMAGES.paint, address: 'Jl. Gatot Subroto No. 12, Jakarta Selatan' },
  { id: 's3', name: 'Toko Bangunan Sentosa', city: 'Malang', rating: 4.6, reviews: 145, categories: ['Listrik', 'Plumbing', 'Alat Bangunan'], delivery: true, open: false, image: IMAGES.pipes, address: 'Jl. Soekarno Hatta No. 78, Malang' },
  { id: 's4', name: 'Prima Keramik & Sanitary', city: 'Bandung', rating: 4.9, reviews: 312, categories: ['Keramik', 'Sanitary', 'Pintu & Jendela'], delivery: true, open: true, image: IMAGES.glass, address: 'Jl. Pasteur No. 33, Bandung' },
];

export const products = [
  { id: 'p1', name: 'Semen Portland 50kg', category: 'Semen', price: 68000, unit: 'sak', stock: 500, storeId: 's1', storeName: 'Mitra Bangunan Jaya', image: IMAGES.concrete, spec: 'Tipe I, SNI certified', delivery: '1-2 hari' },
  { id: 'p2', name: 'Cat Interior Dulux 5kg', category: 'Cat', price: 145000, unit: 'kaleng', stock: 200, storeId: 's2', storeName: 'Sumber Material Abadi', image: IMAGES.paint, spec: 'Anti jamur, 300+ warna', delivery: '1-3 hari' },
  { id: 'p3', name: 'Keramik Lantai 40x40', category: 'Keramik', price: 85000, unit: 'dus', stock: 350, storeId: 's4', storeName: 'Prima Keramik & Sanitary', image: IMAGES.glass, spec: 'Grade A, motif marmer', delivery: '2-4 hari' },
  { id: 'p4', name: 'Pipa PVC 3 inch', category: 'Plumbing', price: 52000, unit: 'batang', stock: 400, storeId: 's3', storeName: 'Toko Bangunan Sentosa', image: IMAGES.pipes, spec: 'SNI, tebal 3mm', delivery: '1-2 hari' },
  { id: 'p5', name: 'Kabel NYM 2x1.5mm', category: 'Listrik', price: 12000, unit: 'meter', stock: 1000, storeId: 's3', storeName: 'Toko Bangunan Sentosa', image: IMAGES.electrical, spec: 'SNI, tembaga murni', delivery: '1-2 hari' },
  { id: 'p6', name: 'Kayu Jati Balok 6x12', category: 'Kayu', price: 185000, unit: 'batang', stock: 80, storeId: 's1', storeName: 'Mitra Bangunan Jaya', image: IMAGES.timber, spec: 'Grade A, kering oven', delivery: '3-5 hari' },
  { id: 'p7', name: 'Bata Merah Press', category: 'Pasir & Bata', price: 950, unit: 'buah', stock: 10000, storeId: 's1', storeName: 'Mitra Bangunan Jaya', image: IMAGES.concrete, spec: 'Ukuran standar, press', delivery: '1-2 hari' },
  { id: 'p8', name: 'Closet Duduk TOTO', category: 'Sanitary', price: 2850000, unit: 'unit', stock: 25, storeId: 's4', storeName: 'Prima Keramik & Sanitary', image: IMAGES.bathroom, spec: 'Dual flush, eco-water', delivery: '3-5 hari' },
];

export const categories = [
  { id: 'cat1', name: 'Perbaikan Listrik', icon: 'bolt' },
  { id: 'cat2', name: 'Plumbing / Saluran Air', icon: 'plumbing' },
  { id: 'cat3', name: 'Pengecatan Rumah', icon: 'format_paint' },
  { id: 'cat4', name: 'Perbaikan Atap', icon: 'roofing' },
  { id: 'cat5', name: 'Perbaikan Plafon', icon: 'layers' },
  { id: 'cat6', name: 'Pemasangan Keramik', icon: 'grid_view' },
  { id: 'cat7', name: 'Perbaikan Dinding', icon: 'wall' },
  { id: 'cat8', name: 'Renovasi Kamar Mandi', icon: 'bathtub' },
  { id: 'cat9', name: 'Renovasi Dapur', icon: 'countertops' },
  { id: 'cat10', name: 'Renovasi Kamar Tidur', icon: 'bed' },
  { id: 'cat11', name: 'Waterproofing', icon: 'water_drop' },
  { id: 'cat12', name: 'Pemasangan Kanopi', icon: 'garage_home' },
  { id: 'cat13', name: 'Pemasangan Pagar', icon: 'fence' },
  { id: 'cat14', name: 'Kusen & Pintu', icon: 'door_front' },
  { id: 'cat15', name: 'Taman & Lanskap', icon: 'deck' },
  { id: 'cat16', name: 'Perawatan Rumah Berkala', icon: 'home_repair_service' },
];

export const constructPackages = [
  { id: 'pkg1', name: 'Basic Build', team: ['Mandor', 'Tukang Bangunan', 'Pekerja Harian'], suitable: 'Renovasi kecil & perbaikan', price: 15000000, duration: '2-4 minggu', image: IMAGES.hero, phases: ['Konsultasi Awal', 'Survei Lokasi', 'Pengerjaan', 'Serah Terima'], included: ['Mandor berpengalaman', 'Tukang terverifikasi', 'Laporan harian'], excluded: ['Desain arsitektur', 'Material', 'Pengawas lapangan'], milestones: [{ name: 'DP', pct: 30 }, { name: 'Termin 1', pct: 40 }, { name: 'Pelunasan', pct: 30 }] },
  { id: 'pkg2', name: 'Standard Build', team: ['Mandor', 'Tukang Bangunan', 'Drafter', 'Pengawas Lapangan', 'Teknisi Listrik', 'Teknisi Plumbing'], suitable: 'Renovasi menengah & bangun parsial', price: 50000000, duration: '1-3 bulan', image: IMAGES.kitchen, phases: ['Konsultasi', 'Survei', 'Desain & Perencanaan', 'RAB', 'Pengerjaan', 'Monitoring', 'Serah Terima'], included: ['Tim lengkap', 'Drafter profesional', 'Pengawas harian', 'Laporan mingguan foto'], excluded: ['Arsitek berlisensi', 'Interior designer'], milestones: [{ name: 'DP', pct: 20 }, { name: 'Termin 1', pct: 30 }, { name: 'Termin 2', pct: 30 }, { name: 'Pelunasan', pct: 20 }] },
  { id: 'pkg3', name: 'Full Service Build', team: ['Arsitek', 'Civil Engineer', 'Interior Designer', 'Mandor', 'Tukang Bangunan', 'Teknisi Listrik', 'Teknisi Plumbing', 'Project Supervisor'], suitable: 'Bangun rumah baru & renovasi besar', price: 150000000, duration: '3-12 bulan', image: IMAGES.bathroom, phases: ['Konsultasi Awal', 'Survei Lokasi', 'Desain & Perencanaan', 'RAB & Penawaran', 'Perjanjian Digital', 'Konstruksi', 'Monitoring Progress', 'Serah Terima Final'], included: ['Arsitek berlisensi', 'Tim konstruksi lengkap', 'Desain 3D', 'RAB detail', 'Pengawasan harian', 'Garansi 1 tahun'], excluded: ['Biaya IMB', 'Biaya notaris'], milestones: [{ name: 'DP', pct: 15 }, { name: 'Termin 1', pct: 25 }, { name: 'Termin 2', pct: 25 }, { name: 'Termin 3', pct: 20 }, { name: 'Pelunasan', pct: 15 }] },
];

export const promoPackages = [
  { id: 'promo1', name: 'Paket Cat Rumah', services: ['Cat interior 2 lapis', 'Plamir dinding', 'Pembersihan'], price: 3500000, duration: '3-5 hari', discount: 15, warranty: '90 hari', image: IMAGES.paint },
  { id: 'promo2', name: 'Paket Renovasi Kamar Mandi', services: ['Bongkar keramik lama', 'Pasang keramik baru', 'Instalasi sanitasi', 'Waterproofing'], price: 12000000, duration: '7-10 hari', discount: 10, warranty: '6 bulan', image: IMAGES.bathReno },
  { id: 'promo3', name: 'Paket Renovasi Dapur', services: ['Kabinet dapur', 'Countertop', 'Instalasi kompor & sink', 'Keramik dinding'], price: 18000000, duration: '10-14 hari', discount: 12, warranty: '6 bulan', image: IMAGES.kitchenReno },
  { id: 'promo4', name: 'Paket Pasang Keramik', services: ['Bongkar lantai lama', 'Screed lantai', 'Pasang keramik/granit', 'Nat finishing'], price: 5500000, duration: '5-7 hari', discount: 8, warranty: '1 tahun', image: IMAGES.glass },
  { id: 'promo5', name: 'Paket Perbaikan Atap', services: ['Inspeksi rangka atap', 'Ganti genteng rusak', 'Perbaikan talang', 'Anti bocor'], price: 4500000, duration: '2-4 hari', discount: 10, warranty: '6 bulan', image: IMAGES.hero },
  { id: 'promo6', name: 'Paket Perawatan Rumah Bulanan', services: ['Cek listrik', 'Cek plumbing', 'Cek atap', 'Pembersihan saluran', 'Laporan kondisi'], price: 850000, duration: '1 hari/bulan', discount: 20, warranty: 'Selama berlangganan', image: IMAGES.electrical },
];

export const trackingProjects = [
  {
    id: 'proj1', name: 'Renovasi Kamar Mandi Utama', type: 'Renovasi', worker: 'Dimas Wijaya', location: 'Bandung', startDate: '2026-04-15', estCompletion: '2026-05-15', progress: 65, status: 'Dalam Pengerjaan', milestones: [
      { name: 'Survei Lokasi', status: 'done', date: '2026-04-15' },
      { name: 'Bongkar & Persiapan', status: 'done', date: '2026-04-18' },
      { name: 'Instalasi Pipa', status: 'done', date: '2026-04-25' },
      { name: 'Pasang Keramik', status: 'current', date: '2026-05-02', progress: 70 },
      { name: 'Finishing & Serah Terima', status: 'upcoming', date: '2026-05-12' },
    ], payments: [{ name: 'DP', amount: 4500000, status: 'Lunas' }, { name: 'Termin 1', amount: 4500000, status: 'Lunas' }, { name: 'Pelunasan', amount: 3000000, status: 'Belum' }], updates: [{ date: '2026-05-01', note: 'Pemasangan keramik lantai 70% selesai', image: IMAGES.bathReno }]
  },
];

export const emergencyCategories = [
  { id: 'em1', name: 'Listrik Bermasalah', icon: 'bolt', desc: 'Korsleting, mati listrik, percikan api' },
  { id: 'em2', name: 'Pipa Bocor', icon: 'plumbing', desc: 'Kebocoran pipa, banjir dalam rumah' },
  { id: 'em3', name: 'Atap Bocor', icon: 'roofing', desc: 'Bocor saat hujan, genteng pecah' },
  { id: 'em4', name: 'Saluran Mampet', icon: 'water_damage', desc: 'WC mampet, saluran tersumbat' },
  { id: 'em5', name: 'Pintu/Kunci Rusak', icon: 'door_front', desc: 'Kunci macet, pintu tidak bisa dibuka' },
  { id: 'em6', name: 'Pompa Air Bermasalah', icon: 'water_pump', desc: 'Pompa mati, air tidak keluar' },
];

export const emergencyTechnicians = [
  { id: 'et1', name: 'Dimas Hafif Maulana, S.T', category: 'Listrik', city: 'Jakarta', arrival: '30 menit', rating: 4.9, fee: 250000, available: true, image: IMAGES.worker1 },
  { id: 'et2', name: 'Jefran Andofian, S.T', category: 'Plumbing', city: 'Surabaya', arrival: '45 menit', rating: 4.8, fee: 200000, available: true, image: IMAGES.worker2 },
  { id: 'et3', name: 'Thufail Abbad Bilfaj, S.T M.T', category: 'Atap', city: 'Bandung', arrival: '60 menit', rating: 4.7, fee: 300000, available: true, image: IMAGES.expert1 },
];

export const reviews = [
  { id: 'r1', user: 'Ibu Sari Wulandari', rating: 5, text: 'Pekerjaan sangat rapi dan tepat waktu. Kamar mandi sekarang terlihat seperti baru!', date: '2026-04-20', workerId: 'w3' },
  { id: 'r2', user: 'Pak Andi Firmansyah', rating: 4, text: 'Tukang listrik yang sangat profesional. Instalasi bersih dan aman.', date: '2026-04-15', workerId: 'w2' },
  { id: 'r3', user: 'Bu Ratna Dewi', rating: 5, text: 'Renovasi dapur selesai lebih cepat dari jadwal. Sangat puas!', date: '2026-04-10', workerId: 'w8' },
  { id: 'r4', user: 'Pak Joko Susilo', rating: 5, text: 'Material berkualitas dan harga bersaing. Pengiriman cepat.', date: '2026-04-05', storeId: 's1' },
];

export const faqData = [
  {
    category: 'Booking', items: [
      { q: 'Bagaimana cara memesan jasa?', a: 'Pilih kategori layanan, pilih pekerja, tentukan tanggal dan lokasi, lalu konfirmasi booking. Pembayaran dilakukan setelah pekerjaan selesai.' },
      { q: 'Bisakah membatalkan booking?', a: 'Ya, pembatalan gratis hingga H-1. Pembatalan di hari H dikenakan biaya 50% dari estimasi.' },
    ]
  },
  {
    category: 'Pembayaran', items: [
      { q: 'Metode pembayaran apa saja?', a: 'Kami menerima Bank Transfer (BCA, BNI, Mandiri, BRI), QRIS, dan E-Wallet (GoPay, OVO, Dana).' },
      { q: 'Apakah pembayaran aman?', a: 'Ya, dana disimpan di escrow E-Builder dan baru dilepas setelah Anda menyetujui hasil pekerjaan.' },
    ]
  },
  {
    category: 'E-Renov', items: [
      { q: 'Apa itu garansi E-Renov?', a: 'Setiap pekerjaan memiliki garansi sesuai jenis layanan, mulai dari 14 hari hingga 1 tahun.' },
    ]
  },
  {
    category: 'Konsultasi', items: [
      { q: 'Bagaimana konsultasi dilakukan?', a: 'Konsultasi dilakukan via WhatsApp atau video call sesuai jadwal yang telah disepakati.' },
    ]
  },
];

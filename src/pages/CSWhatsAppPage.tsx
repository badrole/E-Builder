import { useState } from 'react';

const autoResponses: Record<string, string> = {
  'halo': 'Halo! Selamat datang di E-Builder Customer Service. Ada yang bisa kami bantu?',
  'booking': 'Untuk booking, silakan kunjungi halaman E-Renov atau pilih layanan yang diinginkan. Anda bisa booking langsung dari profil pekerja.',
  'pembayaran': 'Kami menerima pembayaran via Bank Transfer (BCA, BNI, Mandiri, BRI), QRIS, dan E-Wallet (GoPay, OVO, Dana). Dana disimpan aman di escrow.',
  'komplain': 'Mohon maaf atas ketidaknyamanan Anda. Silakan isi formulir komplain atau sampaikan detail masalah di sini.',
  'garansi': 'Setiap layanan memiliki garansi sesuai kategori, mulai dari 14 hari hingga 1 tahun. Detail garansi tertera di profil pekerja.',
};

export default function CSWhatsAppPage() {
  const [messages, setMessages] = useState([{ from: 'cs', text: 'Selamat datang di E-Builder Customer Service! 👋\nAda yang bisa kami bantu?' }]);
  const [input, setInput] = useState('');
  const quickReplies = ['Cara booking', 'Metode pembayaran', 'Garansi layanan', 'Ajukan komplain', 'Hubungi operator'];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text };
    const lower = text.toLowerCase();
    let response = 'Terima kasih atas pertanyaannya. Tim kami akan segera membantu. Untuk bantuan langsung, silakan klik tombol "Buka WhatsApp" di bawah.';
    for (const [key, val] of Object.entries(autoResponses)) { if (lower.includes(key)) { response = val; break; } }
    setMessages(m => [...m, userMsg, { from: 'cs', text: response }]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-h2 font-bold text-primary text-center">Customer Service</h1>
      <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-card flex flex-col" style={{ height: '70vh' }}>
        <div className="bg-green-600 text-white p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><span className="material-symbols-outlined">support_agent</span></div><div><h4 className="font-bold">E-Builder CS</h4><p className="text-xs text-green-100">Online</p></div></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ECE5DD]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm whitespace-pre-line ${m.from === 'user' ? 'bg-[#DCF8C6] rounded-br-md' : 'bg-white rounded-bl-md'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t bg-white space-y-2">
          <div className="flex flex-wrap gap-1">{quickReplies.map(q => <button key={q} onClick={() => sendMessage(q)} className="text-xs bg-surface-container hover:bg-primary-fixed text-primary px-3 py-1.5 rounded-full font-semibold">{q}</button>)}</div>
          <div className="flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage(input)} className="flex-1 px-4 py-2 border border-outline-variant rounded-full text-sm" placeholder="Ketik pesan..." /><button onClick={() => sendMessage(input)} className="bg-green-600 text-white p-2 rounded-full"><span className="material-symbols-outlined text-sm">send</span></button></div>
        </div>
      </div>
      <a href="https://wa.me/6285749780759?text=Halo, saya butuh bantuan dari E-Builder" target="_blank" rel="noreferrer" className="btn-cta w-full text-center block text-lg flex items-center justify-center gap-2"><span className="material-symbols-outlined">chat</span>Buka WhatsApp Asli</a>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChibiWorkerMascot({ open }: { open: boolean }) {
  if (open) {
    return <span className="material-symbols-outlined text-2xl">close</span>;
  }

  return (
    <span className="chibi-worker-fab" aria-hidden="true">
      <span className="chibi-worker-shadow" />
      <span className="chibi-worker-body">
        <span className="chibi-worker-head">
          <span className="chibi-worker-helmet">
            <span className="chibi-worker-helmet-ridge" />
          </span>
          <span className="chibi-worker-hair chibi-worker-hair-left" />
          <span className="chibi-worker-hair chibi-worker-hair-right" />
          <span className="chibi-worker-face">
            <span className="chibi-worker-eye chibi-worker-eye-left" />
            <span className="chibi-worker-eye chibi-worker-eye-right" />
            <span className="chibi-worker-smile" />
          </span>
        </span>
        <span className="chibi-worker-torso">
          <span className="chibi-worker-vest" />
          <span className="chibi-worker-shirt" />
          <span className="chibi-worker-arm chibi-worker-arm-left">
            <span className="chibi-worker-hand" />
          </span>
          <span className="chibi-worker-arm chibi-worker-arm-right">
            <span className="chibi-worker-hand" />
            <span className="chibi-worker-blueprint" />
          </span>
          <span className="chibi-worker-leg chibi-worker-leg-left" />
          <span className="chibi-worker-leg chibi-worker-leg-right" />
        </span>
      </span>
    </span>
  );
}

export default function ChatbotFAB() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Saya asisten E-Builder. Ada yang bisa dibantu?' }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Cari jasa renovasi', action: () => { navigate('/e-renov'); setOpen(false); } },
    { label: 'Hitung RAB', action: () => { navigate('/rab'); setOpen(false); } },
    { label: 'Hubungi CS WhatsApp', action: () => { navigate('/customer-service/whatsapp'); setOpen(false); } },
    { label: 'Konsultasi ahli', action: () => { navigate('/consultation'); setOpen(false); } },
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'user', text: input }, { from: 'bot', text: 'Terima kasih! Tim kami akan segera membantu Anda. Silakan hubungi CS kami untuk bantuan langsung.' }]);
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Tutup chatbot' : 'Buka chatbot'}
        className="chatbot-worker-button fixed bottom-20 right-4 sm:right-8 w-16 h-16 bg-cta-amber text-on-background rounded-full shadow-2xl flex items-center justify-center z-40 transition-transform md:bottom-8"
      >
        <ChibiWorkerMascot open={open} />
      </button>
      {open && (
        <div className="fixed bottom-36 right-4 sm:right-8 w-80 sm:w-96 bg-white rounded-2xl shadow-card-hover border border-outline-variant z-40 flex flex-col max-h-[500px] md:bottom-24">
          <div className="bg-royal-blue text-white p-4 rounded-t-2xl">
            <h4 className="font-bold">Asisten E-Builder</h4>
            <p className="text-xs text-blue-200">Online • Siap membantu</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.from === 'user' ? 'bg-royal-blue text-white rounded-br-md' : 'bg-surface-container text-on-surface rounded-bl-md'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-outline-variant space-y-2">
            <div className="flex flex-wrap gap-1">
              {quickActions.map(a => (
                <button key={a.label} onClick={a.action} className="text-xs bg-surface-container hover:bg-primary-fixed text-primary px-3 py-1.5 rounded-full font-semibold transition-all">{a.label}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} className="flex-1 px-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary" placeholder="Ketik pesan..." />
              <button onClick={sendMessage} className="bg-royal-blue text-white p-2 rounded-lg"><span className="material-symbols-outlined text-sm">send</span></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ChatMessage = {
  from: 'bot' | 'user';
  text: string;
};

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: 'bot', text: 'Halo! Saya E-Builder Assistant. Ada yang bisa saya bantu seputar layanan E-Builder?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Cari jasa renovasi', action: () => { navigate('/e-renov'); setOpen(false); } },
    { label: 'Hitung RAB', action: () => { navigate('/rab'); setOpen(false); } },
    { label: 'Hubungi CS WhatsApp', action: () => { navigate('/customer-service/whatsapp'); setOpen(false); } },
    { label: 'Konsultasi ahli', action: () => { navigate('/consultation'); setOpen(false); } },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setMessages(current => [...current, { from: 'user', text: trimmedInput }]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          history: messages,
        }),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : null;

      if (!response.ok || !data?.reply) {
        throw new Error(data?.error || 'Gagal menerima balasan dari E-Builder Assistant.');
      }

      setMessages(current => [...current, { from: 'bot', text: data.reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menerima balasan dari E-Builder Assistant.';
      setError(message);
      setMessages(current => [
        ...current,
        { from: 'bot', text: 'Maaf, layanan chatbot sedang mengalami kendala. Silakan coba lagi beberapa saat.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Tutup chatbot' : 'Buka chatbot'}
        className="chatbot-worker-button fixed bottom-20 right-4 sm:right-8 w-16 h-16 bg-cta-amber text-on-background rounded-full shadow-2xl flex items-center justify-center z-40 transition-transform hover:scale-105 md:bottom-8"
      >
        <ChibiWorkerMascot open={open} />
      </button>
      {open && (
        <div className="fixed inset-x-3 bottom-36 sm:inset-x-auto sm:right-8 sm:w-96 bg-white rounded-2xl shadow-card-hover border border-outline-variant z-40 flex flex-col max-h-[min(540px,calc(100vh-9rem))] md:bottom-24">
          <div className="bg-royal-blue text-white p-4 rounded-t-2xl">
            <h4 className="font-bold">E-Builder Assistant</h4>
            <p className="text-xs text-blue-100">Online - siap membantu layanan E-Builder</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.map((m, i) => (
              <div key={`${m.from}-${i}`} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${m.from === 'user' ? 'bg-royal-blue text-white rounded-br-md' : 'bg-surface-container text-on-surface rounded-bl-md'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-container text-on-surface rounded-2xl rounded-bl-md px-4 py-3 text-sm flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
                  <span>Mengetik jawaban...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-outline-variant space-y-2">
            <div className="flex flex-wrap gap-1">
              {quickActions.map(a => (
                <button
                  key={a.label}
                  type="button"
                  onClick={a.action}
                  className="text-xs bg-surface-container hover:bg-primary-fixed text-primary px-3 py-1.5 rounded-full font-semibold transition-all"
                >
                  {a.label}
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                className="min-w-0 flex-1 px-3 py-2 border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-surface-container"
                placeholder="Tanya layanan E-Builder..."
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-royal-blue text-white p-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Kirim pesan"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

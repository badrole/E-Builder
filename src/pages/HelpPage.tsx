import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqData } from '../data/mockData';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="text-center"><h1 className="text-h1 font-bold text-primary">Pusat Bantuan</h1><p className="text-on-surface-variant mt-2">Temukan jawaban atau hubungi kami.</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/customer-service/whatsapp" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md"><span className="material-symbols-outlined text-2xl text-green-600">chat</span><p className="text-xs font-bold mt-2">WhatsApp CS</p></Link>
        <a href="mailto:help@builder.id" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md"><span className="material-symbols-outlined text-2xl text-primary">mail</span><p className="text-xs font-bold mt-2">Email</p></a>
        <Link to="/help/complaint" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md"><span className="material-symbols-outlined text-2xl text-error">report_problem</span><p className="text-xs font-bold mt-2">Komplain</p></Link>
        <a href="tel:085749780759" className="bg-white rounded-2xl border border-outline-variant p-4 text-center hover:shadow-md"><span className="material-symbols-outlined text-2xl text-amber-600">call</span><p className="text-xs font-bold mt-2">Telepon</p></a>
      </div>
      {faqData.map(cat => (<section key={cat.category} className="bg-white rounded-2xl border border-outline-variant p-6 space-y-3">
        <h3 className="font-bold text-lg">{cat.category}</h3>
        {cat.items.map((faq, i) => {
          const key = `${cat.category}-${i}`;
          return (<div key={key} className="border-b border-outline-variant/30 last:border-0 pb-3">
            <button onClick={() => setOpenFaq(openFaq === key ? null : key)} className="w-full flex justify-between items-center py-2 text-left"><span className="font-semibold text-sm">{faq.q}</span><span className="material-symbols-outlined text-outline transition-transform" style={{transform: openFaq === key ? 'rotate(180deg)' : ''}}>expand_more</span></button>
            {openFaq === key && <p className="text-sm text-on-surface-variant mt-2">{faq.a}</p>}
          </div>);
        })}
      </section>))}
    </div>
  );
}

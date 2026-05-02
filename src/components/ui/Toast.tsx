import { useStore } from '../../store/useStore';

export default function Toast() {
  const { toastMessage, toastVisible } = useStore();
  if (!toastVisible) return null;
  return (
    <div className="fixed top-20 right-4 sm:right-8 z-[100] animate-slide-in">
      <div className="bg-royal-blue text-white px-6 py-3 rounded-xl shadow-card-hover flex items-center gap-3">
        <span className="material-symbols-outlined text-cta-amber">check_circle</span>
        <p className="text-sm font-semibold">{toastMessage}</p>
      </div>
    </div>
  );
}

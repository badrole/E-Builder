export function formatRupiah(amount: number): string {
  return 'Rp' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatRupiahShort(amount: number): string {
  if (amount >= 1_000_000_000) return `Rp${(amount / 1_000_000_000).toFixed(1)}M`;
  if (amount >= 1_000_000) return `Rp${(amount / 1_000_000).toFixed(0)}jt`;
  if (amount >= 1_000) return `Rp${(amount / 1_000).toFixed(0)}rb`;
  return `Rp${amount}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage save error:', e);
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function isDateBooked(date: Date, bookedDates: string[]): boolean {
  return bookedDates.includes(date.toISOString().split('T')[0]);
}

export function isDatePending(date: Date, pendingDates: string[]): boolean {
  return pendingDates.includes(date.toISOString().split('T')[0]);
}

export function isDatePast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
}

export function getSearchRoute(query: string): string {
  const q = query.toLowerCase();
  if (/renov|cat|listrik|pipa|atap|keramik/.test(q)) return '/e-renov';
  if (/bangun|construct|arsitek|mandor/.test(q)) return '/e-construct';
  if (/semen|cat|keramik|pipa|kabel|material/.test(q)) return '/materials';
  if (/rab|estimasi|biaya/.test(q)) return '/rab';
  if (/konsultasi|ahli|arsitek|interior/.test(q)) return '/consultation';
  return '/e-renov';
}

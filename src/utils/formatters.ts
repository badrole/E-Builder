export function formatIDR(value: number | string | null | undefined): string {
  const amount = Number(value || 0);
  return 'Rp' + Math.max(0, amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[\s\-+]/g, '').replace(/\D/g, '');
  if (cleaned.startsWith('08')) return '62' + cleaned.slice(1);
  if (cleaned.startsWith('8')) return '62' + cleaned;
  return cleaned;
}

export function openWhatsApp(phone: string, message: string): void {
  const number = formatWhatsAppNumber(phone);
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export function isValidIndonesianWhatsApp(phone: string): boolean {
  return /^62[0-9]{8,14}$/.test(formatWhatsAppNumber(phone));
}

export function formatIndonesianDate(value: string | null | undefined): string {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}


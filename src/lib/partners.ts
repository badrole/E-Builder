import { supabase } from './supabase';
import { IMAGES } from '../data/images';

export type PartnerType = 'Worker' | 'Contractor' | 'Expert' | 'Material Store';
export type PartnerStatus = 'active' | 'pending' | 'inactive';

export interface SupabasePartner {
  id: string;
  name: string;
  type: PartnerType;
  category: string;
  city: string;
  service_area: string | null;
  whatsapp_number: string;
  price_from: number;
  rating: number;
  experience: string | null;
  description: string | null;
  image_url: string | null;
  status: PartnerStatus;
  created_at: string;
}

export interface SupabaseBooking {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_type: string;
  partner_id: string;
  booking_date: string;
  address: string;
  notes: string | null;
  status: string;
  created_at: string;
}

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

export async function fetchPartners(type?: PartnerType, status?: PartnerStatus) {
  if (!hasSupabaseConfig()) return [] as SupabasePartner[];
  let query = supabase.from('partners').select('*').order('created_at', { ascending: false });
  if (type) query = query.eq('type', type);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as SupabasePartner[];
}

export async function fetchPartnerById(id: string) {
  if (!hasSupabaseConfig()) return null;
  const { data, error } = await supabase.from('partners').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as SupabasePartner | null;
}

export async function fetchBookings() {
  if (!hasSupabaseConfig()) return [] as SupabaseBooking[];
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as SupabaseBooking[];
}

export async function insertBooking(payload: Omit<SupabaseBooking, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('bookings').insert(payload).select('*').single();
  if (error) throw error;
  return data as SupabaseBooking;
}

export function mapPartnerToWorker(partner: SupabasePartner) {
  return {
    id: partner.id,
    supabaseId: partner.id,
    name: partner.name,
    category: partner.category,
    spec: partner.category,
    city: partner.city,
    rating: Number(partner.rating || 0),
    reviews: 0,
    jobs: 0,
    price: Number(partner.price_from || 0),
    priceUnit: '/mulai',
    status: 'idle' as const,
    verified: true,
    recommended: false,
    fastResponse: true,
    exp: partner.experience || '-',
    image: partner.image_url || IMAGES.worker1,
    phone: partner.whatsapp_number,
    whatsappNumber: partner.whatsapp_number,
    warranty: 'Garansi sesuai kesepakatan',
    bookedDates: [],
    pendingDates: [],
    portfolio: [partner.image_url || IMAGES.bathroom],
    description: partner.description || '',
  };
}

export function mapPartnerToExpert(partner: SupabasePartner) {
  return {
    id: partner.id,
    supabaseId: partner.id,
    name: partner.name,
    spec: partner.category,
    subSpec: partner.service_area || partner.category,
    rating: Number(partner.rating || 0),
    reviews: 0,
    exp: partner.experience || '-',
    fee: Number(partner.price_from || 0),
    feeUnit: '/sesi',
    verified: true,
    badge: 'Ahli',
    image: partner.image_url || IMAGES.expert2,
    phone: partner.whatsapp_number,
    whatsappNumber: partner.whatsapp_number,
    bio: partner.description || 'Ahli E-Builder terverifikasi.',
    topics: [partner.category],
    license: 'Terverifikasi E-Builder',
    schedule: ['Senin-Jumat 09:00-17:00'],
  };
}

export function mapPartnerToStore(partner: SupabasePartner) {
  return {
    id: partner.id,
    supabaseId: partner.id,
    name: partner.name,
    city: partner.city,
    rating: Number(partner.rating || 0),
    reviews: 0,
    categories: [partner.category],
    delivery: true,
    open: true,
    image: partner.image_url || IMAGES.concrete,
    address: partner.service_area || partner.city,
    whatsappNumber: partner.whatsapp_number,
  };
}

export function mapPartnerToConstructPackage(partner: SupabasePartner) {
  return {
    id: partner.id,
    supabaseId: partner.id,
    name: partner.name,
    team: [partner.category],
    suitable: partner.description || partner.service_area || 'Layanan konstruksi dari mitra E-Builder.',
    price: Number(partner.price_from || 0),
    duration: partner.experience || 'Sesuai kebutuhan proyek',
    image: partner.image_url || IMAGES.hero,
    phases: ['Konsultasi', 'Survei', 'Pengerjaan', 'Serah Terima'],
    included: ['Mitra terverifikasi', 'Konsultasi awal', 'Koordinasi proyek'],
    excluded: ['Material tambahan', 'Biaya perizinan'],
    milestones: [{ name: 'DP', pct: 30 }, { name: 'Pelunasan', pct: 70 }],
    whatsappNumber: partner.whatsapp_number,
  };
}

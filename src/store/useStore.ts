import { create } from 'zustand';
import { getFromStorage, setToStorage, generateId } from '../utils/helpers';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  storeName: string;
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  category: string;
  date: string;
  time: string;
  address: string;
  details: string;
  estimatedPrice: number;
  paymentMethod: string;
  status: 'Menunggu Konfirmasi' | 'Dikonfirmasi' | 'Dalam Pengerjaan' | 'Selesai' | 'Dibatalkan';
  createdAt: string;
}

export interface ConsultationBooking {
  id: string;
  expertId: string;
  expertName: string;
  topic: string;
  date: string;
  time: string;
  description: string;
  phone: string;
  paymentMethod: string;
  fee: number;
  status: 'Menunggu Pembayaran' | 'Dibayar' | 'Selesai';
  createdAt: string;
}

export interface SavedProject {
  id: string;
  name: string;
  type: string;
  category: string;
  area: number;
  quality: string;
  totalEstimate: number;
  items: any[];
  createdAt: string;
}

export interface Complaint {
  id: string;
  orderId: string;
  category: string;
  description: string;
  contactNumber: string;
  status: 'Diproses' | 'Selesai';
  createdAt: string;
}

export interface UserState {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  userType: 'customer' | 'partner';
  cart: CartItem[];
  favorites: { workers: string[]; experts: string[]; stores: string[]; products: string[] };
  bookings: Booking[];
  consultations: ConsultationBooking[];
  savedProjects: SavedProject[];
  complaints: Complaint[];
  materialOrders: any[];
  surveyRequests: any[];
  emergencyRequests: any[];
  notifications: { id: string; message: string; read: boolean; date: string }[];
  partnerJobs: any[];
}

interface AppStore extends UserState {
  login: (name: string, email: string, type: 'customer' | 'partner') => void;
  logout: () => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (type: 'workers' | 'experts' | 'stores' | 'products', id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  addConsultation: (consultation: Omit<ConsultationBooking, 'id' | 'createdAt'>) => void;
  updateConsultationStatus: (id: string, status: ConsultationBooking['status']) => void;
  saveProject: (project: Omit<SavedProject, 'id' | 'createdAt'>) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => void;
  addMaterialOrder: (order: any) => void;
  addSurveyRequest: (survey: any) => void;
  addEmergencyRequest: (emergency: any) => void;
  acceptPartnerJob: (jobId: string) => void;
  rejectPartnerJob: (jobId: string) => void;
  showToast: (message: string) => void;
  toastMessage: string;
  toastVisible: boolean;
  hideToast: () => void;
}

const initialState: UserState = {
  isLoggedIn: getFromStorage('eb_loggedIn', false),
  userName: getFromStorage('eb_userName', ''),
  userEmail: getFromStorage('eb_userEmail', ''),
  userType: getFromStorage('eb_userType', 'customer'),
  cart: getFromStorage('eb_cart', []),
  favorites: getFromStorage('eb_favorites', { workers: [], experts: [], stores: [], products: [] }),
  bookings: getFromStorage('eb_bookings', []),
  consultations: getFromStorage('eb_consultations', []),
  savedProjects: getFromStorage('eb_savedProjects', []),
  complaints: getFromStorage('eb_complaints', []),
  materialOrders: getFromStorage('eb_materialOrders', []),
  surveyRequests: getFromStorage('eb_surveyRequests', []),
  emergencyRequests: getFromStorage('eb_emergencyRequests', []),
  notifications: getFromStorage('eb_notifications', []),
  partnerJobs: getFromStorage('eb_partnerJobs', []),
};

export const useStore = create<AppStore>((set, get) => ({
  ...initialState,
  toastMessage: '',
  toastVisible: false,

  showToast: (message) => {
    set({ toastMessage: message, toastVisible: true });
    setTimeout(() => set({ toastVisible: false }), 3000);
  },
  hideToast: () => set({ toastVisible: false }),

  login: (name, email, type) => {
    set({ isLoggedIn: true, userName: name, userEmail: email, userType: type });
    setToStorage('eb_loggedIn', true);
    setToStorage('eb_userName', name);
    setToStorage('eb_userEmail', email);
    setToStorage('eb_userType', type);
  },

  logout: () => {
    set({ isLoggedIn: false, userName: '', userEmail: '', userType: 'customer' });
    setToStorage('eb_loggedIn', false);
    setToStorage('eb_userName', '');
    setToStorage('eb_userEmail', '');
  },

  addToCart: (item) => {
    const cart = get().cart;
    const existing = cart.find(c => c.productId === item.productId);
    let newCart: CartItem[];
    if (existing) {
      newCart = cart.map(c => c.productId === item.productId ? { ...c, quantity: c.quantity + item.quantity } : c);
    } else {
      newCart = [...cart, { ...item, id: generateId() }];
    }
    set({ cart: newCart });
    setToStorage('eb_cart', newCart);
    get().showToast('Produk ditambahkan ke keranjang!');
  },

  removeFromCart: (id) => {
    const newCart = get().cart.filter(c => c.id !== id);
    set({ cart: newCart });
    setToStorage('eb_cart', newCart);
  },

  updateCartQuantity: (id, quantity) => {
    const newCart = get().cart.map(c => c.id === id ? { ...c, quantity: Math.max(1, quantity) } : c);
    set({ cart: newCart });
    setToStorage('eb_cart', newCart);
  },

  clearCart: () => {
    set({ cart: [] });
    setToStorage('eb_cart', []);
  },

  toggleFavorite: (type, id) => {
    const favorites = { ...get().favorites };
    const list = favorites[type];
    if (list.includes(id)) {
      favorites[type] = list.filter(i => i !== id);
      get().showToast('Dihapus dari favorit');
    } else {
      favorites[type] = [...list, id];
      get().showToast('Ditambahkan ke favorit!');
    }
    set({ favorites });
    setToStorage('eb_favorites', favorites);
  },

  addBooking: (booking) => {
    const newBooking: Booking = { ...booking, id: generateId(), createdAt: new Date().toISOString() };
    const bookings = [...get().bookings, newBooking];
    set({ bookings });
    setToStorage('eb_bookings', bookings);
    get().showToast('Booking berhasil dibuat!');
  },

  addConsultation: (consultation) => {
    const newConsultation: ConsultationBooking = { ...consultation, id: generateId(), createdAt: new Date().toISOString() };
    const consultations = [...get().consultations, newConsultation];
    set({ consultations });
    setToStorage('eb_consultations', consultations);
  },

  updateConsultationStatus: (id, status) => {
    const consultations = get().consultations.map(c => c.id === id ? { ...c, status } : c);
    set({ consultations });
    setToStorage('eb_consultations', consultations);
  },

  saveProject: (project) => {
    const newProject: SavedProject = { ...project, id: generateId(), createdAt: new Date().toISOString() };
    const savedProjects = [...get().savedProjects, newProject];
    set({ savedProjects });
    setToStorage('eb_savedProjects', savedProjects);
    get().showToast('Proyek berhasil disimpan!');
  },

  addComplaint: (complaint) => {
    const newComplaint: Complaint = { ...complaint, id: generateId(), createdAt: new Date().toISOString(), status: 'Diproses' };
    const complaints = [...get().complaints, newComplaint];
    set({ complaints });
    setToStorage('eb_complaints', complaints);
    get().showToast('Komplain berhasil dikirim!');
  },

  addMaterialOrder: (order) => {
    const materialOrders = [...get().materialOrders, { ...order, id: generateId(), createdAt: new Date().toISOString(), status: 'Menunggu Pembayaran' }];
    set({ materialOrders });
    setToStorage('eb_materialOrders', materialOrders);
  },

  addSurveyRequest: (survey) => {
    const surveyRequests = [...get().surveyRequests, { ...survey, id: generateId(), createdAt: new Date().toISOString() }];
    set({ surveyRequests });
    setToStorage('eb_surveyRequests', surveyRequests);
    get().showToast('Permintaan survei berhasil dikirim!');
  },

  addEmergencyRequest: (emergency) => {
    const emergencyRequests = [...get().emergencyRequests, { ...emergency, id: generateId(), createdAt: new Date().toISOString(), status: 'Menunggu Teknisi' }];
    set({ emergencyRequests });
    setToStorage('eb_emergencyRequests', emergencyRequests);
    get().showToast('Permintaan darurat berhasil dikirim!');
  },

  acceptPartnerJob: (jobId) => {
    const partnerJobs = get().partnerJobs.map((j: any) => j.id === jobId ? { ...j, status: 'accepted' } : j);
    set({ partnerJobs });
    setToStorage('eb_partnerJobs', partnerJobs);
    get().showToast('Pekerjaan diterima!');
  },

  rejectPartnerJob: (jobId) => {
    const partnerJobs = get().partnerJobs.map((j: any) => j.id === jobId ? { ...j, status: 'rejected' } : j);
    set({ partnerJobs });
    setToStorage('eb_partnerJobs', partnerJobs);
    get().showToast('Pekerjaan ditolak');
  },
}));

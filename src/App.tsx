import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import ChatbotFAB from './components/layout/ChatbotFAB';
import Toast from './components/ui/Toast';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/HomePage'));
const ERenov = lazy(() => import('./pages/ERenovPage'));
const CategoryWorkers = lazy(() => import('./pages/CategoryWorkersPage'));
const WorkerDetail = lazy(() => import('./pages/WorkerDetailPage'));
const Booking = lazy(() => import('./pages/BookingPage'));
const EConstruct = lazy(() => import('./pages/EConstructPage'));
const PackageDetail = lazy(() => import('./pages/PackageDetailPage'));
const Survey = lazy(() => import('./pages/SurveyPage'));
const Materials = lazy(() => import('./pages/MaterialsPage'));
const StoreDetail = lazy(() => import('./pages/StoreDetailPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetailPage'));
const Cart = lazy(() => import('./pages/CartPage'));
const Checkout = lazy(() => import('./pages/CheckoutPage'));
const RAB = lazy(() => import('./pages/RABPage'));
const Consultation = lazy(() => import('./pages/ConsultationPage'));
const ExpertDetail = lazy(() => import('./pages/ExpertDetailPage'));
const ConsultationBook = lazy(() => import('./pages/ConsultationBookPage'));
const ConsultationPayment = lazy(() => import('./pages/ConsultationPaymentPage'));
const WhatsAppAccess = lazy(() => import('./pages/WhatsAppAccessPage'));
const Tracking = lazy(() => import('./pages/TrackingPage'));
const TrackingDetail = lazy(() => import('./pages/TrackingDetailPage'));
const Emergency = lazy(() => import('./pages/EmergencyPage'));
const Promotions = lazy(() => import('./pages/PromotionsPage'));
const Dashboard = lazy(() => import('./pages/dashboard/DashboardPage'));
const PartnerDashboard = lazy(() => import('./pages/PartnerDashboardPage'));
const Help = lazy(() => import('./pages/HelpPage'));
const Complaint = lazy(() => import('./pages/ComplaintPage'));
const CSWhatsApp = lazy(() => import('./pages/CSWhatsAppPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const BecomePartner = lazy(() => import('./pages/BecomePartnerPage'));
const About = lazy(() => import('./pages/AboutPage'));
const Contact = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));

function Loading() {
  return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-12 h-12 border-4 border-primary-fixed border-t-royal-blue rounded-full animate-spin"></div></div>;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col blueprint-bg">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/e-renov" element={<ERenov />} />
            <Route path="/e-renov/category/:id" element={<CategoryWorkers />} />
            <Route path="/worker/:id" element={<WorkerDetail />} />
            <Route path="/booking/:workerId" element={<Booking />} />
            <Route path="/e-construct" element={<EConstruct />} />
            <Route path="/e-construct/package/:id" element={<PackageDetail />} />
            <Route path="/e-construct/survey" element={<Survey />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/materials/store/:id" element={<StoreDetail />} />
            <Route path="/materials/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/rab" element={<RAB />} />
            <Route path="/rab/result" element={<RAB />} />
            <Route path="/rab/templates" element={<RAB />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/consultation/expert/:id" element={<ExpertDetail />} />
            <Route path="/consultation/book/:id" element={<ConsultationBook />} />
            <Route path="/consultation/payment" element={<ConsultationPayment />} />
            <Route path="/consultation/wa" element={<WhatsAppAccess />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/tracking/:projectId" element={<TrackingDetail />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
            <Route path="/help" element={<Help />} />
            <Route path="/help/complaint" element={<Complaint />} />
            <Route path="/customer-service" element={<CSWhatsApp />} />
            <Route path="/customer-service/whatsapp" element={<CSWhatsApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/become-partner" element={<BecomePartner />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
      <ChatbotFAB />
      <Toast />
    </div>
  );
}

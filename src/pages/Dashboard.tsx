import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ShoppingBag, Briefcase, Settings,
  Plus, Pencil, Trash2, Users, DollarSign, Package,
  LogOut, Bell, Search, Save, Home, X, GraduationCap,
  Calculator, FileText, Printer, Eye, ArrowLeft, Receipt,
  TrendingUp, AlertCircle, Lock, User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

type InvoiceType = 'إيرادات' | 'مصروفات' | 'إيرادات غير منظوره';
type PaymentType = 'نقدى' | 'كاش' | 'انسته';
type InvoiceStatus = 'مدفوع' | 'معلق' | 'ملغى';

interface Invoice {
  id: string; invoiceNumber: string; invoiceName: string; date: string;
  invoiceType: InvoiceType; paymentType: PaymentType; invoiceValue: number;
  expensesValue?: number; expensesDesc?: string; discountPercent?: number;
  discountReason?: string; party?: string; valueAfterDiscount?: number;
  total: number; signature?: string; status: InvoiceStatus; createdAt: string;
}
interface Course { id: string; title: string; instructor: string; category: string; level: string; price: number; students: number; status: 'active' | 'draft'; }
interface Product { id: string; name: string; category: string; price: number; stock: number; status: 'active' | 'out'; }
interface Service { id: string; title: string; description: string; features: string[]; status: 'active' | 'draft'; }

const seedCourses: Course[] = [
  { id: '1', title: 'Full Stack Development مع React و Node.js', instructor: 'سامح العدولي', category: 'Full Stack', level: 'متقدم', price: 2999, students: 3200, status: 'active' },
  { id: '2', title: 'الذكاء الاصطناعي وتعلم الآلة مع Python', instructor: 'محمد طلال', category: 'الذكاء الاصطناعي', level: 'متوسط', price: 2499, students: 1890, status: 'active' },
  { id: '3', title: 'دورة الشبكات الاحترافية - CCNA Complete', instructor: 'م. أحمد الخالدي', category: 'الشبكات', level: 'مبتدئ', price: 1999, students: 2450, status: 'draft' },
];
const seedProducts: Product[] = [
  { id: '1', name: 'لابتوب Dell XPS 15', category: 'لابتوبات', price: 45999, stock: 12, status: 'active' },
  { id: '2', name: 'ماوس Logitech MX Master 3', category: 'إكسسوارات', price: 2799, stock: 45, status: 'active' },
  { id: '3', name: 'لابتوب MacBook Pro M3', category: 'لابتوبات', price: 62999, stock: 0, status: 'out' },
];
const seedServices: Service[] = [
  { id: '1', title: 'حلول الذكاء الاصطناعي', description: 'نطور حلول ذكاء اصطناعي مخصصة', features: ['تحليل البيانات', 'أنظمة التوصيات', 'معالجة اللغة'], status: 'active' },
  { id: '2', title: 'تصميم وتطوير المواقع', description: 'نصمم مواقع عصرية وسريعة', features: ['تصميم UI/UX', 'تطوير Full Stack', 'SEO'], status: 'active' },
];
const seedInvoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-001', invoiceName: 'اشتراك كورس Full Stack', date: '2025-01-15', invoiceType: 'إيرادات', paymentType: 'كاش', invoiceValue: 2999, total: 2999, status: 'مدفوع', createdAt: '2025-01-15' },
  { id: '2', invoiceNumber: 'INV-002', invoiceName: 'فاتورة استضافة خوادم', date: '2025-01-18', invoiceType: 'مصروفات', paymentType: 'نقدى', invoiceValue: 1500, expensesValue: 1500, expensesDesc: 'استضافة شهرية', total: 1500, status: 'مدفوع', createdAt: '2025-01-18' },
  { id: '3', invoiceNumber: 'INV-003', invoiceName: 'خدمة تطوير موقع', date: '2025-01-20', invoiceType: 'إيرادات غير منظوره', paymentType: 'انسته', invoiceValue: 8000, discountPercent: 10, discountReason: 'خصم عميل مميز', party: 'شركة الأهرام', valueAfterDiscount: 7200, total: 7200, status: 'معلق', createdAt: '2025-01-20' },
];

// ── Admin Login ────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (username === 'admin' && password === 'admin123') { onLogin(); }
    else { setError('اسم المستخدم أو كلمة المرور غير صحيحة'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden p-4" dir="rtl">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="relative w-full max-w-md">
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in">
          <div className="bg-gradient-primary px-8 pt-10 pb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-glow">
                <img src={logo} alt="EXMPEX" className="h-12 w-auto brightness-0 invert" />
              </div>
              <h1 className="text-xl font-bold text-white mb-1">لوحة تحكم المدير</h1>
              <p className="text-white/70 text-sm">EXMPEX Academy Admin</p>
            </div>
          </div>
          <div className="px-8 py-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground text-sm">تسجيل دخول آمن</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="أدخل اسم المستخدم" className="h-11 pr-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-11 pr-10 pl-12" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition-colors">{showPass ? 'إخفاء' : 'إظهار'}</button>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />{error}
                </div>
              )}
              <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white shadow-glow text-base font-semibold">
                {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />جاري التحقق...</span> : 'دخول لوحة التحكم'}
              </Button>
            </form>
            <div className="mt-5 p-3 rounded-xl bg-muted/50 border border-border/50 text-center">
              <p className="text-xs text-muted-foreground mb-2">بيانات الدخول التجريبية</p>
              <div className="flex justify-center gap-4 text-xs">
                <span>المستخدم: <code className="bg-background px-1.5 py-0.5 rounded font-mono">admin</code></span>
                <span>كلمة المرور: <code className="bg-background px-1.5 py-0.5 rounded font-mono">admin123</code></span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-white/40 text-sm hover:text-white/70 transition-colors flex items-center justify-center gap-1"><ArrowLeft className="h-3 w-3" />العودة للموقع</Link>
        </div>
      </div>
    </div>
  );
}

// ── Modal Wrapper ──────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className={cn('bg-card border border-border/50 rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] flex flex-col', wide ? 'w-full max-w-2xl' : 'w-full max-w-lg')} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/50 shrink-0">
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ── Invoice Print Component ────────────────────────────────────────────
function InvoicePrintView({ invoice }: { invoice: Invoice }) {
  return (
    <div style={{ fontFamily: "'Cairo', sans-serif", direction: 'rtl', maxWidth: '750px', margin: '0 auto', border: '3px solid #1a3a6b', background: 'white', color: '#333' }}>
      {/* Top toolbar */}
      <div style={{ background: '#1a3a6b', padding: '6px 10px', display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
        {['قفل البرنامج', 'الادخال', 'حفظ البيانات', 'طباعة شاشة الادخال', 'التقارير'].map((b, i) => (
          <span key={i} style={{ background: '#f5e642', color: '#1a3a6b', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '2px' }}>{b}</span>
        ))}
      </div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '2px solid #1a3a6b', gap: '12px' }}>
        <div style={{ width: '65px', height: '65px', border: '2px solid #1a3a6b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff', flexShrink: 0 }}>
          <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#1a3a6b', textAlign: 'center', lineHeight: '1.3' }}>MALO TAS EMEX</span>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#c0392b' }}>شركة مالوتاس إمبكس</div>
          <div style={{ fontSize: '11px', color: '#c0392b' }}>للاستثمار والتسويق السياحى</div>
          <div style={{ fontSize: '10px', color: '#1a3a6b' }}>(احدى شركات هيئة الاستثمار)</div>
        </div>
      </div>
      {/* INVOICE */}
      <div style={{ textAlign: 'center', background: '#f5e642', margin: '10px 16px', padding: '7px', fontSize: '20px', fontWeight: '900', letterSpacing: '6px', border: '2px solid #1a3a6b', borderRadius: '4px', color: '#1a3a6b' }}>
        فاتـــــــورة
      </div>
      {/* Invoice Type */}
      <div style={{ padding: '4px 16px 8px' }}>
        <div style={{ background: '#1a3a6b', color: 'white', display: 'inline-block', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px', marginBottom: '6px' }}>نوع الفاتورة</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {(['إيرادات', 'مصروفات', 'إيرادات غير منظروه'] as const).map(t => (
            <span key={t} style={{ padding: '3px 12px', border: `2px solid ${invoice.invoiceType === t ? '#1a3a6b' : '#bbb'}`, background: invoice.invoiceType === t ? '#1a3a6b' : 'white', color: invoice.invoiceType === t ? 'white' : '#666', fontSize: '11px', fontWeight: 'bold', borderRadius: '12px' }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ height: '2px', background: '#1a3a6b', margin: '0 16px 6px' }} />
      {/* Data Table */}
      <div style={{ padding: '0 16px 6px' }}>
        <div style={{ background: '#1a3a6b', color: 'white', display: 'inline-block', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px', marginBottom: '6px' }}>بيانات الفاتورة</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', width: '110px', border: '1px solid #ccc' }}>رقم الفاتورة</td>
              <td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc', fontWeight: 'bold' }}>{invoice.invoiceNumber}</td>
              <td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', width: '90px', border: '1px solid #ccc' }}>اسم الفاتورة</td>
              <td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc' }}>{invoice.invoiceName}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>التاريخ</td>
              <td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc' }}>{invoice.date}</td>
              <td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>قيمة الفاتورة</td>
              <td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc', fontWeight: 'bold' }}>{invoice.invoiceValue.toLocaleString()} ج.م</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Payment */}
      <div style={{ padding: '4px 16px 6px' }}>
        <div style={{ background: '#1a3a6b', color: 'white', display: 'inline-block', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px', marginBottom: '6px' }}>نوع سداد الفاتورة</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {(['نقدى', 'كاش', 'انسته'] as PaymentType[]).map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '13px', height: '13px', border: '2px solid #1a3a6b', borderRadius: '50%', background: invoice.paymentType === t ? '#1a3a6b' : 'white' }} />
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#1a3a6b' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: '2px', background: '#1a3a6b', margin: '0 16px 6px' }} />
      {/* Expenses */}
      {invoice.invoiceType === 'مصروفات' && (
        <div style={{ padding: '4px 16px 6px' }}>
          <div style={{ background: '#1a3a6b', color: 'white', display: 'inline-block', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px', marginBottom: '6px' }}>المصروفات</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
              <tr><td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc', width: '120px' }}>قيمة المصروفات</td><td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc', fontWeight: 'bold' }}>{invoice.expensesValue?.toLocaleString()} ج.م</td></tr>
              <tr><td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>المصروفات</td><td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc', minHeight: '28px' }}>{invoice.expensesDesc}</td></tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Hidden Revenue */}
      {invoice.invoiceType === 'إيرادات غير منظوره' && (
        <div style={{ padding: '4px 16px 6px' }}>
          <div style={{ background: '#1a3a6b', color: 'white', display: 'inline-block', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px', marginBottom: '6px' }}>الإرادات الغير منظور</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc', width: '140px' }}>قيمة الفاتورة</td>
                <td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc' }}>{invoice.invoiceValue.toLocaleString()} ج.م</td>
                <td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc', width: '100px' }}>قيمة التخفيض %</td>
                <td style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc' }}>{invoice.discountPercent}%</td>
              </tr>
              <tr><td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>سبب التخفيض</td><td colSpan={3} style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc' }}>{invoice.discountReason}</td></tr>
              <tr><td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>الجهة</td><td colSpan={3} style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc' }}>{invoice.party}</td></tr>
              <tr><td style={{ padding: '4px 6px', background: '#1a3a6b', color: 'white', fontWeight: 'bold', border: '1px solid #ccc' }}>قيمة الفاتورة بعد التخفيض</td><td colSpan={3} style={{ padding: '4px 6px', background: '#dde8ff', border: '1px solid #ccc', fontWeight: 'bold', fontSize: '13px' }}>{invoice.valueAfterDiscount?.toLocaleString()} ج.م</td></tr>
            </tbody>
          </table>
        </div>
      )}
      <div style={{ height: '2px', background: '#1a3a6b', margin: '0 16px 6px' }} />
      {/* Total */}
      <div style={{ margin: '6px 16px', background: '#f5e642', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px', border: '1px solid #1a3a6b' }}>
        <span style={{ fontSize: '15px', fontWeight: '900', color: '#1a3a6b', letterSpacing: '2px' }}>اجمـالى الفاتـورة</span>
        <span style={{ fontSize: '20px', fontWeight: '900', color: '#c0392b' }}>{invoice.total.toLocaleString()} ج.م</span>
      </div>
      {/* Signature */}
      <div style={{ padding: '10px 16px 14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', borderTop: '1px solid #ddd', marginTop: '6px' }}>
        <span style={{ background: '#dde8ff', border: '1px solid #1a3a6b', padding: '3px 10px', fontSize: '11px', fontWeight: 'bold', borderRadius: '3px' }}>التوقيع</span>
        <div style={{ width: '180px', height: '36px', border: '1px solid #bbb', background: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '11px', color: '#555' }}>{invoice.signature}</div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────
const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>(seedCourses);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [services, setServices] = useState<Service[]>(seedServices);
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<string | null>(null);
  const [editing, setEditing] = useState<any>(null);
  const [printInvoice, setPrintInvoice] = useState<Invoice | null>(null);

  const [invForm, setInvForm] = useState({ invoiceNumber: '', invoiceName: '', date: new Date().toISOString().split('T')[0], invoiceType: 'إيرادات' as InvoiceType, paymentType: 'نقدى' as PaymentType, invoiceValue: '', expensesValue: '', expensesDesc: '', discountPercent: '', discountReason: '', party: '', signature: '', status: 'مدفوع' as InvoiceStatus });
  const [cForm, setCForm] = useState({ title: '', instructor: '', category: 'Full Stack', level: 'مبتدئ', price: '', status: 'draft' });
  const [pForm, setPForm] = useState({ name: '', category: 'لابتوبات', price: '', stock: '', status: 'active' });
  const [sForm, setSForm] = useState({ title: '', description: '', features: '', status: 'active' });
  const [settings, setSettings] = useState({ siteName: 'EXMPEX Academy', tagline: 'منصة التعليم التقني الأولى في مصر', email: 'info@exmpex.com', phone: '+20 10 XXX XXXX', address: 'كفر الشيخ، مصر' });

  const close = () => { setModal(null); setEditing(null); };

  const calcTotal = () => {
    const val = parseFloat(invForm.invoiceValue) || 0;
    const disc = parseFloat(invForm.discountPercent) || 0;
    return invForm.invoiceType === 'إيرادات غير منظوره' ? val * (1 - disc / 100) : val;
  };

  const handlePrint = (inv: Invoice) => {
    setPrintInvoice(inv);
    setTimeout(() => {
      const printWin = window.open('', '_blank', 'width=850,height=700');
      if (!printWin) return;
      const content = document.getElementById('invoice-print-container')?.innerHTML || '';
      printWin.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>فاتورة - ${inv.invoiceNumber}</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Cairo',sans-serif;padding:20px;background:white;direction:rtl;}@media print{body{padding:10px;}}</style></head><body>${content}<script>window.onload=()=>{window.print();window.close();}<\/script></body></html>`);
      printWin.document.close();
    }, 200);
  };

  const saveInvoice = () => {
    const val = parseFloat(invForm.invoiceValue) || 0;
    const disc = parseFloat(invForm.discountPercent) || 0;
    const afterDiscount = invForm.invoiceType === 'إيرادات غير منظوره' ? val * (1 - disc / 100) : val;
    const inv: Invoice = {
      id: editing ? editing.id : String(Date.now()),
      invoiceNumber: invForm.invoiceNumber || `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      invoiceName: invForm.invoiceName, date: invForm.date,
      invoiceType: invForm.invoiceType, paymentType: invForm.paymentType,
      invoiceValue: val,
      expensesValue: invForm.invoiceType === 'مصروفات' ? parseFloat(invForm.expensesValue) || 0 : undefined,
      expensesDesc: invForm.invoiceType === 'مصروفات' ? invForm.expensesDesc : undefined,
      discountPercent: invForm.invoiceType === 'إيرادات غير منظوره' ? disc : undefined,
      discountReason: invForm.invoiceType === 'إيرادات غير منظوره' ? invForm.discountReason : undefined,
      party: invForm.invoiceType === 'إيرادات غير منظوره' ? invForm.party : undefined,
      valueAfterDiscount: invForm.invoiceType === 'إيرادات غير منظوره' ? afterDiscount : undefined,
      total: afterDiscount, signature: invForm.signature,
      status: invForm.status, createdAt: editing ? editing.createdAt : new Date().toISOString().split('T')[0],
    };
    if (editing) { setInvoices(p => p.map(x => x.id === editing.id ? inv : x)); }
    else { setInvoices(p => [inv, ...p]); }
    close();
  };

  const openInvForm = (inv?: Invoice) => {
    setEditing(inv || null);
    setInvForm(inv ? { invoiceNumber: inv.invoiceNumber, invoiceName: inv.invoiceName, date: inv.date, invoiceType: inv.invoiceType, paymentType: inv.paymentType, invoiceValue: String(inv.invoiceValue), expensesValue: String(inv.expensesValue || ''), expensesDesc: inv.expensesDesc || '', discountPercent: String(inv.discountPercent || ''), discountReason: inv.discountReason || '', party: inv.party || '', signature: inv.signature || '', status: inv.status } : { invoiceNumber: '', invoiceName: '', date: new Date().toISOString().split('T')[0], invoiceType: 'إيرادات', paymentType: 'نقدى', invoiceValue: '', expensesValue: '', expensesDesc: '', discountPercent: '', discountReason: '', party: '', signature: '', status: 'مدفوع' });
    setModal('invoice');
  };

  const saveCourse = () => { if (editing) { setCourses(p => p.map(c => c.id === editing.id ? { ...c, ...cForm, price: Number(cForm.price), status: cForm.status as 'active'|'draft' } : c)); } else { setCourses(p => [{ id: String(Date.now()), title: cForm.title, instructor: cForm.instructor, category: cForm.category, level: cForm.level, price: Number(cForm.price), students: 0, status: cForm.status as 'active'|'draft' }, ...p]); } close(); };
  const saveProduct = () => { if (editing) { setProducts(p => p.map(x => x.id === editing.id ? { ...x, ...pForm, price: Number(pForm.price), stock: Number(pForm.stock), status: pForm.status as 'active'|'out' } : x)); } else { setProducts(p => [{ id: String(Date.now()), name: pForm.name, category: pForm.category, price: Number(pForm.price), stock: Number(pForm.stock), status: pForm.status as 'active'|'out' }, ...p]); } close(); };
  const saveService = () => { if (editing) { setServices(p => p.map(s => s.id === editing.id ? { ...s, title: sForm.title, description: sForm.description, features: sForm.features.split('\n').filter(Boolean), status: sForm.status as 'active'|'draft' } : s)); } else { setServices(p => [{ id: String(Date.now()), title: sForm.title, description: sForm.description, features: sForm.features.split('\n').filter(Boolean), status: sForm.status as 'active'|'draft' }, ...p]); } close(); };

  const totalRevenue = invoices.filter(i => i.invoiceType === 'إيرادات').reduce((a, b) => a + b.total, 0);
  const totalExpenses = invoices.filter(i => i.invoiceType === 'مصروفات').reduce((a, b) => a + b.total, 0);
  const totalHidden = invoices.filter(i => i.invoiceType === 'إيرادات غير منظوره').reduce((a, b) => a + b.total, 0);
  const netProfit = totalRevenue + totalHidden - totalExpenses;

  const navItems = [
    { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
    { id: 'accounting', label: 'نظام المحاسبة', icon: Calculator },
    { id: 'courses', label: 'الكورسات', icon: BookOpen },
    { id: 'products', label: 'المتجر', icon: ShoppingBag },
    { id: 'services', label: 'الخدمات', icon: Briefcase },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  if (!isLoggedIn) return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;

  const filteredInvoices = invoices.filter(i => !search || i.invoiceName.includes(search) || i.invoiceNumber.includes(search));
  const total = calcTotal();

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Hidden print container */}
      {printInvoice && (
        <div id="invoice-print-container" style={{ display: 'none' }}>
          <InvoicePrintView invoice={printInvoice} />
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-60 shrink-0 sticky top-0 h-screen flex flex-col border-l border-border/50" style={{ background: 'hsl(var(--sidebar-background))' }}>
        <div className="p-4 border-b border-white/10">
          <Link to="/"><img src={logo} alt="EXMPEX" className="h-8 w-auto brightness-0 invert" /></Link>
          <p className="text-xs mt-1" style={{ color: 'hsl(var(--sidebar-foreground) / 0.5)' }}>لوحة التحكم</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={cn('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all')}
              style={tab === item.id ? { background: 'hsl(var(--sidebar-primary))', color: 'white' } : { color: 'hsl(var(--sidebar-foreground) / 0.7)' }}
              onMouseEnter={e => { if (tab !== item.id) (e.currentTarget as HTMLElement).style.background = 'hsl(var(--sidebar-accent))'; }}
              onMouseLeave={e => { if (tab !== item.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-right">{item.label}</span>
              {item.id === 'accounting' && <span className="text-[10px] bg-accent/30 text-accent px-1.5 py-0.5 rounded-full font-bold">جديد</span>}
            </button>
          ))}
        </nav>
        <Separator style={{ background: 'hsl(var(--sidebar-border))' }} />
        <div className="p-3 space-y-0.5">
          <Link to="/"><button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all text-right" style={{ color: 'hsl(var(--sidebar-foreground) / 0.6)' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'hsl(var(--sidebar-accent))'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}><Home className="h-4 w-4" />عرض الموقع</button></Link>
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all text-right" style={{ color: 'hsl(var(--sidebar-foreground) / 0.6)' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'hsl(0 70% 50% / 0.15)'; (e.currentTarget as HTMLElement).style.color = 'hsl(0 70% 65%)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'hsl(var(--sidebar-foreground) / 0.6)'; }}><LogOut className="h-4 w-4" />تسجيل الخروج</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-card border-b border-border/50 flex items-center justify-between px-5 sticky top-0 z-30">
          <h1 className="font-bold text-foreground text-sm">{navItems.find(n => n.id === tab)?.label}</h1>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block"><Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><Input placeholder="بحث..." value={search} onChange={e => setSearch(e.target.value)} className="w-44 pr-8 h-8 text-xs" /></div>
            <button className="relative w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"><Bell className="h-4 w-4 text-muted-foreground" /><span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full" /></button>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">أ</div>
          </div>
        </header>

        <div className="flex-1 p-5 overflow-y-auto space-y-5">

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: 'إجمالي الطلاب', value: '10,540', sub: '+12% هذا الشهر', c: 'text-primary' },
                  { icon: BookOpen, label: 'الكورسات', value: String(courses.filter(c => c.status === 'active').length), sub: `${courses.length} إجمالي`, c: 'text-secondary' },
                  { icon: TrendingUp, label: 'صافي الربح', value: `${netProfit.toLocaleString()} ج.م`, sub: 'هذا الشهر', c: 'text-green-600' },
                  { icon: Receipt, label: 'الفواتير', value: String(invoices.length), sub: `${invoices.filter(i => i.status === 'معلق').length} معلقة`, c: 'text-accent' },
                ].map((s, i) => (
                  <div key={i} className="bg-card rounded-xl p-5 border border-border/50 hover-lift">
                    <s.icon className={`h-5 w-5 ${s.c} mb-3`} />
                    <div className={`text-2xl font-black ${s.c} mb-0.5`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50">
                <h2 className="font-bold text-foreground text-sm mb-4">إجراءات سريعة</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { label: 'فاتورة جديدة', icon: Receipt, action: () => { setTab('accounting'); openInvForm(); } },
                    { label: 'كورس جديد', icon: GraduationCap, action: () => { setTab('courses'); setEditing(null); setCForm({ title: '', instructor: '', category: 'Full Stack', level: 'مبتدئ', price: '', status: 'draft' }); setModal('course'); } },
                    { label: 'منتج جديد', icon: ShoppingBag, action: () => { setTab('products'); setEditing(null); setPForm({ name: '', category: 'لابتوبات', price: '', stock: '', status: 'active' }); setModal('product'); } },
                    { label: 'خدمة جديدة', icon: Briefcase, action: () => { setTab('services'); setEditing(null); setSForm({ title: '', description: '', features: '', status: 'active' }); setModal('service'); } },
                    { label: 'الإعدادات', icon: Settings, action: () => setTab('settings') },
                  ].map((item, i) => (
                    <button key={i} onClick={item.action} className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all hover:scale-105">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-gradient-primary flex items-center justify-center transition-all">
                        <item.icon className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs font-medium text-center text-foreground">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <h2 className="font-bold text-foreground text-sm flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />آخر الفواتير</h2>
                  <button onClick={() => setTab('accounting')} className="text-xs text-primary hover:underline flex items-center gap-1">عرض الكل <ArrowLeft className="h-3 w-3" /></button>
                </div>
                {invoices.slice(0, 4).map(inv => (
                  <div key={inv.id} className="flex items-center gap-3 px-4 py-3 border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors">
                    <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', inv.invoiceType === 'إيرادات' ? 'bg-green-100 dark:bg-green-900/30' : inv.invoiceType === 'مصروفات' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100')}>
                      <Receipt className={cn('h-3.5 w-3.5', inv.invoiceType === 'إيرادات' ? 'text-green-600' : inv.invoiceType === 'مصروفات' ? 'text-red-500' : 'text-yellow-600')} />
                    </div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{inv.invoiceName}</p><p className="text-xs text-muted-foreground">{inv.invoiceNumber} · {inv.date}</p></div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold text-primary">{inv.total.toLocaleString()} ج.م</span>
                      <Badge className={cn('text-xs border-0', inv.status === 'مدفوع' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : inv.status === 'معلق' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-500')}>{inv.status}</Badge>
                      <button onClick={() => handlePrint(inv)} className="w-6 h-6 rounded hover:bg-primary/10 hover:text-primary flex items-center justify-center text-muted-foreground transition-colors"><Printer className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACCOUNTING */}
          {tab === 'accounting' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'إجمالي الإيرادات', value: totalRevenue, c: 'text-green-600', bg: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' },
                  { label: 'إجمالي المصروفات', value: totalExpenses, c: 'text-red-500', bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' },
                  { label: 'إيرادات غير منظوره', value: totalHidden, c: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' },
                  { label: 'صافي الربح', value: netProfit, c: netProfit >= 0 ? 'text-primary' : 'text-red-500', bg: 'bg-card border-border/50' },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${s.bg}`}>
                    <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
                    <div className={`text-xl font-black ${s.c}`}>{s.value.toLocaleString()} ج.م</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div><h2 className="text-base font-bold text-foreground">سجل الفواتير</h2><p className="text-xs text-muted-foreground">{invoices.length} فاتورة</p></div>
                <Button onClick={() => openInvForm()} className="bg-gradient-primary hover:opacity-90 text-white shadow-glow gap-1.5 h-9 text-sm"><Plus className="h-4 w-4" />فاتورة جديدة</Button>
              </div>
              <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/30">{['رقم الفاتورة', 'الاسم', 'النوع', 'طريقة السداد', 'الإجمالي', 'الحالة', 'التاريخ', ''].map(h => <th key={h} className="text-right text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap">{h}</th>)}</tr></thead>
                    <tbody>
                      {filteredInvoices.map(inv => (
                        <tr key={inv.id} className="border-b border-border/30 hover:bg-muted/20">
                          <td className="px-4 py-3 text-xs font-mono font-bold text-primary">{inv.invoiceNumber}</td>
                          <td className="px-4 py-3 text-sm text-foreground max-w-[140px] truncate">{inv.invoiceName}</td>
                          <td className="px-4 py-3"><Badge className={cn('text-xs border-0 whitespace-nowrap', inv.invoiceType === 'إيرادات' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : inv.invoiceType === 'مصروفات' ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-700')}>{inv.invoiceType}</Badge></td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{inv.paymentType}</td>
                          <td className="px-4 py-3 text-sm font-bold text-primary whitespace-nowrap">{inv.total.toLocaleString()} ج.م</td>
                          <td className="px-4 py-3"><Badge className={cn('text-xs border-0', inv.status === 'مدفوع' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : inv.status === 'معلق' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-500')}>{inv.status}</Badge></td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{inv.date}</td>
                          <td className="px-4 py-3"><div className="flex gap-1">
                            <button onClick={() => handlePrint(inv)} className="w-7 h-7 rounded-lg hover:bg-primary/10 hover:text-primary flex items-center justify-center text-muted-foreground" title="طباعة"><Printer className="h-3.5 w-3.5" /></button>
                            <button onClick={() => openInvForm(inv)} className="w-7 h-7 rounded-lg hover:bg-primary/10 hover:text-primary flex items-center justify-center text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                            <button onClick={() => setInvoices(p => p.filter(x => x.id !== inv.id))} className="w-7 h-7 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-muted-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredInvoices.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">لا توجد فواتير</div>}
                </div>
              </div>
            </div>
          )}

          {/* COURSES */}
          {tab === 'courses' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div><h2 className="text-base font-bold text-foreground">إدارة الكورسات</h2><p className="text-xs text-muted-foreground">{courses.length} كورس</p></div>
                <Button onClick={() => { setEditing(null); setCForm({ title: '', instructor: '', category: 'Full Stack', level: 'مبتدئ', price: '', status: 'draft' }); setModal('course'); }} className="bg-gradient-primary hover:opacity-90 text-white shadow-glow gap-1.5 h-9 text-sm"><Plus className="h-4 w-4" />إضافة كورس</Button>
              </div>
              <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/30">{['الكورس', 'المحاضر', 'التصنيف', 'السعر', 'الطلاب', 'الحالة', ''].map(h => <th key={h} className="text-right text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>)}</tr></thead>
                    <tbody>
                      {courses.filter(c => !search || c.title.includes(search)).map(c => (
                        <tr key={c.id} className="border-b border-border/30 hover:bg-muted/20">
                          <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><BookOpen className="h-3.5 w-3.5 text-primary" /></div><div><p className="font-medium text-sm truncate max-w-[150px]">{c.title}</p><p className="text-xs text-muted-foreground">{c.level}</p></div></div></td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{c.instructor}</td>
                          <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{c.category}</Badge></td>
                          <td className="px-4 py-3 text-sm font-bold text-primary whitespace-nowrap">{c.price.toLocaleString()} ج.م</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{c.students.toLocaleString()}</td>
                          <td className="px-4 py-3"><Badge className={cn('text-xs border-0', c.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-muted text-muted-foreground')}>{c.status === 'active' ? 'نشط' : 'مسودة'}</Badge></td>
                          <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => { setEditing(c); setCForm({ title: c.title, instructor: c.instructor, category: c.category, level: c.level, price: String(c.price), status: c.status }); setModal('course'); }} className="w-7 h-7 rounded-lg hover:bg-primary/10 hover:text-primary flex items-center justify-center text-muted-foreground"><Pencil className="h-3 w-3" /></button><button onClick={() => setCourses(p => p.filter(x => x.id !== c.id))} className="w-7 h-7 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-muted-foreground"><Trash2 className="h-3 w-3" /></button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div><h2 className="text-base font-bold text-foreground">إدارة المتجر</h2><p className="text-xs text-muted-foreground">{products.length} منتج</p></div>
                <Button onClick={() => { setEditing(null); setPForm({ name: '', category: 'لابتوبات', price: '', stock: '', status: 'active' }); setModal('product'); }} className="bg-gradient-primary hover:opacity-90 text-white shadow-glow gap-1.5 h-9 text-sm"><Plus className="h-4 w-4" />إضافة منتج</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.filter(p => !search || p.name.includes(search)).map(p => (
                  <div key={p.id} className="bg-card rounded-xl p-4 border border-border/50 hover-lift hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-3"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShoppingBag className="h-5 w-5 text-primary" /></div><Badge className={cn('text-xs border-0', p.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive')}>{p.status === 'active' ? 'متاح' : 'نفذ'}</Badge></div>
                    <h3 className="font-bold text-sm mb-1 truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{p.category}</p>
                    <div className="flex items-center justify-between mb-3"><span className="text-base font-black text-primary">{p.price.toLocaleString()} ج.م</span><span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{p.stock}</span></div>
                    <div className="flex gap-1.5"><button onClick={() => { setEditing(p); setPForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), status: p.status }); setModal('product'); }} className="flex-1 h-7 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-xs flex items-center justify-center gap-1 text-muted-foreground transition-all"><Pencil className="h-3 w-3" />تعديل</button><button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))} className="h-7 w-7 rounded-lg bg-muted hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-muted-foreground"><Trash2 className="h-3 w-3" /></button></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES */}
          {tab === 'services' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div><h2 className="text-base font-bold text-foreground">إدارة الخدمات</h2></div>
                <Button onClick={() => { setEditing(null); setSForm({ title: '', description: '', features: '', status: 'active' }); setModal('service'); }} className="bg-gradient-primary hover:opacity-90 text-white shadow-glow gap-1.5 h-9 text-sm"><Plus className="h-4 w-4" />إضافة خدمة</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map(s => (
                  <div key={s.id} className="bg-card rounded-xl p-5 border border-border/50 hover-lift hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-4"><div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow"><Briefcase className="h-5 w-5 text-white" /></div><Badge className={cn('text-xs border-0', s.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-muted text-muted-foreground')}>{s.status === 'active' ? 'نشط' : 'مسودة'}</Badge></div>
                    <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{s.description}</p>
                    <ul className="space-y-1 mb-4">{s.features.map((f, i) => <li key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-1 h-1 rounded-full bg-primary shrink-0" />{f}</li>)}</ul>
                    <div className="flex gap-1.5"><button onClick={() => { setEditing(s); setSForm({ title: s.title, description: s.description, features: s.features.join('\n'), status: s.status }); setModal('service'); }} className="flex-1 h-8 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary text-xs flex items-center justify-center gap-1.5 text-muted-foreground transition-all"><Pencil className="h-3 w-3" />تعديل</button><button onClick={() => setServices(prev => prev.filter(x => x.id !== s.id))} className="h-8 w-8 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-muted-foreground"><Trash2 className="h-3.5 w-3.5" /></button></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab === 'settings' && (
            <div className="space-y-4 animate-fade-in max-w-2xl">
              <h2 className="text-base font-bold text-foreground">إعدادات الموقع</h2>
              {[{ title: 'المعلومات الأساسية', fields: [{ l: 'اسم الموقع', k: 'siteName' }, { l: 'الشعار', k: 'tagline' }] }, { title: 'بيانات التواصل', fields: [{ l: 'البريد', k: 'email' }, { l: 'الهاتف', k: 'phone' }, { l: 'العنوان', k: 'address' }] }].map(sec => (
                <div key={sec.title} className="bg-card rounded-xl p-5 border border-border/50 space-y-4">
                  <h3 className="font-bold text-primary text-sm border-b border-border/50 pb-2">{sec.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sec.fields.map(f => <div key={f.k} className="space-y-1.5"><Label className="text-xs">{f.l}</Label><Input value={(settings as any)[f.k]} onChange={e => setSettings(p => ({ ...p, [f.k]: e.target.value }))} className="h-10" /></div>)}
                  </div>
                </div>
              ))}
              <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow gap-2 h-10 px-6"><Save className="h-4 w-4" />حفظ الإعدادات</Button>
            </div>
          )}
        </div>
      </main>

      {/* INVOICE MODAL */}
      {modal === 'invoice' && (
        <Modal title={editing ? 'تعديل الفاتورة' : 'إضافة فاتورة جديدة'} onClose={close} wide>
          <div className="space-y-4" dir="rtl">
            <div className="space-y-2">
              <Label className="text-xs font-bold">نوع الفاتورة</Label>
              <div className="flex gap-2">
                {(['إيرادات', 'مصروفات', 'إيرادات غير منظوره'] as InvoiceType[]).map(t => (
                  <button key={t} onClick={() => setInvForm(p => ({ ...p, invoiceType: t }))} className={cn('flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all', invForm.invoiceType === t ? 'border-primary bg-primary text-white' : 'border-border text-muted-foreground hover:border-primary/40')}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">رقم الفاتورة</Label><Input value={invForm.invoiceNumber} onChange={e => setInvForm(p => ({ ...p, invoiceNumber: e.target.value }))} placeholder="INV-001" className="h-10 text-sm" /></div>
              <div className="space-y-1.5"><Label className="text-xs">اسم الفاتورة *</Label><Input value={invForm.invoiceName} onChange={e => setInvForm(p => ({ ...p, invoiceName: e.target.value }))} placeholder="وصف الفاتورة" className="h-10 text-sm" /></div>
              <div className="space-y-1.5"><Label className="text-xs">التاريخ</Label><Input type="date" value={invForm.date} onChange={e => setInvForm(p => ({ ...p, date: e.target.value }))} className="h-10 text-sm" /></div>
              <div className="space-y-1.5"><Label className="text-xs">قيمة الفاتورة (ج.م) *</Label><Input type="number" value={invForm.invoiceValue} onChange={e => setInvForm(p => ({ ...p, invoiceValue: e.target.value }))} placeholder="0.00" className="h-10 text-sm" /></div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">نوع سداد الفاتورة</Label>
              <div className="flex gap-2">
                {(['نقدى', 'كاش', 'انسته'] as PaymentType[]).map(t => (
                  <button key={t} onClick={() => setInvForm(p => ({ ...p, paymentType: t }))} className={cn('flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all', invForm.paymentType === t ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/30')}>{t}</button>
                ))}
              </div>
            </div>
            {invForm.invoiceType === 'مصروفات' && (
              <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800 space-y-3">
                <Label className="text-xs font-bold text-red-600">المصروفات</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label className="text-xs">قيمة المصروفات</Label><Input type="number" value={invForm.expensesValue} onChange={e => setInvForm(p => ({ ...p, expensesValue: e.target.value }))} className="h-10 text-sm" /></div>
                  <div className="space-y-1.5"><Label className="text-xs">وصف المصروفات</Label><Input value={invForm.expensesDesc} onChange={e => setInvForm(p => ({ ...p, expensesDesc: e.target.value }))} className="h-10 text-sm" /></div>
                </div>
              </div>
            )}
            {invForm.invoiceType === 'إيرادات غير منظوره' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800 space-y-3">
                <Label className="text-xs font-bold text-yellow-700">الإرادات الغير منظور</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label className="text-xs">قيمة التخفيض %</Label><Input type="number" value={invForm.discountPercent} onChange={e => setInvForm(p => ({ ...p, discountPercent: e.target.value }))} placeholder="10" className="h-10 text-sm" /></div>
                  <div className="space-y-1.5"><Label className="text-xs">سبب التخفيض</Label><Input value={invForm.discountReason} onChange={e => setInvForm(p => ({ ...p, discountReason: e.target.value }))} className="h-10 text-sm" /></div>
                  <div className="col-span-2 space-y-1.5"><Label className="text-xs">الجهة</Label><Input value={invForm.party} onChange={e => setInvForm(p => ({ ...p, party: e.target.value }))} className="h-10 text-sm" /></div>
                </div>
                {invForm.invoiceValue && <div className="bg-white dark:bg-background rounded-lg p-3 border border-yellow-200 flex justify-between text-sm"><span className="text-muted-foreground">قيمة الفاتورة بعد التخفيض:</span><span className="font-bold text-yellow-700">{total.toLocaleString()} ج.م</span></div>}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">التوقيع</Label><Input value={invForm.signature} onChange={e => setInvForm(p => ({ ...p, signature: e.target.value }))} placeholder="اسم الموقّع" className="h-10 text-sm" /></div>
              <div className="space-y-1.5"><Label className="text-xs">الحالة</Label><Select value={invForm.status} onValueChange={v => setInvForm(p => ({ ...p, status: v as InvoiceStatus }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="مدفوع">مدفوع</SelectItem><SelectItem value="معلق">معلق</SelectItem><SelectItem value="ملغى">ملغى</SelectItem></SelectContent></Select></div>
            </div>
            {invForm.invoiceValue && <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex items-center justify-between"><span className="font-bold text-sm text-foreground">اجمالى الفاتورة</span><span className="text-xl font-black text-primary">{total.toLocaleString()} ج.م</span></div>}
            <div className="flex gap-2">
              <Button onClick={saveInvoice} className="flex-1 bg-gradient-primary hover:opacity-90 text-white h-10 gap-2 shadow-glow text-sm"><Save className="h-4 w-4" />{editing ? 'حفظ التعديلات' : 'حفظ الفاتورة'}</Button>
              <Button variant="outline" onClick={close} className="h-10 text-sm">إلغاء</Button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'course' && (
        <Modal title={editing ? 'تعديل الكورس' : 'إضافة كورس'} onClose={close}>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label className="text-xs">عنوان الكورس *</Label><Input value={cForm.title} onChange={e => setCForm(p => ({ ...p, title: e.target.value }))} className="h-10" /></div>
            <div className="space-y-1.5"><Label className="text-xs">المحاضر *</Label><Input value={cForm.instructor} onChange={e => setCForm(p => ({ ...p, instructor: e.target.value }))} className="h-10" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">التصنيف</Label><Select value={cForm.category} onValueChange={v => setCForm(p => ({ ...p, category: v }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent>{['Full Stack', 'الذكاء الاصطناعي', 'الشبكات', 'التصميم الجرافيكي'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-1.5"><Label className="text-xs">المستوى</Label><Select value={cForm.level} onValueChange={v => setCForm(p => ({ ...p, level: v }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent>{['مبتدئ', 'متوسط', 'متقدم'].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-1.5"><Label className="text-xs">السعر</Label><Input type="number" value={cForm.price} onChange={e => setCForm(p => ({ ...p, price: e.target.value }))} className="h-10" /></div>
              <div className="space-y-1.5"><Label className="text-xs">الحالة</Label><Select value={cForm.status} onValueChange={v => setCForm(p => ({ ...p, status: v }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">نشط</SelectItem><SelectItem value="draft">مسودة</SelectItem></SelectContent></Select></div>
            </div>
            <div className="flex gap-2"><Button onClick={saveCourse} className="flex-1 bg-gradient-primary hover:opacity-90 text-white h-10 shadow-glow"><Save className="h-4 w-4 ml-1" />{editing ? 'حفظ' : 'إضافة'}</Button><Button variant="outline" onClick={close} className="h-10">إلغاء</Button></div>
          </div>
        </Modal>
      )}

      {modal === 'product' && (
        <Modal title={editing ? 'تعديل المنتج' : 'إضافة منتج'} onClose={close}>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label className="text-xs">اسم المنتج *</Label><Input value={pForm.name} onChange={e => setPForm(p => ({ ...p, name: e.target.value }))} className="h-10" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">التصنيف</Label><Select value={pForm.category} onValueChange={v => setPForm(p => ({ ...p, category: v }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent>{['لابتوبات', 'إكسسوارات', 'شنط لابتوب', 'شاشات'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-1.5"><Label className="text-xs">السعر</Label><Input type="number" value={pForm.price} onChange={e => setPForm(p => ({ ...p, price: e.target.value }))} className="h-10" /></div>
              <div className="space-y-1.5"><Label className="text-xs">الكمية</Label><Input type="number" value={pForm.stock} onChange={e => setPForm(p => ({ ...p, stock: e.target.value }))} className="h-10" /></div>
              <div className="space-y-1.5"><Label className="text-xs">الحالة</Label><Select value={pForm.status} onValueChange={v => setPForm(p => ({ ...p, status: v }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">متاح</SelectItem><SelectItem value="out">نفذ</SelectItem></SelectContent></Select></div>
            </div>
            <div className="flex gap-2"><Button onClick={saveProduct} className="flex-1 bg-gradient-primary hover:opacity-90 text-white h-10 shadow-glow"><Save className="h-4 w-4 ml-1" />{editing ? 'حفظ' : 'إضافة'}</Button><Button variant="outline" onClick={close} className="h-10">إلغاء</Button></div>
          </div>
        </Modal>
      )}

      {modal === 'service' && (
        <Modal title={editing ? 'تعديل الخدمة' : 'إضافة خدمة'} onClose={close}>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label className="text-xs">عنوان الخدمة *</Label><Input value={sForm.title} onChange={e => setSForm(p => ({ ...p, title: e.target.value }))} className="h-10" /></div>
            <div className="space-y-1.5"><Label className="text-xs">الوصف</Label><Textarea value={sForm.description} onChange={e => setSForm(p => ({ ...p, description: e.target.value }))} rows={3} className="resize-none text-sm" /></div>
            <div className="space-y-1.5"><Label className="text-xs">المميزات (سطر لكل ميزة)</Label><Textarea value={sForm.features} onChange={e => setSForm(p => ({ ...p, features: e.target.value }))} rows={4} className="resize-none text-xs font-mono" /></div>
            <div className="space-y-1.5"><Label className="text-xs">الحالة</Label><Select value={sForm.status} onValueChange={v => setSForm(p => ({ ...p, status: v }))}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">نشط</SelectItem><SelectItem value="draft">مسودة</SelectItem></SelectContent></Select></div>
            <div className="flex gap-2"><Button onClick={saveService} className="flex-1 bg-gradient-primary hover:opacity-90 text-white h-10 shadow-glow"><Save className="h-4 w-4 ml-1" />{editing ? 'حفظ' : 'إضافة'}</Button><Button variant="outline" onClick={close} className="h-10">إلغاء</Button></div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Wallet, CreditCard, Smartphone, CheckCircle, ArrowLeft,
  Shield, Lock, AlertCircle, ChevronRight, Copy, Check,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PaymentMethod = 'wallet' | 'visa' | 'instapay';
type WalletProvider = 'vodafone' | 'orange' | 'etisalat' | 'we';

const walletProviders = [
  { id: 'vodafone' as WalletProvider, name: 'فودافون كاش', color: 'bg-red-500', shortCode: '*9' },
  { id: 'orange' as WalletProvider, name: 'أورنج كاش', color: 'bg-orange-500', shortCode: '*8' },
  { id: 'etisalat' as WalletProvider, name: 'اتصالات كاش', color: 'bg-green-600', shortCode: '*7' },
  { id: 'we' as WalletProvider, name: 'WE Pay', color: 'bg-blue-600', shortCode: '*6' },
];

// Luhn check for card validation
const validateCard = (n: string) => {
  const num = n.replace(/\D/g, '');
  if (num.length < 13) return false;
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    let d = parseInt(num[num.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
};

const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (v: string) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemName = searchParams.get('name') || 'اشتراك';
  const itemPrice = parseInt(searchParams.get('price') || '0');
  const itemType = searchParams.get('type') as 'course' | 'product';
  const itemId = searchParams.get('id') || '';
  const qty = parseInt(searchParams.get('qty') || '1');

  const [method, setMethod] = useState<PaymentMethod>('wallet');
  const [wallet, setWallet] = useState<WalletProvider>('vodafone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [instapayId, setInstapayId] = useState('');
  const [step, setStep] = useState<'pay' | 'confirm' | 'done'>('pay');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fees = Math.round(itemPrice * 0.025); // 2.5% fees
  const total = itemPrice + fees;

  const EXMPEX_INSTAPAY = '01012345678@instapay';
  const EXMPEX_PHONE = '01012345678';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendOtp = async () => {
    if (phone.length < 11) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setOtpSent(true);
    setLoading(false);
  };

  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    if (method === 'instapay') { setStep('confirm'); }
    else { setStep('done'); }
  };

  const isValidWallet = phone.replace(/\D/g, '').length === 11 && (!otpSent || otp.length === 6);
  const isValidCard = validateCard(cardNum) && expiry.length === 5 && cvv.length >= 3 && cardName.trim().length > 2;
  const isValidInstapay = instapayId.trim().length > 3;

  const canPay = method === 'wallet' ? isValidWallet : method === 'visa' ? isValidCard : isValidInstapay;

  // ── Success ──────────────────────────────────────────────────
  if (step === 'done') {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center py-16" dir="rtl">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>تمت عملية الدفع بنجاح! 🎉</h1>
            <p className="text-muted-foreground mb-2 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>
              {itemType === 'course' ? 'تم تسجيلك في الكورس بنجاح' : 'تم تأكيد طلبك بنجاح'}
            </p>
            <p className="text-muted-foreground text-sm mb-6 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
              سيصلك إيميل تأكيد على بريدك الإلكتروني خلال دقائق.
            </p>
            <div className="bg-card rounded-2xl p-5 border border-border/50 mb-8 text-right animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">{itemType === 'course' ? 'الكورس' : 'المنتج'}</span><span className="font-medium text-foreground truncate max-w-[180px]">{decodeURIComponent(itemName)}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">طريقة الدفع</span><span className="font-medium">{method === 'wallet' ? walletProviders.find(w => w.id === wallet)?.name : method === 'visa' ? 'بطاقة فيزا' : 'InstaPay'}</span></div>
              <div className="flex justify-between text-sm font-bold border-t border-border/50 pt-2 mt-2"><span>المبلغ المدفوع</span><span className="text-primary">{total.toLocaleString()} ج.م</span></div>
            </div>
            <div className="flex flex-col gap-3 animate-scale-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', opacity: 0 }}>
              {itemType === 'course' ? (
                <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow" onClick={() => navigate(`/courses/${itemId}`)}>
                  ابدأ الكورس الآن
                </Button>
              ) : (
                <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow" onClick={() => navigate('/store')}>
                  متابعة التسوق
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate('/')}>العودة للرئيسية</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── InstaPay Confirm ──────────────────────────────────────────
  if (step === 'confirm') {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center py-16" dir="rtl">
          <div className="max-w-md w-full mx-auto px-4">
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xl animate-scale-in">
              <div className="bg-gradient-primary p-5 text-center">
                <Smartphone className="h-8 w-8 text-white mx-auto mb-2" />
                <h2 className="text-lg font-bold text-white">أكمل التحويل عبر InstaPay</h2>
                <p className="text-white/70 text-sm">حوّل المبلغ ثم اضغط تأكيد</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">معرف InstaPay</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold text-primary">{EXMPEX_INSTAPAY}</code>
                      <button onClick={() => copyToClipboard(EXMPEX_INSTAPAY)} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground">
                        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">المبلغ</span>
                    <span className="text-lg font-black text-primary">{total.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">ملاحظة التحويل</span>
                    <code className="text-xs bg-background px-2 py-1 rounded font-mono">{itemType === 'course' ? 'COURSE' : 'PRODUCT'}-{itemId}</code>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800 text-sm text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>بعد إتمام التحويل، سيتم التحقق وتفعيل طلبك خلال دقائق.</span>
                </div>
                <Button onClick={() => setStep('done')} className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white shadow-glow font-bold gap-2">
                  <CheckCircle className="h-4 w-4" />
                  تأكيد إتمام التحويل
                </Button>
                <Button variant="outline" onClick={() => setStep('pay')} className="w-full h-10">
                  رجوع
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Main Checkout ──────────────────────────────────────────────
  return (
    <Layout>
      <div className="py-10" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">إتمام الدفع</h1>
              <p className="text-sm text-muted-foreground">اختر طريقة الدفع المناسبة لك</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-3 space-y-5">

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: 'wallet', label: 'محفظة إلكترونية', icon: Wallet, sub: 'فودافون · أورنج · اتصالات' },
                  { id: 'visa', label: 'بطاقة بنكية', icon: CreditCard, sub: 'Visa · Mastercard' },
                  { id: 'instapay', label: 'InstaPay', icon: Smartphone, sub: 'تحويل مباشر' },
                ] as { id: PaymentMethod; label: string; icon: any; sub: string }[]).map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center',
                      method === m.id ? 'border-primary bg-primary/5 shadow-glow' : 'border-border/50 hover:border-primary/40'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', method === m.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground')}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <span className={cn('text-xs font-bold', method === m.id ? 'text-primary' : 'text-foreground')}>{m.label}</span>
                    <span className="text-xs text-muted-foreground">{m.sub}</span>
                  </button>
                ))}
              </div>

              {/* ── Wallet ── */}
              {method === 'wallet' && (
                <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-5 animate-scale-in">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />اختر المحفظة
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {walletProviders.map(w => (
                      <button
                        key={w.id}
                        onClick={() => setWallet(w.id)}
                        className={cn('flex items-center gap-3 p-4 rounded-xl border-2 transition-all', wallet === w.id ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30')}
                      >
                        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-black', w.color)}>{w.shortCode}</div>
                        <span className={cn('text-sm font-medium', wallet === w.id ? 'text-primary' : 'text-foreground')}>{w.name}</span>
                        {wallet === w.id && <CheckCircle className="h-4 w-4 text-primary mr-auto" />}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">رقم الهاتف المرتبط بالمحفظة *</Label>
                      <div className="flex gap-2">
                        <Input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                          placeholder="01XXXXXXXXX"
                          className="h-11 flex-1 font-mono"
                          dir="ltr"
                        />
                        <Button onClick={sendOtp} disabled={phone.length < 11 || loading || otpSent} className={cn('h-11 px-5 whitespace-nowrap text-sm', otpSent ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gradient-primary text-white')}>
                          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : otpSent ? <><Check className="h-4 w-4 ml-1" />أُرسل!</> : 'إرسال OTP'}
                        </Button>
                      </div>
                    </div>
                    {otpSent && (
                      <div className="space-y-2 animate-slide-down">
                        <Label className="text-sm">كود التحقق OTP *</Label>
                        <Input
                          type="text"
                          value={otp}
                          onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="- - - - - -"
                          className="h-11 text-center text-xl font-bold tracking-widest"
                          maxLength={6}
                        />
                        <p className="text-xs text-muted-foreground text-center">تم إرسال كود مكون من 6 أرقام على رقم {phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 text-sm text-primary">
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>يتم الدفع مباشرة من محفظتك بشكل آمن ومشفر</span>
                  </div>
                </div>
              )}

              {/* ── Visa / Card ── */}
              {method === 'visa' && (
                <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-5 animate-scale-in">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />بيانات البطاقة
                  </h3>

                  {/* Card Preview */}
                  <div className="relative h-44 rounded-2xl bg-gradient-primary p-5 overflow-hidden shadow-glow">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="absolute top-4 left-4 opacity-20">
                      <div className="w-16 h-16 rounded-full border-4 border-white" />
                      <div className="w-16 h-16 rounded-full border-4 border-white -mt-10 mr-8" />
                    </div>
                    <div className="relative h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-7 bg-amber-400 rounded" />
                        <span className="text-white/80 text-xs font-medium">بطاقة ائتمان</span>
                      </div>
                      <div>
                        <p className="text-white font-mono text-lg tracking-widest mb-2">
                          {cardNum || '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between text-white/80 text-xs">
                          <span>{cardName || 'اسم حامل البطاقة'}</span>
                          <span>{expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">رقم البطاقة *</Label>
                      <Input value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" className="h-11 font-mono text-center text-lg tracking-widest" dir="ltr" maxLength={19} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">اسم حامل البطاقة *</Label>
                      <Input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="AHMED MOHAMED" className="h-11 font-mono" dir="ltr" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">تاريخ الانتهاء *</Label>
                        <Input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className="h-11 font-mono text-center" dir="ltr" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm flex items-center gap-1">CVV * <Lock className="h-3 w-3 text-muted-foreground" /></Label>
                        <Input type="password" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" className="h-11 font-mono text-center" dir="ltr" maxLength={4} />
                      </div>
                    </div>
                  </div>

                  {cardNum && !validateCard(cardNum.replace(/\s/g, '')) && cardNum.replace(/\s/g, '').length === 16 && (
                    <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="h-4 w-4" />رقم البطاقة غير صحيح</div>
                  )}

                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 text-sm text-primary">
                    <Lock className="h-4 w-4 shrink-0" />
                    <span>بياناتك مشفرة بتقنية SSL 256-bit. لن نحتفظ ببيانات بطاقتك.</span>
                  </div>
                </div>
              )}

              {/* ── InstaPay ── */}
              {method === 'instapay' && (
                <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-5 animate-scale-in">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />الدفع عبر InstaPay
                  </h3>

                  <div className="bg-gradient-hero rounded-xl p-5 border border-white/10 text-center space-y-3">
                    <p className="text-white/70 text-sm">حوّل المبلغ على معرف InstaPay</p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="text-accent font-bold text-lg">{EXMPEX_INSTAPAY}</code>
                      <button onClick={() => copyToClipboard(EXMPEX_INSTAPAY)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-white/70" />}
                      </button>
                    </div>
                    <div className="text-3xl font-black text-white">{total.toLocaleString()} ج.م</div>
                    <p className="text-white/50 text-xs">في ملاحظة التحويل اكتب: {itemType === 'course' ? 'COURSE' : 'PRODUCT'}-{itemId}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">معرف InstaPay الخاص بك *</Label>
                    <Input
                      value={instapayId}
                      onChange={e => setInstapayId(e.target.value)}
                      placeholder="مثال: 01012345678@instapay"
                      className="h-11"
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground">سنتواصل معك للتحقق وتفعيل طلبك</p>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800 text-sm text-amber-700 dark:text-amber-400">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>بعد الإرسال ستظهر لك بيانات التحويل لإتمامه من تطبيق البنك.</span>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <Button
                onClick={handlePay}
                disabled={!canPay || loading}
                className="w-full h-13 bg-gradient-primary hover:opacity-90 text-white shadow-glow text-base font-bold transition-all hover:scale-[1.02] py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري المعالجة...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    {method === 'wallet' ? `ادفع من ${walletProviders.find(w => w.id === wallet)?.name}` : method === 'visa' ? 'ادفع بالبطاقة' : 'إرسال طلب InstaPay'}
                    <span className="text-white/80 text-sm">— {total.toLocaleString()} ج.م</span>
                  </span>
                )}
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-2xl p-5 border border-border/50 sticky top-24">
                <h3 className="font-bold text-foreground mb-4">ملخص الطلب</h3>
                <div className="flex items-start gap-3 pb-4 border-b border-border/50 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    {itemType === 'course' ? <span className="text-xl">📚</span> : <span className="text-xl">🛍️</span>}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground leading-snug">{decodeURIComponent(itemName)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{itemType === 'course' ? 'كورس تعليمي' : `منتج × ${qty}`}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>السعر الأساسي</span><span>{itemPrice.toLocaleString()} ج.م</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>رسوم الخدمة (2.5%)</span><span>{fees.toLocaleString()} ج.م</span></div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between font-bold text-base text-foreground"><span>الإجمالي</span><span className="text-primary">{total.toLocaleString()} ج.م</span></div>
                </div>

                {/* Trust */}
                <div className="mt-5 space-y-2">
                  {[
                    { icon: Shield, text: 'دفع آمن ومشفر 100%' },
                    { icon: CheckCircle, text: 'ضمان استرداد خلال 7 أيام' },
                    { icon: Lock, text: 'بياناتك محمية تماماً' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <t.icon className="h-3.5 w-3.5 text-green-500 shrink-0" />{t.text}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-4">
                  {['visa', 'mastercard', 'vodafone', 'instapay'].map(b => (
                    <span key={b} className="text-xs bg-muted px-2 py-1 rounded font-medium text-muted-foreground uppercase">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

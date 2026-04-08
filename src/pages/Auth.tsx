import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import logo from '@/assets/logo.png';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative text-center text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/20">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">ابنِ مستقبلك التقني</h2>
          <p className="text-white/70 text-lg max-w-sm leading-relaxed">
            انضم لآلاف الطلاب الذين غيّروا مسارهم المهني مع EXMPEX Academy
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { value: '10K+', label: 'طالب' },
              { value: '150+', label: 'كورس' },
              { value: '98%', label: 'رضا' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logo} alt="EXMPEX Academy" className="h-12 w-auto mx-auto mb-6 hover:scale-105 transition-transform duration-300" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {mode === 'login' ? 'مرحباً بعودتك!' : 'أنشئ حسابك مجاناً'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' ? 'سجل دخولك للوصول إلى حسابك' : 'ابدأ رحلتك التعليمية اليوم'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-muted p-1 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${mode === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LogIn className="h-4 w-4" />
              تسجيل الدخول
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${mode === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <UserPlus className="h-4 w-4" />
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" placeholder="محمد أحمد" required className="h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/20" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="example@email.com" required className="h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/20" dir="ltr" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                {mode === 'login' && (
                  <Link to="#" className="text-xs text-primary hover:underline">نسيت كلمة المرور؟</Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="h-11 pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirm">تأكيد كلمة المرور</Label>
                <Input id="confirm" type="password" placeholder="••••••••" required className="h-11" dir="ltr" />
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start gap-3 text-sm">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-primary" />
                <span className="text-muted-foreground">
                  أوافق على{' '}
                  <Link to="/terms" className="text-primary hover:underline">الشروط والأحكام</Link>
                  {' '}و{' '}
                  <Link to="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link>
                </span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white shadow-glow transition-all duration-300 hover:shadow-xl text-base font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'جاري الدخول...' : 'جاري الإنشاء...'}
                </span>
              ) : (
                mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

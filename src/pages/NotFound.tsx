import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute top-20 right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative text-center px-4 max-w-xl">
        <div className="text-[10rem] md:text-[14rem] font-black leading-none select-none opacity-0 animate-scale-in" style={{ color: 'hsl(var(--primary) / 0.15)', animationFillMode: 'forwards' }}>
          404
        </div>
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto -mt-10 mb-8 opacity-0 animate-scale-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <Search className="h-10 w-10 text-white/70" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          الصفحة غير موجودة!
        </h1>
        <p className="text-white/60 text-lg mb-10 leading-relaxed opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <Link to="/"><Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 shadow-xl transition-all duration-300 hover:scale-105 gap-2"><Home className="h-4 w-4" />الرئيسية</Button></Link>
          <button onClick={() => window.history.back()}><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 transition-all duration-300 hover:scale-105 gap-2"><ArrowLeft className="h-4 w-4" />العودة</Button></button>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <p className="text-white/40 text-sm mb-4">أو تصفح أحد هذه الصفحات</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[{ label: 'الكورسات', href: '/courses' }, { label: 'الخدمات', href: '/services' }, { label: 'المتجر', href: '/store' }, { label: 'تواصل معنا', href: '/contact' }].map(link => (
              <Link key={link.href} to={link.href} className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm transition-all duration-200 border border-white/10 hover:scale-105">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

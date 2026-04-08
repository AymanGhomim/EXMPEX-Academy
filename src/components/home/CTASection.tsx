import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

      <div className="container relative mx-auto px-4 text-center">
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <Sparkles className="h-4 w-4 text-accent animate-pulse" />
          <span>ابدأ رحلتك التعليمية اليوم</span>
        </div>

        <h2 
          className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight opacity-0 animate-slide-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          هل أنت مستعد لتطوير مهاراتك
          <br />
          <span className="text-gradient">والانطلاق نحو المستقبل؟</span>
        </h2>

        <p 
          className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto opacity-0 animate-slide-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          انضم إلى آلاف الطلاب الذين غيّروا مسارهم المهني معنا. سجل الآن واحصل على خصم 20% على أول كورس.
        </p>

        <div 
          className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-scale-in"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <Link to="/auth?mode=signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              أنشئ حسابك مجاناً
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </Link>
          <Link to="/courses">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg transition-all duration-300 hover:scale-105">
              استعرض الكورسات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

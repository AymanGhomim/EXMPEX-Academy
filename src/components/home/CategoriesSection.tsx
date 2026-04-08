import { Network, Brain, Code2, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

const categories = [
  {
    icon: Code2,
    title: 'Full Stack',
    titleEn: 'Development',
    description: 'أتقن تطوير تطبيقات الويب الكاملة من الواجهة للخادم',
    courses: 48,
    href: '/courses?category=fullstack',
  },
  {
    icon: Brain,
    title: 'الذكاء الاصطناعي',
    titleEn: 'AI',
    description: 'اكتشف عالم تعلم الآلة والذكاء الاصطناعي والتعلم العميق',
    courses: 42,
    href: '/courses?category=ai',
  },
  {
    icon: Network,
    title: 'الشبكات',
    titleEn: 'Networks',
    description: 'تعلم إدارة الشبكات والأمن السيبراني من الصفر حتى الاحتراف',
    courses: 35,
    href: '/courses?category=networks',
  },
  {
    icon: Palette,
    title: 'التصميم الجرافيكي',
    titleEn: 'Design',
    description: 'أطلق إبداعك في التصميم الجرافيكي وتصميم واجهات المستخدم',
    courses: 28,
    href: '/courses?category=design',
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <SectionHeader
            badge="تصنيفات الكورسات"
            title="اختر مسارك التعليمي"
            description="نقدم لك مجموعة متنوعة من التخصصات التقنية المطلوبة في سوق العمل"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.href}
              className="group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-2 opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Background Gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 group-hover:opacity-20 transition-all duration-500 blur-3xl bg-gradient-to-br from-primary via-secondary to-accent" />

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-primary shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <category.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm text-primary mb-3">{category.titleEn}</p>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {category.courses} كورس
                </span>
                <span className="text-primary font-medium group-hover:translate-x-[-8px] transition-transform duration-300">
                  استكشف ←
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

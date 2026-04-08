import { Brain, Globe, Workflow } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceCard } from '@/components/cards/ServiceCard';

const services = [
  {
    icon: Brain,
    title: 'حلول الذكاء الاصطناعي',
    description: 'نطور حلول ذكاء اصطناعي مخصصة تناسب احتياجات عملك وتساعدك على اتخاذ قرارات أفضل.',
    features: [
      'تحليل البيانات الضخمة',
      'أنظمة التوصيات الذكية',
      'معالجة اللغة الطبيعية',
      'الرؤية الحاسوبية',
    ],
    href: '/services#ai',
  },
  {
    icon: Globe,
    title: 'تصميم وتطوير المواقع',
    description: 'نصمم ونطور مواقع وتطبيقات ويب عصرية وسريعة تعكس هوية علامتك التجارية.',
    features: [
      'تصميم واجهات مستخدم جذابة',
      'تطوير تطبيقات ويب متقدمة',
      'متاجر إلكترونية متكاملة',
      'تحسين محركات البحث SEO',
    ],
    href: '/services#web',
  },
  {
    icon: Workflow,
    title: 'أتمتة الأعمال والعمليات',
    description: 'نساعدك على أتمتة العمليات الروتينية لتوفير الوقت والجهد وزيادة الإنتاجية.',
    features: [
      'أتمتة سير العمل',
      'تكامل الأنظمة والتطبيقات',
      'روبوتات الدردشة الذكية',
      'تقارير وتحليلات آلية',
    ],
    href: '/services#automation',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <SectionHeader
            badge="خدماتنا"
            title="حلول تقنية متكاملة لنمو أعمالك"
            description="نقدم خدمات تقنية احترافية تساعدك على التحول الرقمي وتحقيق أهدافك"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.2 + index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

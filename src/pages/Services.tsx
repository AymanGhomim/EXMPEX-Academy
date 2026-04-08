import { Brain, Globe, Workflow, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'حلول الذكاء الاصطناعي',
    description: 'نطور حلول ذكاء اصطناعي مخصصة تناسب احتياجات عملك وتساعدك على اتخاذ قرارات أفضل وتحسين الكفاءة التشغيلية.',
    features: [
      'تحليل البيانات الضخمة واستخراج الرؤى',
      'أنظمة التوصيات الذكية للمنتجات والمحتوى',
      'معالجة اللغة الطبيعية العربية والإنجليزية',
      'الرؤية الحاسوبية والتعرف على الصور',
      'روبوتات الدردشة الذكية المدعومة بـ AI',
      'نماذج التنبؤ والتحليل التنبؤي',
    ],
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'تصميم وتطوير المواقع',
    description: 'نصمم ونطور مواقع وتطبيقات ويب عصرية وسريعة تعكس هوية علامتك التجارية وتحقق أهدافك التجارية.',
    features: [
      'تصميم واجهات مستخدم جذابة وسهلة الاستخدام',
      'تطوير تطبيقات ويب متقدمة بأحدث التقنيات',
      'متاجر إلكترونية متكاملة مع بوابات الدفع',
      'تحسين محركات البحث SEO',
      'تطبيقات الجوال الهجينة',
      'لوحات تحكم إدارية مخصصة',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'أتمتة الأعمال والعمليات',
    description: 'نساعدك على أتمتة العمليات الروتينية لتوفير الوقت والجهد وزيادة الإنتاجية وتقليل الأخطاء البشرية.',
    features: [
      'أتمتة سير العمل وإجراءات الموافقات',
      'تكامل الأنظمة والتطبيقات المختلفة',
      'روبوتات أتمتة العمليات RPA',
      'أتمتة التقارير والتحليلات',
      'إدارة المستندات والأرشفة الإلكترونية',
      'أتمتة التسويق والمبيعات',
    ],
    gradient: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop',
  },
];

const stats = [
  { value: '500+', label: 'مشروع منجز' },
  { value: '200+', label: 'عميل سعيد' },
  { value: '50+', label: 'خبير تقني' },
  { value: '5+', label: 'سنوات خبرة' },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container relative mx-auto px-4 text-center">
          <SectionHeader
            badge="خدماتنا التقنية"
            title="حلول تقنية متكاملة لنمو أعمالك"
            description="نقدم خدمات تقنية احترافية تساعدك على التحول الرقمي وتحقيق أهدافك بكفاءة عالية"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                  index % 2 === 1 && "lg:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-lg",
                    service.gradient
                  )}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white">
                      اطلب الخدمة
                      <ArrowLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                </div>

                {/* Image */}
                <div className={cn(
                  "relative",
                  index % 2 === 1 ? "lg:order-1" : ""
                )}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className={cn(
                      "absolute inset-0 opacity-20 bg-gradient-to-br",
                      service.gradient
                    )} />
                  </div>
                  {/* Decorative */}
                  <div className={cn(
                    "absolute -z-10 w-full h-full top-6 rounded-2xl bg-gradient-to-br opacity-30 blur-xl",
                    service.gradient,
                    index % 2 === 0 ? "left-6" : "right-6"
                  )} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            هل لديك مشروع في ذهنك؟
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم لنناقش كيف يمكننا مساعدتك في تحقيق أهدافك التقنية
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white h-14 px-8">
              تواصل معنا الآن
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;

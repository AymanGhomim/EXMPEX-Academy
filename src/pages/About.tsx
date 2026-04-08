import { Target, Award, Zap, Code, Brain, Palette } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Target,
    title: 'رؤيتنا',
    description: 'أن نكون المنصة الرائدة في التعليم التقني والخدمات الرقمية في مصر والمنطقة العربية.',
  },
  {
    icon: Zap,
    title: 'رسالتنا',
    description: 'تمكين الأفراد والمؤسسات من خلال التعليم التقني المتميز والحلول الرقمية المبتكرة.',
  },
  {
    icon: Award,
    title: 'قيمنا',
    description: 'الجودة، الابتكار، الشفافية، والتميز في كل ما نقدمه لعملائنا ومجتمعنا.',
  },
];

const team = [
  {
    name: 'سامح العدولي',
    role: 'Full Stack Instructor',
    icon: Code,
  },
  {
    name: 'محمد طلال',
    role: 'AI Instructor',
    icon: Brain,
  },
  {
    name: 'أنس',
    role: 'Graphic & Motion Designer',
    icon: Palette,
  },
];

const stats = [
  { value: '10,000+', label: 'طالب مسجل' },
  { value: '150+', label: 'كورس تعليمي' },
  { value: '500+', label: 'مشروع منجز' },
  { value: '5+', label: 'سنوات خبرة' },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container relative mx-auto px-4 text-center">
          <SectionHeader
            badge="من نحن"
            title="نبني المستقبل التقني معاً"
            description="منذ 2019 ونحن نسعى لتمكين الأفراد والمؤسسات من خلال التعليم التقني والحلول الرقمية"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-slide-right" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  بدأت EXMPEX Academy في عام 2019 برؤية واضحة: سد الفجوة بين التعليم الأكاديمي ومتطلبات سوق العمل التقني في مصر والمنطقة العربية.
                </p>
                <p>
                  انطلقنا بفريق صغير من المتحمسين للتقنية والتعليم، وكانت البداية بتقديم دورات في البرمجة والذكاء الاصطناعي. اليوم، نفخر بأننا أصبحنا منصة شاملة تقدم أكثر من 150 كورس تقني.
                </p>
                <p>
                  لم نكتفِ بالتعليم فقط، بل توسعنا لتقديم خدمات تقنية متكاملة تشمل الذكاء الاصطناعي وتطوير المواقع وأتمتة الأعمال، إضافة إلى متجر إلكتروني يوفر أحدث الأجهزة والمستلزمات التقنية.
                </p>
              </div>
            </div>
            <div className="relative opacity-0 animate-slide-left" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                  alt="فريق العمل"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute -z-10 w-full h-full top-6 left-6 rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-30 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="ما يميزنا"
            description="قيم راسخة تقودنا نحو التميز والابتكار"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border/50 text-center hover-lift opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-primary shadow-lg">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="فريقنا"
            description="نخبة من الخبراء المتخصصين في مجالات التقنية والتعليم"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                {/* Vector Illustration Placeholder */}
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-glow opacity-50" />
                  <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                    <member.icon className="h-16 w-16 text-white" />
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-primary/10 animate-float" />
                  <div className="absolute bottom-12 left-12 w-10 h-10 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-secondary/15 animate-float" style={{ animationDelay: '1s' }} />
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-bold text-foreground text-lg mb-1">{member.name}</h4>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

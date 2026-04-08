import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    value: 'info@exmpex.com',
    description: 'راسلنا في أي وقت',
  },
  {
    icon: Phone,
    title: 'الهاتف',
    value: '+20 10 XXX XXXX',
    description: 'متاحون من 9 صباحاً - 6 مساءً',
  },
  {
    icon: MapPin,
    title: 'العنوان',
    value: 'كفر الشيخ، مصر',
    description: 'أمام البنك الأهلي',
  },
  {
    icon: Clock,
    title: 'ساعات العمل',
    value: 'السبت - الخميس',
    description: '9:00 ص - 6:00 م',
  },
];

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('تم إرسال رسالتك بنجاح!', {
      description: 'سنتواصل معك في أقرب وقت ممكن.',
    });
    
    setIsLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container relative mx-auto px-4 text-center">
          <SectionHeader
            badge="تواصل معنا"
            title="نحن هنا لمساعدتك"
            description="لديك سؤال أو استفسار؟ فريقنا جاهز للرد على جميع استفساراتك"
          />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50 hover-lift opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                  <p className="text-foreground font-medium">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div 
              className="bg-card rounded-2xl p-8 border border-border/50 hover-glow opacity-0 animate-slide-right"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">أرسل رسالة</h3>
                  <p className="text-sm text-muted-foreground">سنرد عليك خلال 24 ساعة</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" placeholder="أدخل اسمك" required className="transition-all duration-300 focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="example@email.com" required className="transition-all duration-300 focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" type="tel" placeholder="+20 1X XXX XXXX" className="transition-all duration-300 focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Select>
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="اختر الموضوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="courses">استفسار عن الكورسات</SelectItem>
                        <SelectItem value="services">طلب خدمة</SelectItem>
                        <SelectItem value="store">استفسار عن المتجر</SelectItem>
                        <SelectItem value="support">الدعم الفني</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-white transition-all duration-300 hover:shadow-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>جاري الإرسال...</>
                  ) : (
                    <>
                      إرسال الرسالة
                      <Send className="h-5 w-5 mr-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map */}
            <div 
              className="bg-card rounded-2xl overflow-hidden border border-border/50 h-full min-h-[500px] hover-lift opacity-0 animate-slide-left"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27254.56970559887!2d30.916849!3d31.111111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9dc6a5e7f3f7f%3A0x4c8d6d7e8f9e0a1b!2sKafr%20El-Sheikh%2C%20Egypt!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعنا على الخريطة - كفر الشيخ، مصر"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="opacity-0 animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              لديك أسئلة شائعة؟
            </h3>
            <p className="text-muted-foreground mb-6">
              تصفح قسم الأسئلة الشائعة للحصول على إجابات سريعة
            </p>
            <Button variant="outline" size="lg" className="hover-scale">
              الأسئلة الشائعة
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

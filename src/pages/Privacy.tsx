import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const sections = [
  { title: '1. المعلومات التي نجمعها', content: 'نجمع المعلومات التي تقدمها عند إنشاء حساب مثل الاسم والبريد الإلكتروني ورقم الهاتف. كما نجمع بيانات الاستخدام والنشاط على المنصة لتحسين تجربتك.' },
  { title: '2. كيف نستخدم معلوماتك', content: 'نستخدم معلوماتك لتقديم وتحسين خدماتنا، وإرسال تحديثات مهمة، وتخصيص تجربة التعلم لك. لن نبيع معلوماتك أبداً لأطراف ثالثة.' },
  { title: '3. حماية البيانات', content: 'نستخدم تقنيات تشفير متقدمة (SSL/TLS) لحماية بياناتك. يتم تخزين البيانات على خوادم آمنة ومحمية وفق أعلى معايير الأمان الدولية.' },
  { title: '4. حقوقك', content: 'يحق لك في أي وقت طلب الاطلاع على بياناتك، تصحيحها، أو حذفها. يمكنك التواصل معنا عبر info@exmpex.com لممارسة هذه الحقوق.' },
  { title: '5. ملفات الكوكيز', content: 'نستخدم ملفات الكوكيز لتحسين تجربتك وتذكر تفضيلاتك. يمكنك تعطيل الكوكيز من إعدادات متصفحك، لكن قد يؤثر ذلك على بعض وظائف الموقع.' },
  { title: '6. تواصل معنا', content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا على البريد الإلكتروني: info@exmpex.com أو الاتصال على رقم +20 10 XXX XXXX.' },
];

const Privacy = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto px-4 text-center">
        <SectionHeader badge="قانوني" title="سياسة الخصوصية" description="نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية" />
      </div>
    </section>

    <section className="py-16 md:py-24 bg-background" dir="rtl">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-muted-foreground text-sm mb-10 bg-muted/50 rounded-xl p-4 border border-border/50">
          📅 آخر تحديث: يناير 2025
        </p>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border/50 hover-lift">
              <h2 className="text-lg font-bold mb-3 text-primary">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Privacy;

import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const sections = [
  { title: '1. قبول الشروط', content: 'باستخدامك لمنصة EXMPEX Academy، فأنت توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.' },
  { title: '2. الاستخدام المقبول', content: 'يُسمح باستخدام المنصة للأغراض التعليمية المشروعة فقط. يُحظر نسخ أو توزيع المحتوى دون إذن مسبق كتابي من الإدارة. يُحظر استخدام المنصة لأي غرض غير قانوني أو ضار بالآخرين.' },
  { title: '3. الملكية الفكرية', content: 'جميع المحتويات على المنصة محمية بحقوق النشر وتعود ملكيتها إلى EXMPEX Academy أو مزودي المحتوى المعنيين. لا يجوز إعادة استخدام أي محتوى دون إذن صريح ومسبق.' },
  { title: '4. سياسة الاسترداد', content: 'يمكن طلب استرداد المبلغ خلال 7 أيام من تاريخ الشراء في حالة عدم الرضا. لا يُقبل طلب الاسترداد بعد استكمال أكثر من 30% من محتوى الكورس.' },
  { title: '5. المسؤولية', content: 'لا تتحمل EXMPEX Academy المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة أو المحتوى المقدم فيها.' },
  { title: '6. التعديلات على الشروط', content: 'تحتفظ EXMPEX Academy بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار على المنصة.' },
];

const Terms = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto px-4 text-center">
        <SectionHeader badge="قانوني" title="الشروط والأحكام" description="يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة" />
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

export default Terms;

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { CourseCard } from '@/components/cards/CourseCard';

const featuredCourses = [
  {
    id: '1',
    title: 'Full Stack Development مع React و Node.js',
    description: 'بناء تطبيقات ويب كاملة من الواجهة إلى الخادم باحترافية',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop',
    instructor: 'سامح العدولي',
    duration: '80 ساعة',
    students: 3200,
    rating: 4.9,
    price: 2999,
    originalPrice: 4499,
    category: 'Full Stack',
    level: 'متقدم' as const,
  },
  {
    id: '2',
    title: 'الذكاء الاصطناعي وتعلم الآلة مع Python',
    description: 'من الصفر إلى بناء نماذج ذكاء اصطناعي متقدمة',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    instructor: 'محمد طلال',
    duration: '60 ساعة',
    students: 1890,
    rating: 4.8,
    price: 2499,
    originalPrice: 3999,
    category: 'الذكاء الاصطناعي',
    level: 'متوسط' as const,
  },
  {
    id: '3',
    title: 'دورة الشبكات الاحترافية - CCNA Complete',
    description: 'تعلم أساسيات الشبكات والحصول على شهادة CCNA من سيسكو',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    instructor: 'م. أحمد الخالدي',
    duration: '40 ساعة',
    students: 2450,
    rating: 4.9,
    price: 1999,
    originalPrice: 2999,
    category: 'الشبكات',
    level: 'مبتدئ' as const,
  },
];

export function FeaturedCoursesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="opacity-0 animate-slide-right" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <SectionHeader
              badge="الكورسات المميزة"
              title="أحدث الكورسات وأكثرها طلباً"
              description="اختر من بين مجموعة منتقاة من أفضل الكورسات التقنية"
              align="right"
            />
          </div>
          <Link to="/courses" className="opacity-0 animate-slide-left" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <Button variant="outline" className="shrink-0 hover:scale-105 transition-all duration-300">
              عرض جميع الكورسات
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div 
              key={course.id}
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.3 + index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';
import { CourseCard } from '@/components/cards/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'الكل', count: 150 },
  { id: 'fullstack', name: 'Full Stack', count: 48 },
  { id: 'ai', name: 'الذكاء الاصطناعي', count: 42 },
  { id: 'networks', name: 'الشبكات', count: 35 },
  { id: 'design', name: 'التصميم الجرافيكي', count: 28 },
];

const courses = [
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
  {
    id: '4',
    title: 'تصميم واجهات المستخدم UI/UX',
    description: 'تعلم أساسيات تصميم تجربة المستخدم وواجهات التطبيقات',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    instructor: 'أنس',
    duration: '35 ساعة',
    students: 1560,
    rating: 4.7,
    price: 1499,
    category: 'التصميم الجرافيكي',
    level: 'مبتدئ' as const,
  },
  {
    id: '5',
    title: 'أمن الشبكات والاختراق الأخلاقي',
    description: 'تعلم تقنيات الحماية واختبار الاختراق الأخلاقي',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
    instructor: 'م. فهد السعيد',
    duration: '55 ساعة',
    students: 980,
    rating: 4.9,
    price: 2299,
    originalPrice: 2999,
    category: 'الشبكات',
    level: 'متقدم' as const,
  },
  {
    id: '6',
    title: 'ChatGPT و Prompt Engineering',
    description: 'إتقان فن التحدث مع الذكاء الاصطناعي وهندسة المطالبات',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&auto=format&fit=crop',
    instructor: 'محمد طلال',
    duration: '20 ساعة',
    students: 4200,
    rating: 4.8,
    price: 999,
    category: 'الذكاء الاصطناعي',
    level: 'مبتدئ' as const,
  },
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="opacity-0 animate-scale-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <SectionHeader
              badge="مكتبة الكورسات"
              title="اكتشف أكثر من 150 كورس تقني"
              description="كورسات احترافية مصممة بعناية لتأخذك من المبتدئ إلى المحترف"
            />
          </div>
          <p className="text-white/80 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>جميع المحتويات متاحة بالعربية</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border/50 sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن كورس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category.name}
                  <span className="mr-1 opacity-60">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <Select defaultValue="popular">
              <SelectTrigger className="w-48 transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">الأكثر شعبية</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                <SelectItem value="rating">التقييم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.id}
                  className="opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <CourseCard {...course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
              <p className="text-xl text-muted-foreground">لم يتم العثور على كورسات تطابق بحثك</p>
              <Button
                variant="outline"
                className="mt-4 hover:scale-105 transition-transform"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                إعادة تعيين البحث
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;

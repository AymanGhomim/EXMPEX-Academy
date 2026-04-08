import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, Users, Star, Play, CheckCircle, Lock, ChevronDown,
  ChevronUp, Globe, RefreshCw, Award, ArrowLeft, Heart,
  Share2, BookOpen, BarChart2, ShoppingCart,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/data/courses';
import { cn } from '@/lib/utils';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [wishlisted, setWishlisted] = useState(false);

  if (!course) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <p className="text-5xl mb-4">📚</p>
            <h2 className="text-2xl font-bold mb-3">الكورس غير موجود</h2>
            <Link to="/courses"><Button className="bg-gradient-primary text-white">تصفح الكورسات</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const totalLessons = course.curriculum.reduce((a, s) => a + s.lessons.length, 0);
  const discount = course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : 0;
  const related = courses.filter(c => c.id !== course.id && c.category === course.category).slice(0, 3);

  const levelColor = { 'مبتدئ': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', 'متوسط': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400', 'متقدم': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }[course.level];

  return (
    <Layout>
      <div dir="rtl">
        {/* ── Hero ── */}
        <section className="bg-gradient-hero relative overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-glow" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              {/* Info */}
              <div className="lg:col-span-2">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-white/50 text-sm mb-5">
                  <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
                  <span>/</span>
                  <Link to="/courses" className="hover:text-white transition-colors">الكورسات</Link>
                  <span>/</span>
                  <span className="text-white/80 truncate max-w-[200px]">{course.title}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className="bg-accent/20 text-accent border-0">{course.category}</Badge>
                  <Badge className={cn('border-0', levelColor)}>{course.level}</Badge>
                  {course.tags.slice(0, 3).map(t => <Badge key={t} variant="outline" className="border-white/20 text-white/70 text-xs">{t}</Badge>)}
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
                <p className="text-white/70 text-lg mb-6 leading-relaxed">{course.longDescription}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-5 text-white/80 text-sm mb-6">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-amber-400">{course.rating}</span>
                    <span className="text-white/50">({course.reviewsCount.toLocaleString()} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" /><span>{course.students.toLocaleString()} طالب</span></div>
                  <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" /><span>{course.duration}</span></div>
                  <div className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-accent" /><span>{course.language}</span></div>
                  <div className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4 text-accent" /><span>آخر تحديث: {course.lastUpdated}</span></div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <img src={course.instructorImage} alt={course.instructor} className="w-11 h-11 rounded-full object-cover border-2 border-accent/50" />
                  <div>
                    <p className="text-white font-semibold text-sm">{course.instructor}</p>
                    <p className="text-white/60 text-xs">{course.instructorTitle}</p>
                  </div>
                </div>
              </div>

              {/* Sticky Purchase Card */}
              <div className="hidden lg:block">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl sticky top-24">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </button>
                    </div>
                    <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-lg">معاينة مجانية</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-black text-primary">{course.price.toLocaleString()} ج.م</span>
                      {course.originalPrice && <>
                        <span className="text-lg text-muted-foreground line-through">{course.originalPrice.toLocaleString()}</span>
                        <Badge className="bg-red-100 text-red-600 border-0 text-xs font-bold">-{discount}%</Badge>
                      </>}
                    </div>
                    <Button onClick={() => navigate(`/checkout?type=course&id=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`)} className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white shadow-glow text-base font-bold mb-3 transition-all hover:scale-105">
                      سجل الآن
                    </Button>
                    <Button variant="outline" className="w-full h-10 mb-4 gap-2" onClick={() => setWishlisted(!wishlisted)}>
                      <Heart className={cn('h-4 w-4 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : '')} />
                      {wishlisted ? 'تمت الإضافة للمفضلة' : 'أضف للمفضلة'}
                    </Button>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {[`${totalLessons} درس`, course.duration, 'وصول مدى الحياة', 'شهادة إتمام', 'ضمان استرداد 7 أيام'].map((f, i) => (
                        <div key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0" />{f}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mobile Purchase Card ── */}
        <div className="lg:hidden bg-card border-b border-border/50 p-4 sticky top-16 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-primary">{course.price.toLocaleString()} ج.م</span>
              {course.originalPrice && <span className="text-sm text-muted-foreground line-through">{course.originalPrice.toLocaleString()}</span>}
            </div>
            <Button onClick={() => navigate(`/checkout?type=course&id=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`)} className="bg-gradient-primary hover:opacity-90 text-white shadow-glow font-bold px-6">
              سجل الآن
            </Button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">

              {/* Outcomes */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />ما ستتعلمه
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.outcomes.map((o, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{o}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curriculum */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />محتوى الكورس
                </h2>
                <p className="text-muted-foreground text-sm mb-5">{course.curriculum.length} أقسام · {totalLessons} درس · {course.duration}</p>
                <div className="space-y-3">
                  {course.curriculum.map((section, si) => (
                    <div key={si} className="border border-border/50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenSection(openSection === si ? null : si)}
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/60 transition-colors text-right"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground text-sm">{section.title}</span>
                          <span className="text-xs text-muted-foreground">{section.lessons.length} دروس</span>
                        </div>
                        {openSection === si ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                      </button>
                      {openSection === si && (
                        <div className="divide-y divide-border/30">
                          {section.lessons.map((lesson, li) => (
                            <div key={li} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
                              {lesson.preview ? (
                                <Play className="h-4 w-4 text-primary shrink-0" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                              )}
                              <span className={cn('flex-1 text-sm', lesson.preview ? 'text-primary font-medium' : 'text-muted-foreground')}>{lesson.title}</span>
                              {lesson.preview && <Badge className="bg-primary/10 text-primary border-0 text-xs">معاينة</Badge>}
                              <span className="text-xs text-muted-foreground whitespace-nowrap">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Requirements */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />المتطلبات
                </h2>
                <ul className="space-y-2">
                  {course.requirements.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Instructor */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />المحاضر
                </h2>
                <div className="flex items-start gap-4">
                  <img src={course.instructorImage} alt={course.instructor} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{course.instructor}</h3>
                    <p className="text-primary text-sm mb-3">{course.instructorTitle}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{course.rating} تقييم</span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.students.toLocaleString()} طالب</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Related */}
            <div className="space-y-5">
              <h3 className="font-bold text-foreground">كورسات مشابهة</h3>
              {related.map(c => (
                <Link key={c.id} to={`/courses/${c.id}`} className="group flex gap-3 bg-card rounded-xl p-3 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
                  <img src={c.image} alt={c.title} className="w-24 h-16 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">{c.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
                    <p className="text-sm font-bold text-primary mt-1">{c.price.toLocaleString()} ج.م</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="sticky bottom-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border/50 p-4 lg:hidden">
          <div className="container mx-auto">
            <Button onClick={() => navigate(`/checkout?type=course&id=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`)} className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white shadow-glow text-base font-bold">
              سجل الآن — {course.price.toLocaleString()} ج.م
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductCard } from '@/components/cards/ProductCard';
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
  { id: 'all', name: 'الكل', count: 45 },
  { id: 'laptops', name: 'لابتوبات', count: 18 },
  { id: 'accessories', name: 'إكسسوارات', count: 15 },
  { id: 'bags', name: 'شنط لابتوب', count: 12 },
];

const products = [
  {
    id: '1',
    name: 'لابتوب Dell XPS 15',
    description: 'لابتوب احترافي للمبرمجين والمصممين مع شاشة 4K OLED',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop',
    price: 45999,
    originalPrice: 54999,
    rating: 4.8,
    reviewsCount: 156,
    category: 'لابتوبات',
    inStock: true,
    isNew: true,
    discount: 17,
  },
  {
    id: '2',
    name: 'ماوس Logitech MX Master 3',
    description: 'ماوس لاسلكي احترافي مريح للاستخدام الطويل',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop',
    price: 2799,
    rating: 4.9,
    reviewsCount: 89,
    category: 'إكسسوارات',
    inStock: true,
  },
  {
    id: '3',
    name: 'شنطة لابتوب احترافية',
    description: 'شنطة أنيقة ومتينة مع جيوب متعددة للابتوب حتى 17 إنش',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop',
    price: 1799,
    originalPrice: 2399,
    rating: 4.7,
    reviewsCount: 234,
    category: 'شنط لابتوب',
    inStock: true,
    discount: 25,
  },
  {
    id: '4',
    name: 'لابتوب MacBook Pro M3',
    description: 'أحدث إصدار من ماك بوك برو بمعالج M3 القوي',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
    price: 62999,
    rating: 4.9,
    reviewsCount: 312,
    category: 'لابتوبات',
    inStock: false,
    isNew: true,
  },
  {
    id: '5',
    name: 'لوحة مفاتيح ميكانيكية',
    description: 'لوحة مفاتيح ميكانيكية RGB للألعاب والبرمجة',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop',
    price: 3699,
    originalPrice: 4599,
    rating: 4.6,
    reviewsCount: 78,
    category: 'إكسسوارات',
    inStock: true,
    discount: 20,
  },
  {
    id: '6',
    name: 'شنطة ظهر للابتوب',
    description: 'شنطة ظهر مقاومة للماء مع منفذ USB للشحن',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop',
    price: 1499,
    rating: 4.5,
    reviewsCount: 156,
    category: 'شنط لابتوب',
    inStock: true,
  },
  {
    id: '7',
    name: 'لابتوب Lenovo ThinkPad',
    description: 'لابتوب أعمال موثوق مع معالج Intel الجيل الأحدث',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop',
    price: 33999,
    rating: 4.7,
    reviewsCount: 98,
    category: 'لابتوبات',
    inStock: true,
  },
  {
    id: '8',
    name: 'سماعات Sony WH-1000XM5',
    description: 'سماعات لاسلكية بتقنية إلغاء الضوضاء',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
    price: 8999,
    originalPrice: 10999,
    rating: 4.9,
    reviewsCount: 267,
    category: 'إكسسوارات',
    inStock: true,
    discount: 17,
  },
];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
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
              badge="المتجر الإلكتروني"
              title="تسوق أحدث المنتجات التقنية"
              description="لابتوبات، إكسسوارات، وشنط بأفضل الأسعار مع ضمان الجودة"
            />
          </div>
          <p className="text-white/80 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            جميع الأسعار بالجنيه المصري (ج.م) 🇪🇬
          </p>
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
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
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

      {/* Products Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
              <p className="text-xl text-muted-foreground">لم يتم العثور على منتجات تطابق بحثك</p>
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

export default Store;

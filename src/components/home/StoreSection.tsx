import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductCard } from '@/components/cards/ProductCard';

const featuredProducts = [
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
];

export function StoreSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="opacity-0 animate-slide-right" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <SectionHeader
              badge="المتجر"
              title="تسوق أحدث المنتجات التقنية"
              description="لابتوبات، إكسسوارات، وشنط بأفضل الأسعار"
              align="right"
            />
          </div>
          <Link to="/store" className="opacity-0 animate-slide-left" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <Button variant="outline" className="shrink-0 hover:scale-105 transition-all duration-300">
              تصفح المتجر
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';

const Cart = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container relative mx-auto px-4 text-center">
          <SectionHeader
            badge="سلة التسوق"
            title="سلة مشترياتك"
            description="راجع الكورسات والمنتجات التي اخترتها"
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl" dir="rtl">
          {/* Empty State */}
          <div className="text-center py-24 bg-card rounded-2xl border border-border/50">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">سلة التسوق فارغة</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              لم تضف أي منتجات أو كورسات بعد. ابدأ التسوق الآن!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/courses">
                <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow hover-scale gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  تصفح الكورسات
                </Button>
              </Link>
              <Link to="/store">
                <Button variant="outline" className="hover-scale gap-2">
                  تصفح المتجر
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;

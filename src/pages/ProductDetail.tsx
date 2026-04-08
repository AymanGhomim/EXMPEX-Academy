import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, ShoppingCart, Heart, Shield, Truck, RefreshCw,
  CheckCircle, Minus, Plus, Share2, ArrowLeft, Tag,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-2xl font-bold mb-3">المنتج غير موجود</h2>
            <Link to="/store"><Button className="bg-gradient-primary text-white">تصفح المتجر</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const totalPrice = product.price * qty;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Layout>
      <div dir="rtl" className="pb-20 lg:pb-0">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border/50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link to="/store" className="hover:text-primary transition-colors">المتجر</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

            {/* Images */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-muted/30 aspect-square border border-border/50">
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && <Badge className="absolute top-4 right-4 bg-accent text-white border-0">جديد</Badge>}
                {product.discount && <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">-{product.discount}%</Badge>}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl font-bold text-muted-foreground">نفذت الكمية</span>
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={cn('w-20 h-20 rounded-xl overflow-hidden border-2 transition-all', selectedImage === i ? 'border-primary shadow-glow' : 'border-border/50 hover:border-primary/50')}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                  {product.inStock
                    ? <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><CheckCircle className="h-3.5 w-3.5" />متاح</span>
                    : <span className="text-xs text-red-500 font-medium">نفذت الكمية</span>}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>
                <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn('h-4 w-4', i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted')} />
                  ))}
                </div>
                <span className="text-sm font-bold text-amber-500">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewsCount.toLocaleString()} تقييم)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div>
                  <span className="text-3xl font-black text-primary">{product.price.toLocaleString()}</span>
                  <span className="text-lg text-primary mr-1">ج.م</span>
                </div>
                {product.originalPrice && (
                  <div>
                    <span className="text-lg text-muted-foreground line-through">{product.originalPrice.toLocaleString()} ج.م</span>
                    <Badge className="bg-red-100 text-red-600 border-0 text-xs font-bold mr-2">توفير {(product.originalPrice - product.price).toLocaleString()} ج.م</Badge>
                  </div>
                )}
              </div>

              {/* Quantity */}
              {product.inStock && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">الكمية:</span>
                  <div className="flex items-center border border-border rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-foreground">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-foreground">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-foreground">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">الإجمالي: <span className="font-bold text-primary">{totalPrice.toLocaleString()} ج.م</span></span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate(`/checkout?type=product&id=${product.id}&name=${encodeURIComponent(product.name)}&price=${totalPrice}&qty=${qty}`)}
                  disabled={!product.inStock}
                  className="h-13 bg-gradient-primary hover:opacity-90 text-white shadow-glow text-base font-bold transition-all hover:scale-[1.02] py-3"
                >
                  <ShoppingCart className="h-5 w-5 ml-2" />
                  {product.inStock ? `اشتري الآن — ${totalPrice.toLocaleString()} ج.م` : 'نفذت الكمية'}
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-11 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                    {addedToCart ? <><CheckCircle className="h-4 w-4 text-green-500" />تمت الإضافة!</> : <><ShoppingCart className="h-4 w-4" />أضف للسلة</>}
                  </Button>
                  <Button variant="outline" className="h-11 w-11 p-0" onClick={() => setWishlisted(!wishlisted)}>
                    <Heart className={cn('h-4 w-4 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : '')} />
                  </Button>
                  <Button variant="outline" className="h-11 w-11 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: product.warranty, sub: 'ضمان رسمي' },
                  { icon: Truck, label: 'توصيل سريع', sub: '2-5 أيام' },
                  { icon: RefreshCw, label: 'استرداد', sub: 'خلال 14 يوم' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 bg-muted/30 rounded-xl border border-border/50">
                    <b.icon className="h-5 w-5 text-primary mb-1.5" />
                    <span className="text-xs font-semibold text-foreground">{b.label}</span>
                    <span className="text-xs text-muted-foreground">{b.sub}</span>
                  </div>
                ))}
              </div>

              {/* SKU */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                <span>رمز المنتج: <code className="bg-muted px-1.5 py-0.5 rounded font-mono">{product.sku}</code></span>
              </div>
            </div>
          </div>

          {/* Specs + Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-primary flex items-center justify-center"><span className="text-white text-xs">⚙</span></span>
                المواصفات التقنية
              </h2>
              <div className="space-y-0 divide-y divide-border/30">
                {product.specs.map((s, i) => (
                  <div key={i} className="flex items-center py-3 gap-4">
                    <span className="text-sm text-muted-foreground w-32 shrink-0">{s.label}</span>
                    <span className="text-sm font-medium text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                المميزات الرئيسية
              </h2>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-5">منتجات مشابهة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map(p => (
                  <Link key={p.id} to={`/store/${p.id}`} className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">{p.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-primary">{p.price.toLocaleString()} ج.م</span>
                        {p.originalPrice && <span className="text-xs text-muted-foreground line-through">{p.originalPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Mobile */}
        <div className="fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border/50 p-4 lg:hidden">
          <Button
            onClick={() => navigate(`/checkout?type=product&id=${product.id}&name=${encodeURIComponent(product.name)}&price=${totalPrice}&qty=${qty}`)}
            disabled={!product.inStock}
            className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white shadow-glow font-bold text-base"
          >
            <ShoppingCart className="h-5 w-5 ml-2" />
            {product.inStock ? `اشتري الآن — ${totalPrice.toLocaleString()} ج.م` : 'نفذت الكمية'}
          </Button>
        </div>
      </div>
    </Layout>
  );
}

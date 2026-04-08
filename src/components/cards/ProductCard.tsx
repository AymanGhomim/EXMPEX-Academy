import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  className?: string;
}

export function ProductCard({
  id,
  name,
  description,
  image,
  price,
  originalPrice,
  rating,
  reviewsCount,
  category,
  inStock,
  isNew,
  discount,
  className,
}: ProductCardProps) {
  return (
    <div className={cn(
      "group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2",
      className
    )}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground animate-bounce-soft">جديد</Badge>
          )}
          {discount && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:scale-110 transition-transform">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
            <span className="text-muted-foreground font-medium">نفذت الكمية</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Badge variant="outline" className="text-xs mb-3">
          {category}
        </Badge>

        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          <Link to={`/store/${id}`}>{name}</Link>
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewsCount})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{price.toLocaleString()} ج.م</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()} ج.م
              </span>
            )}
          </div>
          <Button
            size="sm"
            disabled={!inStock}
            className="bg-gradient-primary hover:opacity-90 text-white transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <ShoppingCart className="h-4 w-4 ml-2" />
            أضف
          </Button>
        </div>
      </div>
    </div>
  );
}

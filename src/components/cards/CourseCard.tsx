import { Link } from 'react-router-dom';
import { Clock, Users, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice?: number;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  className?: string;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  instructor,
  duration,
  students,
  rating,
  price,
  originalPrice,
  category,
  level,
  className,
}: CourseCardProps) {
  const levelColors = {
    'مبتدئ': 'bg-accent/10 text-accent',
    'متوسط': 'bg-secondary/10 text-secondary',
    'متقدم': 'bg-primary/10 text-primary',
  };

  return (
    <div className={cn(
      "group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2",
      className
    )}>
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 hover:scale-105 transition-transform">
              <Play className="h-5 w-5 ml-2 fill-current" />
              شاهد المقدمة
            </Button>
          </div>
        </div>
        <Badge className={cn("absolute top-4 right-4 transition-transform duration-300 group-hover:scale-110", levelColors[level])}>
          {level}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          <Link to={`/courses/${id}`}>{title}</Link>
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{price.toLocaleString()} ج.م</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()} ج.م
              </span>
            )}
          </div>
          <Link to={`/courses/${id}`}>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 hover:scale-105">
              سجل الآن
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

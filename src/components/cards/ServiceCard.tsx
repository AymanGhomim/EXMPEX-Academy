import { Link } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  href,
  className,
}: ServiceCardProps) {
  return (
    <div className={cn(
      "group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-2",
      className
    )}>
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-25 transition-all duration-500 blur-3xl bg-gradient-to-br from-primary via-secondary to-accent" />

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-primary shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <Icon className="h-8 w-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className="flex items-center gap-2 text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Link */}
      <Link
        to={href}
        className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300"
      >
        <span>اعرف المزيد</span>
        <ArrowLeft className="h-4 w-4 group-hover:animate-bounce-soft" />
      </Link>
    </div>
  );
}

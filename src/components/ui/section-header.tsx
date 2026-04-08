import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'center' | 'right';
}

export function SectionHeader({ 
  badge, 
  title, 
  description, 
  className,
  align = 'center' 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "max-w-3xl",
      align === 'center' ? "mx-auto text-center" : "text-right",
      className
    )}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

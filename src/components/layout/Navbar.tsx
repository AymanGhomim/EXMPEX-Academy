import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الكورسات', href: '/courses' },
  { name: 'الخدمات', href: '/services' },
  { name: 'المتجر', href: '/store' },
  { name: 'من نحن', href: '/about' },
  { name: 'تواصل معنا', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="EXMPEX Academy" 
              className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300",
                  location.pathname === link.href ? "w-1/2" : "w-0 group-hover:w-1/3"
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center animate-bounce-soft">
                  0
                </span>
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 animate-scale-in">
                <DropdownMenuItem asChild>
                  <Link to="/auth" className="w-full">تسجيل الدخول</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/auth?mode=signup" className="w-full">إنشاء حساب</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full">لوحة التحكم</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/auth">
              <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105">
                ابدأ الآن
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-110"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 opacity-0 animate-slide-right",
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-4 px-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <Link to="/auth" className="flex-1">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                    ابدأ الآن
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

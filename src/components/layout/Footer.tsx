import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

const footerLinks = {
  courses: [
    { name: 'Full Stack Development', href: '/courses?category=fullstack' },
    { name: 'الذكاء الاصطناعي', href: '/courses?category=ai' },
    { name: 'التصميم الجرافيكي', href: '/courses?category=design' },
    { name: 'الشبكات', href: '/courses?category=networks' },
  ],
  services: [
    { name: 'حلول الذكاء الاصطناعي', href: '/services#ai' },
    { name: 'تطوير المواقع', href: '/services#web' },
    { name: 'أتمتة الأعمال', href: '/services#automation' },
  ],
  company: [
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
    { name: 'الشروط والأحكام', href: '/terms' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-hero text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img 
                src={logo} 
                alt="EXMPEX Academy" 
                className="h-14 w-auto brightness-0 invert group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              منصتك الشاملة للتعلم التقني والخدمات الرقمية المتقدمة. نساعدك على تطوير مهاراتك وتحقيق أهدافك المهنية.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الكورسات</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الخدمات</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>info@exmpex.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span dir="ltr">+20 10 XXX XXXX</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>مصر - محافظة كفر الشيخ - أمام البنك الأهلي</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} EXMPEX Academy. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.company.slice(2).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

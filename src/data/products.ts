export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  brand: string;
  sku: string;
  warranty: string;
  specs: ProductSpec[];
  features: string[];
  tags: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'لابتوب Dell XPS 15',
    description: 'لابتوب احترافي للمبرمجين والمصممين مع شاشة 4K OLED',
    longDescription: 'Dell XPS 15 هو لابتوب الأداء العالي المثالي للمبرمجين والمصممين. يتميز بشاشة OLED 4K مذهلة، معالج Intel i9 من الجيل الأحدث، وبطارية تدوم طوال اليوم.',
    images: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop',
    ],
    price: 45999,
    originalPrice: 54999,
    rating: 4.8,
    reviewsCount: 156,
    category: 'لابتوبات',
    inStock: true,
    isNew: true,
    discount: 17,
    brand: 'Dell',
    sku: 'DELL-XPS-15-2024',
    warranty: 'ضمان سنة كاملة',
    specs: [
      { label: 'المعالج', value: 'Intel Core i9-13900H' },
      { label: 'الرام', value: '32 GB DDR5' },
      { label: 'التخزين', value: '1 TB NVMe SSD' },
      { label: 'الشاشة', value: '15.6 بوصة 4K OLED Touch' },
      { label: 'كرت الشاشة', value: 'NVIDIA RTX 4060 8GB' },
      { label: 'البطارية', value: '86Wh - تدوم 12 ساعة' },
      { label: 'النظام', value: 'Windows 11 Pro' },
      { label: 'الوزن', value: '1.86 كيلوجرام' },
    ],
    features: ['شاشة OLED 4K فائقة الدقة', 'معالج Intel i9 من الجيل 13', 'رام DDR5 للأداء الأقصى', 'SSD NVMe فائق السرعة', 'كرت RTX 4060 للتصميم والألعاب', 'Thunderbolt 4 للاتصال السريع'],
    tags: ['Dell', 'XPS', 'Laptop', '4K', 'OLED'],
  },
  {
    id: '2',
    name: 'ماوس Logitech MX Master 3',
    description: 'ماوس لاسلكي احترافي مريح للاستخدام الطويل',
    longDescription: 'Logitech MX Master 3 هو الماوس الأمثل للمحترفين. تصميم إرجونومي مريح، عجلة تمرير مغناطيسية فائقة السرعة، واتصال لاسلكي مستقر.',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1200&auto=format&fit=crop',
    ],
    price: 2799,
    rating: 4.9,
    reviewsCount: 89,
    category: 'إكسسوارات',
    inStock: true,
    brand: 'Logitech',
    sku: 'LOG-MXM3-BLK',
    warranty: 'ضمان سنتين',
    specs: [
      { label: 'الاتصال', value: 'Bluetooth + USB Receiver' },
      { label: 'البطارية', value: 'تدوم 70 يوم' },
      { label: 'DPI', value: '200-8000 DPI' },
      { label: 'الأزرار', value: '7 أزرار قابلة للبرمجة' },
      { label: 'التوافق', value: 'Windows, Mac, Linux' },
      { label: 'الوزن', value: '141 جرام' },
    ],
    features: ['تصميم إرجونومي مريح', 'عجلة MagSpeed مغناطيسية', 'اتصال بـ 3 أجهزة في آن واحد', 'شحن USB-C سريع', 'برنامج Logi Options+'],
    tags: ['Logitech', 'Mouse', 'Wireless', 'Ergonomic'],
  },
  {
    id: '3',
    name: 'شنطة لابتوب احترافية',
    description: 'شنطة أنيقة ومتينة مع جيوب متعددة للابتوب حتى 17 إنش',
    longDescription: 'شنطة لابتوب احترافية مصنوعة من أفضل المواد. تتسع للابتوب حتى 17 إنش مع جيوب منظمة لكل احتياجاتك.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&auto=format&fit=crop',
    ],
    price: 1799,
    originalPrice: 2399,
    rating: 4.7,
    reviewsCount: 234,
    category: 'شنط لابتوب',
    inStock: true,
    discount: 25,
    brand: 'TechBag',
    sku: 'TB-PRO-17',
    warranty: 'ضمان سنة',
    specs: [
      { label: 'الحجم المناسب', value: 'حتى 17 إنش' },
      { label: 'المادة', value: 'نايلون مقاوم للماء' },
      { label: 'الجيوب', value: '8 جيوب منظمة' },
      { label: 'المقبض', value: 'حزام كتف قابل للتعديل' },
      { label: 'السعة', value: '30 لتر' },
    ],
    features: ['مقاومة للماء', 'جيب محمي للابتوب', 'مقبض يد وحزام كتف', 'منظم كابلات داخلي', 'قفل أمان مدمج'],
    tags: ['Bag', 'Laptop Bag', 'Waterproof'],
  },
  {
    id: '4',
    name: 'لابتوب MacBook Pro M3',
    description: 'أحدث إصدار من ماك بوك برو بمعالج M3 القوي',
    longDescription: 'MacBook Pro M3 يحمل أقوى معالج Apple Silicon حتى الآن. أداء خارق مع كفاءة استهلاك طاقة لا مثيل لها.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871525-a9dce6c88f37?w=1200&auto=format&fit=crop',
    ],
    price: 62999,
    rating: 4.9,
    reviewsCount: 312,
    category: 'لابتوبات',
    inStock: false,
    isNew: true,
    brand: 'Apple',
    sku: 'APPLE-MBP-M3-14',
    warranty: 'ضمان سنة Apple',
    specs: [
      { label: 'المعالج', value: 'Apple M3 Pro' },
      { label: 'الرام', value: '18 GB Unified Memory' },
      { label: 'التخزين', value: '512 GB SSD' },
      { label: 'الشاشة', value: '14.2 بوصة Liquid Retina XDR' },
      { label: 'البطارية', value: 'تدوم 18 ساعة' },
      { label: 'النظام', value: 'macOS Sonoma' },
    ],
    features: ['معالج M3 Pro فائق الأداء', 'شاشة Liquid Retina XDR', 'بطارية تدوم 18 ساعة', 'MagSafe للشحن', 'Thunderbolt 4 × 3'],
    tags: ['Apple', 'MacBook', 'M3', 'Pro'],
  },
  {
    id: '5',
    name: 'لوحة مفاتيح ميكانيكية',
    description: 'لوحة مفاتيح ميكانيكية RGB للألعاب والبرمجة',
    longDescription: 'لوحة مفاتيح ميكانيكية احترافية بإضاءة RGB قابلة للتخصيص. مثالية للمبرمجين واللاعبين الذين يبحثون عن تجربة كتابة مميزة.',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1200&auto=format&fit=crop',
    ],
    price: 3699,
    originalPrice: 4599,
    rating: 4.6,
    reviewsCount: 78,
    category: 'إكسسوارات',
    inStock: true,
    discount: 20,
    brand: 'Keychron',
    sku: 'KEY-K2-RGB-BRN',
    warranty: 'ضمان سنة',
    specs: [
      { label: 'نوع المفاتيح', value: 'Cherry MX Brown' },
      { label: 'الإضاءة', value: 'RGB كاملة' },
      { label: 'الاتصال', value: 'Bluetooth 5.1 + USB-C' },
      { label: 'التخطيط', value: '75% Layout' },
      { label: 'البطارية', value: '4000 mAh' },
    ],
    features: ['مفاتيح Cherry MX Brown', 'إضاءة RGB قابلة للتخصيص', 'اتصال بـ 3 أجهزة', 'هيكل ألومنيوم', 'قابل للبرمجة'],
    tags: ['Keyboard', 'Mechanical', 'RGB', 'Wireless'],
  },
  {
    id: '6',
    name: 'شنطة ظهر للابتوب',
    description: 'شنطة ظهر مقاومة للماء مع منفذ USB للشحن',
    longDescription: 'شنطة ظهر عصرية ومريحة مع ميزة الشحن USB الخارجية. مثالية للطلاب والمحترفين.',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&auto=format&fit=crop',
    ],
    price: 1499,
    rating: 4.5,
    reviewsCount: 156,
    category: 'شنط لابتوب',
    inStock: true,
    brand: 'TechBag',
    sku: 'TB-BP-USB',
    warranty: 'ضمان سنة',
    specs: [
      { label: 'الحجم', value: 'حتى 15.6 إنش' },
      { label: 'السعة', value: '25 لتر' },
      { label: 'المادة', value: 'بوليستر مقاوم للماء' },
      { label: 'منفذ USB', value: 'USB-A خارجي للشحن' },
    ],
    features: ['مقاومة للماء', 'منفذ شحن USB خارجي', 'جيب محمي للابتوب', 'أحزمة مريحة مبطنة'],
    tags: ['Backpack', 'USB Charging', 'Waterproof'],
  },
  {
    id: '7',
    name: 'لابتوب Lenovo ThinkPad',
    description: 'لابتوب أعمال موثوق مع معالج Intel الجيل الأحدث',
    longDescription: 'Lenovo ThinkPad هو الخيار الأمثل لمحترفي الأعمال. موثوقية لا مثيل لها مع أداء قوي وأمان متقدم.',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&auto=format&fit=crop',
    ],
    price: 33999,
    rating: 4.7,
    reviewsCount: 98,
    category: 'لابتوبات',
    inStock: true,
    brand: 'Lenovo',
    sku: 'LEN-TP-X1C-12',
    warranty: 'ضمان 3 سنوات',
    specs: [
      { label: 'المعالج', value: 'Intel Core i7-1365U' },
      { label: 'الرام', value: '16 GB LPDDR5' },
      { label: 'التخزين', value: '512 GB NVMe SSD' },
      { label: 'الشاشة', value: '14 بوصة IPS FHD' },
      { label: 'الوزن', value: '1.12 كيلوجرام' },
    ],
    features: ['معالج Intel الجيل 13', 'تصميم خفيف الوزن', 'أمان بصمة الإصبع', 'بطارية 12 ساعة', 'ضمان 3 سنوات'],
    tags: ['Lenovo', 'ThinkPad', 'Business', 'Laptop'],
  },
  {
    id: '8',
    name: 'سماعات Sony WH-1000XM5',
    description: 'سماعات لاسلكية بتقنية إلغاء الضوضاء',
    longDescription: 'Sony WH-1000XM5 تقدم أفضل تجربة استماع في العالم مع إلغاء الضوضاء الصناعي الرائد في السوق.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop',
    ],
    price: 8999,
    originalPrice: 10999,
    rating: 4.9,
    reviewsCount: 267,
    category: 'إكسسوارات',
    inStock: true,
    discount: 17,
    brand: 'Sony',
    sku: 'SONY-WH1000XM5-BLK',
    warranty: 'ضمان سنة Sony',
    specs: [
      { label: 'الاتصال', value: 'Bluetooth 5.2' },
      { label: 'البطارية', value: '30 ساعة مع ANC' },
      { label: 'وقت الشحن', value: '3.5 ساعة (22 دقيقة = 5 ساعات)' },
      { label: 'الوزن', value: '250 جرام' },
      { label: 'الاستجابة', value: '4 Hz - 40,000 Hz' },
    ],
    features: ['إلغاء ضوضاء ANC متطور', 'صوت Hi-Res', 'بطارية 30 ساعة', 'شحن سريع', 'Multipoint Connection', 'تصميم قابل للطي'],
    tags: ['Sony', 'Headphones', 'ANC', 'Wireless', 'Hi-Res'],
  },
];

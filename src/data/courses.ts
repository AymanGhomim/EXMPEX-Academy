export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  preview?: boolean;
}

export interface CourseSection {
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  instructor: string;
  instructorTitle: string;
  instructorImage: string;
  duration: string;
  students: number;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  language: string;
  lastUpdated: string;
  requirements: string[];
  outcomes: string[];
  curriculum: CourseSection[];
  tags: string[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Development مع React و Node.js',
    description: 'بناء تطبيقات ويب كاملة من الواجهة إلى الخادم باحترافية',
    longDescription: 'كورس شامل يأخذك من أساسيات React.js حتى بناء APIs كاملة مع Node.js و Express، مع قاعدة بيانات MongoDB وتوثيق JWT. ستبني 5 مشاريع حقيقية تضعها في portfolio.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&auto=format&fit=crop',
    instructor: 'سامح العدولي',
    instructorTitle: 'Senior Full Stack Developer | 8+ سنوات خبرة',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop',
    duration: '80 ساعة',
    students: 3200,
    rating: 4.9,
    reviewsCount: 428,
    price: 2999,
    originalPrice: 4499,
    category: 'Full Stack',
    level: 'متقدم',
    language: 'عربي',
    lastUpdated: 'يناير 2025',
    requirements: ['معرفة أساسية بـ HTML و CSS', 'أساسيات JavaScript', 'جهاز كمبيوتر مع اتصال إنترنت'],
    outcomes: ['بناء تطبيقات React.js احترافية', 'إنشاء REST APIs مع Node.js', 'التعامل مع قواعد بيانات MongoDB', 'تطبيق JWT Authentication', 'نشر التطبيقات على السحابة', 'بناء 5 مشاريع حقيقية'],
    curriculum: [
      { title: 'React.js الأساسيات', lessons: [{ id: '1-1', title: 'مقدمة في React وJSX', duration: '45 دقيقة', preview: true }, { id: '1-2', title: 'Components و Props', duration: '60 دقيقة', preview: true }, { id: '1-3', title: 'State و useState Hook', duration: '75 دقيقة' }, { id: '1-4', title: 'useEffect و دورة حياة المكونات', duration: '60 دقيقة' }] },
      { title: 'React المتقدم', lessons: [{ id: '2-1', title: 'Context API وإدارة الحالة', duration: '90 دقيقة' }, { id: '2-2', title: 'React Router v6', duration: '75 دقيقة' }, { id: '2-3', title: 'Custom Hooks', duration: '60 دقيقة' }, { id: '2-4', title: 'Performance Optimization', duration: '80 دقيقة' }] },
      { title: 'Node.js و Express', lessons: [{ id: '3-1', title: 'مقدمة في Node.js', duration: '50 دقيقة', preview: true }, { id: '3-2', title: 'بناء REST API مع Express', duration: '90 دقيقة' }, { id: '3-3', title: 'Middleware و Error Handling', duration: '70 دقيقة' }] },
      { title: 'MongoDB و Mongoose', lessons: [{ id: '4-1', title: 'أساسيات MongoDB', duration: '60 دقيقة' }, { id: '4-2', title: 'Mongoose Models و Schema', duration: '75 دقيقة' }, { id: '4-3', title: 'CRUD Operations', duration: '80 دقيقة' }] },
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Full Stack'],
  },
  {
    id: '2',
    title: 'الذكاء الاصطناعي وتعلم الآلة مع Python',
    description: 'من الصفر إلى بناء نماذج ذكاء اصطناعي متقدمة',
    longDescription: 'تعلم أساسيات Machine Learning وDeep Learning مع Python. ستبني نماذج تنبؤية حقيقية باستخدام Scikit-learn وTensorFlow، وتتعلم كيفية معالجة البيانات واستخراج الرؤى.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop',
    instructor: 'محمد طلال',
    instructorTitle: 'AI Engineer | خبير في Machine Learning',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    duration: '60 ساعة',
    students: 1890,
    rating: 4.8,
    reviewsCount: 312,
    price: 2499,
    originalPrice: 3999,
    category: 'الذكاء الاصطناعي',
    level: 'متوسط',
    language: 'عربي',
    lastUpdated: 'ديسمبر 2024',
    requirements: ['أساسيات Python', 'رياضيات أساسية (إحصاء وجبر خطي)', 'جهاز بمعالج قوي أو Google Colab'],
    outcomes: ['فهم خوارزميات Machine Learning', 'بناء نماذج تنبؤية دقيقة', 'معالجة البيانات مع Pandas', 'تصوير البيانات مع Matplotlib', 'بناء شبكات عصبية مع TensorFlow', 'نشر النماذج على الإنترنت'],
    curriculum: [
      { title: 'Python للبيانات', lessons: [{ id: '1-1', title: 'NumPy الأساسيات', duration: '50 دقيقة', preview: true }, { id: '1-2', title: 'Pandas لمعالجة البيانات', duration: '80 دقيقة', preview: true }, { id: '1-3', title: 'Matplotlib و Seaborn', duration: '60 دقيقة' }] },
      { title: 'Machine Learning', lessons: [{ id: '2-1', title: 'Linear Regression', duration: '70 دقيقة' }, { id: '2-2', title: 'Classification Algorithms', duration: '90 دقيقة' }, { id: '2-3', title: 'Clustering', duration: '75 دقيقة' }] },
      { title: 'Deep Learning', lessons: [{ id: '3-1', title: 'Neural Networks الأساسيات', duration: '80 دقيقة' }, { id: '3-2', title: 'CNN للصور', duration: '95 دقيقة' }, { id: '3-3', title: 'NLP ومعالجة اللغة', duration: '85 دقيقة' }] },
    ],
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'AI', 'Data Science'],
  },
  {
    id: '3',
    title: 'دورة الشبكات الاحترافية - CCNA Complete',
    description: 'تعلم أساسيات الشبكات والحصول على شهادة CCNA من سيسكو',
    longDescription: 'الدورة الأكثر شمولاً للحصول على شهادة CCNA من Cisco. تغطي الدورة كل مواضيع الشبكات من الأساسيات حتى الشبكات المتقدمة مع تطبيق عملي على Packet Tracer.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop',
    instructor: 'م. أحمد الخالدي',
    instructorTitle: 'Network Engineer | CCNP Certified',
    instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
    duration: '40 ساعة',
    students: 2450,
    rating: 4.9,
    reviewsCount: 567,
    price: 1999,
    originalPrice: 2999,
    category: 'الشبكات',
    level: 'مبتدئ',
    language: 'عربي',
    lastUpdated: 'نوفمبر 2024',
    requirements: ['معرفة أساسية بالحاسب الآلي', 'تثبيت برنامج Cisco Packet Tracer', 'لا يشترط خبرة مسبقة في الشبكات'],
    outcomes: ['فهم أساسيات الشبكات والبروتوكولات', 'إعداد وتهيئة أجهزة Cisco', 'تطبيق بروتوكولات التوجيه', 'إدارة الشبكات اللاسلكية', 'حماية الشبكات من الاختراق', 'الاستعداد لاجتياز امتحان CCNA'],
    curriculum: [
      { title: 'أساسيات الشبكات', lessons: [{ id: '1-1', title: 'مقدمة في الشبكات وOSI Model', duration: '60 دقيقة', preview: true }, { id: '1-2', title: 'TCP/IP والبروتوكولات', duration: '75 دقيقة', preview: true }, { id: '1-3', title: 'IP Addressing و Subnetting', duration: '90 دقيقة' }] },
      { title: 'Routing و Switching', lessons: [{ id: '2-1', title: 'Cisco IOS أساسيات', duration: '70 دقيقة' }, { id: '2-2', title: 'OSPF و EIGRP', duration: '85 دقيقة' }, { id: '2-3', title: 'VLANs و Trunking', duration: '80 دقيقة' }] },
      { title: 'أمن الشبكات', lessons: [{ id: '3-1', title: 'ACLs وتأمين الشبكة', duration: '70 دقيقة' }, { id: '3-2', title: 'VPN و IPSec', duration: '75 دقيقة' }] },
    ],
    tags: ['CCNA', 'Cisco', 'Networking', 'Routing', 'Security'],
  },
  {
    id: '4',
    title: 'تصميم واجهات المستخدم UI/UX',
    description: 'تعلم أساسيات تصميم تجربة المستخدم وواجهات التطبيقات',
    longDescription: 'كورس شامل في تصميم واجهات المستخدم العصرية. ستتعلم أدوات Figma واحتراف تصميم التجارب، وتبني مشاريع حقيقية تضعها في portfolio.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop',
    instructor: 'أنس',
    instructorTitle: 'UI/UX Designer | Graphic Designer',
    instructorImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&auto=format&fit=crop',
    duration: '35 ساعة',
    students: 1560,
    rating: 4.7,
    reviewsCount: 198,
    price: 1499,
    category: 'التصميم الجرافيكي',
    level: 'مبتدئ',
    language: 'عربي',
    lastUpdated: 'يناير 2025',
    requirements: ['جهاز ماك أو ويندوز', 'حساب Figma مجاني', 'لا يشترط خبرة مسبقة'],
    outcomes: ['إتقان أدوات Figma كاملاً', 'تصميم واجهات تطبيقات احترافية', 'تطبيق مبادئ UX Research', 'إنشاء Design Systems', 'بناء Prototypes تفاعلية', 'تسليم تصاميم جاهزة للتطوير'],
    curriculum: [
      { title: 'أساسيات التصميم', lessons: [{ id: '1-1', title: 'مبادئ التصميم الجرافيكي', duration: '45 دقيقة', preview: true }, { id: '1-2', title: 'نظرية الألوان والطباعة', duration: '60 دقيقة', preview: true }] },
      { title: 'Figma من الصفر', lessons: [{ id: '2-1', title: 'واجهة Figma وأدواتها', duration: '55 دقيقة' }, { id: '2-2', title: 'Components و Variants', duration: '70 دقيقة' }, { id: '2-3', title: 'Auto Layout', duration: '65 دقيقة' }] },
      { title: 'UX Research', lessons: [{ id: '3-1', title: 'User Personas و User Journey', duration: '60 دقيقة' }, { id: '3-2', title: 'Wireframing و Prototyping', duration: '80 دقيقة' }] },
    ],
    tags: ['UI', 'UX', 'Figma', 'Design', 'Prototyping'],
  },
  {
    id: '5',
    title: 'أمن الشبكات والاختراق الأخلاقي',
    description: 'تعلم تقنيات الحماية واختبار الاختراق الأخلاقي',
    longDescription: 'دورة متخصصة في الأمن السيبراني واختبار الاختراق الأخلاقي. ستتعلم أدوات Kali Linux وأساليب الحماية من الهجمات الشائعة.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop',
    instructor: 'م. فهد السعيد',
    instructorTitle: 'Cybersecurity Expert | CEH Certified',
    instructorImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop',
    duration: '55 ساعة',
    students: 980,
    rating: 4.9,
    reviewsCount: 187,
    price: 2299,
    originalPrice: 2999,
    category: 'الشبكات',
    level: 'متقدم',
    language: 'عربي',
    lastUpdated: 'ديسمبر 2024',
    requirements: ['معرفة بأساسيات الشبكات', 'أساسيات Linux', 'جهاز RAM 8GB على الأقل'],
    outcomes: ['فهم أنواع الهجمات الإلكترونية', 'اختبار الاختراق بأدوات احترافية', 'تأمين الشبكات والأنظمة', 'استخدام Kali Linux', 'كتابة تقارير اختبار الاختراق', 'الاستعداد لشهادة CEH'],
    curriculum: [
      { title: 'أساسيات الأمن', lessons: [{ id: '1-1', title: 'مقدمة في الأمن السيبراني', duration: '50 دقيقة', preview: true }, { id: '1-2', title: 'أنواع الهجمات الشائعة', duration: '70 دقيقة', preview: true }] },
      { title: 'اختبار الاختراق', lessons: [{ id: '2-1', title: 'Reconnaissance وجمع المعلومات', duration: '80 دقيقة' }, { id: '2-2', title: 'Scanning و Enumeration', duration: '85 دقيقة' }, { id: '2-3', title: 'Exploitation مع Metasploit', duration: '90 دقيقة' }] },
    ],
    tags: ['Cybersecurity', 'Ethical Hacking', 'Kali Linux', 'Penetration Testing'],
  },
  {
    id: '6',
    title: 'ChatGPT و Prompt Engineering',
    description: 'إتقان فن التحدث مع الذكاء الاصطناعي وهندسة المطالبات',
    longDescription: 'تعلم كيف تستخدم ChatGPT وأدوات AI الأخرى بشكل احترافي لزيادة إنتاجيتك وإنجاز مهامك بكفاءة أعلى.',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&auto=format&fit=crop',
    instructor: 'محمد طلال',
    instructorTitle: 'AI Engineer | خبير في تطبيقات الذكاء الاصطناعي',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    duration: '20 ساعة',
    students: 4200,
    rating: 4.8,
    reviewsCount: 892,
    price: 999,
    category: 'الذكاء الاصطناعي',
    level: 'مبتدئ',
    language: 'عربي',
    lastUpdated: 'يناير 2025',
    requirements: ['حساب ChatGPT مجاني', 'لا يشترط أي خبرة تقنية'],
    outcomes: ['كتابة Prompts احترافية', 'استخدام AI في الكتابة والتحرير', 'أتمتة المهام بالذكاء الاصطناعي', 'بناء بوتات مخصصة', 'استخدام Midjourney وDALL-E'],
    curriculum: [
      { title: 'أساسيات Prompt Engineering', lessons: [{ id: '1-1', title: 'مقدمة في نماذج اللغة الكبيرة', duration: '30 دقيقة', preview: true }, { id: '1-2', title: 'تقنيات كتابة Prompts', duration: '45 دقيقة', preview: true }] },
      { title: 'تطبيقات عملية', lessons: [{ id: '2-1', title: 'AI في الكتابة والمحتوى', duration: '50 دقيقة' }, { id: '2-2', title: 'AI في البرمجة', duration: '60 دقيقة' }, { id: '2-3', title: 'بناء Custom GPTs', duration: '70 دقيقة' }] },
    ],
    tags: ['ChatGPT', 'AI', 'Prompt Engineering', 'Midjourney', 'Automation'],
  },
];

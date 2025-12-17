import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Header
    "login_register": "دخول / تسجيل",
    "my_profile": "ملفي",
    "theme_toggle": "تبديل المظهر",
    "menu_open": "القائمة",
    
    // Intro
    "intro_text": "ريفانس المالية منصة إلكترونية رائدة تقدّم خدمات مالية رقمية واستشارية تهدف إلى تمكين الأفراد من تحقيق الاستقرار المالي والرفاهية المستدامة، بخبرة مصرفية وقانونية متخصصة.",
    
    // Story
    "story_title": "قصتنا",
    "story_p1": "في ريفانس المالية بدأت حكايتنا من شغف حقيقي لصناعة فرق في حياة الناس؛ درسنا كيف يواجه الكثير من الأفراد تحديات مالية معقدة قد تعيق مسيرتهم، وكيف يمكن لحلول بسيطة ومدروسة أن تعيد لهم الأمل والاستقرار.",
    "story_p2": "من هنا وُلدت ريفانس، رؤية طموحة لتكون الجسر بين احتياجات الأفراد المالية والحلول العملية التي تراعي الأنظمة وتخدم الإنسان أولاً.",
    "story_p3": "تم تأسيس ريفانس لتقديم منظومة متكاملة من الخدمات المالية والاستشارية، تعتمد على فهم عميق لضوابط التمويل والتشريعات المعتمدة، وتُنفَّذ من خلال فريق متخصص يجمع بين الخبرة المصرفية والمعرفة القانونية والكفاءة التقنية.",

    // Why Rifans
    "why_eyebrow": "لماذا ريفانس؟",
    "why_title": "منصة متخصصة تفهم التزاماتك",
    "why_subtitle": "نعمل بمنهجية تجمع بين الخبرة المصرفية والقانونية والتقنية، لنقدّم لك حلولاً عملية وآمنة بعيداً عن الاجتهادات العشوائية.",
    "why_1_title": "خبرة مصرفية وقانونية معتمدة",
    "why_1_text": "فريق عمل يمتلك سنوات من الخبرة في البنوك والجهات التمويلية.",
    "why_2_title": "التزام كامل بالأنظمة والتعليمات",
    "why_2_text": "جميع الحلول مبنية على أنظمة البنك المركزي السعودي وهيئة السوق المالية.",
    "why_3_title": "متابعة شخصية لكل حالة",
    "why_3_text": "كل عميل له ملف مستقل، وخطة معالجة خاصة تناسب دخله.",
    "why_4_title": "سرية وخصوصية عالية",
    "why_4_text": "بياناتك الائتمانية والمالية محفوظة لدينا وفق أعلى معايير السرية.",

    // How it works
    "how_eyebrow": "رحلة العميل في ريفانس",
    "how_title": "كيف نعمل على معالجة التزاماتك؟",
    "how_subtitle": "4 خطوات مدروسة تضمن لك أفضل النتائج، صممت لراحتك.",
    "step_1_title": "استقبال الطلب وتحليل الالتزامات",
    "step_1_text": "نراجع بياناتك الائتمانية، العقود القائمة، الدخل، والالتزامات الشهرية بدقة لتحديد نقطة البداية.",
    "step_2_title": "تحديد فرص الحلول النظامية",
    "step_2_text": "ندرس خيارات الإعفاء، الجدولة، إعادة الهيكلة، أو التسويات المتاحة وفق أنظمة البنك المركزي.",
    "step_3_title": "التواصل مع الجهات التمويلية",
    "step_3_text": "نمثّلك أمام البنوك وشركات التمويل مع إعداد المخاطبات الرسمية والاعتراضات اللازمة.",
    "step_4_title": "اعتماد الحل ومتابعة التنفيذ",
    "step_4_text": "نتابع حتى يتم تنفيذ القرار على حساباتك وتحديث سجلك الائتماني في سمة.",

    // Services
    "services_title": "خدمات ريفانس المالية",
    "srv_finance": "الخدمات التمويلية",
    "srv_finance_desc": "خدمات متكاملة لتنظيم التمويل الشخصي والعقاري والتأجيري وتمويل المنشآت، مع حلول للجدولة والتسوية وسداد المديونيات.",
    "srv_legal": "الخدمات القضائية والعدلية",
    "srv_legal_desc": "خدمات متعلقة برفع الدعاوى والاعتراضات ومعالجة ملفات التنفيذ وإيقاف الخدمات والحجوزات.",
    "srv_banking": "الخدمات المصرفية",
    "srv_banking_desc": "خدمات موجهة لتنظيم حساباتك البنكية، نقاط البيع، المحافظ الإلكترونية، وتحديث البيانات لدى البنوك.",
    "srv_realestate": "الخدمات العقارية",
    "srv_realestate_desc": "خدمات متعلقة بالسجل العقاري، الوسطاء العقاريين، عقود الإيجار، والتقييم العقاري والرهونات.",
    "srv_zakat": "الخدمات الزكوية والضريبية",
    "srv_zakat_desc": "خدمات موجهة لأصحاب المنشآت لمتابعة الإقرارات والتسجيل والتعديل والاعتراض على الغرامات الزكوية والضريبية.",
    "srv_credit": "الخدمات الائتمانية",
    "srv_credit_desc": "خدمات موجهة لتحسين السجل الائتماني، وتحديث حالة العميل لدى سمة، ودراسة الملاءة المالية.",
    "srv_consult": "الخدمات الاستشارية",
    "srv_consult_desc": "استشارات مالية متخصصة لتحليل الالتزامات وإعادة هيكلة الديون وتقديم توصيات ائتمانية مبنية على التحليل المالي.",
    "know_more": "اعرف المزيد",
    "goto_service": "الانتقال للخدمة",

    // Audience
    "aud_eyebrow": "لمن صُمّمت ريفانس؟",
    "aud_title": "نخدم شريحة واسعة من العملاء",
    "aud_subtitle": "سواءً كنت موظفاً، متقاعداً، صاحب منشأة صغيرة، أو مستثمراً، تم تصميم خدمات ريفانس لتلائم وضعك المالي والائتماني.",
    "aud_1_tag": "موظفون على رأس العمل",
    "aud_1_title": "التزامات متعددة ورواتب محدودة",
    "aud_1_text": "إذا كنت تحمل أكثر من تمويل، وبطاقة ائتمانية، وفواتير شهرية متراكمة.",
    "aud_2_tag": "متقاعدون",
    "aud_2_title": "دخل ثابت ومسؤوليات قائمة",
    "aud_2_text": "نعيد جدولة التزاماتك بما يتناسب مع راتب التقاعد.",
    "aud_3_tag": "أصحاب المنشآت",
    "aud_3_title": "منشآت صغيرة ومتوسطة",
    "aud_3_text": "نعالج قضايا الغرامات الزكوية والضريبية والالتزامات التمويلية.",

    // CTA
    "cta_title": "جاهز تبدأ أول خطوة لحل التزاماتك؟",
    "cta_text": "أرسل طلبك إلكترونياً، أو تواصل معنا عبر الواتساب لنساعدك في اختيار الخدمة الأنسب.",
    "cta_whatsapp": "تواصل عبر واتساب الآن",
    "cta_all_services": "تصفّح جميع الخدمات",

    // Platform
    "plat_eyebrow": "منصة رقمية",
    "plat_title": "كل شيء يتم إلكترونياً وبشكل منظم",
    "plat_subtitle": "ريفانس المالية تعتمد على نماذج رقمية وتقارير موحدة، مع أرشفة آمنة لكل المستندات.",
    "plat_1_title": "نماذج إلكترونية ذكية",
    "plat_1_text": "تعبئة بياناتك مرة واحدة فقط، ويتم استخدامها في جميع الطلبات.",
    "plat_2_title": "أرشفة ومتابعة",
    "plat_2_text": "حفظ المكاتبات والقرارات في ملف رقمي خاص بك.",
    "plat_3_title": "تحديثات مستمرة",
    "plat_3_text": "إشعارك بأي ردود أو مستجدات من الجهات التمويلية.",

    // Timeline
    "time_eyebrow": "مراحل الخدمة",
    "time_title": "من أول تواصل حتى إقفال الملف",
    "time_1_title": "١- تواصل وتسجيل الطلب",
    "time_1_text": "تبدأ رحلتك معنا من نموذج إلكتروني أو رسالة واتساب.",
    "time_2_title": "٢- دراسة الملف وإبرام اتفاق الخدمة",
    "time_2_text": "يتم تحليل وضعك المالي والائتماني، ثم مشاركة تفاصيل الخدمة.",
    "time_3_title": "٣- تنفيذ الإجراءات النظامية",
    "time_3_text": "إعداد ورفع الطلبات والمخاطبات والاعتراضات.",
    "time_4_title": "٤- إقفال الملف وتوثيق النتيجة",
    "time_4_text": "توثيق القرارات الصادرة وإقفال الملف بعد التأكد من التنفيذ.",
  },
  en: {
    // Header
    "login_register": "Login / Register",
    "my_profile": "My Profile",
    "theme_toggle": "Toggle Theme",
    "menu_open": "Menu",

    // Intro
    "intro_text": "Rifans Financial is a leading digital platform offering financial and consulting services aimed at empowering individuals to achieve financial stability and sustainable well-being, with specialized banking and legal expertise.",

    // Story
    "story_title": "Our Story",
    "story_p1": "At Rifans Financial, our story began with a genuine passion to make a difference in people's lives. We studied how many individuals face complex financial challenges that may hinder their progress, and how simple, well-thought-out solutions can restore hope and stability.",
    "story_p2": "From here, Rifans was born—an ambitious vision to be the bridge between individuals' financial needs and practical solutions that respect regulations and serve the human first.",
    "story_p3": "Rifans was established to provide an integrated system of financial and consulting services, based on a deep understanding of financing regulations and approved legislation, executed by a specialized team combining banking experience, legal knowledge, and technical competence.",

    // Why Rifans
    "why_eyebrow": "Why Rifans?",
    "why_title": "A specialized platform that understands your obligations",
    "why_subtitle": "We work with a methodology that combines banking, legal, and technical expertise to provide you with practical and safe solutions.",
    "why_1_title": "Certified Banking & Legal Expertise",
    "why_1_text": "A team with years of experience in banks and financing entities.",
    "why_2_title": "Full Compliance with Regulations",
    "why_2_text": "All solutions are based on SAMA and CMA regulations.",
    "why_3_title": "Personalized Follow-up",
    "why_3_text": "Each client has an independent file and a treatment plan that suits their income.",
    "why_4_title": "High Confidentiality & Privacy",
    "why_4_text": "Your credit and financial data are kept with us according to the highest standards of confidentiality.",

    // How it works
    "how_eyebrow": "Client Journey",
    "how_title": "How do we process your obligations?",
    "how_subtitle": "4 studied steps designed for your comfort to ensure the best results.",
    "step_1_title": "Request Receipt & Analysis",
    "step_1_text": "We review your credit data, existing contracts, income, and monthly obligations accurately.",
    "step_2_title": "Identifying Legal Solutions",
    "step_2_text": "We study waiver, scheduling, restructuring, or settlement options available per Central Bank regulations.",
    "step_3_title": "Communication with Entities",
    "step_3_text": "We represent you before banks and financing companies, preparing official correspondence and objections.",
    "step_4_title": "Approval & Implementation",
    "step_4_text": "We follow up until the decision is implemented on your accounts and your credit record in SIMAH is updated.",

    // Services
    "services_title": "Rifans Financial Services",
    "srv_finance": "Financing Services",
    "srv_finance_desc": "Integrated services for organizing personal, real estate, and leasing financing, with solutions for scheduling and debt settlement.",
    "srv_legal": "Legal & Judicial Services",
    "srv_legal_desc": "Services related to filing lawsuits, objections, processing execution files, and stopping services.",
    "srv_banking": "Banking Services",
    "srv_banking_desc": "Services aimed at organizing your bank accounts, POS, e-wallets, and updating data with banks.",
    "srv_realestate": "Real Estate Services",
    "srv_realestate_desc": "Services related to real estate registry, brokers, lease contracts, valuation, and mortgages.",
    "srv_zakat": "Zakat & Tax Services",
    "srv_zakat_desc": "Services for business owners to follow up on returns, registration, amendments, and objections to fines.",
    "srv_credit": "Credit Services",
    "srv_credit_desc": "Services aimed at improving credit records, updating status in SIMAH, and financial solvency studies.",
    "srv_consult": "Consulting Services",
    "srv_consult_desc": "Specialized financial consultations to analyze obligations, restructure debts, and provide credit recommendations.",
    "know_more": "Learn More",
    "goto_service": "Go to Service",

    // Audience
    "aud_eyebrow": "Who is Rifans for?",
    "aud_title": "We serve a wide segment of clients",
    "aud_subtitle": "Whether you are an employee, retiree, small business owner, or investor, Rifans services are designed to suit your financial situation.",
    "aud_1_tag": "Active Employees",
    "aud_1_title": "Multiple obligations, limited salary",
    "aud_1_text": "If you have more than one loan, credit card, and accumulated monthly bills.",
    "aud_2_tag": "Retirees",
    "aud_2_title": "Fixed income, ongoing responsibilities",
    "aud_2_text": "We reschedule your obligations to fit your retirement pension.",
    "aud_3_tag": "Business Owners",
    "aud_3_title": "SMEs",
    "aud_3_text": "We handle Zakat and Tax fine issues and financing obligations.",

    // CTA
    "cta_title": "Ready to take the first step?",
    "cta_text": "Submit your request electronically, or contact us via WhatsApp to help you choose the most suitable service.",
    "cta_whatsapp": "Contact via WhatsApp",
    "cta_all_services": "Browse All Services",

    // Platform
    "plat_eyebrow": "Digital Platform",
    "plat_title": "Everything is electronic and organized",
    "plat_subtitle": "Rifans Financial relies on digital forms and unified reports, with secure archiving for all documents.",
    "plat_1_title": "Smart Electronic Forms",
    "plat_1_text": "Fill in your data once, and it is used for all requests.",
    "plat_2_title": "Archiving & Tracking",
    "plat_2_text": "Save correspondence and decisions in your private digital file.",
    "plat_3_title": "Continuous Updates",
    "plat_3_text": "Notify you of any responses or updates from financing entities.",

    // Timeline
    "time_eyebrow": "Service Stages",
    "time_title": "From first contact to file closure",
    "time_1_title": "1. Contact & Registration",
    "time_1_text": "Your journey begins with an electronic form or WhatsApp message.",
    "time_2_title": "2. File Study & Agreement",
    "time_2_text": "Your financial status is analyzed, then service details are shared.",
    "time_3_title": "3. Implementation",
    "time_3_text": "Preparing and submitting requests, correspondence, and objections.",
    "time_4_title": "4. Closure & Documentation",
    "time_4_text": "Documenting issued decisions and closing the file after ensuring implementation.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Load from local storage
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && (storedLang === 'ar' || storedLang === 'en')) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    // Update document attributes
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction: language === 'ar' ? 'rtl' : 'ltr', toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

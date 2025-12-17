import React, { useEffect } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Send, ShieldCheck, FileText, AlertCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button, Card, SectionHeader } from './Shared';
import Footer from './Footer';

// Layout Wrapper
const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F4FA] dark:bg-[#06010a] flex flex-col transition-colors duration-300">
      {/* Simple Header */}
      <div className="bg-white dark:bg-[#12031a] border-b border-gold/20 p-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[800px] mx-auto flex justify-between items-center">
          <a href="#/" className="flex items-center gap-2 text-[12px] font-bold text-brand dark:text-gold hover:opacity-80 transition-opacity">
            <ArrowRight size={16} />
            العودة للرئيسية
          </a>
          {/* Logo Removed */}
        </div>
      </div>

      <div className="flex-1 max-w-[800px] w-full mx-auto p-4 py-8">
        <h1 className="text-[24px] font-extrabold text-brand dark:text-white mb-6 border-r-4 border-gold pr-3">{title}</h1>
        <div className="bg-white dark:bg-[#1a0b25] rounded-[20px] p-6 border border-gold/30 shadow-sm">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const Terms: React.FC = () => (
  <PageLayout title="الشروط والأحكام">
    <div className="space-y-6 text-[13px] leading-7 text-muted dark:text-gray-300 text-justify">
      <p>أهلاً بك في منصة ريفانس المالية. يرجى قراءة الشروط والأحكام التالية بعناية قبل استخدام خدماتنا.</p>
      
      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">1. قبول الشروط</h3>
        <p>بمجرد استخدامك للمنصة أو طلب أي من خدماتنا، فإنك توافق على الالتزام بهذه الشروط وجميع القوانين واللوائح المعمول بها في المملكة العربية السعودية.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">2. الخدمات المقدمة</h3>
        <p>نقدم خدمات استشارية ووساطة تمويلية وحلول مالية. نحن لا نضمن قبول التمويل من الجهات الممولة، حيث يخضع ذلك لسياسات الجهات التمويلية وسجلك الائتماني.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">3. دقة المعلومات</h3>
        <p>أنت مسؤول عن دقة البيانات والمستندات التي تقدمها. أي تلاعب أو تقديم مستندات غير صحيحة قد يعرضك للمساءلة القانونية ويؤدي إلى رفض طلبك فوراً.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">4. الرسوم والاسترداد</h3>
        <p>بعض الخدمات مدفوعة وتخضع لسياسة استرداد محددة. في حال عدم تنفيذ الخدمة لسبب يعود للمنصة، يحق للعميل استرداد كامل المبلغ. الرسوم الاستشارية غير مستردة بعد تقديم الاستشارة.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">5. الملكية الفكرية</h3>
        <p>جميع حقوق الملكية الفكرية للمنصة ومحتوياتها محفوظة لشركة ريفانس المالية. يمنع نسخ أو إعادة استخدام أي جزء من المحتوى دون إذن كتابي.</p>
      </div>
    </div>
  </PageLayout>
);

export const Privacy: React.FC = () => (
  <PageLayout title="سياسة الخصوصية">
    <div className="space-y-6 text-[13px] leading-7 text-muted dark:text-gray-300 text-justify">
      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 mb-4">
        <ShieldCheck size={20} />
        <span className="font-bold">نلتزم بأعلى معايير حماية البيانات وفق أنظمة الأمن السيبراني السعودية.</span>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">1. جمع البيانات</h3>
        <p>نقوم بجمع البيانات الضرورية لتقديم الخدمة فقط، مثل الاسم، رقم الهوية، الراتب، والالتزامات المالية. يتم جمع هذه البيانات بموافقتك الصريحة عند تعبئة النماذج.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">2. استخدام البيانات</h3>
        <p>تستخدم بياناتك حصراً لغرض دراسة أهليتك التمويلية والتواصل مع الجهات التمويلية نيابة عنك. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">3. أمن المعلومات</h3>
        <p>نستخدم تقنيات تشفير متقدمة (SSL) لحماية بياناتك أثناء النقل والتخزين. يتم حفظ الملفات في خوادم آمنة ومحمية.</p>
      </div>

      <div>
        <h3 className="font-bold text-brand dark:text-gold mb-2">4. حقوق المستخدم</h3>
        <p>يحق لك في أي وقت طلب الاطلاع على بياناتك المسجلة لدينا، أو طلب تعديلها، أو طلب حذف ملفك نهائياً من سجلاتنا النشطة.</p>
      </div>
    </div>
  </PageLayout>
);

export const Complaints: React.FC = () => (
  <PageLayout title="الشكاوي والاقتراحات">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
         <p className="text-[13px] text-muted dark:text-gray-300 mb-6 leading-7">
           نحرص دائماً على رضاكم. إذا واجهت أي مشكلة أو كان لديك اقتراح لتطوير خدماتنا، لا تتردد في مراسلتنا. سيتم التعامل مع طلبك بكل جدية وسرية.
         </p>
         <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-4 rounded-[14px] border border-gray-100 dark:border-white/10">
               <Mail className="text-gold" size={20} />
               <div>
                  <div className="text-[11px] text-muted dark:text-gray-400">البريد الإلكتروني للشكاوي</div>
                  <div className="text-[13px] font-bold text-brand dark:text-white">info@rifans.net</div>
               </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-4 rounded-[14px] border border-gray-100 dark:border-white/10">
               <Phone className="text-gold" size={20} />
               <div>
                  <div className="text-[11px] text-muted dark:text-gray-400">الرقم الموحد</div>
                  <div className="text-[13px] font-bold text-brand dark:text-white dir-ltr">8002440432</div>
               </div>
            </div>
         </div>
      </div>

      <form className="bg-[#F9F8FC] dark:bg-black/20 p-5 rounded-[16px] border border-gold/20" onSubmit={(e) => e.preventDefault()}>
         <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-brand dark:text-gray-200 block mb-1.5">الاسم</label>
              <input type="text" className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-brand dark:text-gray-200 block mb-1.5">رقم الجوال</label>
              <input type="tel" className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-brand dark:text-gray-200 block mb-1.5">نوع الرسالة</label>
              <select className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none bg-white">
                 <option>شكوى</option>
                 <option>اقتراح</option>
                 <option>استفسار عام</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-brand dark:text-gray-200 block mb-1.5">التفاصيل</label>
              <textarea className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none h-24"></textarea>
            </div>
            <Button className="w-full mt-2">
               إرسال
            </Button>
         </div>
      </form>
    </div>
  </PageLayout>
);

export const Contact: React.FC = () => (
  <PageLayout title="اتصل بنا">
     <div className="grid grid-cols-1 gap-6">
        <div className="text-center mb-4">
           <p className="text-[13px] text-muted dark:text-gray-300">يسعدنا تواصلكم معنا عبر القنوات التالية</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="tel:8002440432" className="bg-white dark:bg-white/5 p-5 rounded-[16px] border border-gold/20 shadow-sm flex flex-col items-center gap-3 hover:border-gold transition-colors">
               <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Phone size={20} />
               </div>
               <div className="text-center">
                  <div className="text-[12px] font-bold text-brand dark:text-white">الرقم الموحد</div>
                  <div className="text-[11px] text-muted dir-ltr">8002440432</div>
               </div>
            </a>
            
            <a href="https://wa.me/966129511227" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-white/5 p-5 rounded-[16px] border border-gold/20 shadow-sm flex flex-col items-center gap-3 hover:border-gold transition-colors">
               <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <MessageCircle size={20} />
               </div>
               <div className="text-center">
                  <div className="text-[12px] font-bold text-brand dark:text-white">الواتساب</div>
                  <div className="text-[11px] text-muted dir-ltr">012 951 1227</div>
               </div>
            </a>

            <a href="mailto:info@rifans.net" className="bg-white dark:bg-white/5 p-5 rounded-[16px] border border-gold/20 shadow-sm flex flex-col items-center gap-3 hover:border-gold transition-colors sm:col-span-2 lg:col-span-1">
               <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Mail size={20} />
               </div>
               <div className="text-center">
                  <div className="text-[12px] font-bold text-brand dark:text-white">البريد الإلكتروني</div>
                  <div className="text-[11px] text-muted">info@rifans.net</div>
               </div>
            </a>
        </div>
        
         <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-white/5 p-5 rounded-[16px] border border-gold/20 shadow-sm flex flex-col items-center gap-3 hover:border-gold transition-colors">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <MapPin size={20} />
            </div>
            <div className="text-center">
            <div className="text-[12px] font-bold text-brand dark:text-white">المقر الرئيسي</div>
            <div className="text-[11px] text-muted">مكة المكرمة، المملكة العربية السعودية</div>
            </div>
        </a>

        {/* Map Placeholder */}
        <div className="w-full h-[300px] bg-gray-100 dark:bg-white/5 rounded-[20px] overflow-hidden border border-gray-200 dark:border-white/10 relative">
           <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.0560737039265!2d39.8579!3d21.4225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI1JzIxLjAiTiAzOcKwNTEnMjguNCJF!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={false} 
                loading="lazy"
                className="opacity-80 hover:opacity-100 transition-opacity"
            ></iframe>
        </div>
     </div>
  </PageLayout>
);

const SERVICES_LIST = [
  {
    name: "الخدمات التمويلية",
    description: "خدمات متكاملة لتنظيم التمويل الشخصي والعقاري والتأجيري وتمويل المنشآت، مع حلول للجدولة والتسوية وسداد المديونيات.",
    tags: "تمويل • جدولة",
    link: "https://rifanss.com/الخدمات-التمويلية"
  },
  {
    name: "الخدمات القضائية والعدلية",
    description: "خدمات متعلقة برفع الدعاوى والاعتراضات ومعالجة ملفات التنفيذ وإيقاف الخدمات والحجوزات.",
    tags: "دعاوى • تنفيذ",
    link: "https://rifanss.com/الخدمات-القضائية-والعدلية"
  },
  {
    name: "الخدمات المصرفية",
    description: "خدمات موجهة لتنظيم حساباتك البنكية، نقاط البيع، المحافظ الإلكترونية، وتحديث البيانات لدى البنوك.",
    tags: "حسابات • نقاط بيع",
    link: "https://rifanss.com/الخدمات-المصرفية"
  },
  {
    name: "الخدمات العقارية",
    description: "خدمات متعلقة بالسجل العقاري، الوسطاء العقاريين، عقود الإيجار، والتقييم العقاري والرهونات.",
    tags: "عقود • صكوك",
    link: "https://rifanss.com/الخدمات-العقارية"
  },
  {
    name: "الخدمات الزكوية والضريبية",
    description: "خدمات موجهة لأصحاب المنشآت لمتابعة الإقرارات والتسجيل والتعديل والاعتراض على الغرامات الزكوية والضريبية.",
    tags: "إقرارات • تسجيل",
    link: "https://rifanss.com/الخدمات-الزكوية-والضريبية"
  },
  {
    name: "الخدمات الائتمانية",
    description: "خدمات موجهة لتحسين السجل الائتماني، وتحديث حالة العميل لدى سمة، ودراسة الملاءة المالية.",
    tags: "سجل ائتماني",
    link: "https://rifanss.com/الخدمات-الإئتمانية"
  },
  {
    name: "الخدمات الاستشارية",
    description: "استشارات مالية متخصصة لتحليل الالتزامات وإعادة هيكلة الديون وتقديم توصيات ائتمانية مبنية على التحليل المالي.",
    tags: "استشارات",
    link: "https://rifanss.com/الخدمات-الاستشارية"
  }
];

export const ServicesPage: React.FC = () => (
  <PageLayout title="خدماتنا">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SERVICES_LIST.map((service, index) => (
        <a 
          key={index}
          href={service.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-gray-50 dark:bg-white/5 rounded-[16px] p-5 border border-gold/20 hover:border-gold/60 hover:shadow-md transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[14px] font-extrabold text-brand dark:text-white group-hover:text-gold transition-colors">
              {service.name}
            </h3>
            <span className="text-[10px] bg-white dark:bg-white/10 px-2 py-1 rounded-full text-gold font-bold border border-gold/10">
              {service.tags}
            </span>
          </div>
          <p className="text-[12px] text-muted dark:text-gray-300 leading-6 mb-4">
            {service.description}
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-brand dark:text-gold group-hover:translate-x-[-4px] transition-transform">
            <span>عرض التفاصيل</span>
            <ArrowLeft size={12} />
          </div>
        </a>
      ))}
    </div>
  </PageLayout>
);

// About Sections as Pages
const AboutText = {
  who: 'ريفانس المالية منصة إلكترونية رائدة تقدّم خدمات مالية رقمية واستشارية، تهدف إلى تمكين الأفراد من تحقيق الاستقرار المالي والرفاهية المستدامة. تأسست من قلب تجربة واقعية لمعالجة تحديات الأفراد المالية، لتكون منصة مختلفة لا تكتفي بتقديم المنتجات بل تقدّم حلولاً واعية واستشارات متخصصة تُحدث فرقًا حقيقيًا في حياة الناس.',
  goal: 'هدفنا إحداث فرق ملموس في حياة عملائنا من خلال تقديم حلول مالية واقعية ومبتكرة تعزّز قدرتهم على الوفاء بالتزاماتهم وتحقيق تطلعاتهم، مع تحويل التحديات المالية إلى فرص للنمو وبناء مستقبل مالي مستدام.',
  vision: 'أن نصبح العلامة التجارية الأبرز في مجال الحلول التمويلية والاستشارات المالية في المملكة العربية السعودية، وأن نكون الخيار الأول لكل من يبحث عن حلول مالية متكاملة تعكس الاحترافية والابتكار والموثوقية، ونسهم في بناء مجتمع مالي أكثر وعيًا وكفاءة.',
  message: 'رسالتنا تمكين الأفراد من مواجهة تحدياتهم المالية بثقة، من خلال خدمات متخصصة قائمة على الخبرة والمعرفة العميقة بالأنظمة واللوائح المصرفية، مع تمثيل صوت العميل أمام الجهات التمويلية والرقابية بما يضمن حقوقه ويزيد فرص حصوله على الحلول المناسبة.',
  mission: 'تكمن مهمتنا في توفير حلول تمويلية مبتكرة لكل عميل بشكل فردي، وتقديم خدمات قانونية ومالية احترافية في مجالات الإعفاء، وإعادة الجدولة، ومعالجة الديون المتعثرة، مع ضمان أعلى معايير الشفافية وبناء جسور ثقة عبر المتابعة المستمرة والتواصل الفعّال.'
};

export const AboutPage: React.FC = () => (
  <PageLayout title="من نحن">
    <div className="text-[14px] leading-8 text-muted dark:text-gray-300 text-justify">
       {AboutText.who}
    </div>
  </PageLayout>
);

export const GoalPage: React.FC = () => (
  <PageLayout title="هدفنا">
    <div className="text-[14px] leading-8 text-muted dark:text-gray-300 text-justify">
       {AboutText.goal}
    </div>
  </PageLayout>
);

export const VisionPage: React.FC = () => (
  <PageLayout title="رؤيتنا">
    <div className="text-[14px] leading-8 text-muted dark:text-gray-300 text-justify">
       {AboutText.vision}
    </div>
  </PageLayout>
);

export const MessagePage: React.FC = () => (
  <PageLayout title="رسالتنا">
    <div className="text-[14px] leading-8 text-muted dark:text-gray-300 text-justify">
       {AboutText.message}
    </div>
  </PageLayout>
);

export const MissionPage: React.FC = () => (
  <PageLayout title="مهمتنا">
    <div className="text-[14px] leading-8 text-muted dark:text-gray-300 text-justify">
       {AboutText.mission}
    </div>
  </PageLayout>
);
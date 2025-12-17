import React, { useState, useEffect } from 'react';
import { Section } from './Shared';
import { ArrowLeft, Volume2, VolumeX, Clock, Stethoscope } from 'lucide-react';
import WaiveRequestForm from './WaiveRequestForm';

type WaiveType = 'medical';

interface WaiveContent {
  title: string;
  label: string;
  body: string;
  list: string[];
}

const waiveData: Record<WaiveType, WaiveContent> = {
  medical: {
    title: "الإعفاء بسبب العجز الكلي وعدم اللياقة الطبية للعمل",
    label: "من دراسة التقارير الطبية حتى استلام قرار الإعفاء",
    body: "نساعدك في ترتيب ملف طلب الإعفاء نتيجة عجز طبي أو مرض مزمن، من خلال جمع التقارير الطبية المعتمدة، ومستندات إنهاء الخدمة أو ضعف القدرة على العمل، ثم رفع طلب متكامل للجهة التمويلية وفق الضوابط المعمول بها لديها.",
    list: [
      "مراجعة التقارير الطبية والتأكد من صدورها من جهات معتمدة.",
      "جمع مستندات إنهاء الخدمة أو انخفاض الدخل بشكل واضح.",
      "صياغة خطاب طلب الإعفاء بشكل مهني وإنساني.",
      "متابعة الطلب مع الجهة التمويلية حتى استلام النتيجة."
    ]
  }
};

const WaiveServices: React.FC = () => {
  const [activeType, setActiveType] = useState<WaiveType>('medical');
  const [isMuted, setIsMuted] = useState(true);
  
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Date: 2026/01/05
    const targetDate = new Date('2026-01-05T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStartService = () => {
    window.location.hash = '#/waive-form';
  };

  return (
    <>
      <Section id="rf-waive">
        
        {/* Initiative Countdown with Enhanced Premium Design */}
        <div className="bg-[#22042C] rounded-[24px] p-6 sm:p-8 text-white text-center mb-6 shadow-2xl border border-gold/30 relative overflow-hidden group">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#C7A969 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-soft/40 rounded-full blur-[80px]"></div>
            
            <h3 className="relative z-10 font-bold text-gold mb-6 leading-relaxed max-w-2xl mx-auto flex flex-col gap-1 items-center">
                <span className="text-[14px] sm:text-[15px] whitespace-nowrap">مبادرة ريفانس المالية لتقديم طلبات الإعفاء</span>
                <span className="text-white/80 text-[11px] sm:text-[12px] font-normal">للعملاء العاجزين طبياً بموجب تقارير معتمدة</span>
            </h3>

            {/* Countdown Container - Single Line, Starts with Seconds on Right (RTL) */}
            <div className="relative z-10 flex flex-nowrap justify-center items-center gap-2 sm:gap-6 mb-6 px-1" dir="rtl">
                
                {/* Seconds (First on Right) */}
                 <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[88px]">
                     <div className="w-full aspect-[0.85/1] sm:w-[88px] sm:h-[100px] bg-gradient-to-b from-gold/20 to-gold/5 backdrop-blur-md rounded-[14px] sm:rounded-[18px] border border-gold/40 flex items-center justify-center shadow-[0_0_30px_rgba(199,169,105,0.15)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
                        <span className="text-[26px] sm:text-[42px] font-black font-mono text-gold tabular-nums tracking-tight relative z-10 drop-shadow-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-bold text-gold uppercase tracking-widest bg-black/30 px-2 sm:px-3 py-1 rounded-full border border-gold/20 shadow-[0_0_10px_rgba(199,169,105,0.2)]">ثواني</span>
                </div>

                <div className="h-[40px] sm:h-[60px] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                {/* Minutes */}
                 <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[88px]">
                     <div className="w-full aspect-[0.85/1] sm:w-[88px] sm:h-[100px] bg-white/5 backdrop-blur-md rounded-[14px] sm:rounded-[18px] border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden group-hover:border-gold/30 transition-colors">
                        <span className="text-[26px] sm:text-[42px] font-black font-mono text-white tabular-nums tracking-tight drop-shadow-md">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-black/30 px-2 sm:px-3 py-1 rounded-full border border-white/5">دقائق</span>
                </div>

                <div className="h-[40px] sm:h-[60px] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                {/* Hours */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[88px]">
                     <div className="w-full aspect-[0.85/1] sm:w-[88px] sm:h-[100px] bg-white/5 backdrop-blur-md rounded-[14px] sm:rounded-[18px] border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden group-hover:border-gold/30 transition-colors">
                        <span className="text-[26px] sm:text-[42px] font-black font-mono text-white tabular-nums tracking-tight drop-shadow-md">{String(timeLeft.hours).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-black/30 px-2 sm:px-3 py-1 rounded-full border border-white/5">ساعات</span>
                </div>

                <div className="h-[40px] sm:h-[60px] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                {/* Days (Last on Left) */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[88px]">
                    <div className="w-full aspect-[0.85/1] sm:w-[88px] sm:h-[100px] bg-white/5 backdrop-blur-md rounded-[14px] sm:rounded-[18px] border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden group-hover:border-gold/30 transition-colors">
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <span className="text-[26px] sm:text-[42px] font-black font-mono text-white tabular-nums tracking-tight drop-shadow-md">{timeLeft.days}</span>
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-bold text-gold uppercase tracking-widest bg-black/30 px-2 sm:px-3 py-1 rounded-full border border-white/5">أيام</span>
                </div>

            </div>
            
            <div className="relative z-10 inline-flex items-center gap-2 bg-black/40 px-6 py-2.5 rounded-full border border-white/10 shadow-inner mt-2">
                <Clock size={16} className="text-gold" />
                <span className="text-[11px] sm:text-[12px] text-gray-300 font-medium tracking-wide">نهاية فترة المبادرة: <span className="text-white font-bold px-1">05 يناير 2026</span></span>
            </div>
        </div>

        {/* Intro Video */}
        <div className="relative w-full rounded-[24px] overflow-hidden mb-6 border border-gold/30 shadow-lg bg-black aspect-video group">
           <video
             autoPlay
             muted={isMuted}
             loop
             playsInline
             className="w-full h-full object-cover"
           >
             <source src="https://j.top4top.io/m_3635n3th80.mp4" type="video/mp4" />
           </video>
           
           {/* Custom Mute Control */}
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors shadow-sm"
             aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
           >
             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#3B0E49] to-[#22042C] p-[18px] text-white shadow-[0_20px_45px_rgba(0,0,0,0.28)] mb-6">
          {/* Decorative Circle */}
          <div className="absolute -top-[90px] -left-[40px] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle_at_15%_0%,rgba(199,169,105,0.78),transparent_65%)] opacity-70 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-black/25 rounded-full px-3 py-1.5 text-[11px] mb-2 backdrop-blur-sm border border-white/10">
              <span className="w-[9px] h-[9px] rounded-full bg-gold shadow-[0_0_0_4px_rgba(199,169,105,0.28)] block" />
              <span>حلول إعفاء إنسانية متوافقة مع الأنظمة</span>
            </div>

            <h1 className="text-[22px] font-extrabold mb-1">خدمات الإعفاء</h1>
            <p className="text-[13px] leading-relaxed opacity-90 mb-3 max-w-[780px]">
              نقدّم دعمًا متكاملاً لطلبات الإعفاء من الالتزامات التمويلية في حالات العجز الطبي، مع تنظيم ملف الطلب والتواصل مع الجهات التمويلية حتى صدور القرار.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-black/25 border border-white/35 backdrop-blur-md">إعفاء تمويلي بسبب عجز طبي</span>
            </div>
          </div>
        </div>

        {/* NEW Summary Card */}
        <div className="bg-white rounded-[24px] border border-gold/60 p-6 mb-6 relative shadow-sm overflow-hidden">
            <div className="absolute top-5 left-5 text-[#22042C] opacity-80">
                <Stethoscope size={42} strokeWidth={1} />
            </div>
            
            <div className="pr-1 relative z-10">
                <h3 className="text-[18px] font-extrabold text-[#22042C] mb-2 leading-relaxed max-w-[85%]">
                    الإعفاء بسبب العجز الكلي وعدم اللياقة الطبية للعمل
                </h3>
                <p className="text-[13px] text-gray-500 mb-6">
                    تنظيم ملفك الطبي والوظيفي ورفعه للجهات التمويلية.
                </p>
                
                <div className="flex justify-end gap-3">
                     <span className="px-5 py-1.5 rounded-[12px] border border-gold/30 text-[11px] font-bold text-[#22042C] bg-white shadow-sm">
                        إنهاء خدمة
                     </span>
                     <span className="px-5 py-1.5 rounded-[12px] border border-gold/30 text-[11px] font-bold text-[#22042C] bg-white shadow-sm">
                        تقارير طبية
                     </span>
                </div>
            </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-[20px] p-5 border border-gold/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
           
           <h2 className="text-[16px] font-extrabold text-brand mb-3 leading-snug">
             {waiveData[activeType].title}
           </h2>
           
           <p className="text-[13px] text-gray-600 leading-7 mb-5 text-justify pl-2">
             {waiveData[activeType].body}
           </p>

           <div className="bg-gray-50 rounded-[14px] p-4 border border-gray-100 mb-5">
             <h4 className="text-[12px] font-bold text-brand mb-3">آلية الخدمة:</h4>
             <ul className="space-y-2.5">
               {waiveData[activeType].list.map((item, idx) => (
                 <li key={idx} className="flex gap-2.5 text-[12px] text-gray-700 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                   <span className="leading-snug">{item}</span>
                 </li>
               ))}
             </ul>
           </div>

           <div className="flex flex-col gap-3">
             <button 
               onClick={handleStartService}
               className="w-full h-12 bg-gold-gradient text-brand font-bold rounded-[14px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between px-6 group"
             >
                <span>ابدأ الخدمة الآن</span>
                <span className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                  <ArrowLeft size={16} />
                </span>
             </button>
             <p className="text-[10px] text-center text-gray-400">
                يتم مراجعة الطلب مجاناً، ويتم تحديد الرسوم لاحقاً في حال القبول المبدئي
             </p>
           </div>
        </div>

      </Section>
    </>
  );
};

export default WaiveServices;
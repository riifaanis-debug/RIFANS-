import React, { useState } from 'react';
import { Lock, ShieldCheck, Landmark, HandCoins } from 'lucide-react';
import ContentModal from './ContentModal';

// Payment methods sorted as per the requested image (Left to Right in LTR view)
const paymentMethods = [
  { name: "STC Pay", logo: "https://i.top4top.io/p_3627yp40q1.jpg", height: "h-4" },
  { name: "Emkan", logo: "https://l.top4top.io/p_3627dpq1t1.jpg", height: "h-5" },
  { name: "Madfu", logo: "https://k.top4top.io/p_362748moq1.jpg", height: "h-5" },
  { name: "Tabby", logo: "https://h.top4top.io/p_36270p3n41.jpg", height: "h-6" },
  { name: "Tamara", logo: "https://a.top4top.io/p_3627hccoa1.jpg", height: "h-6" },
  { name: "Visa", logo: "https://e.top4top.io/p_3627apav41.jpg", height: "h-3 sm:h-4" },
  { name: "Mastercard", logo: "https://g.top4top.io/p_3627pvzwv1.jpg", height: "h-5" },
  { name: "Apple Pay", logo: "https://f.top4top.io/p_3627zoj4q1.jpg", height: "h-5" },
  { name: "Mada", logo: "https://d.top4top.io/p_3627qlj7s1.jpg", height: "h-4" },
];

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'complaints' | 'contact' | 'about' | 'goal' | 'vision' | 'message' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
    <footer className="w-full mt-auto pt-12 pb-8 bg-[#F9F8FC] dark:bg-[#0f0216] border-t border-gold/20">
      <div className="max-w-[520px] mx-auto px-6">
        
        {/* 1. Logo Removed */}
        <div className="mb-5"></div>

        {/* 2. Detailed Description */}
        <div className="text-center mb-8">
            <h2 className="text-[14px] font-extrabold text-brand dark:text-gold mb-3">
                ريفانس المالية | شركة حلول وإستشارات مالية
            </h2>
            <p className="text-[12px] leading-7 text-muted dark:text-gray-400 text-justify dir-rtl border-b border-gold/10 pb-6">
              مرخصة من البنك المركزي السعودي وخاضعة لإشراف ورقابة هيئة السوق المالية ، لضمان جودة الخدمة واستدامة الموثوقية. 
              تهتم بدراسة ومعالجة طلبات الأفراد في القطاع المصرفي ، وتقدم الحلول التمويلية ، والإستشارات المالية. 
              تلتزم بأعلى معايير الشفافية والسرعة ، وتسعى لتخفيف الأعباء المالية عن العملاء عبر منظومة رقمية متكاملة تُقدِّم الخدمة بخطوات واضحة وسهلة.
            </p>
        </div>

        {/* 3. Social Media */}
        <div className="flex justify-center items-center gap-4 mb-10">
            <SocialLink href="https://wa.me/966125911227" icon="https://d.top4top.io/p_3610plh810.png" label="WhatsApp" />
            <SocialLink href="https://x.com/rifaniis" icon="https://l.top4top.io/p_3606y8uyv7.png" label="X" />
            <SocialLink href="https://www.snapchat.com/add/rifaniis" icon="https://f.top4top.io/p_3606vb8in1.png" label="Snapchat" />
            <SocialLink href="https://www.instagram.com/rifaniis" icon="https://j.top4top.io/p_3606dy9q00.png" label="Instagram" />
            <SocialLink href="mailto:rifanis@hotmail.com" icon="https://i.top4top.io/p_36065rqnc4.png" label="Email" />
        </div>

        {/* 4. Two Columns: Important Links (Right) & About (Left) */}
        <div className="grid grid-cols-2 gap-6 mb-10">
            
            {/* Right Column: Important Links */}
            <div className="text-right">
                <h3 className="text-[14px] font-extrabold text-brand dark:text-white mb-4 border-r-2 border-gold pr-2">روابط مهمة</h3>
                <ul className="space-y-3 pr-2">
                    <li><FooterButton onClick={() => setActiveModal('terms')}>الشروط والأحكام</FooterButton></li>
                    <li><FooterButton onClick={() => setActiveModal('privacy')}>سياسة الخصوصية</FooterButton></li>
                    <li><FooterButton onClick={() => setActiveModal('complaints')}>الشكاوي والاقتراحات</FooterButton></li>
                    <li><FooterButton onClick={() => setActiveModal('contact')}>اتصل بنا</FooterButton></li>
                </ul>
            </div>

            {/* Left Column: About Rifans (Left Aligned) */}
            <div className="text-left" dir="ltr">
                <h3 className="text-[14px] font-extrabold text-brand dark:text-white mb-4 border-l-2 border-gold pl-2">عن ريفانس</h3>
                <ul className="space-y-3 pl-2">
                    <li><FooterButton align="left" onClick={() => setActiveModal('about')}>من نحن</FooterButton></li>
                    <li><FooterButton align="left" onClick={() => setActiveModal('goal')}>هدفنا</FooterButton></li>
                    <li><FooterButton align="left" onClick={() => setActiveModal('vision')}>رؤيتنا</FooterButton></li>
                    <li><FooterButton align="left" onClick={() => setActiveModal('message')}>رسالتنا</FooterButton></li>
                </ul>
            </div>
        </div>

        {/* 5. Licensing Info & SAMA Logo */}
        <div className="text-center mb-10 bg-white rounded-[20px] p-6 border border-gold/30 shadow-sm">
             <h3 className="text-[16px] font-extrabold text-brand mb-2">ريفانس المالية</h3>
             <p className="text-[12px] text-muted mb-1">مرخصة من قبل البنك المركزي السعودي</p>
             <p className="text-[12px] text-muted mb-4">خاضعة لإشراف ورقابة هيئة السوق المالية</p>
             
             <div className="flex justify-center pt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Logo_Saudi_Arabian_Monetary_Authority.svg" alt="SAMA" className="h-[55px] opacity-90 hover:opacity-100 transition-opacity" />
             </div>
        </div>

        {/* 6. Payment Methods Strip (Matches requested image style) */}
        <div className="flex flex-col items-center gap-4 mb-8 w-full">
            <h4 className="text-[12px] font-bold text-muted/80">وسائل الدفع المتاحة</h4>
            
            <div className="w-full bg-white dark:bg-white/5 rounded-[50px] shadow-sm border border-gray-100 dark:border-gray-800 p-2 sm:p-3 overflow-hidden">
                <div className="flex items-center justify-between gap-4 sm:gap-6 px-2 overflow-x-auto scrollbar-hide" dir="ltr">
                    
                    {/* Left Icon (Cyan Circle) */}
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#14F1D7] flex items-center justify-center shadow-sm border-[3px] border-[#10DBC3] text-brand">
                        <HandCoins size={22} strokeWidth={1.8} />
                    </div>

                    {/* Logos Strip */}
                    <div className="flex items-center gap-4 sm:gap-5 shrink-0">
                        {paymentMethods.map((pm, idx) => (
                            <img 
                                key={idx} 
                                src={pm.logo} 
                                alt={pm.name} 
                                className={`${pm.height} object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300`}
                                loading="lazy"
                            />
                        ))}
                    </div>

                    {/* Right Icon (Bank) */}
                    <div className="shrink-0 flex items-center justify-center">
                        <Landmark size={32} className="text-brand dark:text-white" />
                    </div>

                </div>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-bold">عمليات دفع آمنة ومشفرة SSL</span>
            </div>
        </div>

        {/* 7. Copyright */}
        <div className="text-center pt-6 border-t border-gold/10">
            <p className="text-[11px] text-brand/60 dark:text-gray-500 font-medium">جميع الحقوق محفوظة | لدى ريفانس المالية 2025 ©</p>
        </div>

      </div>
    </footer>

    {activeModal && (
        <ContentModal type={activeModal} onClose={closeModal} />
    )}
    </>
  );
};

const SocialLink: React.FC<{ href: string; icon: string; label: string }> = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className="w-[38px] h-[38px] rounded-full bg-white dark:bg-white/10 border border-gold/30 flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md hover:border-gold transition-all duration-300 group"
  >
    <img src={icon} alt={label} className="w-[20px] h-[20px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
  </a>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a 
        href={href} 
        className="text-[12px] font-medium text-muted dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors block hover:translate-x-1 duration-200"
    >
        {children}
    </a>
);

const FooterButton: React.FC<{ onClick: () => void; children: React.ReactNode; align?: 'left' | 'right' }> = ({ onClick, children, align = 'right' }) => (
    <button 
        onClick={onClick}
        className={`text-[12px] font-medium text-muted dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors block hover:translate-x-1 duration-200 w-full ${align === 'left' ? 'text-left' : 'text-right'}`}
    >
        {children}
    </button>
);

export default Footer;
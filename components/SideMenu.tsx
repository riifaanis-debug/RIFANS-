import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'الصفحة الرئيسية', href: '#/' },
  { label: 'باقات الخدمات المدفوعة', href: '#rf-products', highlight: true },
  { label: 'أدوات ريفانس الذكية', href: '#calculator' },
  { label: 'من نحن', href: '#/about' },
  { label: 'اتصل بنا', href: '#/contact' },
  { label: 'الخدمات التمويلية', href: 'https://rifanss.com/الخدمات-التمويلية' },
  { label: 'الخدمات القضائية والعدلية', href: 'https://rifanss.com/الخدمات-القضائية-والعدلية' },
  { label: 'الخدمات المصرفية', href: 'https://rifanss.com/الخدمات-المصرفية' },
  { label: 'الخدمات العقارية', href: 'https://rifanss.com/الخدمات-العقارية' },
  { label: 'الخدمات الزكوية والضريبية', href: 'https://rifanss.com/الخدمات-الزكوية-والضريبية' },
  { label: 'خدمات الإعفاء من المنتجات التمويلية', href: '#/waive-landing' },
  { label: 'الخدمات الائتمانية', href: 'https://rifanss.com/الخدمات-الإئتمانية' },
  { label: 'الخدمات الاستشارية', href: 'https://rifanss.com/الخدمات-الاستشارية' },
];

const socialLinks = [
    { href: "https://www.instagram.com/rifaniis", icon: "https://j.top4top.io/p_3606dy9q00.png", label: "Instagram" },
    { href: "https://x.com/rifaniis", icon: "https://l.top4top.io/p_3606y8uyv7.png", label: "X" },
    { href: "https://wa.me/966125911227", icon: "https://d.top4top.io/p_3610plh810.png", label: "WhatsApp" },
    { href: "https://www.snapchat.com/add/rifaniis", icon: "https://f.top4top.io/p_3606vb8in1.png", label: "Snapchat" },
    { href: "mailto:rifanis@hotmail.com", icon: "https://i.top4top.io/p_36065rqnc4.png", label: "Email" },
];

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an internal anchor link or hash route
    if (href.startsWith('#')) {
      // If it's a specific route like #/terms, allow default behavior but close menu
      if (href.includes('/')) {
        onClose();
        // Allow navigation
      } else {
        // Scroll link
        e.preventDefault();
        onClose();

        setTimeout(() => {
          if (href === '#/') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
             window.history.pushState("", document.title, window.location.pathname);
          } else {
             const targetId = href.replace('#', '');
             const element = document.getElementById(targetId);
             if (element) {
               element.scrollIntoView({ behavior: 'smooth', block: 'start' });
               window.history.pushState(null, '', href);
             }
          }
        }, 100);
      }
    } else {
       // External links handle themselves, but we close the menu
       onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`relative w-full max-w-[320px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gold/10">
           <button 
             onClick={onClose} 
             className="w-8 h-8 flex items-center justify-center text-muted hover:text-brand hover:bg-gray-50 rounded-full transition-colors"
           >
             <X size={24} />
           </button>
           <div className="flex-1 flex justify-center mr-[-32px]">
             {/* Logo Removed */}
           </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2">
            {menuItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  target={item.href.startsWith('http') ? "_blank" : "_self"}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`block px-6 py-4 text-[14px] font-bold border-b border-gray-50 transition-colors text-right
                    ${item.highlight 
                      ? 'text-gold bg-[#FFFBF2] border-l-4 border-l-gold hover:bg-[#FDF6E3]' 
                      : 'text-brand hover:bg-[#FFFBF2] hover:text-gold'
                    }`}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                    {item.label}
                </a>
            ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#F9F8FC] border-t border-gold/20 flex flex-col items-center">
            <div className="text-[15px] font-extrabold text-brand mb-4">ريفانس المالية</div>
            <div className="flex items-center gap-5">
                {socialLinks.map((link, i) => (
                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 hover:scale-110 transition-all">
                        <img src={link.icon} alt={link.label} className="w-5 h-5 object-contain" />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
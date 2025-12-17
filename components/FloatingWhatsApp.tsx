import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/966125911227"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-[55px] h-[55px] bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(37,211,102,0.35)]"
      aria-label="تواصل معنا عبر واتساب"
    >
      <img 
        src="https://d.top4top.io/p_3610plh810.png" 
        alt="WhatsApp" 
        className="w-[30px] h-[30px] object-contain" 
      />
      {/* Pulse effect ring */}
      <span className="absolute inset-0 rounded-full border border-[#25D366] opacity-0 animate-ping"></span>
    </a>
  );
};

export default FloatingWhatsApp;
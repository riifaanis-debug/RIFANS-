import React, { useState } from 'react';
import { Section, SectionHeader } from './Shared';
import { Building2 } from 'lucide-react';

interface Partner {
  name: string;
  domain: string;
  customLogo?: string;
}

const partnersData: Partner[] = [
  { name: "بيان", domain: "bayan.com.sa" },
  { name: "علم", domain: "elm.sa" },
  { name: "سمة", domain: "simah.com" },
  { name: "البنك المركزي السعودي", domain: "sama.gov.sa" },
  { name: "ناجز", domain: "najiz.sa" },
  { name: "مصرف الراجحي", domain: "alrajhibank.com.sa" },
  { name: "البنك الأول SAB", domain: "sab.com" },
  { name: "البنك الأهلي SNB", domain: "alahli.com" },
  { name: "بنك البلاد", domain: "bankalbilad.com" },
  { name: "بنك الرياض", domain: "riyadbank.com" },
  { name: "البنك العربي", domain: "anb.com.sa" },
  { name: "D360", domain: "d360.com" },
  { name: "STC Bank", domain: "stcpay.com.sa" },
  { name: "مصرف الإنماء", domain: "alinma.com" },
  { 
    name: "الهيئة العامة للعقار", 
    domain: "rega.gov.sa",
    customLogo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Real_Estate_General_Authority_Logo.svg"
  },
  { name: "إحكام", domain: "ehkaam.sa" },
  { name: "وزارة المالية", domain: "mof.gov.sa" },
  { name: "فنتك السعودية", domain: "fintechsaudi.com" },
  { name: "وزارة العدل", domain: "moj.gov.sa" },
  { name: "هيئة السوق المالية", domain: "cma.org.sa" },
  { name: "الزكاة والضريبة", domain: "zatca.gov.sa" },
  { name: "منشآت", domain: "monshaat.gov.sa" },
  { name: "نيوم", domain: "neom.com" },
  { name: "صندوق الاستثمارات", domain: "pif.gov.sa" },
];

// Split partners into two rows
const half = Math.ceil(partnersData.length / 2);
const row1 = partnersData.slice(0, half);
const row2 = partnersData.slice(half);

interface PartnerLogoProps {
  name: string;
  domain?: string;
  customLogo?: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, domain, customLogo }) => {
  const [error, setError] = useState(false);
  
  // Construct reliable logo URL: Use customLogo if available, otherwise Clearbit
  const logoUrl = customLogo || (domain ? `https://logo.clearbit.com/${domain}` : '');

  return (
      <div className="relative group/sticker w-[85px] h-[85px] md:w-[100px] md:h-[100px] flex items-center justify-center mx-3 my-2 cursor-pointer transition-transform hover:z-10">
          {/* Sticker Background - White Circle with Shadow/Peel effect */}
          <div className="absolute inset-0 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-gray-100 group-hover/sticker:shadow-[0_10px_25px_rgba(199,169,105,0.25)] group-hover/sticker:scale-110 transition-all duration-300">
             {/* Subtle Inner Glow/Gradient */}
             <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-gray-50 opacity-50"></div>
          </div>

          {/* Logo Container - Increased size to 70% */}
          <div className="relative z-10 w-[70%] h-[70%] flex items-center justify-center">
             {!error && logoUrl ? (
                <img 
                    src={logoUrl} 
                    alt={name} 
                    onError={() => setError(true)}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
             ) : (
                <div className="flex flex-col items-center justify-center opacity-50">
                   <Building2 className="text-brand mb-1" size={16} />
                   <span className="text-[7px] font-bold text-center text-brand leading-tight line-clamp-1">{name}</span>
                </div>
             )}
          </div>
      </div>
  );
};

const Partners: React.FC = () => {
  return (
    <Section id="partners" className="mt-10 mb-10">
      <SectionHeader 
        eyebrow="منظومة متكاملة"
        title="شركاء النجاح" 
        subtitle={
          <>
            نفخر بالتعاون والتكامل مع كبرى الجهات المالية والحكومية
            <br />
            لتقديم خدمات موثوقة وآمنة.
          </>
        }
        align="center"
      />
      
      <div className="relative w-full overflow-hidden py-4" dir="ltr">
        
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F4FA] dark:from-[#06010a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F4FA] dark:from-[#06010a] to-transparent z-10 pointer-events-none"></div>

        {/* Row 1 - Normal Direction */}
        <div className="flex animate-marquee w-max items-center hover:[animation-play-state:paused] mb-2">
          {/* Duplicate list to ensure smooth infinite loop */}
          {[...row1, ...row1, ...row1].map((partner, idx) => (
              <PartnerLogo key={`r1-${idx}`} name={partner.name} domain={partner.domain} customLogo={partner.customLogo} />
          ))}
        </div>

        {/* Row 2 - Reverse Direction */}
        <div 
            className="flex animate-marquee w-max items-center hover:[animation-play-state:paused]"
            style={{ animationDirection: 'reverse' }}
        >
          {[...row2, ...row2, ...row2].map((partner, idx) => (
              <PartnerLogo key={`r2-${idx}`} name={partner.name} domain={partner.domain} customLogo={partner.customLogo} />
          ))}
        </div>
        
      </div>
    </Section>
  );
};

export default Partners;
import React, { useState } from 'react';
import { Section, SectionHeader, StripContainer, PulseDot, Button } from './Shared';
import { ServiceItem } from '../types';
import { X, ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { t, direction } = useLanguage();

  const services: ServiceItem[] = [
    {
      name: t('srv_finance'),
      description: t('srv_finance_desc'),
      tags: "تمويل • جدولة",
      link: "https://rifanss.com/الخدمات-التمويلية"
    },
    {
      name: t('srv_legal'),
      description: t('srv_legal_desc'),
      tags: "دعاوى • تنفيذ",
      link: "https://rifanss.com/الخدمات-القضائية-والعدلية"
    },
    {
      name: t('srv_banking'),
      description: t('srv_banking_desc'),
      tags: "حسابات • نقاط بيع",
      link: "https://rifanss.com/الخدمات-المصرفية"
    },
    {
      name: t('srv_realestate'),
      description: t('srv_realestate_desc'),
      tags: "عقود • صكوك",
      link: "https://rifanss.com/الخدمات-العقارية"
    },
    {
      name: t('srv_zakat'),
      description: t('srv_zakat_desc'),
      tags: "إقرارات • تسجيل",
      link: "https://rifanss.com/الخدمات-الزكوية-والضريبية"
    },
    {
      name: t('srv_credit'),
      description: t('srv_credit_desc'),
      tags: "سجل ائتماني",
      link: "https://rifanss.com/الخدمات-الإئتمانية"
    },
    {
      name: t('srv_consult'),
      description: t('srv_consult_desc'),
      tags: "استشارات",
      link: "https://rifanss.com/الخدمات-الاستشارية"
    }
  ];

  return (
    <>
      <Section id="rf-main-services">
        <SectionHeader title={t('services_title')} />
        <StripContainer>
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer snap-center min-w-[260px] max-w-[320px] bg-white dark:bg-[#12031a] dark:border-white/10 rounded-[22px] p-[18px] pb-3 border border-gold/85 shadow-[0_10px_26px_rgba(199,169,105,0.18)] flex flex-col justify-between transition-all duration-300 ease-out relative overflow-hidden hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(199,169,105,0.35)] dark:hover:shadow-[0_20px_40px_rgba(199,169,105,0.15)]"
            >
              {/* Decorative circle */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/10 transition-colors"></div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[13px] font-extrabold text-brand dark:text-gray-100 transition-colors">{service.name}</h3>
                  <PulseDot />
                </div>
                <p className="text-[12px] text-muted dark:text-gray-400 mb-4 leading-relaxed line-clamp-3 min-h-[4.5em] transition-colors">{service.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-1 pt-3 border-t border-gold/10">
                <span className="text-[10px] text-gold font-medium">{service.tags}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold text-brand dark:text-white bg-gold/10 hover:bg-gold/25 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  {t('know_more')}
                  {direction === 'rtl' ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                </button>
              </div>
            </div>
          ))}
        </StripContainer>
      </Section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-brand/60 backdrop-blur-sm transition-opacity" 
             onClick={() => setSelectedService(null)}
           />
           
           {/* Modal Content */}
           <div className="relative w-full max-w-[380px] bg-white dark:bg-[#1a0b25] rounded-[24px] border border-gold/50 shadow-2xl p-6 animate-in zoom-in-95 fade-in duration-200">
              <button 
                onClick={() => setSelectedService(null)}
                className={`absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} w-8 h-8 rounded-full bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 text-muted dark:text-gray-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/20 transition-colors`}
              >
                <X size={18} />
              </button>
              
              <div className="pt-2">
                <div className="text-[11px] font-bold text-gold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold inline-block"></span>
                  {selectedService.tags}
                </div>
                <h3 className="text-[20px] font-extrabold text-brand dark:text-white mb-4">{selectedService.name}</h3>
                <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-4 border border-gray-100 dark:border-white/10 mb-6">
                  <p className={`text-[13px] text-muted dark:text-gray-300 leading-7 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{selectedService.description}</p>
                </div>
              </div>

              <div className="flex gap-3">
                 <a href={selectedService.link} className="flex-1 block" target="_blank" rel="noopener noreferrer">
                   <Button className="w-full h-11 text-[13px] gap-2 !justify-between px-6">
                     <span>{t('goto_service')}</span>
                     <ExternalLink size={16} />
                   </Button>
                 </a>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default Services;
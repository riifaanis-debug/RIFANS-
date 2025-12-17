import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Performance from './components/Performance';
import Footer from './components/Footer';
import WaiveServices from './components/WaiveServices';
import Partners from './components/Partners';
import BackToTop from './components/BackToTop';
import { Section, SectionHeader, Card, Button, StripContainer } from './components/Shared';
import { Check, Scale, MessageCircle, Lock, Monitor, FileText, Bell, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { Terms, Privacy, Complaints, Contact, AboutPage, GoalPage, VisionPage, MessagePage, MissionPage, ServicesPage } from './components/StaticPages';
import WaiveRequestForm from './components/WaiveRequestForm';

// Sub-components for long text sections
const IntroSection = () => {
  const { t, direction } = useLanguage();
  return (
    <Section id="intro">
      <Card className="!py-4">
        <p className={`${direction === 'rtl' ? 'text-right' : 'text-left'} m-0 text-muted dark:text-gray-300 leading-7 transition-colors`}>
          {t('intro_text')}
        </p>
      </Card>
    </Section>
  );
};

const StorySection = () => {
  const { t, direction } = useLanguage();
  return (
    <Section id="story">
      <Card className="bg-story-gradient dark:bg-none dark:bg-[#1a0520] border-gold/90 shadow-xl">
        <h2 className={`text-[18px] font-extrabold text-brand dark:text-gold mb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'} transition-colors`}>{t('story_title')}</h2>
        <div className={`space-y-3 text-[12px] leading-7 text-muted dark:text-gray-300 ${direction === 'rtl' ? 'text-right' : 'text-left'} transition-colors`}>
          <p>{t('story_p1')}</p>
          <p>{t('story_p2')}</p>
          <p>{t('story_p3')}</p>
        </div>
      </Card>
    </Section>
  );
};

const WhySection = () => {
  const { t } = useLanguage();
  return (
    <Section id="why-rv">
      <Card>
        <SectionHeader 
          eyebrow={t('why_eyebrow')} 
          title={t('why_title')} 
          subtitle={t('why_subtitle')}
        />
        <div className="grid grid-cols-1 gap-2.5">
          {[
            { icon: <Check size={14} />, title: t('why_1_title'), text: t('why_1_text') },
            { icon: <Scale size={14} />, title: t('why_2_title'), text: t('why_2_text') },
            { icon: <MessageCircle size={14} />, title: t('why_3_title'), text: t('why_3_text') },
            { icon: <Lock size={14} />, title: t('why_4_title'), text: t('why_4_text') }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-white to-[#F6F0E4] border border-gold/70 flex items-center justify-center text-gold shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-brand dark:text-gray-100 mb-0.5 transition-colors">{item.title}</div>
                <div className="text-[12px] text-muted dark:text-gray-400 transition-colors">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
};

const HowItWorksSection = () => {
  const { t, direction } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = [
    { 
      title: t('step_1_title'), 
      text: t('step_1_text'),
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
      step: "01"
    },
    { 
      title: t('step_2_title'), 
      text: t('step_2_text'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      step: "02"
    },
    { 
      title: t('step_3_title'), 
      text: t('step_3_text'),
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      step: "03"
    },
    { 
      title: t('step_4_title'), 
      text: t('step_4_text'),
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600",
      step: "04"
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <Section id="how-it-works">
      <SectionHeader 
        eyebrow={t('how_eyebrow')} 
        title={t('how_title')} 
        subtitle={t('how_subtitle')}
      />
      
      <div className="relative w-full overflow-hidden rounded-[24px] shadow-lg border border-gold/30">
        {/* Slides Container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-[360px]"
          style={{ 
            transform: `translateX(${direction === 'rtl' ? currentIndex * 100 : -currentIndex * 100}%)` 
          }}
        >
          {steps.map((step, i) => (
            <div key={i} className="min-w-full h-full relative group">
              {/* Background Image */}
              <img 
                src={step.image} 
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/80 to-transparent opacity-90"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white pb-10">
                <div className="absolute top-5 left-5 w-14 h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10 z-10 shadow-[0_0_15px_rgba(199,169,105,0.4)]">
                  <span className="text-[20px] font-black text-gold">{step.step}</span>
                </div>

                <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
                  <h3 className="text-[20px] font-extrabold mb-2 leading-tight text-gold drop-shadow-sm">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-gray-100 leading-7 opacity-95 max-w-[90%]">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-8 bg-gold' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const AudienceSection = () => {
  const { t } = useLanguage();
  
  const items = [
    { tag: t('aud_1_tag'), title: t('aud_1_title'), text: t('aud_1_text') },
    { tag: t('aud_2_tag'), title: t('aud_2_title'), text: t('aud_2_text') },
    { tag: t('aud_3_tag'), title: t('aud_3_title'), text: t('aud_3_text') },
  ];

  // Duplicate items for seamless marquee loop (4 sets)
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <Section id="audience">
      <Card>
        <SectionHeader 
          eyebrow={t('aud_eyebrow')} 
          title={t('aud_title')} 
          subtitle={t('aud_subtitle')}
        />
        
        <div className="relative w-full overflow-hidden" dir="ltr">
             {/* Gradient Masks for smooth fade out at edges */}
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-[#12031a] to-transparent z-10 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-[#12031a] to-transparent z-10 pointer-events-none"></div>

             <div className="flex gap-4 animate-marquee py-2 w-max hover:[animation-play-state:paused]">
                {marqueeItems.map((item, i) => (
                    <div key={i} className="min-w-[260px] bg-white dark:bg-[#1a0b25] rounded-[18px] border border-gold/40 dark:border-gold/20 p-5 shadow-sm flex flex-col justify-center transition-transform hover:scale-105" dir="rtl">
                      <div className="text-[10px] font-bold text-gold mb-2 bg-gold/5 w-fit px-2 py-0.5 rounded-full border border-gold/10">{item.tag}</div>
                      <div className="text-[14px] font-extrabold text-brand dark:text-gray-100 mb-2 transition-colors">{item.title}</div>
                      <div className="text-[12px] text-muted dark:text-gray-400 transition-colors leading-relaxed">{item.text}</div>
                    </div>
                ))}
             </div>
        </div>
      </Card>
    </Section>
  );
};

const TimelineSection = () => {
  const { t, direction } = useLanguage();
  return (
    <Section id="timeline">
      <Card>
        <SectionHeader eyebrow={t('time_eyebrow')} title={t('time_title')} />
        <div className={`relative flex flex-col gap-2 ${direction === 'rtl' ? 'pr-2' : 'pl-2'}`}>
          {/* Vertical Line */}
          <div className={`absolute top-1 ${direction === 'rtl' ? 'right-[11px]' : 'left-[11px]'} w-[2px] h-full bg-gold/50`} />
          
          {[
            { title: t('time_1_title'), text: t('time_1_text') },
            { title: t('time_2_title'), text: t('time_2_text') },
            { title: t('time_3_title'), text: t('time_3_text') },
            { title: t('time_4_title'), text: t('time_4_text') },
          ].map((item, i) => (
            <div key={i} className={`relative ${direction === 'rtl' ? 'pr-6' : 'pl-6'}`}>
              <div className={`w-[10px] h-[10px] rounded-full bg-gold absolute ${direction === 'rtl' ? 'right-[7px]' : 'left-[7px]'} top-[5px] shadow-[0_0_0_4px_rgba(199,169,105,0.25)] z-10`} />
              <div className="text-[13px] font-extrabold text-brand dark:text-gray-100 mb-0.5 transition-colors">{item.title}</div>
              <div className="text-[12px] text-muted dark:text-gray-400 transition-colors">{item.text}</div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
};

const LandingPage: React.FC = () => (
  <>
    <Header />
    <Hero />
    <div className="relative -mt-10 z-10">
      <IntroSection />
      <About />
      <StorySection />
      <WhySection />
      <Performance />
      <HowItWorksSection />
      <AudienceSection />
      <WaiveServices />
      <TimelineSection />
      <Footer />
    </div>
    <BackToTop />
  </>
);

const WaiveLandingPage: React.FC = () => (
  <>
    <Header />
    <Hero />
    <div className="relative -mt-10 z-10">
      <IntroSection />
      <About />
      <StorySection />
      <WhySection />
      <Performance />
      <HowItWorksSection />
      <WaiveServices />
      <TimelineSection />
      <Footer />
    </div>
    <BackToTop />
  </>
);

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const getComponent = () => {
    switch(route) {
      case '#/services': return <ServicesPage />;
      case '#/terms': return <Terms />;
      case '#/privacy': return <Privacy />;
      case '#/complaints': return <Complaints />;
      case '#/contact': return <Contact />;
      case '#/about': return <AboutPage />;
      case '#/goal': return <GoalPage />;
      case '#/vision': return <VisionPage />;
      case '#/message': return <MessagePage />;
      case '#/mission': return <MissionPage />;
      case '#/waive-landing': return <WaiveLandingPage />;
      case '#/waive-form': return <WaiveRequestForm onClose={() => window.location.hash = '#/waive-landing'} />;
      default: return <LandingPage />;
    }
  };

  return (
    <main className="w-full max-w-full overflow-x-hidden mx-auto min-h-screen bg-page dark:bg-[#06010a] transition-colors duration-300">
      {getComponent()}
    </main>
  );
};

export default App;
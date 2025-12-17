import React, { useState, useEffect } from 'react';
import { Section, SectionHeader, Card, Button } from './Shared';
import { Banknote, Car, Home, Building2, Calculator, ArrowLeft, RefreshCw, Layers, Wallet, CheckCircle2, AlertCircle, PieChart, Percent, ShieldCheck } from 'lucide-react';

const FINANCE_TYPES = [
  {
    id: 'personal',
    title: 'التمويل الشخصي',
    icon: <Banknote size={24} />,
    desc: 'سيولة نقدية فورية تغطي احتياجاتك بمرونة عالية وفترات سداد تصل إلى 60 شهرًا.',
    features: ['بدون تحويل راتب (لبعض الجهات)', 'هامش ربح منافس', 'إجراءات رقمية']
  },
  {
    id: 'realestate',
    title: 'التمويل العقاري',
    icon: <Home size={24} />,
    desc: 'امتلك منزلك الآن أو احصل على تمويل بضمان عقارك الحالي بشروط ميسرة.',
    features: ['مدعوم وغير مدعوم', 'فترة سداد حتى 25 سنة', 'إعفاء في حالة الوفاة']
  },
  {
    id: 'auto',
    title: 'التمويل التأجيري',
    icon: <Car size={24} />,
    desc: 'امتلك سيارة أحلامك بنظام التأجير المنتهي بالتمليك أو المرابحة.',
    features: ['بدون دفعة أولى', 'تأمين شامل', 'موافقات فورية']
  },
  {
    id: 'sme',
    title: 'تمويل المنشآت',
    icon: <Building2 size={24} />,
    desc: 'حلول تمويلية لدعم رأس المال العامل وتوسع المشاريع الصغيرة والمتوسطة.',
    features: ['دعم نقاط البيع', 'تمويل الرواتب', 'فترات سماح']
  }
];

const DEBT_SOLUTIONS = [
  {
    title: 'إعادة جدولة التمويل',
    desc: 'خيار مثالي لتخفيض قيمة القسط الشهري عبر تمديد فترة السداد، مما يمنحك متنفساً مالياً يتناسب مع دخلك الحالي.',
    icon: <RefreshCw size={22} />
  },
  {
    title: 'توحيد الالتزامات',
    desc: 'دمج جميع أقساطك (بطاقات، شخصي، سيارة) في قسط واحد مخفض لدى جهة تمويلية واحدة وبنسبة ربح أقل.',
    icon: <Layers size={22} />
  },
  {
    title: 'سداد المتعثرات',
    desc: 'حلول سيولة مؤقتة لإغلاق المديونيات القديمة في سمة أو إيقاف الخدمات، لتمكينك من استخراج تمويل جديد.',
    icon: <Wallet size={22} />
  }
];

const FinanceServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'debt'>('products');

  // Quick Calculator State
  const [salary, setSalary] = useState<number>(10000);
  const [obligations, setObligations] = useState<number>(0);
  const [amount, setAmount] = useState<number>(100000);
  const [years, setYears] = useState<number>(5);
  const [profitRate, setProfitRate] = useState<number>(3.5); // Annual Profit Rate %
  
  // Results State
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalDue, setTotalDue] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(true);
  const [maxLoan, setMaxLoan] = useState<number>(0);

  useEffect(() => {
    // Calculation Logic
    // Total Interest = Principal * (Rate/100) * Years
    const calculatedTotalProfit = amount * (profitRate / 100) * years;
    const calculatedTotalDue = amount + calculatedTotalProfit;
    const months = years * 12;
    const payment = calculatedTotalDue / months;

    setTotalProfit(calculatedTotalProfit);
    setTotalDue(calculatedTotalDue);
    setMonthlyPayment(payment);

    // Check Eligibility (Standard 33% DBR for new finance)
    const DBR_RATIO = 0.33;
    const maxInstallment = salary * DBR_RATIO;
    const remainingCapacity = Math.max(0, maxInstallment - obligations);
    
    // Eligible if the new payment fits within remaining capacity
    setIsEligible(payment <= remainingCapacity);

    // Calculate Max Possible Loan Amount based on remaining capacity
    // Formula: Principal = (Payment * Months) / (1 + Rate*Years)
    const maxPrincipal = (remainingCapacity * months) / (1 + (profitRate / 100) * years);
    setMaxLoan(maxPrincipal > 0 ? maxPrincipal : 0);

  }, [amount, years, salary, obligations, profitRate]);

  return (
    <Section id="rf-finance-services">
      
      {/* Hero / Intro Card removed as requested */}

      {/* Tabs Controller */}
      <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-[16px] border border-gold/20 mb-6 shadow-sm mt-4">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 rounded-[12px] text-[12px] font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            activeTab === 'products' 
              ? 'bg-brand text-gold shadow-md' 
              : 'text-muted hover:bg-gray-50 dark:hover:bg-white/10'
          }`}
        >
          <Banknote size={16} />
          منتجات التمويل
        </button>
        <button
          onClick={() => setActiveTab('debt')}
          className={`flex-1 py-3 rounded-[12px] text-[12px] font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            activeTab === 'debt' 
              ? 'bg-brand text-gold shadow-md' 
              : 'text-muted hover:bg-gray-50 dark:hover:bg-white/10'
          }`}
        >
          <RefreshCw size={16} />
          حلول المتعثرات
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* TAB 1: Products Grid */}
        {activeTab === 'products' && (
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {FINANCE_TYPES.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-[#12031a] rounded-[18px] p-4 border border-gold/20 shadow-sm hover:border-gold/60 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-brand mb-3 group-hover:bg-brand group-hover:text-gold transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-extrabold text-brand dark:text-white mb-2">{item.title}</h3>
                <p className="text-[11px] text-muted dark:text-gray-400 leading-relaxed mb-3 min-h-[40px]">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.features.map((feat, idx) => (
                    <span key={idx} className="text-[9px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Debt Solutions */}
        {activeTab === 'debt' && (
          <div className="space-y-4 mb-6">
            <Card className="bg-gradient-to-l from-white to-[#FFFBF2] dark:from-[#12031a] dark:to-[#1a0b20] border-gold/40">
              <div className="mb-4">
                <h3 className="text-[15px] font-extrabold text-brand dark:text-gold mb-1">استعد استقرارك المالي</h3>
                <p className="text-[12px] text-muted dark:text-gray-300">
                  نقدم استراتيجيات قانونية ومالية متقدمة لمعالجة التعثرات وإيقاف الخدمات، مما يمنحك فرصة جديدة في النظام المالي.
                </p>
              </div>
              <div className="space-y-3">
                {DEBT_SOLUTIONS.map((sol, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-white dark:bg-white/5 p-3 rounded-[14px] border border-gold/10">
                    <div className="mt-0.5 text-gold">{sol.icon}</div>
                    <div>
                      <h4 className="text-[13px] font-bold text-brand dark:text-white mb-0.5">{sol.title}</h4>
                      <p className="text-[11px] text-muted dark:text-gray-400 leading-tight">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gold/10 flex items-center gap-2 text-[10px] text-muted/80">
                <ShieldCheck size={12} className="text-gold" />
                <span>جميع الحلول المقدمة متوافقة مع أنظمة ولوائح البنك المركزي السعودي.</span>
             </div>
            </Card>
          </div>
        )}

        {/* Advanced Calculator removed as requested */}

      </div>
    </Section>
  );
};

export default FinanceServices;
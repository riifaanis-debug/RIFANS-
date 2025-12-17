import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Product, DocumentItem, SubmissionData } from '../types';
import { X, ArrowRight, CheckCircle, FileText, Download, User, CreditCard, Phone, Calendar, MapPin, Building2, Briefcase, Trash2, Plus, ShieldCheck, Info } from 'lucide-react';
import html2canvas from 'html2canvas';

// --- Local Constants & Helpers ---

const REGION_CITIES: Record<string, string[]> = {
  "الرياض": ["الرياض","الدرعية","الخرج","الدوادمي","المجمعة","القويعية","وادي الدواسر","الزلفي","شقراء","حوطة بني تميم","الأفلاج","السليل","ضرما","المزاحمية"],
  "مكة المكرمة": ["مكة المكرمة","جدة","الطائف","رابغ","خليص","الليث","القنفذة","العرضيات","الكامل"],
  "المدينة": ["المدينة المنورة","ينبع","العلا","بدر","الحناكية","خيبر"],
  "القصيم": ["بريدة","عنيزة","الرس","البكيرية","البدائع","المذنب","عيون الجواء","رياض الخبراء"],
  "الشرقية": ["الدمام","الخبر","الظهران","القطيف","الأحساء","الجبيل","الخفجي","حفر الباطن","بقيق","رأس تنورة"],
  "عسير": ["أبها","خميس مشيط","بيشة","محايل عسير","النماص","رجال ألمع"],
  "تبوك": ["تبوك","الوجه","ضباء","تيماء","أملج","حقل"],
  "حائل": ["حائل","بقعاء","الغزالة","الشنان"],
  "الحدود الشمالية": ["عرعر","رفحاء","طريف","العويقلية"],
  "جازان": ["جيزان","صبيا","أبو عريش","صامطة","بيش","الدرب"],
  "نجران": ["نجران","شرورة","حبونا","بدر الجنوب"],
  "الباحة": ["الباحة","بلجرشي","المندق","المخواة"],
  "الجوف": ["سكاكا","القريات","دومة الجندل","طبرجل"]
};

// --- Local Components ---

export interface SignatureCanvasHandle {
  toDataURL: () => string;
  isEmpty: () => boolean;
  clear: () => void;
}

const SignatureCanvas = forwardRef<SignatureCanvasHandle, React.CanvasHTMLAttributes<HTMLCanvasElement>>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  useImperativeHandle(ref, () => ({
    toDataURL: () => canvasRef.current?.toDataURL() || '',
    isEmpty: () => isEmpty,
    clear: () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsEmpty(true);
      }
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#0000FF';
    }

    const resizeCanvas = () => {
       const parent = canvas.parentElement;
       if(parent) {
         canvas.width = parent.clientWidth;
         canvas.height = parent.clientHeight || 130;
         if (ctx) {
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#0000FF';
         }
       }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setIsEmpty(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    e.preventDefault(); 
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      {...props}
    />
  );
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
         <div className="flex items-center justify-between p-4 border-b border-gray-100">
           <div className="flex items-center gap-2 text-brand">
             <FileText size={18} className="text-gold" />
             <h3 className="text-[16px] font-bold">{title}</h3>
           </div>
           <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
             <X size={18} className="text-muted" />
           </button>
         </div>
         <div className="overflow-y-auto p-6 text-[13px] leading-7 text-gray-600 whitespace-pre-wrap">
           {children}
         </div>
         <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-[20px] flex justify-end">
           <button onClick={onClose} className="px-6 py-2 rounded-full bg-white border border-gray-200 text-brand font-bold text-[12px] hover:bg-gray-50">
             إغلاق
           </button>
         </div>
      </div>
    </div>
  );
};

const SuccessCard: React.FC<{ data: SubmissionData }> = ({ data }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const scale = window.innerWidth < 640 ? 4 : 3;
      const canvas = await html2canvas(cardRef.current, {
        scale: scale,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Waiver-Card-${data.requestId}.png`;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
      alert("حدث خطأ أثناء حفظ البطاقة.");
    } finally {
      setIsDownloading(false);
    }
  };

  const fullName = `${data.firstName} ${data.middleName} ${data.lastName}`;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center space-y-2 px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-100 text-green-600 mb-2 md:mb-4 shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-brand">تم إرسال الطلب بنجاح</h2>
        <p className="text-muted text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          تم استلام طلب الإعفاء الخاص بك. يمكنك حفظ البطاقة أدناه كمرجع رقمي للطلب.
        </p>
      </div>

      <div className="w-full px-4 flex justify-center">
        <div 
          ref={cardRef}
          className="w-full max-w-[600px] aspect-[1.7/1] bg-[#1a0321] rounded-[16px] md:rounded-[24px] overflow-hidden relative shadow-2xl font-tajawal text-white select-none mx-auto"
          style={{ background: 'linear-gradient(135deg, #2A0535 0%, #15021B 100%)' }}
        >
            <div className="absolute top-0 right-0 w-[45%] h-[65%] bg-white/5 rounded-full blur-[50px] md:blur-[90px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[35%] h-[55%] bg-[#C7A969]/10 rounded-full blur-[40px] md:blur-[70px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            {/* Header Branding */}
            <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8 md:right-8 flex justify-between items-start">
                <div className="text-left">
                    <h1 className="text-[#C7A969] text-[16px] md:text-2xl font-bold tracking-widest opacity-90 leading-none mb-0.5">RIFANIS</h1>
                    <h2 className="text-white text-[10px] md:text-[14px] font-bold tracking-[0.2em] opacity-80 leading-none">FINANCIAL</h2>
                </div>
                <div className="px-3 py-1 md:px-5 md:py-1.5 border border-[#C7A969] rounded-full bg-[#C7A969]/10 backdrop-blur-sm">
                    <span className="text-[#C7A969] text-[9px] md:text-[13px] font-bold whitespace-nowrap block">بطاقة طلب إعفاء</span>
                </div>
            </div>

            {/* Main Information Stack - Right Aligned & Uniform Size */}
            <div className="absolute top-[32%] right-6 md:right-10 left-6 flex flex-col gap-3 md:gap-5 text-right">
                
                <div className="flex flex-col">
                    <span className="text-[#C7A969] text-[9px] md:text-[12px] font-bold opacity-80 mb-0.5">رقم الطلب</span>
                    <span className="text-white text-[13px] md:text-[18px] font-bold font-mono tracking-wider">{data.requestId}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[#C7A969] text-[9px] md:text-[12px] font-bold opacity-80 mb-0.5">اسم العميل</span>
                    <span className="text-white text-[13px] md:text-[18px] font-bold truncate">{fullName}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[#C7A969] text-[9px] md:text-[12px] font-bold opacity-80 mb-0.5">رقم الهوية</span>
                    <span className="text-white text-[13px] md:text-[18px] font-bold font-mono tracking-widest">{data.nationalId}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[#C7A969] text-[9px] md:text-[12px] font-bold opacity-80 mb-0.5">رقم الجوال</span>
                    <span className="text-white text-[13px] md:text-[18px] font-bold font-mono dir-ltr">{data.mobile}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[#C7A969] text-[9px] md:text-[12px] font-bold opacity-80 mb-0.5">تاريخ الطلب</span>
                    <span className="text-white text-[13px] md:text-[18px] font-bold font-mono">{data.date}</span>
                </div>

            </div>

            {/* Subtle Footer Accent */}
            <div className="absolute bottom-4 right-6 md:right-10 h-0.5 w-[30%] bg-gold/30 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4 w-full">
        <a 
          href="/" 
          className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-bold text-xs md:text-sm hover:bg-gray-50 transition-colors flex-1 md:flex-none text-center whitespace-nowrap"
        >
          عودة للرئيسية
        </a>
        <button 
          onClick={downloadCard}
          disabled={isDownloading}
          className="px-6 md:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#C7A969] to-[#bfa05f] text-[#22042C] font-extrabold text-xs md:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 flex-1 md:flex-none whitespace-nowrap"
        >
          {isDownloading ? (
             <>جاري الحفظ...</>
          ) : (
            <>
              <Download className="w-5 h-5" />
              حفظ البطاقة
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- Fluid Input Helpers ---

const inputWrapperClass = "relative group flex items-center transition-all duration-300";
const labelClass = "text-[11px] font-extrabold text-brand/80 mb-1.5 block pr-1 transition-colors group-focus-within:text-gold";
const fluidInputClass = "w-full bg-gray-50/50 dark:bg-white/5 border border-gold/20 rounded-[14px] p-3 pr-10 text-[13px] text-brand dark:text-white outline-none transition-all duration-300 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 placeholder:text-muted/40";
const fluidIconClass = "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/60 transition-colors group-focus-within:text-gold";

interface WaiverFormProps {
  onSuccess: (data: SubmissionData) => void;
}

const WaiverForm: React.FC<WaiverFormProps> = ({ onSuccess }) => {
  const [requestId, setRequestId] = useState('');
  const [region, setRegion] = useState('');
  const [products, setProducts] = useState<Product[]>([{ id: '1', type: '', amount: '' }]);
  const [documents, setDocuments] = useState<DocumentItem[]>([{ id: '1', type: '', file: null }]);
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'auth' | 'terms'>('none');
  
  const signatureRef = useRef<SignatureCanvasHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const rand = Math.floor(100 + Math.random() * 900);
    setRequestId(`RF-${dd}${mm}${yy}-${rand}`);
  }, []);

  useEffect(() => {
    let total = 0;
    products.forEach(p => {
      const val = parseFloat(p.amount.replace(/,/g, ''));
      if (!isNaN(val)) total += val;
    });
    setTotalAmount(total > 0 ? total.toLocaleString() + ' ر.س' : '');
  }, [products]);

  const handleProductChange = (id: string, field: 'type' | 'amount', value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProduct = () => setProducts(prev => [...prev, { id: Date.now().toString(), type: '', amount: '' }]);
  const removeProduct = (id: string) => products.length > 1 && setProducts(prev => prev.filter(p => p.id !== id));

  const handleDocumentChange = (id: string, field: 'type', value: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };
  const addDocument = () => setDocuments(prev => [...prev, { id: Date.now().toString(), type: '', file: null }]);
  const removeDocument = (id: string) => documents.length > 1 && setDocuments(prev => prev.filter(d => d.id !== id));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sigData = signatureRef.current?.toDataURL();
    if (!sigData || signatureRef.current?.isEmpty()) {
      alert('يرجى التوقيع على صحة المعلومات قبل إرسال الطلب.');
      return;
    }
    if (!formRef.current) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData(formRef.current);
      formData.set('signatureData', sigData);
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await response.json();
      if (result.success) {
        onSuccess({
          requestId,
          firstName: formData.get('firstName') as string,
          middleName: formData.get('middleName') as string,
          lastName: formData.get('lastName') as string,
          nationalId: formData.get('nationalId') as string,
          mobile: formData.get('mobile') as string,
          date: new Date().toLocaleDateString('en-GB')
        });
      } else {
        alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ في الاتصال.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form 
        ref={formRef}
        className="bg-white dark:bg-[#0c0312] rounded-[24px] border border-gold/30 p-6 sm:p-8 shadow-2xl space-y-8 animate-in slide-in-from-bottom-4 duration-500"
        onSubmit={handleFormSubmit}
      >
        <input type="hidden" name="access_key" value="0932dd66-854a-41aa-8b0e-c372589bd60a" />
        <input type="hidden" name="from_name" value="موقع ريفانس المالية" />
        <input type="hidden" name="subject" value="طلب إعفاء تمويلي جديد" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
            <div>
                <h1 className="text-[22px] font-black text-brand dark:text-white">طلب إعفاء من المديونية</h1>
                <p className="text-[12px] text-muted mt-1">يرجى تعبئة البيانات التالية بدقة متناهية.</p>
            </div>
            <div className="bg-[#FFFBF2] dark:bg-gold/5 px-4 py-2 rounded-xl border border-gold/30 flex flex-col items-center">
                <span className="text-[9px] font-bold text-gold uppercase tracking-tighter">رقم الطلب</span>
                <span className="text-[14px] font-mono font-bold text-brand dark:text-gold">{requestId}</span>
                <input type="hidden" name="requestId" value={requestId} />
            </div>
        </div>

        {/* Section: Personal Info */}
        <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><User size={16}/></div>
                <h3 className="text-[14px] font-bold text-brand dark:text-white">البيانات الشخصية</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                    <label className={labelClass}>الاسم الثلاثي الكامل <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="relative group">
                            <input type="text" name="firstName" placeholder="الأول" required className={fluidInputClass.replace('pr-10', 'pr-3')} />
                        </div>
                        <div className="relative group">
                            <input type="text" name="middleName" placeholder="الأب" required className={fluidInputClass.replace('pr-10', 'pr-3')} />
                        </div>
                        <div className="relative group">
                            <input type="text" name="lastName" placeholder="العائلة" required className={fluidInputClass.replace('pr-10', 'pr-3')} />
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <label className={labelClass}>رقم الهوية <span className="text-red-500">*</span></label>
                    <div className={inputWrapperClass}>
                        <CreditCard className={fluidIconClass} size={18}/>
                        <input 
                            type="tel" 
                            name="nationalId" 
                            placeholder="10 أرقام" 
                            required 
                            maxLength={10}
                            className={fluidInputClass} 
                            inputMode="numeric"
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                        />
                    </div>
                </div>

                <div className="relative group">
                    <label className={labelClass}>العمر <span className="text-red-500">*</span></label>
                    <div className={inputWrapperClass}>
                        <Calendar className={fluidIconClass} size={18}/>
                        <input 
                            type="tel" 
                            name="age" 
                            placeholder="سنوات" 
                            required 
                            className={fluidInputClass} 
                            inputMode="numeric"
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                        />
                    </div>
                </div>

                <div className="relative group">
                    <label className={labelClass}>رقم الجوال <span className="text-red-500">*</span></label>
                    <div className={inputWrapperClass}>
                        <Phone className={fluidIconClass} size={18}/>
                        <input 
                            type="tel" 
                            name="mobile" 
                            placeholder="05XXXXXXXX" 
                            required 
                            maxLength={10}
                            className={`${fluidInputClass} text-left dir-ltr`} 
                            inputMode="numeric"
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Job & Location */}
        <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><MapPin size={16}/></div>
                <h3 className="text-[14px] font-bold text-brand dark:text-white">العمل والعنوان</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative group">
                    <label className={labelClass}>الحالة الوظيفية <span className="text-red-500">*</span></label>
                    <div className={inputWrapperClass}>
                        <Briefcase className={fluidIconClass} size={18}/>
                        <select name="jobStatus" required className={`${fluidInputClass} appearance-none bg-white`}>
                            <option value="" disabled selected>اختر الحالة...</option>
                            <option>موظف حكومي</option>
                            <option>موظف قطاع خاص</option>
                            <option>متقاعد</option>
                            <option>بدون عمل</option>
                        </select>
                    </div>
                </div>

                <div className="relative group">
                    <label className={labelClass}>المنطقة <span className="text-red-500">*</span></label>
                    <div className={inputWrapperClass}>
                        <MapPin className={fluidIconClass} size={18}/>
                        <select name="region" value={region} onChange={(e) => setRegion(e.target.value)} required className={`${fluidInputClass} appearance-none bg-white`}>
                            <option value="" disabled selected>اختر المنطقة...</option>
                            {Object.keys(REGION_CITIES).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                </div>

                <div className="relative group">
                    <label className={labelClass}>المدينة <span className="text-red-500">*</span></label>
                    <div className={inputWrapperClass}>
                        <Building2 className={fluidIconClass} size={18}/>
                        <select name="city" required className={`${fluidInputClass} appearance-none bg-white`} disabled={!region}>
                            <option value="" disabled selected>اختر المدينة...</option>
                            {region && REGION_CITIES[region]?.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Financial Products */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Building2 size={16}/></div>
                    <h3 className="text-[14px] font-bold text-brand dark:text-white">الالتزامات والمنتجات</h3>
                </div>
                <button type="button" onClick={addProduct} className="text-[11px] font-bold text-gold bg-gold/5 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors flex items-center gap-1">
                    <Plus size={12}/> إضافة منتج
                </button>
            </div>

            <div className="space-y-3">
                {products.map((prod, idx) => (
                    <div key={prod.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50/50 dark:bg-white/5 rounded-[20px] border border-gray-100 dark:border-white/5 relative group/row animate-in fade-in">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted">نوع التمويل <span className="text-red-500">*</span></label>
                            <select 
                                name={`productType_${idx}`} 
                                required 
                                value={prod.type} 
                                onChange={(e) => handleProductChange(prod.id, 'type', e.target.value)} 
                                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-[10px] p-2.5 text-[12px] outline-none focus:border-gold"
                            >
                                <option value="" disabled>اختر النوع...</option>
                                <option>تمويل شخصي</option>
                                <option>تمويل عقاري</option>
                                <option>تمويل تأجيري</option>
                                <option>بطاقة ائتمانية</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 pr-2">
                            <label className="text-[10px] font-bold text-muted">المبلغ المتبقي (SAR) <span className="text-red-500">*</span></label>
                            <div className="flex gap-2 items-center">
                                <input 
                                    type="number" 
                                    name={`productAmount_${idx}`} 
                                    required 
                                    value={prod.amount} 
                                    onChange={(e) => handleProductChange(prod.id, 'amount', e.target.value)} 
                                    className="flex-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-[10px] p-2.5 text-[12px] outline-none focus:border-gold font-mono"
                                    placeholder="0.00"
                                />
                                {products.length > 1 && (
                                    <button type="button" onClick={() => removeProduct(prod.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                                        <Trash2 size={16}/>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {totalAmount && (
                <div className="flex justify-end pt-2">
                    <div className="bg-brand text-gold px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-4">
                        <span className="opacity-70">إجمالي الالتزامات:</span>
                        <span>{totalAmount}</span>
                    </div>
                </div>
            )}
        </div>

        {/* Section: Case Summary */}
        <div className="space-y-4">
            <label className={labelClass}>ملخص ووصف الحالة (اختياري)</label>
            <textarea name="caseSummary" rows={3} placeholder="اكتب نبذة مختصرة عن سبب طلب الإعفاء..." className={`${fluidInputClass} pr-4 resize-none`}></textarea>
        </div>

        {/* Section: Documents */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><FileText size={16}/></div>
                    <h3 className="text-[14px] font-bold text-brand dark:text-white">المستندات الداعمة</h3>
                </div>
                <button type="button" onClick={addDocument} className="text-[11px] font-bold text-gold bg-gold/5 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors flex items-center gap-1">
                    <Plus size={12}/> إرفاق مستند
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc, idx) => (
                    <div key={doc.id} className="flex gap-2 bg-gray-50/50 dark:bg-white/5 p-3 rounded-[16px] border border-gray-100 dark:border-white/5 items-center">
                        <select 
                            name={`docType_${idx}`} 
                            value={doc.type} 
                            onChange={(e) => handleDocumentChange(doc.id, 'type', e.target.value)}
                            className="flex-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-[10px] p-2 text-[11px] outline-none focus:border-gold"
                        >
                            <option value="" disabled>نوع المستند...</option>
                            <option>تقرير طبي</option>
                            <option>قرار إنهاء خدمة</option>
                            <option>شهادة مدد وأجور</option>
                            <option>أخرى</option>
                        </select>
                        <input type="file" name={`docFile_${idx}`} className="w-[80px] text-[9px] text-muted" />
                        {documents.length > 1 && (
                            <button type="button" onClick={() => removeDocument(doc.id)} className="text-red-400">
                                <X size={14}/>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Section: Consents */}
        <div className="bg-[#F9F8FC] dark:bg-white/5 p-5 rounded-[24px] border border-gold/20 space-y-4">
            <h4 className="text-[12px] font-extrabold text-brand dark:text-gold flex items-center gap-2 mb-3">
                <ShieldCheck size={16}/> الموافقات والتعهدات
            </h4>
            <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gold/40 accent-brand" />
                    <span className="text-[11px] leading-relaxed text-brand/80 transition-colors group-hover:text-brand">
                        أوافق على <button type="button" onClick={() => setActiveModal('auth')} className="text-gold font-bold underline">تفويض ريفانس المالية</button> بالاطلاع على البيانات ودراسة الحالة.
                    </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gold/40 accent-brand" />
                    <span className="text-[11px] leading-relaxed text-brand/80 transition-colors group-hover:text-brand">
                        أتعهد بصحة جميع البيانات المدخلة وأوافق على <button type="button" onClick={() => setActiveModal('terms')} className="text-gold font-bold underline">الشروط والأحكام</button>.
                    </span>
                </label>
            </div>
        </div>

        {/* Section: Signature */}
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div>
                    <label className={labelClass}>التوقيع الإلكتروني <span className="text-red-500">*</span></label>
                    <p className="text-[10px] text-muted">يرجى استخدام الإصبع أو القلم للتوقيع داخل المربع.</p>
                </div>
                <button type="button" onClick={() => signatureRef.current?.clear()} className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors">مسح التوقيع</button>
            </div>
            <div className="rounded-[20px] border border-gold/40 bg-white overflow-hidden shadow-inner h-[130px] touch-none">
                <SignatureCanvas ref={signatureRef} className="w-full h-full cursor-crosshair" />
            </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-muted">
                <Info size={14} className="text-gold"/>
                <span className="text-[10px] leading-relaxed">بضغطك على إرسال، فإنك تقر بجدية الطلب وتفويضنا ببدء الدراسة.</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <a href="#/" className="flex-1 sm:flex-none text-center px-6 py-3 rounded-full border border-gray-200 text-[12px] font-bold hover:bg-gray-50 transition-colors">إلغاء</a>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-[2] sm:flex-none bg-gold-gradient text-brand font-black px-10 py-3 rounded-full shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب الآن'}
                </button>
            </div>
        </div>
      </form>

      <Modal isOpen={activeModal !== 'none'} onClose={() => setActiveModal('none')} title={activeModal === 'auth' ? "تفويض ريفانس المالية" : "الشروط والأحكام"}>
        {activeModal === 'auth' ? (
             <div className="space-y-4">
             <p>أفوض أنا الموقع أدناه شركة ريفانس المالية وممثليها بالآتي:</p>
             <ul className="list-disc list-inside space-y-2 mr-2">
               <li>الاستعلام عن سجلي الائتماني لدى الشركة السعودية للمعلومات الائتمانية (سمة).</li>
               <li>التواصل مع جهة عملي للتحقق من البيانات الوظيفية والراتب إذا لزم الأمر.</li>
               <li>الاطلاع على الحسابات البنكية ذات الصلة بطلب الإعفاء لغرض التقييم المالي.</li>
               <li>مشاركة بياناتي مع الجهات التمويلية المعنية (البنوك) لغرض معالجة طلب الإعفاء أو الجدولة.</li>
             </ul>
             <p className="mt-4 text-xs text-muted">هذا التفويض يسري مفعوله من تاريخ تقديم الطلب وحتى انتهاء الغرض منه.</p>
           </div>
        ) : (
            <div className="space-y-4">
            <p>بتقديم هذا الطلب، يقر العميل ويوافق على ما يلي:</p>
            <ol className="list-decimal list-inside space-y-2 mr-2">
              <li>صحة كافة البيانات والمستندات المرفقة، وتحمل المسؤولية القانونية الكاملة في حال ثبوت عدم صحتها.</li>
              <li>أن تقديم هذا الطلب لا يعني الموافقة النهائية على الإعفاء، وإنما هو طلب للدراسة والتقييم من قبل المختصين.</li>
              <li>يحق لريفانس المالية طلب مستندات إضافية لدعم الطلب إذا دعت الحاجة.</li>
              <li>تخضع جميع الطلبات للسياسات والأنظمة المعمول بها في المملكة العربية السعودية واللوائح الصادرة عن البنك المركزي السعودي.</li>
              <li>يتم التعامل مع كافة البيانات بسرية تامة وفقاً لسياسة الخصوصية وحماية البيانات.</li>
            </ol>
          </div>
        )}
      </Modal>
    </>
  );
};

const WaiveRequestForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [submittedData, setSubmittedData] = useState<SubmissionData | null>(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#F5F4FA] dark:bg-[#06010a] overflow-y-auto overflow-x-hidden animate-in slide-in-from-bottom duration-300 overscroll-none">
        <div className="sticky top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gold/30 h-[60px] flex items-center justify-between px-4 z-50 shadow-sm">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-brand dark:text-white transition-colors">
                <ArrowRight size={20} />
            </button>
            <span className="text-[14px] font-extrabold text-brand dark:text-white">نموذج طلب الإعفاء</span>
            <div className="w-10"></div> 
        </div>
        <div className="max-w-[900px] mx-auto px-4 py-6 pb-12">
            {submittedData ? <SuccessCard data={submittedData} /> : <WaiverForm onSuccess={setSubmittedData} />}
        </div>
    </div>
  );
};

export default WaiveRequestForm;
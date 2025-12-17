import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Mail, Phone, MapPin, Send, MessageCircle, Info, Target, Eye, MessageSquareText } from 'lucide-react';
import { Button } from './Shared';

type ModalType = 'terms' | 'privacy' | 'complaints' | 'contact' | 'about' | 'goal' | 'vision' | 'message';

interface ContentModalProps {
  type: ModalType;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ type, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        onClose();
    }, 2500);
  };

  const renderContent = () => {
    switch (type) {
      case 'terms':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <FileText className="text-gold" size={24} />
              <h2 className="text-[18px] font-extrabold text-brand">الشروط والأحكام</h2>
            </div>
            <div className="space-y-6 text-[13px] leading-7 text-gray-600 text-justify overflow-y-auto max-h-[60vh] pl-2 custom-scrollbar">
              <p>أهلاً بك في منصة ريفانس المالية. يرجى قراءة الشروط والأحكام التالية بعناية قبل استخدام خدماتنا.</p>
              
              <div>
                <h3 className="font-bold text-brand mb-1">1. قبول الشروط</h3>
                <p>بمجرد استخدامك للمنصة أو طلب أي من خدماتنا، فإنك توافق على الالتزام بهذه الشروط وجميع القوانين واللوائح المعمول بها في المملكة العربية السعودية.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">2. الخدمات المقدمة</h3>
                <p>نقدم خدمات استشارية ووساطة تمويلية وحلول مالية. نحن لا نضمن قبول التمويل من الجهات الممولة، حيث يخضع ذلك لسياسات الجهات التمويلية وسجلك الائتماني.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">3. دقة المعلومات</h3>
                <p>أنت مسؤول عن دقة البيانات والمستندات التي تقدمها. أي تلاعب أو تقديم مستندات غير صحيحة قد يعرضك للمساءلة القانونية ويؤدي إلى رفض طلبك فوراً.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">4. الرسوم والاسترداد</h3>
                <p>بعض الخدمات مدفوعة وتخضع لسياسة استرداد محددة. في حال عدم تنفيذ الخدمة لسبب يعود للمنصة، يحق للعميل استرداد كامل المبلغ. الرسوم الاستشارية غير مستردة بعد تقديم الاستشارة.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">5. الملكية الفكرية</h3>
                <p>جميع حقوق الملكية الفكرية للمنصة ومحتوياتها محفوظة لشركة ريفانس المالية. يمنع نسخ أو إعادة استخدام أي جزء من المحتوى دون إذن كتابي.</p>
              </div>
            </div>
          </>
        );

      case 'privacy':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <ShieldCheck className="text-gold" size={24} />
              <h2 className="text-[18px] font-extrabold text-brand">سياسة الخصوصية</h2>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-4 flex items-center gap-2 text-green-700 text-[12px]">
                <ShieldCheck size={16} />
                <span className="font-bold">نلتزم بأعلى معايير حماية البيانات وفق أنظمة الأمن السيبراني السعودية.</span>
            </div>

            <div className="space-y-6 text-[13px] leading-7 text-gray-600 text-justify overflow-y-auto max-h-[60vh] pl-2 custom-scrollbar">
              <div>
                <h3 className="font-bold text-brand mb-1">1. جمع البيانات</h3>
                <p>نقوم بجمع البيانات الضرورية لتقديم الخدمة فقط، مثل الاسم، رقم الهوية، الراتب، والالتزامات المالية. يتم جمع هذه البيانات بموافقتك الصريحة عند تعبئة النماذج.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">2. استخدام البيانات</h3>
                <p>تستخدم بياناتك حصراً لغرض دراسة أهليتك التمويلية والتواصل مع الجهات التمويلية نيابة عنك. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">3. أمن المعلومات</h3>
                <p>نستخدم تقنيات تشفير متقدمة (SSL) لحماية بياناتك أثناء النقل والتخزين. يتم حفظ الملفات في خوادم آمنة ومحمية.</p>
              </div>

              <div>
                <h3 className="font-bold text-brand mb-1">4. حقوق المستخدم</h3>
                <p>يحق لك في أي وقت طلب الاطلاع على بياناتك المسجلة لدينا، أو طلب تعديلها، أو طلب حذف ملفك نهائياً من سجلاتنا النشطة.</p>
              </div>
            </div>
          </>
        );

      case 'complaints':
        if (isSubmitted) {
            return (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <Send size={32} />
                    </div>
                    <h3 className="text-[18px] font-bold text-brand mb-2">تم استلام رسالتك بنجاح</h3>
                    <p className="text-[13px] text-muted">شكراً لتواصلك معنا، سيتم مراجعة طلبك والرد عليك في أقرب وقت.</p>
                </div>
            )
        }
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Mail className="text-gold" size={24} />
              <h2 className="text-[18px] font-extrabold text-brand">الشكاوي والاقتراحات</h2>
            </div>
            
            <p className="text-[13px] text-muted mb-6 leading-relaxed">
               نحرص دائماً على رضاكم. إذا واجهت أي مشكلة أو كان لديك اقتراح لتطوير خدماتنا، لا تتردد في مراسلتنا. سيتم التعامل مع طلبك بكل جدية وسرية.
            </p>

            <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[11px] font-bold text-brand block mb-1.5">الاسم</label>
                        <input required type="text" className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none bg-gray-50 focus:bg-white transition-colors" />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-brand block mb-1.5">رقم الجوال</label>
                        <input required type="tel" className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none bg-gray-50 focus:bg-white transition-colors text-left dir-ltr" />
                    </div>
                </div>
                <div>
                    <label className="text-[11px] font-bold text-brand block mb-1.5">نوع الرسالة</label>
                    <select className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none bg-gray-50 focus:bg-white transition-colors">
                        <option>شكوى</option>
                        <option>اقتراح</option>
                        <option>استفسار عام</option>
                    </select>
                </div>
                <div>
                    <label className="text-[11px] font-bold text-brand block mb-1.5">التفاصيل</label>
                    <textarea required className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none bg-gray-50 focus:bg-white transition-colors h-24 resize-none"></textarea>
                </div>
                <Button type="submit" className="w-full shadow-md">إرسال</Button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[12px] text-muted">
                    <Mail size={14} className="text-gold" />
                    <span>البريد الإلكتروني للشكاوي: info@rifans.net</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-muted">
                    <Phone size={14} className="text-gold" />
                    <span>الرقم الموحد: 8002440432</span>
                </div>
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Phone className="text-gold" size={24} />
              <h2 className="text-[18px] font-extrabold text-brand">اتصل بنا</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a href="tel:8002440432" className="bg-gray-50 p-4 rounded-[16px] border border-gray-100 hover:border-gold/50 transition-colors flex flex-col items-center gap-2 text-center group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform">
                        <Phone size={20} />
                    </div>
                    <div>
                        <div className="text-[12px] font-bold text-brand">الرقم الموحد</div>
                        <div className="text-[11px] text-muted dir-ltr">8002440432</div>
                    </div>
                </a>

                <a href="https://wa.me/966129511227" target="_blank" rel="noopener noreferrer" className="bg-gray-50 p-4 rounded-[16px] border border-gray-100 hover:border-gold/50 transition-colors flex flex-col items-center gap-2 text-center group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform">
                        <MessageCircle size={20} />
                    </div>
                    <div>
                        <div className="text-[12px] font-bold text-brand">الواتساب</div>
                        <div className="text-[11px] text-muted dir-ltr">012 951 1227</div>
                    </div>
                </a>
                
                <a href="mailto:info@rifans.net" className="bg-gray-50 p-4 rounded-[16px] border border-gray-100 hover:border-gold/50 transition-colors flex flex-col items-center gap-2 text-center group sm:col-span-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                    </div>
                    <div>
                        <div className="text-[12px] font-bold text-brand">البريد الإلكتروني</div>
                        <div className="text-[11px] text-muted">info@rifans.net</div>
                    </div>
                </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-[16px] border border-gray-100 hover:border-gold/50 transition-colors flex items-center gap-4 group mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform shrink-0">
                    <MapPin size={20} />
                </div>
                <div>
                    <div className="text-[12px] font-bold text-brand">المقر الرئيسي</div>
                    <div className="text-[11px] text-muted">مكة المكرمة، المملكة العربية السعودية</div>
                </div>
            </div>

            <div className="w-full h-[200px] bg-gray-200 rounded-[16px] overflow-hidden relative">
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
          </>
        );

      case 'about':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                 <Info size={20} />
              </div>
              <h2 className="text-[18px] font-extrabold text-brand">من نحن</h2>
            </div>
            <p className="text-[13px] leading-8 text-gray-600 text-justify">
               ريفانس المالية منصة إلكترونية رائدة تقدّم خدمات مالية رقمية واستشارية، تهدف إلى تمكين الأفراد من تحقيق الاستقرار المالي والرفاهية المستدامة. تأسست من قلب تجربة واقعية لمعالجة تحديات الأفراد المالية، لتكون منصة مختلفة لا تكتفي بتقديم المنتجات بل تقدّم حلولاً واعية واستشارات متخصصة تُحدث فرقًا حقيقيًا في حياة الناس.
            </p>
          </>
        );

      case 'goal':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
               <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                 <Target size={20} />
              </div>
              <h2 className="text-[18px] font-extrabold text-brand">هدفنا</h2>
            </div>
            <p className="text-[13px] leading-8 text-gray-600 text-justify">
               هدفنا إحداث فرق ملموس في حياة عملائنا من خلال تقديم حلول مالية واقعية ومبتكرة تعزّز قدرتهم على الوفاء بالتزاماتهم وتحقيق تطلعاتهم، مع تحويل التحديات المالية إلى فرص للنمو وبناء مستقبل مالي مستدام.
            </p>
          </>
        );

      case 'vision':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
               <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                 <Eye size={20} />
              </div>
              <h2 className="text-[18px] font-extrabold text-brand">رؤيتنا</h2>
            </div>
            <p className="text-[13px] leading-8 text-gray-600 text-justify">
               أن نصبح العلامة التجارية الأبرز في مجال الحلول التمويلية والاستشارات المالية في المملكة العربية السعودية، وأن نكون الخيار الأول لكل من يبحث عن حلول مالية متكاملة تعكس الاحترافية والابتكار والموثوقية، ونسهم في بناء مجتمع مالي أكثر وعيًا وكفاءة.
            </p>
          </>
        );

      case 'message':
        return (
          <>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
               <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                 <MessageSquareText size={20} />
              </div>
              <h2 className="text-[18px] font-extrabold text-brand">رسالتنا</h2>
            </div>
            <p className="text-[13px] leading-8 text-gray-600 text-justify">
               رسالتنا تمكين الأفراد من مواجهة تحدياتهم المالية بثقة، من خلال خدمات متخصصة قائمة على الخبرة والمعرفة العميقة بالأنظمة واللوائح المصرفية، مع تمثيل صوت العميل أمام الجهات التمويلية والرقابية بما يضمن حقوقه ويزيد فرص حصوله على الحلول المناسبة.
            </p>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-[550px] bg-white rounded-[24px] border border-gold/40 shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-muted flex items-center justify-center hover:bg-gray-100 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Content Wrapper */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default ContentModal;
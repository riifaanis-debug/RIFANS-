import React, { useState, useRef } from 'react';
import { UserProfile, CustomerRequest, UserProduct, UserDocument } from '../types';
import { X, User, Phone, CreditCard, LogOut, FileText, Clock, Briefcase, Edit, CheckCircle2, AlertTriangle, MapPin, Building2, Wallet, Plus, Trash2, FolderOpen, Upload, Paperclip, QrCode } from 'lucide-react';
import { Button } from './Shared';

interface CustomerDashboardProps {
  user: UserProfile;
  onClose: () => void;
  onLogout: () => void;
}

// Constants for dropdowns (Shared with Waive Form concept)
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

const BANKS = [
  "البنك الأهلي السعودي (SNB)", "مصرف الراجحي", "بنك الرياض", 
  "البنك السعودي البريطاني (ساب)", "البنك السعودي الفرنسي", "بنك البلاد", 
  "بنك الجزيرة", "بنك الإنماء", "بنك الخليج الدولي - السعودية", "جهة تمويلية أخرى"
];

const DOCUMENT_TYPES = [
  "تعريف راتب",
  "تقرير سمه",
  "تقرير ناجز",
  "تقرير طبي",
  "مستندات اخرى"
];

// Mock Data for demo - Empty requests as requested
const MOCK_REQUESTS: CustomerRequest[] = [];

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'requests'>('profile');
  const [userData, setUserData] = useState<UserProfile>({
    ...user,
    products: user.products || [{ id: Date.now(), type: '', amount: '' }],
    documents: user.documents || []
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Wallet Animation State
  const [addingToWallet, setAddingToWallet] = useState(false);
  const [addedToWallet, setAddedToWallet] = useState(false);
  
  // Document Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDocType, setSelectedDocType] = useState('');

  const handleSaveProfile = () => {
    // In a real app, API call here
    // Update local storage mock
    localStorage.setItem(`user_${userData.nationalId}`, JSON.stringify(userData));
    setIsEditing(false);
  };

  // Apple Wallet Logic (Simulated)
  const handleAddToWallet = () => {
    setAddingToWallet(true);
    setTimeout(() => {
        setAddingToWallet(false);
        setAddedToWallet(true);
        setTimeout(() => setAddedToWallet(false), 3000);
    }, 2000);
  };

  // Product Management Handlers
  const addProduct = () => {
    setUserData({
      ...userData,
      products: [...(userData.products || []), { id: Date.now(), type: '', amount: '' }]
    });
  };

  const removeProduct = (id: number) => {
    setUserData({
      ...userData,
      products: userData.products?.filter(p => p.id !== id)
    });
  };

  const updateProduct = (id: number, field: 'type' | 'amount', value: string) => {
    setUserData({
      ...userData,
      products: userData.products?.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  // Document Management Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedDocType) {
      const file = e.target.files[0];
      const newDoc: UserDocument = {
        id: Date.now(),
        type: selectedDocType,
        fileName: file.name,
        date: new Date().toLocaleDateString('ar-SA')
      };
      
      setUserData({
        ...userData,
        documents: [...(userData.documents || []), newDoc]
      });
      
      // Reset inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSelectedDocType('');
    }
  };

  const removeDocument = (id: number) => {
    setUserData({
      ...userData,
      documents: userData.documents?.filter(d => d.id !== id)
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    const labels = {
      pending: 'قيد الانتظار',
      processing: 'قيد التنفيذ',
      completed: 'مكتمل',
      rejected: 'مرفوض',
    };
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-[90] flex justify-end transition-opacity duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-[450px] h-full bg-[#F9F8FC] dark:bg-[#06010a] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 border-r border-gold/20">
        
        {/* Header */}
        <div className="bg-white dark:bg-[#12031a] p-5 border-b border-gold/10 flex items-center justify-between sticky top-0 z-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/20">
                 <User size={20} />
              </div>
              <div>
                 <h2 className="text-[14px] font-bold text-brand dark:text-white">{userData.fullName}</h2>
                 <p className="text-[10px] text-muted">ملف رقم: <span className="font-mono text-gold">{userData.fileNumber || '---'}</span></p>
              </div>
           </div>
           <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
             <X size={18} />
           </button>
        </div>

        {/* Tabs */}
        <div className="flex p-4 gap-2">
           <button 
             onClick={() => setActiveTab('profile')}
             className={`flex-1 py-2.5 rounded-[12px] text-[12px] font-bold transition-all flex items-center justify-center gap-2
               ${activeTab === 'profile' ? 'bg-brand text-gold shadow-md' : 'bg-white text-muted border border-gray-100 hover:bg-gray-50'}`}
           >
             <User size={14} />
             بياناتي
           </button>
           <button 
             onClick={() => setActiveTab('requests')}
             className={`flex-1 py-2.5 rounded-[12px] text-[12px] font-bold transition-all flex items-center justify-center gap-2
               ${activeTab === 'requests' ? 'bg-brand text-gold shadow-md' : 'bg-white text-muted border border-gray-100 hover:bg-gray-50'}`}
           >
             <FileText size={14} />
             طلباتي
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
           
           {activeTab === 'requests' && (
             <div className="space-y-3">
               {MOCK_REQUESTS.length > 0 ? (
                 MOCK_REQUESTS.map((req) => (
                   <div key={req.id} className="bg-white dark:bg-[#12031a] p-4 rounded-[16px] border border-gold/20 shadow-sm group hover:border-gold/50 transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-gold block animate-pulse"></span>
                           <h3 className="text-[13px] font-bold text-brand dark:text-white">{req.type}</h3>
                         </div>
                         {getStatusBadge(req.status)}
                      </div>
                      <div className="text-[11px] text-muted font-mono mb-2 flex items-center gap-2">
                        <span className="bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-gray-500">{req.id}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {req.date}</span>
                      </div>
                      <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-white/5 pt-2 mt-2">
                        {req.description}
                      </p>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-10 text-muted flex flex-col items-center gap-3">
                    <FileText size={40} className="opacity-20" />
                    <p className="text-[12px]">لا توجد طلبات حالياً</p>
                    <Button onClick={onClose} className="mt-2">تقديم طلب جديد</Button>
                 </div>
               )}

               <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-[12px] border border-blue-100 dark:border-blue-800 mt-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-relaxed">
                      يتم تحديث حالة الطلبات بشكل يومي. في حال وجود استفسار عاجل، يمكنك التواصل مع خدمة العملاء عبر الواتساب.
                    </p>
                  </div>
               </div>
             </div>
           )}

           {activeTab === 'profile' && (
             <div className="space-y-4 pb-10">
               
               {/* Digital ID Card */}
               <div className="mb-2 perspective-1000">
                  <div className="relative w-full aspect-[1.586/1] rounded-[20px] overflow-hidden shadow-2xl transition-transform transform hover:scale-[1.02]">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22042C] via-[#3B0E49] to-[#15021a] p-5 flex flex-col justify-between text-white">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                {/* Logo Removed */}
                            </div>
                            <QrCode className="text-gold opacity-80" size={32} />
                        </div>

                        {/* Card Details */}
                        <div>
                            <div className="text-[10px] text-gold/80 mb-1">الاسم / Name</div>
                            <div className="text-[16px] font-bold mb-3 tracking-wide">{userData.fullName}</div>
                            
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-[9px] text-gold/80 mb-0.5">رقم الهوية / ID</div>
                                    <div className="text-[12px] font-mono tracking-wider opacity-90">{userData.nationalId}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[9px] text-gold/80 mb-0.5">رقم الملف / File No</div>
                                    <div className="text-[14px] font-mono font-bold text-gold tracking-wider">{userData.fileNumber || 'RF-####-####'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Gloss Effect */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Add to Apple Wallet Button */}
                  <div className="mt-3 flex justify-center">
                    <button 
                       onClick={handleAddToWallet}
                       disabled={addingToWallet || addedToWallet}
                       className="bg-black text-white px-4 py-2.5 rounded-[12px] flex items-center gap-3 shadow-lg hover:bg-gray-900 active:scale-95 transition-all w-full justify-center border border-gray-800"
                    >
                       {addingToWallet ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       ) : addedToWallet ? (
                          <div className="flex items-center gap-2 text-green-400 font-bold text-[12px]">
                             <CheckCircle2 size={16} />
                             تمت الإضافة للمحفظة
                          </div>
                       ) : (
                          <>
                            <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
                               <path d="M424 64H88C48.2 64 16 96.2 16 136v240c0 39.8 32.2 72 72 72h336c39.8 0 72-32.2 72-72V136c0-39.8-32.2-72-72-72zm-16.5 288c-12.2 0-22.1-9.9-22.1-22.1 0-12.2 9.9-22.1 22.1-22.1 12.2 0 22.1 9.9 22.1 22.1 0 12.2-9.9 22.1-22.1 22.1zm56.1-88c0 12.2-9.9 22.1-22.1 22.1-12.2 0-22.1-9.9-22.1-22.1 0-12.2 9.9-22.1 22.1-22.1 12.2 0 22.1 9.9 22.1 22.1zM88 112h336c13.2 0 24 10.8 24 24v40H64v-40c0-13.2 10.8-24 24-24z"/>
                            </svg>
                            <div className="flex flex-col items-start leading-none">
                               <span className="text-[8px] uppercase font-bold text-gray-400">Add to</span>
                               <span className="text-[14px] font-bold font-sans">Apple Wallet</span>
                            </div>
                          </>
                       )}
                    </button>
                  </div>
               </div>

               {/* Personal Info */}
               <div className="bg-white dark:bg-[#12031a] rounded-[18px] border border-gold/20 p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[13px] font-bold text-gold flex items-center gap-2">
                        <User size={16} />
                        البيانات الشخصية
                    </h3>
                    {!isEditing ? (
                      <button onClick={() => setIsEditing(true)} className="text-[11px] text-muted hover:text-brand flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                        <Edit size={12} /> تعديل
                      </button>
                    ) : (
                      <button onClick={handleSaveProfile} className="text-[11px] text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md flex items-center gap-1 font-bold shadow-sm">
                        <CheckCircle2 size={12} /> حفظ التغييرات
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Full Name */}
                    <div>
                       <label className="text-[10px] text-muted block mb-1.5">الاسم الثلاثي</label>
                       {isEditing ? (
                         <input 
                           type="text" 
                           value={userData.fullName} 
                           onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                           className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none"
                         />
                       ) : (
                         <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5">
                           {userData.fullName}
                         </div>
                       )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Age */}
                        <div>
                            <label className="text-[10px] text-muted block mb-1.5">العمر</label>
                            {isEditing ? (
                                <input 
                                type="number" 
                                value={userData.age || ''} 
                                onChange={(e) => setUserData({...userData, age: e.target.value})}
                                className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none"
                                placeholder="بالسنوات"
                                />
                            ) : (
                                <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5">
                                {userData.age || '-'}
                                </div>
                            )}
                        </div>
                        {/* National ID */}
                        <div>
                            <label className="text-[10px] text-muted block mb-1.5">رقم الهوية</label>
                            <div className="text-[13px] font-medium text-brand dark:text-white font-mono p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5 flex items-center gap-2 opacity-80 cursor-not-allowed">
                                <CreditCard size={12} />
                                {userData.nationalId}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Mobile */}
                        <div>
                           <label className="text-[10px] text-muted block mb-1.5">رقم الجوال</label>
                           {isEditing ? (
                                <input 
                                type="tel" 
                                value={userData.mobile} 
                                onChange={(e) => setUserData({...userData, mobile: e.target.value})}
                                className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] focus:border-gold outline-none dir-ltr text-right"
                                />
                            ) : (
                                <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5 dir-ltr text-right">
                                   {userData.mobile}
                                </div>
                            )}
                        </div>
                        {/* Job Status */}
                        <div>
                            <label className="text-[10px] text-muted block mb-1.5">الحالة الوظيفية</label>
                            {isEditing ? (
                            <select 
                                value={userData.jobStatus || ''} 
                                onChange={(e) => setUserData({...userData, jobStatus: e.target.value})}
                                className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] bg-white focus:border-gold outline-none"
                            >
                                <option value="">اختر الحالة</option>
                                <option value="موظف حكومي">موظف حكومي</option>
                                <option value="موظف قطاع خاص">موظف قطاع خاص</option>
                                <option value="متقاعد">متقاعد</option>
                                <option value="لا يوجد عمل">لا يوجد عمل</option>
                            </select>
                            ) : (
                            <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5">
                                {userData.jobStatus || '-'}
                            </div>
                            )}
                        </div>
                    </div>
                  </div>
               </div>

               {/* Location Info */}
               <div className="bg-white dark:bg-[#12031a] rounded-[18px] border border-gold/20 p-5 shadow-sm">
                  <h3 className="text-[13px] font-bold text-gold flex items-center gap-2 mb-4">
                      <MapPin size={16} />
                      العنوان
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                      {/* Region */}
                      <div>
                          <label className="text-[10px] text-muted block mb-1.5">المنطقة</label>
                          {isEditing ? (
                             <select 
                                value={userData.region || ''} 
                                onChange={(e) => setUserData({...userData, region: e.target.value, city: ''})}
                                className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] bg-white focus:border-gold outline-none"
                             >
                                <option value="">اختر المنطقة</option>
                                {Object.keys(REGION_CITIES).map(r => <option key={r} value={r}>{r}</option>)}
                             </select>
                          ) : (
                             <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5">
                                {userData.region || '-'}
                             </div>
                          )}
                      </div>
                      {/* City */}
                      <div>
                          <label className="text-[10px] text-muted block mb-1.5">المدينة</label>
                          {isEditing ? (
                             <select 
                                value={userData.city || ''} 
                                onChange={(e) => setUserData({...userData, city: e.target.value})}
                                className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] bg-white focus:border-gold outline-none"
                                disabled={!userData.region}
                             >
                                <option value="">اختر المدينة</option>
                                {userData.region && REGION_CITIES[userData.region]?.map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                          ) : (
                             <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5">
                                {userData.city || '-'}
                             </div>
                          )}
                      </div>
                  </div>
               </div>

               {/* Financial Info */}
               <div className="bg-white dark:bg-[#12031a] rounded-[18px] border border-gold/20 p-5 shadow-sm">
                  <h3 className="text-[13px] font-bold text-gold flex items-center gap-2 mb-4">
                      <Building2 size={16} />
                      البيانات المالية والالتزامات
                  </h3>
                  
                  <div className="mb-4">
                      <label className="text-[10px] text-muted block mb-1.5">الجهة المالية (البنك)</label>
                      {isEditing ? (
                          <select 
                             value={userData.bank || ''} 
                             onChange={(e) => setUserData({...userData, bank: e.target.value})}
                             className="w-full p-2.5 rounded-[10px] border border-gray-200 text-[12px] bg-white focus:border-gold outline-none"
                          >
                             <option value="">اختر البنك</option>
                             {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                      ) : (
                          <div className="text-[13px] font-medium text-brand dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-[10px] border border-gray-100 dark:border-white/5">
                             {userData.bank || '-'}
                          </div>
                      )}
                  </div>

                  {/* Products List */}
                  <div className="bg-gray-50 dark:bg-black/20 rounded-[14px] p-3 border border-gray-200 dark:border-white/5 mb-4">
                      <div className="flex justify-between items-center mb-2">
                          <label className="text-[11px] font-bold text-brand flex items-center gap-1">
                             <Wallet size={12} />
                             الالتزامات القائمة
                          </label>
                          {isEditing && (
                             <button type="button" onClick={addProduct} className="text-[10px] text-brand bg-white border border-gold/30 px-2 py-1 rounded-full hover:bg-gold/10 flex items-center gap-1">
                                <Plus size={10} /> إضافة
                             </button>
                          )}
                      </div>

                      <div className="space-y-2">
                         {(userData.products && userData.products.length > 0) ? userData.products.map((product, idx) => (
                            <div key={product.id} className="flex gap-2 items-center bg-white p-2 rounded-[10px] shadow-sm border border-gray-100">
                                <div className="flex-1">
                                    {isEditing ? (
                                        <select 
                                            value={product.type}
                                            onChange={(e) => updateProduct(product.id, 'type', e.target.value)}
                                            className="w-full p-1.5 rounded-[6px] border border-gray-200 text-[11px] bg-gray-50 focus:border-gold outline-none"
                                        >
                                            <option value="">نوع المنتج</option>
                                            <option value="تمويل شخصي">تمويل شخصي</option>
                                            <option value="تمويل عقاري">تمويل عقاري</option>
                                            <option value="التمويل التأجيري">التمويل التأجيري</option>
                                            <option value="بطاقة ائتمانية">بطاقة ائتمانية</option>
                                        </select>
                                    ) : (
                                        <div className="text-[11px] font-bold text-brand">{product.type || 'غير محدد'}</div>
                                    )}
                                </div>
                                <div className="w-24">
                                    {isEditing ? (
                                        <input 
                                            type="number"
                                            value={product.amount}
                                            onChange={(e) => updateProduct(product.id, 'amount', e.target.value)}
                                            className="w-full p-1.5 rounded-[6px] border border-gray-200 text-[11px] bg-gray-50 focus:border-gold outline-none"
                                            placeholder="المبلغ"
                                        />
                                    ) : (
                                        <div className="text-[11px] font-mono text-muted">{product.amount ? Number(product.amount).toLocaleString() : '0'} ر.س</div>
                                    )}
                                </div>
                                {isEditing && (userData.products!.length > 1) && (
                                    <button onClick={() => removeProduct(product.id)} className="text-red-400 hover:text-red-600 p-1">
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                         )) : (
                            <div className="text-center text-[11px] text-muted py-2">لا توجد التزامات مضافة</div>
                         )}
                      </div>
                      
                      {/* Total */}
                      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                         <span className="text-[11px] font-bold text-muted">إجمالي الالتزامات:</span>
                         <span className="text-[13px] font-extrabold text-brand tabular-nums">
                            {userData.products?.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0).toLocaleString()} ر.س
                         </span>
                      </div>
                  </div>

                  {/* My Documents Section */}
                  <div className="bg-gray-50 dark:bg-black/20 rounded-[14px] p-3 border border-gray-200 dark:border-white/5">
                      <div className="flex justify-between items-center mb-2">
                          <label className="text-[11px] font-bold text-brand flex items-center gap-1">
                             <FolderOpen size={12} />
                             مستنداتي
                          </label>
                      </div>

                      {/* Add Document (Only in Edit Mode) */}
                      {isEditing && (
                         <div className="mb-3 p-2 bg-white rounded-[10px] border border-dashed border-gold/40 flex flex-col gap-2">
                            <select 
                               value={selectedDocType}
                               onChange={(e) => setSelectedDocType(e.target.value)}
                               className="w-full p-1.5 rounded-[6px] border border-gray-200 text-[11px] bg-gray-50 focus:border-gold outline-none"
                            >
                               <option value="">اختر نوع المستند...</option>
                               {DOCUMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            
                            <div className="flex gap-2">
                               <input 
                                 type="file" 
                                 ref={fileInputRef}
                                 className="hidden" 
                                 onChange={handleFileChange}
                               />
                               <button 
                                 type="button" 
                                 onClick={() => fileInputRef.current?.click()}
                                 disabled={!selectedDocType}
                                 className="flex-1 py-1.5 bg-brand text-gold rounded-[6px] text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
                               >
                                 <Upload size={10} />
                                 {selectedDocType ? 'رفع الملف' : 'اختر النوع أولاً'}
                               </button>
                            </div>
                         </div>
                      )}

                      <div className="space-y-2">
                         {(userData.documents && userData.documents.length > 0) ? userData.documents.map((doc) => (
                            <div key={doc.id} className="flex gap-2 items-center bg-white p-2 rounded-[10px] shadow-sm border border-gray-100">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                                   <Paperclip size={14} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                   <div className="text-[11px] font-bold text-brand truncate">{doc.type}</div>
                                   <div className="text-[9px] text-muted truncate">{doc.fileName}</div>
                                </div>
                                {isEditing && (
                                    <button onClick={() => removeDocument(doc.id)} className="text-red-400 hover:text-red-600 p-1">
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                         )) : (
                            <div className="text-center text-[11px] text-muted py-4 border-2 border-dashed border-gray-200 rounded-[10px]">
                               لا توجد مستندات مرفقة
                            </div>
                         )}
                      </div>
                  </div>
               </div>

               {/* Stats Card (Kept from original) */}
               <div className="bg-white dark:bg-[#12031a] rounded-[18px] border border-gold/20 p-5 shadow-sm mt-4">
                  <h3 className="text-[13px] font-bold text-gold mb-3">ملخص الحساب</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl text-center border border-gray-100">
                        <div className="text-[20px] font-extrabold text-brand dark:text-white">{MOCK_REQUESTS.length}</div>
                        <div className="text-[10px] text-muted">إجمالي الطلبات</div>
                     </div>
                     <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl text-center border border-gray-100">
                        <div className="text-[20px] font-extrabold text-brand dark:text-white">
                           {new Date(userData.joinDate).toLocaleDateString('ar-EG', {month: 'short', year: 'numeric'})}
                        </div>
                        <div className="text-[10px] text-muted">عضو منذ</div>
                     </div>
                  </div>
               </div>
             </div>
           )}

        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#12031a]">
           <button 
             onClick={onLogout}
             className="w-full flex items-center justify-center gap-2 text-[12px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 py-3 rounded-[14px] hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
           >
             <LogOut size={16} />
             تسجيل الخروج
           </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
import React, { useState } from 'react';
import { X, User, Phone, CreditCard, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { Button } from './Shared';
import { UserProfile } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    mobile: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateInput = () => {
    if (formData.nationalId.length !== 10) return "رقم الهوية يجب أن يتكون من 10 أرقام";
    if (!formData.mobile.startsWith('05') || formData.mobile.length !== 10) return "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    if (isRegister) {
      if (formData.fullName.length < 3) return "الاسم يجب أن يكون ثلاثياً على الأقل";
    }
    return null;
  };

  // Step 1: Generate File Number
  const generateFileNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random
    return `RF-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // Simulation of API Call / LocalStorage Logic
    setTimeout(() => {
      const storageKey = `user_${formData.nationalId}`;
      const existingUserStr = localStorage.getItem(storageKey);

      if (isRegister) {
        if (existingUserStr) {
          setError("هذا المستخدم مسجل مسبقاً، الرجاء تسجيل الدخول.");
          setLoading(false);
          return;
        }
        // Step 2: Create New File
        const fileNumber = generateFileNumber();
        const newUser: UserProfile = {
          ...formData,
          fileNumber: fileNumber, 
          joinDate: new Date().toISOString(),
        };
        // Save to Database (Mock)
        localStorage.setItem(storageKey, JSON.stringify(newUser));
        // Set Session (Mock for "Login to File")
        localStorage.setItem('currentFile', JSON.stringify(newUser));
        
        onLogin(newUser);
      } else {
        // Step 3: Login to File
        if (existingUserStr) {
          const user = JSON.parse(existingUserStr);
          // Simple validation check (Mobile match)
          if (user.mobile === formData.mobile) {
             // Backward compatibility: If old user doesn't have fileNumber, generate one
             if (!user.fileNumber) {
                user.fileNumber = generateFileNumber();
                localStorage.setItem(storageKey, JSON.stringify(user));
             }
             // Set Session
             localStorage.setItem('currentFile', JSON.stringify(user));
             onLogin(user);
          } else {
             setError("رقم الجوال غير مطابق لرقم الهوية المسجل.");
          }
        } else {
          setError("لا يوجد حساب بهذا الرقم، يرجى التسجيل أولاً.");
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[400px] bg-white dark:bg-[#1a0b25] rounded-[24px] border border-gold/30 shadow-2xl overflow-hidden relative">
        
        <button onClick={onClose} className="absolute top-4 left-4 text-muted hover:text-red-500 transition-colors">
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-[18px] font-extrabold text-brand dark:text-white">
              {isRegister ? 'إنشاء ملف عميل جديد' : 'تسجيل دخول العملاء'}
            </h2>
            <p className="text-[12px] text-muted mt-1">
              {isRegister ? 'سجل بياناتك لفتح ملف ومتابعة طلباتك' : 'مرحباً بعودتك، أدخل بياناتك للدخول'}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all ${!isRegister ? 'bg-white dark:bg-brand text-brand dark:text-gold shadow-sm' : 'text-muted'}`}
            >
              تسجيل دخول
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all ${isRegister ? 'bg-white dark:bg-brand text-brand dark:text-gold shadow-sm' : 'text-muted'}`}
            >
              تسجيل جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <>
                <div className="relative group">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/70 group-focus-within:text-gold transition-colors" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="الاسم الكامل"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[14px] py-3 pr-10 pl-4 text-[13px] text-brand dark:text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-muted/60"
                  />
                </div>
              </>
            )}

            <div className="relative group">
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/70 group-focus-within:text-gold transition-colors" size={18} />
              <input
                type="number"
                name="nationalId"
                placeholder="رقم الهوية (10 أرقام)"
                value={formData.nationalId}
                onChange={handleChange}
                maxLength={10}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[14px] py-3 pr-10 pl-4 text-[13px] text-brand dark:text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-muted/60"
              />
            </div>

            <div className="relative group">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/70 group-focus-within:text-gold transition-colors" size={18} />
              <input
                type="tel"
                name="mobile"
                placeholder="رقم الجوال (05xxxxxxxx)"
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[14px] py-3 pr-10 pl-4 text-[13px] text-brand dark:text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-muted/60 text-left dir-ltr"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[11px] text-red-500 bg-red-50 p-2 rounded-lg">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-12 mt-2 shadow-lg gap-2">
              {loading ? (
                <span className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? 'فتح ملف جديد' : 'دخول للملف'}
                  {isRegister ? <UserPlus size={16} /> : <LogIn size={16} />}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
import React, { useState, useEffect } from 'react';
import { User, Sun, Moon, Languages } from 'lucide-react';
import AuthModal from './AuthModal';
import CustomerDashboard from './CustomerDashboard';
import { UserProfile } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const { t, toggleLanguage, language } = useLanguage();
  
  // Theme state
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Check for active session (Step 4: Read customer data on load)
    const currentFileStr = localStorage.getItem('currentFile');
    if (currentFileStr) {
      try {
        const currentUser = JSON.parse(currentFileStr);
        setUser(currentUser);
      } catch (e) {
        console.error("Error parsing session", e);
        localStorage.removeItem('currentFile');
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setShowAuthModal(false);
    setShowDashboard(true); // Open dashboard immediately after login
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
    // Step 5: Logout - remove currentFile
    localStorage.removeItem('currentFile');
  };

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-[70px] px-4 transition-all duration-500 
        ${isScrolled 
          ? 'backdrop-blur-md bg-white/40 dark:bg-black/40 border-b border-white/20 dark:border-white/10 shadow-sm supports-[backdrop-filter]:bg-white/20' 
          : 'bg-transparent border-transparent shadow-none'}`}
      >
        <div className="w-full max-w-[520px] h-full flex items-center justify-between relative">
          
          {/* Left Side: Empty */}
          <div className="z-20 flex items-center w-[80px]">
          </div>

          {/* Center: Logo (Canva Embed) */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
             <div style={{ width: '160px' }}>
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: 0, 
                  paddingTop: '37.5300%',
                  paddingBottom: 0, 
                  boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', 
                  marginTop: '0', 
                  marginBottom: '0', 
                  overflow: 'hidden',
                  borderRadius: '8px', 
                  willChange: 'transform'
                }}>
                  <iframe 
                    loading="lazy" 
                    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                    src="https://www.canva.com/design/DAG7mJUY6ZI/Yc6Sx1UnonCB9DOrSD5HIg/view?embed" 
                    allowFullScreen
                    allow="fullscreen"
                  >
                  </iframe>
                </div>
             </div>
          </div>

          {/* Right Side: Language, Theme Toggle */}
          <div className="flex items-center gap-1.5 z-20">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors font-bold text-[10px] ${
                 isScrolled ? 'text-brand dark:text-gold hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Language"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>

            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                 isScrolled ? 'text-brand dark:text-gold hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
              }`}
              aria-label={t('theme_toggle')}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

        </div>
      </header>
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLogin={handleLogin} 
        />
      )}

      {showDashboard && user && (
        <CustomerDashboard 
          user={user} 
          onClose={() => setShowDashboard(false)} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
};

export default Header;
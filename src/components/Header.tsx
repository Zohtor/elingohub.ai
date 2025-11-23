import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage, languageOptions } from '../contexts/LanguageContext';
import { useNavigate } from '../hooks/useNavigate';
import { DeveloperProfileModal } from './DeveloperProfileModal';

export function Header() {
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [showLang, setShowLang] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDevProfileOpen, setIsDevProfileOpen] = useState(false);

  const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code}.png`;

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="flex items-center space-x-3 hover:opacity-80 transition">
            <img src="/1762699920764[1].jpg" alt="E-LINGO HUB" className="h-16 w-auto object-contain" />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          {/* Developer Profile Icon - Right Side in Navbar */}
          <button
            onClick={() => setIsDevProfileOpen(true)}
            className="relative group w-11 h-11"
            aria-label="Meet the Developer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity -z-10"></div>
            <img
              src="/1762546943254.jpg"
              alt="Developer Profile"
              className="relative w-11 h-11 rounded-full object-cover object-top border-3 border-white shadow-lg group-hover:scale-110 transition-transform cursor-pointer z-10"
              style={{ objectPosition: '50% 20%' }}
            />
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse z-20"></div>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl border hover:bg-gray-50 transition group"
            >
              <img
                src={getFlagUrl(languageOptions.find(l => l.code === language)?.flag || 'gb')}
                alt="Flag"
                className="w-8 h-8 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform"
              />
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {showLang && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 max-h-96 overflow-y-auto">
                {languageOptions.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLang(false); }}
                    className="w-full px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 transition group"
                  >
                    <img
                      src={getFlagUrl(lang.flag)}
                      alt={lang.name}
                      className="w-8 h-8 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="relative">
              <button onClick={() => setShowProfile(!showProfile)} className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition">
                <User className="w-6 h-6" />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2">
                  <button onClick={() => { navigate('/profile'); setShowProfile(false); }} className="w-full px-4 py-3 hover:bg-gray-50 text-left text-sm">{t('myProfile')}</button>
                  <hr className="my-2" />
                  <button onClick={() => { signOut(); setShowProfile(false); navigate('/'); }} className="w-full px-4 py-3 hover:bg-red-50 text-left text-sm text-red-600">{t('logout')}</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/login')} className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">{t('login')}</button>
              <button onClick={() => navigate('/signup')} className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg transition">{t('createAccount')}</button>
            </div>
          )}
        </div>
      </div>

      {/* Developer Profile Modal */}
      <DeveloperProfileModal
        isOpen={isDevProfileOpen}
        onClose={() => setIsDevProfileOpen(false)}
      />
    </header>
  );
}

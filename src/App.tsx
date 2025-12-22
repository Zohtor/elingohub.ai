import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { LearnFree } from './pages/LearnFree';
import { LearnPro } from './pages/LearnPro';
import { Lesson } from './pages/Lesson';
import { Community } from './pages/Community';
import { Pricing } from './pages/Pricing';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { KidsLearning } from './pages/KidsLearning';
import { KidsAILesson } from './pages/KidsAILesson';
import { KidsGameLesson } from './pages/KidsGameLesson';
import { KidsInteractiveLesson } from './pages/KidsInteractiveLesson';
import { KidsInteractiveGame } from './pages/KidsInteractiveGame';
import { EstonianMastery } from './pages/EstonianMastery';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentFailure } from './pages/PaymentFailure';
import { AIChatbot } from './components/AIChatbot';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { language } = useLanguage();

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const renderPage = () => {
    if (currentPath === '/') return <Home />;
    if (currentPath === '/learn/free') return <LearnFree />;
    if (currentPath === '/learn/pro') return <LearnPro />;
    if (currentPath === '/estonian-mastery') return <EstonianMastery />;
    if (currentPath.startsWith('/game/') && currentPath.split('/').length > 3) return <KidsInteractiveGame />;
    if (currentPath.startsWith('/lesson/') && currentPath.split('/').length > 3) return <KidsInteractiveLesson />;
    if (currentPath.startsWith('/lesson/')) return <Lesson />;
    if (currentPath === '/kids/learning') return <KidsLearning />;
    if (currentPath.startsWith('/learn/ai/')) return <KidsAILesson />;
    if (currentPath.startsWith('/games/')) return <KidsGameLesson />;
    if (currentPath === '/community') return <Community />;
    if (currentPath === '/pricing') return <Pricing />;
    if (currentPath === '/payment/success') return <PaymentSuccess />;
    if (currentPath === '/payment/failure') return <PaymentFailure />;
    if (currentPath === '/profile') return <Profile />;
    if (currentPath === '/login') return <Login />;
    if (currentPath === '/signup') return <Signup />;
    return <Home />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

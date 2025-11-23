import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
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
import { AIChatbot } from './components/AIChatbot';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

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

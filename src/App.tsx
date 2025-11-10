import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Router, Route } from './components/Router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { LearnFree } from './pages/LearnFree';
import { LearnPro } from './pages/LearnPro';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Pricing } from './pages/Pricing';
import { Lesson } from './pages/Lesson';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router>
              <Route path="/"><Home /></Route>
              <Route path="/login"><Login /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/learn/free"><LearnFree /></Route>
              <Route path="/learn/pro"><LearnPro /></Route>
              <Route path="/lesson/:id"><Lesson /></Route>
              <Route path="/community"><Community /></Route>
              <Route path="/profile"><Profile /></Route>
              <Route path="/pricing"><Pricing /></Route>
            </Router>
          </main>
          <Footer />
          <AIChatbot />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

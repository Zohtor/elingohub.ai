import { Bot, Gamepad2, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

interface Language {
  id: string;
  name: string;
  flag: string;
  emoji: string;
  color: string;
}

const languages: Language[] = [
  { id: 'english', name: 'English', flag: '/usa.png', emoji: '🇺🇸', color: 'from-blue-500 to-blue-600' },
  { id: 'estonian', name: 'Estonian', flag: '/flag_103_20250318_2.png', emoji: '🇪🇪', color: 'from-sky-500 to-sky-600' },
  { id: 'spanish', name: 'Spanish', flag: '/flag_54_20250311_1.png', emoji: '🇪🇸', color: 'from-red-500 to-red-600' },
  { id: 'italian', name: 'Italian', flag: '/flag_34_20250311_1.png', emoji: '🇮🇹', color: 'from-green-500 to-green-600' },
  { id: 'dutch', name: 'Dutch', flag: '/flag_82_20250325_1.png', emoji: '🇳🇱', color: 'from-orange-500 to-orange-600' },
  { id: 'portuguese', name: 'Portuguese', flag: '/flag_25_20250317_1.png', emoji: '🇵🇹', color: 'from-emerald-500 to-emerald-600' },
  { id: 'german', name: 'German', flag: '/4German_1.png', emoji: '🇩🇪', color: 'from-amber-500 to-amber-600' },
  { id: 'japanese', name: 'Japanese', flag: '/flag_37_20250321_1.png', emoji: '🇯🇵', color: 'from-pink-500 to-pink-600' },
];

export function KidsLearning() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-gray-800 transition-all hover:scale-105 bg-white px-6 py-3 rounded-full shadow-lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-semibold">Back to Home</span>
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 px-6 py-3 rounded-full border border-orange-300">
              <Star className="w-6 h-6 text-orange-600 animate-pulse" />
              <span className="text-orange-700 font-bold">Learning Adventure</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            <span className="block text-gray-900 mb-2">Learning Adventure</span>
            <span className="block bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
              Adventure Academy
            </span>
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Choose your favorite way to learn and enjoy learning languages
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center mb-10">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-4 shadow-2xl animate-pulse">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 ml-4">
              Learn with AI
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {languages.map((lang) => (
              <button
                key={`ai-${lang.id}`}
                onClick={() => navigate(`/learn/ai/${lang.id}`)}
                className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 border-2 border-transparent hover:border-blue-400"
              >
                <div className="absolute top-0 right-0 left-0 h-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-t-3xl"></div>

                <div className="flex flex-col items-center space-y-4 pt-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      className="relative w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-xl">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {lang.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{lang.emoji}</p>
                  </div>

                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-3 rounded-full text-sm font-bold w-full group-hover:from-blue-700 group-hover:to-cyan-700 transition shadow-lg">
                    <Sparkles className="w-5 h-5" />
                    <span>Start Learning</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-3xl p-8 text-center text-white shadow-2xl">
            <Bot className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-bold mb-3">
              Learn with Smart AI Tutor
            </h3>
            <p className="text-xl opacity-90">
              Personal tutor available 24/7 to help you on your language learning journey
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center mb-10">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 shadow-2xl animate-pulse">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 ml-4">
              Learn While Playing
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {languages.map((lang) => (
              <button
                key={`game-${lang.id}`}
                onClick={() => navigate(`/games/${lang.id}`)}
                className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 border-2 border-transparent hover:border-green-400"
              >
                <div className="absolute top-0 right-0 left-0 h-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-t-3xl"></div>

                <div className="flex flex-col items-center space-y-4 pt-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      className="relative w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 shadow-xl">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Play with {lang.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{lang.emoji}</p>
                  </div>

                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-full text-sm font-bold w-full group-hover:from-green-700 group-hover:to-emerald-700 transition shadow-lg">
                    <Gamepad2 className="w-5 h-5" />
                    <span>Start Playing</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-8 text-center text-white shadow-2xl">
            <Gamepad2 className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-bold mb-3">
              Exciting Educational Games
            </h3>
            <p className="text-xl opacity-90">
              Learn language through interactive games and fun competitions
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <Sparkles className="w-20 h-20 mx-auto mb-6 animate-pulse" />
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6">
            A Fun and Exciting Learning Journey!
          </h3>
          <p className="text-2xl mb-8 max-w-3xl mx-auto">
            Learn 8 different languages through AI and interactive games
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-white/40">
              <span className="text-xl font-bold">✨ Kid-Safe</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-white/40">
              <span className="text-xl font-bold">🎯 Educational Content</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-white/40">
              <span className="text-xl font-bold">🏆 Rewards & Challenges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

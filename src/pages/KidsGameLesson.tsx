import { Gamepad2, ArrowRight, Sparkles, Star, Trophy, Zap, Target, Award } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';
import { useState } from 'react';

interface Language {
  id: string;
  name: string;
  flag: string;
  emoji: string;
}

const languages: Record<string, Language> = {
  english: { id: 'english', name: 'English', flag: '/usa.png', emoji: '🇺🇸' },
  estonian: { id: 'estonian', name: 'Estonian', flag: '/flag_103_20250318_2.png', emoji: '🇪🇪' },
  spanish: { id: 'spanish', name: 'Spanish', flag: '/flag_54_20250311_1.png', emoji: '🇪🇸' },
  italian: { id: 'italian', name: 'Italian', flag: '/flag_34_20250311_1.png', emoji: '🇮🇹' },
  dutch: { id: 'dutch', name: 'Dutch', flag: '/flag_82_20250325_1.png', emoji: '🇳🇱' },
  portuguese: { id: 'portuguese', name: 'Portuguese', flag: '/flag_25_20250317_1.png', emoji: '🇵🇹' },
  german: { id: 'german', name: 'German', flag: '/4German_1.png', emoji: '🇩🇪' },
  japanese: { id: 'japanese', name: 'Japanese', flag: '/flag_37_20250321_1.png', emoji: '🇯🇵' },
};

const games = [
  {
    id: 1,
    title: 'Word Match',
    description: 'Match words with pictures',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Easy',
    points: 100
  },
  {
    id: 2,
    title: 'Memory Cards',
    description: 'Find matching pairs',
    icon: '🃏',
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Easy',
    points: 150
  },
  {
    id: 3,
    title: 'Word Builder',
    description: 'Build words from letters',
    icon: '🔤',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Medium',
    points: 200
  },
  {
    id: 4,
    title: 'Quiz Master',
    description: 'Answer questions correctly',
    icon: '❓',
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Medium',
    points: 250
  },
  {
    id: 5,
    title: 'Speed Challenge',
    description: 'Race against time',
    icon: '⚡',
    color: 'from-red-500 to-pink-500',
    difficulty: 'Hard',
    points: 300
  },
  {
    id: 6,
    title: 'Sentence Builder',
    description: 'Create correct sentences',
    icon: '📝',
    color: 'from-indigo-500 to-blue-500',
    difficulty: 'Hard',
    points: 350
  },
];

export function KidsGameLesson() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const pathParts = window.location.pathname.split('/');
  const languageId = pathParts[pathParts.length - 1];
  const language = languages[languageId] || languages.english;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/kids/learning')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all hover:scale-105 bg-white px-6 py-3 rounded-full shadow-lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-semibold">Back to Learning</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-50"></div>
                <img
                  src={language.flag}
                  alt={language.name}
                  className="relative w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 shadow-xl">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                  Play & Learn {language.name}
                </h1>
                <p className="text-lg text-gray-600">
                  Fun games to practice your language skills
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-white" />
                  <div className="text-white">
                    <p className="text-xs font-semibold">Score</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-white" />
                  <div className="text-white">
                    <p className="text-xs font-semibold">Badges</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <Gamepad2 className="w-12 h-12 animate-bounce" />
            <div>
              <h2 className="text-2xl font-bold">Game Zone is Open!</h2>
              <p className="text-green-100">Choose a game and start having fun while learning</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8" />
                <div>
                  <p className="font-bold">Interactive Games</p>
                  <p className="text-sm text-green-100">Learn by playing</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8" />
                <div>
                  <p className="font-bold">Instant Rewards</p>
                  <p className="text-sm text-green-100">Earn points & badges</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8" />
                <div>
                  <p className="font-bold">Level Up</p>
                  <p className="text-sm text-green-100">Track your progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Game</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 ${
                  selectedGame === game.id ? 'border-green-500' : 'border-transparent'
                }`}
              >
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl`}>
                    <span className="text-4xl">{game.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {game.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {game.description}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-yellow-600 font-semibold mb-4">
                  <Trophy className="w-5 h-5" />
                  <span>{game.points} points</span>
                </div>

                <div className={`bg-gradient-to-r ${game.color} text-white px-4 py-3 rounded-xl text-sm font-bold text-center group-hover:shadow-xl transition`}>
                  Play Now
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedGame && (
          <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-3xl p-8 text-center text-white shadow-2xl animate-fade-in">
            <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4">
              Let's Play!
            </h3>
            <p className="text-xl mb-6">
              Game {selectedGame} is loading. Get ready for an exciting learning adventure!
            </p>
            <button
              onClick={() => navigate(`/game/${languageId}/${selectedGame}`)}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Game
            </button>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Complete games to unlock amazing rewards!
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
              <span className="text-lg font-bold">🎮 Fun Gameplay</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
              <span className="text-lg font-bold">🏆 Earn Badges</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
              <span className="text-lg font-bold">⭐ Level Up</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
              <span className="text-lg font-bold">🎯 Track Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

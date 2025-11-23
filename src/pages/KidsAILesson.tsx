import { Bot, ArrowRight, Sparkles, Mic, Volume2, CheckCircle, Star, Trophy } from 'lucide-react';
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

const lessons = [
  { id: 1, title: 'Greetings & Hello', difficulty: 'Easy', points: 50, completed: false },
  { id: 2, title: 'Numbers 1-10', difficulty: 'Easy', points: 50, completed: false },
  { id: 3, title: 'Colors & Shapes', difficulty: 'Easy', points: 75, completed: false },
  { id: 4, title: 'Family Members', difficulty: 'Medium', points: 100, completed: false },
  { id: 5, title: 'Food & Drinks', difficulty: 'Medium', points: 100, completed: false },
  { id: 6, title: 'Animals & Pets', difficulty: 'Medium', points: 125, completed: false },
  { id: 7, title: 'Weather & Seasons', difficulty: 'Hard', points: 150, completed: false },
  { id: 8, title: 'Daily Activities', difficulty: 'Hard', points: 150, completed: false },
];

export function KidsAILesson() {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 py-12 px-4">
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-50"></div>
                <img
                  src={language.flag}
                  alt={language.name}
                  className="relative w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-xl">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                  Learn {language.name} with AI
                </h1>
                <p className="text-lg text-gray-600">
                  Interactive lessons with your personal AI tutor
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-white" />
                  <div className="text-white">
                    <p className="text-xs font-semibold">Total Points</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-white" />
                  <div className="text-white">
                    <p className="text-xs font-semibold">Level</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <Bot className="w-12 h-12 animate-bounce" />
            <div>
              <h2 className="text-2xl font-bold">Your AI Tutor is Ready!</h2>
              <p className="text-blue-100">Choose a lesson below to start your adventure</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-8 h-8" />
                <div>
                  <p className="font-bold">Listen & Repeat</p>
                  <p className="text-sm text-blue-100">Perfect pronunciation</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Mic className="w-8 h-8" />
                <div>
                  <p className="font-bold">Voice Practice</p>
                  <p className="text-sm text-blue-100">Speak with confidence</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-8 h-8" />
                <div>
                  <p className="font-bold">Instant Feedback</p>
                  <p className="text-sm text-blue-100">Learn as you go</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Lesson</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 ${
                  selectedLesson === lesson.id ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>

                {lesson.completed && (
                  <div className="absolute top-3 left-3 bg-green-500 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="mt-8 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-white">{lesson.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                    {lesson.title}
                  </h3>
                </div>

                <div className="flex items-center justify-center space-x-2 text-yellow-600 font-semibold">
                  <Trophy className="w-5 h-5" />
                  <span>{lesson.points} points</span>
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-bold text-center group-hover:from-blue-700 group-hover:to-cyan-700 transition">
                  Start Lesson
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedLesson && (
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-3xl p-8 text-center text-white shadow-2xl animate-fade-in">
            <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4">
              Great Choice!
            </h3>
            <p className="text-xl mb-6">
              Lesson {selectedLesson} is ready to start. Your AI tutor will guide you through every step!
            </p>
            <button
              onClick={() => navigate(`/lesson/${languageId}/${selectedLesson}`)}
              className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Begin Learning Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

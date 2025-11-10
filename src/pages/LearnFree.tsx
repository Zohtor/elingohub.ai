import { useNavigate } from '../hooks/useNavigate';
import { ArrowRight } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  lessonCount: number;
}

const modules: Module[] = [
  {
    id: 'alphabet',
    title: 'Estonian Alphabet',
    icon: 'ABC',
    description: 'Learn all 32 letters with pronunciation and examples',
    color: 'from-orange-400 to-orange-600',
    lessonCount: 32
  },
  {
    id: 'numbers',
    title: 'Numbers 0-100',
    icon: '123',
    description: 'Count from zero to one hundred with detailed pronunciation',
    color: 'from-green-400 to-green-600',
    lessonCount: 29
  },
  {
    id: 'family',
    title: 'Family Members',
    icon: '👨👩👧',
    description: 'Words for family relationships',
    color: 'from-pink-400 to-pink-600',
    lessonCount: 10
  },
  {
    id: 'greetings',
    title: 'Greetings & Phrases',
    icon: '👋',
    description: 'Essential everyday expressions',
    color: 'from-yellow-400 to-yellow-600',
    lessonCount: 12
  },
  {
    id: 'food',
    title: 'Food & Drinks',
    icon: '🍽️',
    description: 'Common foods and beverages',
    color: 'from-lime-400 to-lime-600',
    lessonCount: 14
  },
  {
    id: 'colors',
    title: 'Colors',
    icon: '🎨',
    description: 'Learn all the colors in Estonian',
    color: 'from-blue-400 to-blue-600',
    lessonCount: 12
  }
];

export function LearnFree() {
  const navigate = useNavigate();

  const handleModuleClick = (moduleId: string) => {
    navigate(`/lesson/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Free Learning Modules</h1>
          <p className="text-xl text-gray-600">Master the basics of Estonian language</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${module.color} p-8 flex items-center justify-center`}>
                <div className={`w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 ${
                  module.id === 'alphabet' || module.id === 'numbers' ? 'text-4xl font-bold text-gray-800' : 'text-6xl'
                }`}>
                  {module.icon}
                </div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{module.lessonCount} lessons</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for Advanced Learning?</h2>
          <p className="text-xl mb-6 opacity-90">
            Unlock AI-powered conversations, personalized lessons, and premium content
          </p>
          <button
            onClick={() => navigate('/learn/pro')}
            className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
          >
            Explore Premium Features
          </button>
        </div>
      </div>
    </div>
  );
}

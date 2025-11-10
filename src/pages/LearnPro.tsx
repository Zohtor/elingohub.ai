import { PenTool, BookOpen, Mic, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../hooks/useNavigate';

export function LearnPro() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const isPro = profile?.subscription_type === 'pro';

  const features = [
    { icon: PenTool, title: 'AI Writing Correction', desc: 'Get instant feedback on your Estonian writing' },
    { icon: BookOpen, title: 'Reading Comprehension', desc: 'AI-powered reading exercises with scoring' },
    { icon: Mic, title: 'Pronunciation Analysis', desc: 'Record your voice for detailed AI feedback' },
    { icon: Award, title: 'Level Assessment', desc: 'Comprehensive AI evaluation of your skills' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Premium Features</h1>
          <p className="text-xl text-gray-600">Advanced learning with artificial intelligence</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.desc}</p>
              <button
                onClick={() => !isPro && navigate('/pricing')}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isPro ? 'Start Practice' : 'Upgrade to Access'}
              </button>
            </div>
          ))}
        </div>

        {!isPro && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Unlock Your Full Potential</h2>
            <p className="text-xl mb-6 opacity-90">Upgrade to Premium for unlimited access</p>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all"
            >
              View Pricing Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../hooks/useNavigate';
import { MessageCircle, Users, Briefcase, Zap } from 'lucide-react';

export function Community() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const isPro = profile?.subscription_type === 'pro';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Community Hub</h1>
          <p className="text-xl text-gray-600">Connect with learners worldwide</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Chat Room</h3>
            <p className="text-gray-600 mb-4">Practice with AI tutor anytime</p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">FREE</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Learners Lounge</h3>
            <p className="text-gray-600 mb-4">Chat with other students</p>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">PRO</span>
            {!isPro && <div className="absolute inset-0 bg-gray-100 bg-opacity-70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <button onClick={() => navigate('/pricing')} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl">Upgrade</button>
            </div>}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Entrepreneurs Network</h3>
            <p className="text-gray-600 mb-4">Connect with Estonian business owners</p>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">PRO</span>
            {!isPro && <div className="absolute inset-0 bg-gray-100 bg-opacity-70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <button onClick={() => navigate('/pricing')} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl">Upgrade</button>
            </div>}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Live Events</h3>
            <p className="text-gray-600 mb-4">Join live language exchange sessions</p>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">PRO</span>
            {!isPro && <div className="absolute inset-0 bg-gray-100 bg-opacity-70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <button onClick={() => navigate('/pricing')} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl">Upgrade</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

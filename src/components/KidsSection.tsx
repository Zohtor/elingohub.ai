import { Gamepad2, Sparkles, Bot, Trophy } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

export function KidsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full mb-6 border border-orange-200">
            <Gamepad2 className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-sm font-bold text-orange-600">For Kids</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="block text-gray-900 mb-2">Languages for Kids</span>
            <span className="block bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
              Adventure Academy
            </span>
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            A fun and exciting learning adventure to master languages
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Adventure Academy - Unlock New Worlds Through Language"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8">
              <div className="text-center text-white">
                <h3 className="text-4xl font-bold mb-2">Unlock New Worlds Through Language!</h3>
                <p className="text-xl">Adventure starts here</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/kids/learning')}
              className="group inline-flex items-center space-x-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-110"
            >
              <Gamepad2 className="w-10 h-10 group-hover:rotate-12 transition-transform" />
              <span>Play & Learn</span>
              <Sparkles className="w-8 h-8 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <button
            onClick={() => navigate('/kids/learning')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Learn Through Play</h3>
            <p className="text-gray-600 text-lg">Fun educational games to learn 8 different languages</p>
          </button>

          <button
            onClick={() => navigate('/kids/learning')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Intelligence</h3>
            <p className="text-gray-600 text-lg">Interactive learning with smart AI tutor</p>
          </button>

          <button
            onClick={() => navigate('/kids/learning')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Rewards & Challenges</h3>
            <p className="text-gray-600 text-lg">Earn points and badges while learning</p>
          </button>
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Learn 8 Languages Through Adventure & Games!
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-lg font-semibold">
            <button
              onClick={() => navigate('/learn/ai/english')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              English 🇺🇸
            </button>
            <button
              onClick={() => navigate('/learn/ai/estonian')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              Estonian 🇪🇪
            </button>
            <button
              onClick={() => navigate('/learn/ai/spanish')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              Spanish 🇪🇸
            </button>
            <button
              onClick={() => navigate('/learn/ai/italian')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              Italian 🇮🇹
            </button>
            <button
              onClick={() => navigate('/learn/ai/dutch')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              Dutch 🇳🇱
            </button>
            <button
              onClick={() => navigate('/learn/ai/portuguese')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              Portuguese 🇵🇹
            </button>
            <button
              onClick={() => navigate('/learn/ai/german')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              German 🇩🇪
            </button>
            <button
              onClick={() => navigate('/learn/ai/japanese')}
              className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
            >
              Japanese 🇯🇵
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

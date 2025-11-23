import { ArrowRight, BookOpen, Users, Briefcase, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

export function EstonianMastery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all hover:scale-105 bg-white px-6 py-3 rounded-full shadow-lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-semibold">Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full mb-6 border border-emerald-200">
            <BookOpen className="w-5 h-5 text-emerald-600 mr-2" />
            <span className="text-sm font-bold text-emerald-600">Master Estonian</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="block text-gray-900 mb-2">Study the Estonian language</span>
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              until mastery
            </span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Choose your learning path and achieve fluency with our comprehensive programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
            <div className="h-56 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-24 h-24 text-white/80" />
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-white font-bold text-sm">For Everyone</span>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">General Estonian</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Master Estonian for everyday conversations, travel, and integration into Estonian society
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Complete beginner to advanced courses</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm text-gray-700">Cultural immersion lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span className="text-sm text-gray-700">Real-life conversation practice</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Pronunciation coaching</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm text-gray-700">Interactive AI tutor</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/learn/free')}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
            <div className="h-56 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Briefcase className="w-24 h-24 text-white/80" />
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-white font-bold text-sm">For Entrepreneurs</span>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Business Estonian</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Professional Estonian for entrepreneurs, business meetings, and corporate environments
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">Business vocabulary & terminology</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Negotiation & presentation skills</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-gray-700">Email & document writing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">Corporate culture training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Advanced business scenarios</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/learn/pro')}
                className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white text-lg font-bold rounded-xl hover:from-amber-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Start Business Course</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Why Choose Our Estonian Program?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-xl mb-2">AI-Powered</h4>
              <p className="text-emerald-50">Personalized learning adapted to your pace</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-xl mb-2">Live Community</h4>
              <p className="text-emerald-50">Connect with native speakers and learners</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-xl mb-2">Comprehensive</h4>
              <p className="text-emerald-50">From beginner to fluent speaker</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl p-10 shadow-xl text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure which path to choose?
          </h3>
          <p className="text-xl text-gray-600 mb-6">
            Try our free placement test to find the perfect program for your needs
          </p>
          <button
            onClick={() => navigate('/learn/free')}
            className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Take Placement Test
          </button>
        </div>
      </div>
    </div>
  );
}

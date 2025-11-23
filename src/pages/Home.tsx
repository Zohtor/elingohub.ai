import { ArrowRight, Sparkles, BookOpen, Users, MessageCircle, Smartphone, Apple, MapPin, Briefcase, FileText, Scale, Building2, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from '../hooks/useNavigate';
import { AITutors } from '../components/AITutors';
import { AILegalHub } from '../components/AILegalHub';
import { DeveloperProfileModal } from '../components/DeveloperProfileModal';
import { MapBox3D } from '../components/MapBox3D';
import { KidsSection } from '../components/KidsSection';
import { useState } from 'react';

export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-12 pb-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/5[1].jpg"
            alt="AI Language Learning Technology"
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/85 to-slate-900/60"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="space-y-6 backdrop-blur-sm bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/10">
              <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-full border border-cyan-400/30 shadow-lg">
                <Sparkles className="w-5 h-5 text-cyan-400 mr-2 animate-pulse" />
                <span className="text-sm font-bold text-cyan-300">
                  Powered by AI Technology
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="block text-white mb-3 drop-shadow-2xl">Unleash Your</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                  Potential
                </span>
              </h1>

              <div className="space-y-4 pt-2">
                <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
                  {t('tagline')}
                </p>

                <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
                  {t('subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate('/learn/free')}
                  className="group relative px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-2xl hover:shadow-cyan-500/50"
                >
                  <span className="flex items-center justify-center">
                    Start Learning Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="group relative px-8 py-5 text-lg font-bold text-white bg-white/10 backdrop-blur-md border-2 border-white/40 rounded-2xl hover:bg-white/20 hover:border-white/60 transform hover:scale-105 transition-all shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <User className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Meet the Developer
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center text-gray-200">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2.5 animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-medium">No credit card required</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2.5 animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-medium">Start instantly</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full mb-6 border border-green-200">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-bold text-green-600">Interactive 3D Map</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('discoverEstonia')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore Estonia with real 3D terrain, buildings, and interactive features
            </p>
          </div>

          <MapBox3D />
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full mb-6 border border-emerald-200">
              <BookOpen className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="text-sm font-bold text-emerald-600">Master Estonian</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="block text-gray-900 mb-2">Study the Estonian language</span>
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                until mastery
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
              Choose your learning path and achieve fluency with our comprehensive programs
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <button
              onClick={() => navigate('/estonian-mastery')}
              className="group w-full bg-white rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-emerald-400"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-left">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-2">Start Now</h3>
                      <p className="text-lg text-gray-600">Begin your journey to Estonian mastery</p>
                    </div>
                  </div>

                  <div className="space-y-3 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">General Estonian for everyday life</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Business Estonian for entrepreneurs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">AI-powered personalized learning</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-xl group-hover:from-emerald-700 group-hover:to-teal-700 transition-all flex items-center gap-3">
                    <span>Explore Paths</span>
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Join 10,000+ learners</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <AITutors />

      <KidsSection />

      {/* Language Learning Courses Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-6 border border-blue-200">
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-bold text-blue-600">Business Language Courses</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Professional Language <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Training Programs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Master business communication with our comprehensive language courses designed for professionals and enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Course 1: Business Estonian */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">Most Popular</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Estonian</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Master professional Estonian for workplace communication, presentations, and negotiations
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">40+ Interactive Lessons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Real Business Scenarios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">AI Pronunciation Coach</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/learn/pro')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Learning
                </button>
              </div>
            </div>

            {/* Course 2: Business English */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Business English</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Enhance your English skills for international business, email writing, and meetings
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Email & Writing Mastery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Meeting Facilitation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Presentation Skills</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/learn/pro')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Learning
                </button>
              </div>
            </div>

            {/* Course 3: Russian for Business */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Russian for Business</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn Russian for professional contexts, trade negotiations, and client relations
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Trade & Commerce Focus</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Cultural Intelligence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Negotiation Tactics</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/learn/pro')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Learning
                </button>
              </div>
            </div>

            {/* Course 4: German for Professionals */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">German for Professionals</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Professional German for engineering, manufacturing, and technical industries
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Technical Vocabulary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Business Etiquette</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Industry-Specific Terms</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/learn/pro')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-xl hover:from-amber-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Learning
                </button>
              </div>
            </div>

            {/* Course 5: Finnish for Business */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Finnish for Business</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn Finnish for cross-border business, trade, and professional networking
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Nordic Business Culture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Professional Networking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Business Correspondence</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/learn/pro')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Learning
                </button>
              </div>
            </div>

            {/* Course 6: Custom Corporate Training */}
            <div className="group bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-blue-500/20">
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-30"></div>
                </div>
                <Sparkles className="w-20 h-20 text-cyan-400 relative z-10 animate-pulse" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">Custom Corporate Training</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Tailored language programs designed specifically for your organization's needs
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Custom Curriculum Design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Team Progress Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Dedicated Support</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/corporate')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Language Skills?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals mastering new languages with AI-powered training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/learn/free')}
                className="px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl transform hover:scale-105"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold rounded-xl hover:bg-white/20 transition-all shadow-xl transform hover:scale-105"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      <AILegalHub />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Why Choose SpeakEstonia.ai?
            </h2>
            <p className="text-xl text-gray-600">
              The most advanced Estonian learning platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Lessons</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn with cutting-edge AI technology that adapts to your pace. Get instant feedback on pronunciation, writing, and comprehension.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Global Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with thousands of learners and Estonian entrepreneurs. Practice in real-time chat rooms and networking lounges.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">24/7 AI Tutor</h3>
              <p className="text-gray-600 leading-relaxed">
                Your personal AI tutor is always available. Practice conversations, ask questions, and get help whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                  <Smartphone className="w-4 h-4 text-cyan-400 mr-2" />
                  <span className="text-sm font-semibold text-white">Available on Mobile</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Download the Mobile App
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Learn Estonian anytime, anywhere with our mobile application. Practice with AI voice recognition on the go.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-4 bg-black hover:bg-gray-900 text-white rounded-2xl px-6 py-4 transition-all transform hover:scale-105 shadow-xl group w-full md:w-auto"
                >
                  <Apple className="w-10 h-10 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-xl font-semibold">App Store</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#"
                  className="flex items-center space-x-4 bg-black hover:bg-gray-900 text-white rounded-2xl px-6 py-4 transition-all transform hover:scale-105 shadow-xl group w-full md:w-auto"
                >
                  <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">GET IT ON</p>
                    <p className="text-xl font-semibold">Google Play</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-300">Learn offline anytime, anywhere</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-300">Track your progress with detailed analytics</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-300">Practice with AI voice recognition</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-300">Sync across all your devices</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <img
                  src="/17.jpg"
                  alt="Mobile App Available Now - Learn Estonian on your phone with AI"
                  className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  Coming Soon
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                </div>
                <span className="text-white text-sm font-semibold">10,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Estonian Journey Today
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of learners mastering Estonian with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-10 py-5 text-lg font-bold bg-white text-purple-600 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-10 py-5 text-lg font-bold bg-transparent border-2 border-white text-white rounded-2xl hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Floating Developer Profile Icon - Above AI Chatbot */}
      <button
        onClick={() => setIsProfileModalOpen(true)}
        className="fixed bottom-28 right-8 z-40 group animate-bounce"
        aria-label="Meet the Developer"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 animate-pulse transition-opacity"></div>
          <img
            src="/1762546943254.jpg"
            alt="Developer Profile"
            className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-2xl group-hover:scale-110 transition-transform cursor-pointer"
            style={{ objectPosition: '50% 35%' }}
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </button>

      {/* Developer Profile Modal */}
      <DeveloperProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}

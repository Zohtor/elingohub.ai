import { X, Globe, Briefcase, GraduationCap, Languages } from 'lucide-react';

interface DeveloperProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperProfileModal({ isOpen, onClose }: DeveloperProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>

      <div
        className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-200/50 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 group"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <img
                src="/1762546943254.jpg"
                alt="Dr. Zoheir Djebbar"
                className="relative w-32 h-32 rounded-full object-cover object-top border-4 border-white shadow-2xl"
                style={{ objectPosition: '50% 20%' }}
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Meet the Developer
            </h2>

            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Dr. Zoheir Djebbar
            </h3>

            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Technology Expert</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full border border-cyan-200">
                <Briefcase className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-semibold text-cyan-700">International Developer</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Background & Education</h4>
                  <p className="text-gray-700 leading-relaxed">
                    I am a technology and programming expert. I studied Science and Technology at university and hold a Bachelor's degree in Economics and Financial Accounting. I also completed two years of Law studies and obtained a Tourism Diploma from the accredited Union of Education (USA), where I ranked first in my class.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <div className="flex items-start gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Professional Expertise</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    I am certified in Amadeus and skilled in 3D design software such as SolidWorks and AutoCAD, as well as Adobe tools like Premiere, After Effects, and Illustrator — which I have mastered since 2011.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I am the founder of a U.S.-based LLC in e-commerce and work as a web and mobile app developer with international experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-3 mb-4">
                <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Global Experience</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    I have collaborated with clients from Turkey, Tunisia, Cape Verde, Libya, Senegal, Qatar, the United States, Canada, Australia, Japan, South Korea, Dubai, the United Kingdom, France, Italy, and Spain.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I provide services through Fiverr, Upwork, and Freelancer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <div className="flex items-start gap-3">
                <Languages className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Languages I Speak</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
                      <div className="font-bold text-blue-700 text-sm mb-1">English</div>
                      <div className="text-xs text-gray-600">Fluent</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
                      <div className="font-bold text-blue-700 text-sm mb-1">French</div>
                      <div className="text-xs text-gray-600">Fluent</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
                      <div className="font-bold text-cyan-700 text-sm mb-1">Italian</div>
                      <div className="text-xs text-gray-600">Intermediate</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-cyan-200 shadow-sm">
                      <div className="font-bold text-cyan-700 text-sm mb-1">Finnish</div>
                      <div className="text-xs text-gray-600">Intermediate</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
                      <div className="font-bold text-blue-600 text-sm mb-1">Estonian</div>
                      <div className="text-xs text-gray-600">Beginner</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
                      <div className="font-bold text-blue-600 text-sm mb-1">Swedish</div>
                      <div className="text-xs text-gray-600">Beginner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

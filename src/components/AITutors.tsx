import { useState, useEffect, useRef } from 'react';
import { Play, Volume2 } from 'lucide-react';

interface Tutor {
  id: string;
  name: string;
  language: string;
  flag: string;
  description: string;
  thumbnail: string;
  welcomeMessage: string;
  voiceLang: string;
}

const tutors: Tutor[] = [
  {
    id: 'english',
    name: 'Sarah',
    language: 'English',
    flag: '/usa.png',
    description: 'Native American English tutor with 10 years of experience',
    thumbnail: '/usa.png',
    welcomeMessage: 'Hello! Welcome to your English learning journey. My name is Sarah, and I am here to help you master the English language. Together, we will explore grammar, vocabulary, and conversation skills. Let\'s make learning fun and effective!',
    voiceLang: 'en-US'
  },
  {
    id: 'spanish',
    name: 'María',
    language: 'Spanish',
    flag: '/flag_54_20250311_1.png',
    description: 'Spanish native speaker specializing in conversational Spanish',
    thumbnail: '/flag_54_20250311_1.png',
    welcomeMessage: '¡Hola! Bienvenido a tu viaje de aprendizaje del español. Mi nombre es María y estoy aquí para ayudarte a dominar el idioma español. Juntos exploraremos gramática, vocabulario y habilidades de conversación. ¡Hagamos que el aprendizaje sea divertido y efectivo!',
    voiceLang: 'es-ES'
  },
  {
    id: 'french',
    name: 'Sophie',
    language: 'French',
    flag: '/flag_25_20250317_1.png',
    description: 'Parisian French tutor with expertise in grammar and pronunciation',
    thumbnail: '/flag_25_20250317_1.png',
    welcomeMessage: 'Bonjour! Bienvenue dans votre parcours d\'apprentissage du français. Je m\'appelle Sophie et je suis là pour vous aider à maîtriser la langue française. Ensemble, nous explorerons la grammaire, le vocabulaire et les compétences de conversation. Rendons l\'apprentissage amusant et efficace!',
    voiceLang: 'fr-FR'
  }
];

export function AITutors() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlayVideo = (tutorId: string) => {
    setPlayingVideo(tutorId);
    setCurrentWord(0);
    const tutor = tutors.find(t => t.id === tutorId);
    if (tutor) {
      playWelcomeMessage(tutor);
    }
  };

  const playWelcomeMessage = (tutor: Tutor) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(tutor.welcomeMessage);
      utterance.lang = tutor.voiceLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const words = tutor.welcomeMessage.split(' ');
      let wordIndex = 0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setCurrentWord(wordIndex);
          wordIndex++;
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentWord(words.length);
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCloseVideo = () => {
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }
    setPlayingVideo(null);
    setCurrentWord(0);
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Learn with AI-Powered Virtual Tutors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your favorite tutor and start an interactive learning journey with the best AI instructors
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {playingVideo === tutor.id ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center p-8">
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <img
                          src={tutor.thumbnail}
                          alt={tutor.name}
                          className={`w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl ${isSpeaking ? 'animate-pulse' : ''}`}
                        />
                        {isSpeaking && (
                          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-3 shadow-lg animate-bounce">
                            <Volume2 className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-full max-h-60 overflow-y-auto">
                        <p className="text-gray-800 text-lg leading-relaxed text-center">
                          {tutor.welcomeMessage.split(' ').map((word, index) => (
                            <span
                              key={index}
                              className={`inline-block mx-1 transition-all duration-300 ${
                                index === currentWord
                                  ? 'text-blue-600 font-bold scale-110'
                                  : index < currentWord
                                  ? 'text-gray-600'
                                  : 'text-gray-400'
                              }`}
                            >
                              {word}
                            </span>
                          ))}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <img src={tutor.flag} alt={tutor.language} className="w-8 h-8 rounded-full object-cover" />
                          <span className="text-white font-semibold">{tutor.name}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseVideo}
                      className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition z-10"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={tutor.thumbnail}
                      alt={tutor.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <button
                      onClick={() => handlePlayVideo(tutor.id)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 transform group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="w-12 h-12 text-blue-600 fill-blue-600" />
                      </div>
                    </button>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-3">
                        {tutor.flag.startsWith('/') ? (
                          <img src={tutor.flag} alt={tutor.language} className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white" />
                        ) : (
                          <span className="text-5xl">{tutor.flag}</span>
                        )}
                        <div>
                          <h3 className="text-2xl font-bold text-white">{tutor.name}</h3>
                          <p className="text-blue-200">{tutor.language} Tutor</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {playingVideo !== tutor.id && (
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{tutor.description}</p>
                  <button
                    onClick={() => handlePlayVideo(tutor.id)}
                    className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2 group/btn"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Watch Introduction</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All tutors are powered by advanced AI technology to provide a personalized learning experience
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-50 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-blue-700 font-semibold">Available 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}

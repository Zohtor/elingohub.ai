import { useState, useEffect, useRef } from 'react';
import { Play, Volume2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

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
  },
  {
    id: 'german',
    name: 'Hans',
    language: 'German',
    flag: '/4German_1.png',
    description: 'Expert German tutor focused on grammar and business German',
    thumbnail: '/4German_1.png',
    welcomeMessage: 'Guten Tag! Willkommen zu Ihrer deutschen Lernreise. Mein Name ist Hans und ich bin hier, um Ihnen zu helfen, die deutsche Sprache zu meistern. Gemeinsam werden wir Grammatik, Vokabular und Konversationsfähigkeiten erkunden. Lassen Sie uns das Lernen unterhaltsam und effektiv gestalten!',
    voiceLang: 'de-DE'
  },
  {
    id: 'italian',
    name: 'Marco',
    language: 'Italian',
    flag: '/flag_34_20250311_1.png',
    description: 'Italian native speaker with passion for Italian culture and language',
    thumbnail: '/flag_34_20250311_1.png',
    welcomeMessage: 'Ciao! Benvenuto nel tuo percorso di apprendimento dell\'italiano. Mi chiamo Marco e sono qui per aiutarti a padroneggiare la lingua italiana. Insieme esploreremo grammatica, vocabolario e abilità di conversazione. Rendiamo l\'apprendimento divertente ed efficace!',
    voiceLang: 'it-IT'
  },
  {
    id: 'japanese',
    name: 'Yuki',
    language: 'Japanese',
    flag: '/flag_37_20250321_1.png',
    description: 'Japanese language expert specializing in Hiragana, Katakana, and Kanji',
    thumbnail: '/flag_37_20250321_1.png',
    welcomeMessage: 'こんにちは！日本語学習の旅へようこそ。私の名前はユキです。日本語をマスターするお手伝いをします。一緒に文法、語彙、会話スキルを探求しましょう。楽しく効果的に学びましょう！',
    voiceLang: 'ja-JP'
  },
  {
    id: 'dutch',
    name: 'Emma',
    language: 'Dutch',
    flag: '/flag_82_20250325_1.png',
    description: 'Dutch native speaker with expertise in conversational Dutch',
    thumbnail: '/flag_82_20250325_1.png',
    welcomeMessage: 'Hallo! Welkom bij je Nederlandse leerreis. Mijn naam is Emma en ik ben hier om je te helpen de Nederlandse taal onder de knie te krijgen. Samen zullen we grammatica, woordenschat en gespreksvaardigheid verkennen. Laten we het leren leuk en effectief maken!',
    voiceLang: 'nl-NL'
  },
  {
    id: 'swedish',
    name: 'Astrid',
    language: 'Swedish',
    flag: '/flag_103_20250318_2.png',
    description: 'Swedish tutor passionate about Scandinavian languages and culture',
    thumbnail: '/flag_103_20250318_2.png',
    welcomeMessage: 'Hej! Välkommen till din svenska lärresa. Mitt namn är Astrid och jag är här för att hjälpa dig att bemästra det svenska språket. Tillsammans kommer vi att utforska grammatik, ordförråd och konversationsfärdigheter. Låt oss göra lärandet roligt och effektivt!',
    voiceLang: 'sv-SE'
  },
  {
    id: 'polish',
    name: 'Karolina',
    language: 'Polish',
    flag: '/flag_54_20250311_1.png',
    description: 'Polish language specialist with years of teaching experience',
    thumbnail: '/flag_54_20250311_1.png',
    welcomeMessage: 'Cześć! Witaj w swojej polskiej podróży edukacyjnej. Nazywam się Karolina i jestem tutaj, aby pomóc Ci opanować język polski. Razem będziemy odkrywać gramatykę, słownictwo i umiejętności konwersacyjne. Sprawmy, aby nauka była zabawna i skuteczna!',
    voiceLang: 'pl-PL'
  },
  {
    id: 'portuguese',
    name: 'Pedro',
    language: 'Portuguese',
    flag: '/flag_25_20250317_1.png',
    description: 'Portuguese native speaker specializing in Brazilian Portuguese',
    thumbnail: '/flag_25_20250317_1.png',
    welcomeMessage: 'Olá! Bem-vindo à sua jornada de aprendizado de português. Meu nome é Pedro e estou aqui para ajudá-lo a dominar a língua portuguesa. Juntos, exploraremos gramática, vocabulário e habilidades de conversação. Vamos tornar o aprendizado divertido e eficaz!',
    voiceLang: 'pt-PT'
  }
];

export function AITutors() {
  const navigate = useNavigate();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? tutors.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= tutors.length - 3 ? 0 : prev + 1));
  };

  const visibleTutors = tutors.slice(currentIndex, currentIndex + 3);

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

        <div className="relative group/carousel">
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/0 group-hover/carousel:bg-white/90 backdrop-blur-sm rounded-full shadow-xl transition-all duration-300 hover:scale-110 -translate-x-4"
            aria-label="Previous tutors"
          >
            <ChevronLeft className="w-8 h-8 text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/0 group-hover/carousel:bg-white/90 backdrop-blur-sm rounded-full shadow-xl transition-all duration-300 hover:scale-110 translate-x-4"
            aria-label="Next tutors"
          >
            <ChevronRight className="w-8 h-8 text-gray-800" />
          </button>

          <div className="grid md:grid-cols-3 gap-8">
            {visibleTutors.map((tutor) => (
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
                    <p className="text-gray-600 leading-relaxed mb-4">{tutor.description}</p>
                    <div className="space-y-3">
                      <button
                        onClick={() => handlePlayVideo(tutor.id)}
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2 group/btn shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Play className="w-5 h-5 fill-white" />
                        <span>Watch Introduction</span>
                      </button>
                      <button
                        onClick={() => navigate('/learn/free')}
                        className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2 group/btn shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <span>Start Now</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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

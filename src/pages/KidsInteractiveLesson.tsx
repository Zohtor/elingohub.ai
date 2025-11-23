import { Bot, ArrowRight, Volume2, Mic, CheckCircle, Star, Trophy, Sparkles, Award } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

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

interface LessonData {
  title: string;
  words: { word: string; translation: string; image: string }[];
  quiz: { question: string; options: string[]; correct: number }[];
}

const lessonContent: Record<number, LessonData> = {
  1: {
    title: 'Greetings & Hello',
    words: [
      { word: 'Hello', translation: 'Tere', image: '👋' },
      { word: 'Good morning', translation: 'Tere hommikust', image: '🌅' },
      { word: 'Good night', translation: 'Head ööd', image: '🌙' },
      { word: 'Thank you', translation: 'Aitäh', image: '🙏' },
      { word: 'Please', translation: 'Palun', image: '🤲' },
    ],
    quiz: [
      { question: 'How do you say "Hello"?', options: ['Tere', 'Aitäh', 'Palun', 'Head ööd'], correct: 0 },
      { question: 'What does "Aitäh" mean?', options: ['Hello', 'Thank you', 'Please', 'Good night'], correct: 1 },
      { question: 'How do you say "Good morning"?', options: ['Head ööd', 'Palun', 'Tere hommikust', 'Tere'], correct: 2 },
    ],
  },
  2: {
    title: 'Numbers 1-10',
    words: [
      { word: 'One', translation: 'Üks', image: '1️⃣' },
      { word: 'Two', translation: 'Kaks', image: '2️⃣' },
      { word: 'Three', translation: 'Kolm', image: '3️⃣' },
      { word: 'Four', translation: 'Neli', image: '4️⃣' },
      { word: 'Five', translation: 'Viis', image: '5️⃣' },
    ],
    quiz: [
      { question: 'What is "One" in the target language?', options: ['Kaks', 'Üks', 'Kolm', 'Neli'], correct: 1 },
      { question: 'What number is "Viis"?', options: ['Three', 'Four', 'Five', 'Two'], correct: 2 },
      { question: 'What is "Neli"?', options: ['Four', 'Five', 'One', 'Three'], correct: 0 },
    ],
  },
  3: {
    title: 'Colors & Shapes',
    words: [
      { word: 'Red', translation: 'Punane', image: '🔴' },
      { word: 'Blue', translation: 'Sinine', image: '🔵' },
      { word: 'Yellow', translation: 'Kollane', image: '🟡' },
      { word: 'Green', translation: 'Roheline', image: '🟢' },
      { word: 'Circle', translation: 'Ring', image: '⭕' },
    ],
    quiz: [
      { question: 'What is "Red"?', options: ['Sinine', 'Punane', 'Kollane', 'Roheline'], correct: 1 },
      { question: 'What does "Ring" mean?', options: ['Square', 'Triangle', 'Circle', 'Star'], correct: 2 },
      { question: 'What is "Blue"?', options: ['Punane', 'Kollane', 'Sinine', 'Roheline'], correct: 2 },
    ],
  },
};

export function KidsInteractiveLesson() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedWords, setCompletedWords] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const pathParts = window.location.pathname.split('/');
  const languageId = pathParts[3];
  const lessonId = parseInt(pathParts[4]);

  const language = languages[languageId] || languages.english;
  const lesson = lessonContent[lessonId] || lessonContent[1];

  const totalWords = lesson.words.length;
  const totalQuestions = lesson.quiz.length;
  const isLearningPhase = currentStep < totalWords;
  const currentWord = isLearningPhase ? lesson.words[currentStep] : null;
  const currentQuestion = !isLearningPhase ? lesson.quiz[currentStep - totalWords] : null;

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (isLearningPhase) {
      setCompletedWords(completedWords + 1);
      setEarnedPoints(earnedPoints + 25);
      if (currentStep < totalWords - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalWords);
      }
    } else {
      if (showResult) {
        if (currentStep < totalWords + totalQuestions - 1) {
          setCurrentStep(currentStep + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          completeLesson();
        }
      }
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (currentQuestion && index === currentQuestion.correct) {
      setScore(score + 1);
      setEarnedPoints(earnedPoints + 50);
    }
  };

  const completeLesson = async () => {
    setIsComplete(true);
    const finalPoints = Math.round((score / totalQuestions) * 100) + earnedPoints;

    if (user) {
      try {
        let { data: profile } = await supabase
          .from('kids_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!profile) {
          const { data: newProfile } = await supabase
            .from('kids_profiles')
            .insert({ user_id: user.id, total_points: 0, level: 1 })
            .select()
            .single();
          profile = newProfile;
        }

        if (profile) {
          await supabase
            .from('kids_lesson_progress')
            .upsert({
              profile_id: profile.id,
              language_id: languageId,
              lesson_id: lessonId,
              completed: true,
              score: Math.round((score / totalQuestions) * 100),
              points_earned: finalPoints,
              completed_at: new Date().toISOString(),
            });

          await supabase
            .from('kids_profiles')
            .update({
              total_points: profile.total_points + finalPoints,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);
        }
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/learn/ai/${languageId}`)}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all hover:scale-105 bg-white px-6 py-3 rounded-full shadow-lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-semibold">Back to Lessons</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={language.flag}
                alt={language.name}
                className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-blue-200"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-gray-600">Lesson {lessonId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{earnedPoints} pts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Progress: {Math.round(((currentStep + 1) / (totalWords + totalQuestions)) * 100)}%
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {currentStep + 1} / {totalWords + totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / (totalWords + totalQuestions)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {!isComplete ? (
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {isLearningPhase && currentWord ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-600 font-semibold">Learning Mode</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-8xl mb-6 animate-bounce">{currentWord.image}</div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentWord.word}</h2>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <button
                      onClick={() => speakWord(currentWord.word)}
                      disabled={isSpeaking}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50"
                    >
                      <Volume2 className="w-6 h-6 inline mr-2" />
                      Listen
                    </button>
                    <button
                      onClick={() => speakWord(currentWord.translation)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg transform hover:scale-105"
                    >
                      <Mic className="w-6 h-6 inline mr-2" />
                      Practice
                    </button>
                  </div>
                  <div className="bg-blue-50 px-8 py-4 rounded-2xl inline-block">
                    <p className="text-2xl font-semibold text-blue-900">{currentWord.translation}</p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-xl transform hover:scale-105"
                >
                  {currentStep < totalWords - 1 ? 'Next Word' : 'Start Quiz'} →
                </button>
              </div>
            ) : currentQuestion ? (
              <div>
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-semibold">Quiz Time!</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`p-6 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
                        showResult
                          ? index === currentQuestion.correct
                            ? 'bg-green-500 text-white'
                            : index === selectedAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-400'
                          : 'bg-white text-gray-900 hover:bg-blue-50 border-2 border-gray-200'
                      }`}
                    >
                      {option}
                      {showResult && index === currentQuestion.correct && (
                        <CheckCircle className="w-6 h-6 inline ml-2" />
                      )}
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className={`p-6 rounded-2xl mb-6 ${
                    selectedAnswer === currentQuestion.correct
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                  }`}>
                    <p className={`text-xl font-bold text-center ${
                      selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {selectedAnswer === currentQuestion.correct
                        ? '🎉 Excellent! You got it right! +50 points'
                        : '❌ Not quite! The correct answer is highlighted.'}
                    </p>
                  </div>
                )}

                {showResult && (
                  <button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-xl"
                  >
                    {currentStep < totalWords + totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'} →
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <Trophy className="w-24 h-24 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-bold mb-4">Lesson Complete!</h2>
            <p className="text-2xl mb-6">You scored {score} out of {totalQuestions} questions!</p>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <Star className="w-10 h-10 mx-auto mb-2" />
                <p className="text-3xl font-bold">{Math.round((score / totalQuestions) * 100)}%</p>
                <p className="text-sm">Score</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <Trophy className="w-10 h-10 mx-auto mb-2" />
                <p className="text-3xl font-bold">{earnedPoints + Math.round((score / totalQuestions) * 100)}</p>
                <p className="text-sm">Points Earned</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <Award className="w-10 h-10 mx-auto mb-2" />
                <p className="text-3xl font-bold">{completedWords}</p>
                <p className="text-sm">Words Learned</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(`/learn/ai/${languageId}`)}
                className="bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Back to Lessons
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-white/20 border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105"
              >
                Retry Lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Gamepad2, ArrowRight, Trophy, Star, Award, Sparkles, Zap } from 'lucide-react';
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

interface GameWord {
  word: string;
  translation: string;
  image: string;
}

const gameWords: Record<number, GameWord[]> = {
  1: [
    { word: 'Cat', translation: 'Kass', image: '🐱' },
    { word: 'Dog', translation: 'Koer', image: '🐶' },
    { word: 'Bird', translation: 'Lind', image: '🐦' },
    { word: 'Fish', translation: 'Kala', image: '🐟' },
    { word: 'Horse', translation: 'Hobune', image: '🐴' },
    { word: 'Cow', translation: 'Lehm', image: '🐮' },
  ],
  2: [
    { word: 'Cat', translation: 'Kass', image: '🐱' },
    { word: 'Dog', translation: 'Koer', image: '🐶' },
    { word: 'Bird', translation: 'Lind', image: '🐦' },
    { word: 'Fish', translation: 'Kala', image: '🐟' },
  ],
};

export function KidsInteractiveGame() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [words, setWords] = useState<GameWord[]>([]);
  const [shuffledImages, setShuffledImages] = useState<GameWord[]>([]);

  const pathParts = window.location.pathname.split('/');
  const languageId = pathParts[2];
  const gameId = parseInt(pathParts[3]);

  const language = languages[languageId] || languages.english;
  const gameData = gameWords[gameId] || gameWords[1];

  useEffect(() => {
    setWords([...gameData].sort(() => Math.random() - 0.5));
    setShuffledImages([...gameData].sort(() => Math.random() - 0.5));
  }, [gameId]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setMatchedPairs([]);
    setSelectedWord(null);
    setSelectedImage(null);
    setWords([...gameData].sort(() => Math.random() - 0.5));
    setShuffledImages([...gameData].sort(() => Math.random() - 0.5));
  };

  const handleWordClick = (word: string) => {
    if (matchedPairs.includes(word) || !isPlaying) return;
    setSelectedWord(word);
    if (selectedImage) {
      checkMatch(word, selectedImage);
    }
  };

  const handleImageClick = (image: string) => {
    if (matchedPairs.includes(image) || !isPlaying) return;
    setSelectedImage(image);
    if (selectedWord) {
      checkMatch(selectedWord, image);
    }
  };

  const checkMatch = (word: string, image: string) => {
    const wordData = gameData.find((w) => w.word === word);
    const imageData = gameData.find((w) => w.image === image);

    if (wordData && imageData && wordData.word === imageData.word) {
      setScore(score + 100);
      setMatchedPairs([...matchedPairs, word, image]);
      setSelectedWord(null);
      setSelectedImage(null);

      if (matchedPairs.length + 2 >= gameData.length * 2) {
        setTimeout(() => endGame(), 500);
      }
    } else {
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
      }, 1000);
    }
  };

  const endGame = async () => {
    setIsPlaying(false);
    setIsComplete(true);

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
          const { data: existingProgress } = await supabase
            .from('kids_game_progress')
            .select('*')
            .eq('profile_id', profile.id)
            .eq('language_id', languageId)
            .eq('game_id', gameId)
            .maybeSingle();

          const newHighScore = existingProgress
            ? Math.max(existingProgress.high_score, score)
            : score;

          await supabase
            .from('kids_game_progress')
            .upsert({
              profile_id: profile.id,
              language_id: languageId,
              game_id: gameId,
              high_score: newHighScore,
              times_played: (existingProgress?.times_played || 0) + 1,
              points_earned: (existingProgress?.points_earned || 0) + score,
              last_played_at: new Date().toISOString(),
            });

          await supabase
            .from('kids_profiles')
            .update({
              total_points: profile.total_points + score,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id);
        }
      } catch (error) {
        console.error('Error saving game progress:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/games/${languageId}`)}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all hover:scale-105 bg-white px-6 py-3 rounded-full shadow-lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-semibold">Back to Games</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={language.flag}
                alt={language.name}
                className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-green-200"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Word Match Game</h1>
                <p className="text-gray-600">Match words with their images!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{score} pts</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{timeLeft}s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isPlaying && !isComplete && (
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <Gamepad2 className="w-24 h-24 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-2xl mb-8">Match the words with their images as fast as you can!</p>
            <button
              onClick={startGame}
              className="bg-white text-green-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Game
            </button>
          </div>
        )}

        {isPlaying && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Words</h3>
              <div className="grid grid-cols-2 gap-4">
                {words.map((item) => (
                  <button
                    key={item.word}
                    onClick={() => handleWordClick(item.word)}
                    disabled={matchedPairs.includes(item.word)}
                    className={`p-6 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
                      matchedPairs.includes(item.word)
                        ? 'bg-green-100 text-green-400 cursor-not-allowed'
                        : selectedWord === item.word
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900 hover:bg-blue-50'
                    }`}
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {shuffledImages.map((item) => (
                  <button
                    key={item.image}
                    onClick={() => handleImageClick(item.image)}
                    disabled={matchedPairs.includes(item.image)}
                    className={`p-6 rounded-2xl text-6xl transition-all transform hover:scale-105 shadow-lg ${
                      matchedPairs.includes(item.image)
                        ? 'bg-green-100 opacity-40 cursor-not-allowed'
                        : selectedImage === item.image
                        ? 'bg-blue-500'
                        : 'bg-white hover:bg-blue-50'
                    }`}
                  >
                    {item.image}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
            <Trophy className="w-24 h-24 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-bold mb-4">Game Complete!</h2>
            <p className="text-2xl mb-8">You scored {score} points!</p>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <Star className="w-10 h-10 mx-auto mb-2" />
                <p className="text-3xl font-bold">{score}</p>
                <p className="text-sm">Score</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <Zap className="w-10 h-10 mx-auto mb-2" />
                <p className="text-3xl font-bold">{60 - timeLeft}s</p>
                <p className="text-sm">Time Used</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <Award className="w-10 h-10 mx-auto mb-2" />
                <p className="text-3xl font-bold">{matchedPairs.length / 2}</p>
                <p className="text-sm">Matches</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(`/games/${languageId}`)}
                className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Back to Games
              </button>
              <button
                onClick={startGame}
                className="bg-white/20 border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

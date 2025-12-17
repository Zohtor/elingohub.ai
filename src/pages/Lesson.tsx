import { useState, useRef, useEffect } from 'react';
import { BookOpen, Dumbbell, Volume2, CheckCircle, ArrowLeft, Mic, MicOff, Gauge, Video, VideoOff, X, Keyboard, Lightbulb } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

interface LessonContent {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  exampleTranslation?: string;
}

interface Exercise {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface LessonData {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: LessonContent[];
  exercises: Exercise[];
}

const lessonsData: { [key: string]: LessonData } = {
  alphabet: {
    id: 'alphabet',
    title: 'Estonian Alphabet',
    icon: 'ABC',
    color: 'from-orange-400 to-orange-600',
    content: [
      { word: 'A', translation: 'A', pronunciation: 'like "a" in "father"', example: 'auto', exampleTranslation: 'car' },
      { word: 'B', translation: 'B', pronunciation: 'like "b" in "book"', example: 'baar', exampleTranslation: 'bar' },
      { word: 'C', translation: 'C', pronunciation: 'like "ts"', example: 'tsement', exampleTranslation: 'cement' },
      { word: 'D', translation: 'D', pronunciation: 'like "d" in "dog"', example: 'daam', exampleTranslation: 'lady' },
      { word: 'E', translation: 'E', pronunciation: 'like "e" in "bed"', example: 'ema', exampleTranslation: 'mother' },
      { word: 'F', translation: 'F', pronunciation: 'like "f" in "fish"', example: 'foto', exampleTranslation: 'photo' },
      { word: 'G', translation: 'G', pronunciation: 'like "g" in "good"', example: 'grill', exampleTranslation: 'grill' },
      { word: 'H', translation: 'H', pronunciation: 'like "h" in "house"', example: 'hall', exampleTranslation: 'gray' },
      { word: 'I', translation: 'I', pronunciation: 'like "ee" in "see"', example: 'isa', exampleTranslation: 'father' },
      { word: 'J', translation: 'J', pronunciation: 'like "y" in "yes"', example: 'jah', exampleTranslation: 'yes' },
      { word: 'K', translation: 'K', pronunciation: 'like "k" in "king"', example: 'kass', exampleTranslation: 'cat' },
      { word: 'L', translation: 'L', pronunciation: 'like "l" in "love"', example: 'lumi', exampleTranslation: 'snow' },
      { word: 'M', translation: 'M', pronunciation: 'like "m" in "moon"', example: 'meri', exampleTranslation: 'sea' },
      { word: 'N', translation: 'N', pronunciation: 'like "n" in "new"', example: 'nali', exampleTranslation: 'joke' },
      { word: 'O', translation: 'O', pronunciation: 'like "o" in "phone"', example: 'olen', exampleTranslation: 'I am' },
      { word: 'P', translation: 'P', pronunciation: 'like "p" in "pen"', example: 'puu', exampleTranslation: 'tree' },
      { word: 'R', translation: 'R', pronunciation: 'rolled r', example: 'raha', exampleTranslation: 'money' },
      { word: 'S', translation: 'S', pronunciation: 'like "s" in "sun"', example: 'sool', exampleTranslation: 'salt' },
      { word: 'T', translation: 'T', pronunciation: 'like "t" in "time"', example: 'tee', exampleTranslation: 'road' },
      { word: 'U', translation: 'U', pronunciation: 'like "oo" in "moon"', example: 'uus', exampleTranslation: 'new' },
      { word: 'V', translation: 'V', pronunciation: 'like "v" in "voice"', example: 'vesi', exampleTranslation: 'water' },
      { word: 'W', translation: 'W', pronunciation: 'like "v" (rare)', example: 'weekend', exampleTranslation: 'weekend' },
      { word: 'X', translation: 'X', pronunciation: 'like "ks"', example: 'takso', exampleTranslation: 'taxi' },
      { word: 'Y', translation: 'Y', pronunciation: 'like German ü (rare)', example: 'yoga', exampleTranslation: 'yoga' },
      { word: 'Z', translation: 'Z', pronunciation: 'like "ts"', example: 'zonu', exampleTranslation: 'zone' },
      { word: 'Š', translation: 'Š', pronunciation: 'like "sh" in "shop"', example: 'šokolaad', exampleTranslation: 'chocolate' },
      { word: 'Ž', translation: 'Ž', pronunciation: 'like "s" in "pleasure"', example: 'žurnaal', exampleTranslation: 'magazine' },
      { word: 'Õ', translation: 'Õ', pronunciation: 'unique Estonian vowel', example: 'õun', exampleTranslation: 'apple' },
      { word: 'Ä', translation: 'Ä', pronunciation: 'like "a" in "cat"', example: 'äri', exampleTranslation: 'business' },
      { word: 'Ö', translation: 'Ö', pronunciation: 'like German ö', example: 'öö', exampleTranslation: 'night' },
      { word: 'Ü', translation: 'Ü', pronunciation: 'like German ü', example: 'üks', exampleTranslation: 'one' },
      { word: 'Q', translation: 'Q', pronunciation: 'like "k" (rare)', example: 'kvaliteet', exampleTranslation: 'quality' }
    ],
    exercises: [
      {
        question: 'How do you pronounce "Š"?',
        options: ['Like "sh" in shop', 'Like "s" in sun', 'Like "z" in zoo', 'Like "ch" in cheese'],
        correctAnswer: 0,
        explanation: 'Š is pronounced like "sh" in "shop"'
      },
      {
        question: 'What is the unique Estonian vowel?',
        options: ['Ä', 'Ö', 'Õ', 'Ü'],
        correctAnswer: 2,
        explanation: 'Õ is unique to Estonian and some other Finno-Ugric languages'
      },
      {
        question: 'How many letters are in the Estonian alphabet?',
        options: ['26', '29', '32', '35'],
        correctAnswer: 2,
        explanation: 'The Estonian alphabet has 32 letters including special characters'
      }
    ]
  },
  numbers: {
    id: 'numbers',
    title: 'Numbers 0-100',
    icon: '123',
    color: 'from-green-400 to-green-600',
    content: [
      { word: 'null', translation: '0', pronunciation: 'nool', example: 'null kraadi', exampleTranslation: 'zero degrees' },
      { word: 'üks', translation: '1', pronunciation: 'ooks', example: 'üks õun', exampleTranslation: 'one apple' },
      { word: 'kaks', translation: '2', pronunciation: 'kahks', example: 'kaks last', exampleTranslation: 'two children' },
      { word: 'kolm', translation: '3', pronunciation: 'kolm', example: 'kolm päeva', exampleTranslation: 'three days' },
      { word: 'neli', translation: '4', pronunciation: 'ne-li', example: 'neli hooaega', exampleTranslation: 'four seasons' },
      { word: 'viis', translation: '5', pronunciation: 'vees', example: 'viis eurot', exampleTranslation: 'five euros' },
      { word: 'kuus', translation: '6', pronunciation: 'koos', example: 'kuus kuud', exampleTranslation: 'six months' },
      { word: 'seitse', translation: '7', pronunciation: 'say-tse', example: 'seitse nädalat', exampleTranslation: 'seven weeks' },
      { word: 'kaheksa', translation: '8', pronunciation: 'ka-hek-sa', example: 'kaheksa tundi', exampleTranslation: 'eight hours' },
      { word: 'üheksa', translation: '9', pronunciation: 'oo-hek-sa', example: 'üheksa aastat', exampleTranslation: 'nine years' },
      { word: 'kümme', translation: '10', pronunciation: 'koom-me', example: 'kümme minutit', exampleTranslation: 'ten minutes' },
      { word: 'üksteist', translation: '11', pronunciation: 'ooks-tayst', example: 'üksteist tundi', exampleTranslation: 'eleven hours' },
      { word: 'kaksteist', translation: '12', pronunciation: 'kahks-tayst', example: 'kaksteist kuud', exampleTranslation: 'twelve months' },
      { word: 'kolmteist', translation: '13', pronunciation: 'kolm-tayst', example: 'kolmteist aastat', exampleTranslation: 'thirteen years' },
      { word: 'neliteist', translation: '14', pronunciation: 'ne-li-tayst', example: 'neliteist päeva', exampleTranslation: 'fourteen days' },
      { word: 'viisteist', translation: '15', pronunciation: 'vees-tayst', example: 'viisteist minutit', exampleTranslation: 'fifteen minutes' },
      { word: 'kuusteist', translation: '16', pronunciation: 'koos-tayst', example: 'kuusteist eurot', exampleTranslation: 'sixteen euros' },
      { word: 'seitseteist', translation: '17', pronunciation: 'say-tse-tayst', example: 'seitseteist aastat', exampleTranslation: 'seventeen years' },
      { word: 'kaheksateist', translation: '18', pronunciation: 'ka-hek-sa-tayst', example: 'kaheksateist last', exampleTranslation: 'eighteen children' },
      { word: 'üheksateist', translation: '19', pronunciation: 'oo-hek-sa-tayst', example: 'üheksateist kraadi', exampleTranslation: 'nineteen degrees' },
      { word: 'kakskümmend', translation: '20', pronunciation: 'kahks-koom-mend', example: 'kakskümmend eurot', exampleTranslation: 'twenty euros' },
      { word: 'kolmkümmend', translation: '30', pronunciation: 'kolm-koom-mend', example: 'kolmkümmend aastat', exampleTranslation: 'thirty years' },
      { word: 'nelikümmend', translation: '40', pronunciation: 'ne-li-koom-mend', example: 'nelikümmend kraadi', exampleTranslation: 'forty degrees' },
      { word: 'viiskümmend', translation: '50', pronunciation: 'vees-koom-mend', example: 'viiskümmend eurot', exampleTranslation: 'fifty euros' },
      { word: 'kuuskümmend', translation: '60', pronunciation: 'koos-koom-mend', example: 'kuuskümmend minutit', exampleTranslation: 'sixty minutes' },
      { word: 'seitsekümmend', translation: '70', pronunciation: 'say-tse-koom-mend', example: 'seitsekümmend aastat', exampleTranslation: 'seventy years' },
      { word: 'kaheksakümmend', translation: '80', pronunciation: 'ka-hek-sa-koom-mend', example: 'kaheksakümmend päeva', exampleTranslation: 'eighty days' },
      { word: 'üheksakümmend', translation: '90', pronunciation: 'oo-hek-sa-koom-mend', example: 'üheksakümmend protsenti', exampleTranslation: 'ninety percent' },
      { word: 'sada', translation: '100', pronunciation: 'sa-da', example: 'sada eurot', exampleTranslation: 'one hundred euros' }
    ],
    exercises: [
      {
        question: 'How do you say "5" in Estonian?',
        options: ['viis', 'kuus', 'seitse', 'kaheksa'],
        correctAnswer: 0,
        explanation: 'Viis means five in Estonian'
      },
      {
        question: 'What does "kolm" mean?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctAnswer: 1,
        explanation: 'Kolm means three'
      },
      {
        question: 'Translate: "kaks last"',
        options: ['One child', 'Two children', 'Three children', 'Two apples'],
        correctAnswer: 1,
        explanation: 'Kaks means two and last means children'
      }
    ]
  },
  family: {
    id: 'family',
    title: 'Family Members',
    icon: '👨👩👧',
    color: 'from-pink-400 to-pink-600',
    content: [
      { word: 'ema', translation: 'mother', example: 'Minu ema on õpetaja', exampleTranslation: 'My mother is a teacher' },
      { word: 'isa', translation: 'father', example: 'Minu isa töötab', exampleTranslation: 'My father works' },
      { word: 'õde', translation: 'sister', example: 'Mul on üks õde', exampleTranslation: 'I have one sister' },
      { word: 'vend', translation: 'brother', example: 'Mul on kaks venda', exampleTranslation: 'I have two brothers' },
      { word: 'vanaema', translation: 'grandmother', example: 'Vanaema elab maal', exampleTranslation: 'Grandmother lives in the countryside' },
      { word: 'vanaisa', translation: 'grandfather', example: 'Vanaisa on vana', exampleTranslation: 'Grandfather is old' },
      { word: 'laps', translation: 'child', example: 'Väike laps magab', exampleTranslation: 'The little child is sleeping' },
      { word: 'pere', translation: 'family', example: 'Meil on suur pere', exampleTranslation: 'We have a big family' },
      { word: 'vanemad', translation: 'parents', example: 'Minu vanemad reisivad', exampleTranslation: 'My parents are traveling' },
      { word: 'tütar', translation: 'daughter', example: 'Tema tütar õpib', exampleTranslation: 'His/her daughter is studying' }
    ],
    exercises: [
      {
        question: 'What does "ema" mean?',
        options: ['Father', 'Mother', 'Sister', 'Brother'],
        correctAnswer: 1,
        explanation: 'Ema means mother in Estonian'
      },
      {
        question: 'How do you say "family" in Estonian?',
        options: ['pere', 'vanemad', 'laps', 'vend'],
        correctAnswer: 0,
        explanation: 'Pere means family'
      },
      {
        question: 'What is "vanaema"?',
        options: ['Mother', 'Aunt', 'Grandmother', 'Sister'],
        correctAnswer: 2,
        explanation: 'Vanaema means grandmother (vana = old, ema = mother)'
      }
    ]
  },
  greetings: {
    id: 'greetings',
    title: 'Greetings & Phrases',
    icon: '👋',
    color: 'from-yellow-400 to-yellow-600',
    content: [
      { word: 'Tere', translation: 'Hello', example: 'Tere hommikust!', exampleTranslation: 'Good morning!' },
      { word: 'Jah', translation: 'Yes', example: 'Jah, palun', exampleTranslation: 'Yes, please' },
      { word: 'Ei', translation: 'No', example: 'Ei, aitäh', exampleTranslation: 'No, thank you' },
      { word: 'Aitäh', translation: 'Thank you', example: 'Aitäh väga palju', exampleTranslation: 'Thank you very much' },
      { word: 'Palun', translation: 'Please / You\'re welcome', example: 'Palun, võta', exampleTranslation: 'Please, take it' },
      { word: 'Head aega', translation: 'Goodbye', example: 'Head aega! Näeme!', exampleTranslation: 'Goodbye! See you!' },
      { word: 'Kuidas läheb?', translation: 'How are you?', example: 'Kuidas läheb?', exampleTranslation: 'How are you?' },
      { word: 'Hästi', translation: 'Good / Well', example: 'Mul läheb hästi', exampleTranslation: 'I am doing well' },
      { word: 'Vabandust', translation: 'Excuse me / Sorry', example: 'Vabandust, kas...', exampleTranslation: 'Excuse me, could...' },
      { word: 'Tore tutvuda', translation: 'Nice to meet you', example: 'Väga tore tutvuda', exampleTranslation: 'Very nice to meet you' },
      { word: 'Nägemist', translation: 'Goodbye / See you', example: 'Nägemist homme', exampleTranslation: 'See you tomorrow' },
      { word: 'Head ööd', translation: 'Good night', example: 'Head ööd! Magada hästi!', exampleTranslation: 'Good night! Sleep well!' }
    ],
    exercises: [
      {
        question: 'How do you say "Thank you" in Estonian?',
        options: ['Palun', 'Aitäh', 'Tere', 'Hästi'],
        correctAnswer: 1,
        explanation: 'Aitäh means thank you'
      },
      {
        question: 'What does "Kuidas läheb?" mean?',
        options: ['Hello', 'Goodbye', 'How are you?', 'Thank you'],
        correctAnswer: 2,
        explanation: 'Kuidas läheb? means "How are you?" or "How is it going?"'
      },
      {
        question: 'Which word means both "Please" and "You\'re welcome"?',
        options: ['Aitäh', 'Tere', 'Palun', 'Jah'],
        correctAnswer: 2,
        explanation: 'Palun can mean both "please" and "you\'re welcome" depending on context'
      }
    ]
  },
  food: {
    id: 'food',
    title: 'Food & Drinks',
    icon: '🍽️',
    color: 'from-red-400 to-red-600',
    content: [
      { word: 'leib', translation: 'bread', example: 'Värske leib on hea', exampleTranslation: 'Fresh bread is good' },
      { word: 'piim', translation: 'milk', example: 'Kas tahad piima?', exampleTranslation: 'Do you want milk?' },
      { word: 'vesi', translation: 'water', example: 'Palun üks vesi', exampleTranslation: 'One water, please' },
      { word: 'kohv', translation: 'coffee', example: 'Ma joon kohvi', exampleTranslation: 'I drink coffee' },
      { word: 'tee', translation: 'tea', example: 'Tee on kuum', exampleTranslation: 'Tea is hot' },
      { word: 'õun', translation: 'apple', example: 'Punane õun', exampleTranslation: 'Red apple' },
      { word: 'juust', translation: 'cheese', example: 'Eesti juust', exampleTranslation: 'Estonian cheese' },
      { word: 'liha', translation: 'meat', example: 'Grill liha', exampleTranslation: 'Grilled meat' },
      { word: 'kala', translation: 'fish', example: 'Värske kala', exampleTranslation: 'Fresh fish' },
      { word: 'kartul', translation: 'potato', example: 'Keedetud kartul', exampleTranslation: 'Boiled potato' }
    ],
    exercises: [
      {
        question: 'What is "leib"?',
        options: ['Milk', 'Bread', 'Water', 'Coffee'],
        correctAnswer: 1,
        explanation: 'Leib means bread in Estonian'
      },
      {
        question: 'How do you say "water" in Estonian?',
        options: ['piim', 'vesi', 'kohv', 'tee'],
        correctAnswer: 1,
        explanation: 'Vesi means water'
      },
      {
        question: 'What does "õun" mean?',
        options: ['Orange', 'Banana', 'Apple', 'Pear'],
        correctAnswer: 2,
        explanation: 'Õun means apple, and it\'s a great example of the unique Estonian õ sound'
      }
    ]
  }
};

export function Lesson() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reading' | 'exercises'>('reading');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [recording, setRecording] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<{ [key: string]: { score: number; text: string } }>({});
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speechRate, setSpeechRate] = useState(0.6);
  const [exerciseTime, setExerciseTime] = useState(105);
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [answerMode, setAnswerMode] = useState<'voice' | 'text'>('voice');
  const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({});
  const [recordingExercise, setRecordingExercise] = useState<number | null>(null);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [permissionError, setPermissionError] = useState<string>('');
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const exerciseRecognitionRef = useRef<any>(null);

  const lessonId = window.location.pathname.split('/').pop() || 'alphabet';
  const lesson = lessonsData[lessonId] || lessonsData.alphabet;

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'et-EE';

      exerciseRecognitionRef.current = new SpeechRecognition();
      exerciseRecognitionRef.current.continuous = false;
      exerciseRecognitionRef.current.interimResults = false;
      exerciseRecognitionRef.current.lang = 'et-EE';
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (exerciseRecognitionRef.current) {
        exerciseRecognitionRef.current.stop();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'exercises' && exerciseStarted && exerciseTime > 0) {
      const timer = setInterval(() => {
        setExerciseTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeTab, exerciseStarted, exerciseTime]);

  useEffect(() => {
    if (activeTab === 'exercises' && !exerciseStarted) {
      setExerciseStarted(true);
    }
  }, [activeTab]);

  const speakWord = (text: string, key: string) => {
    if ('speechSynthesis' in window) {
      setPlayingAudio(key);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'et-EE';
      utterance.rate = speechRate;
      utterance.onend = () => setPlayingAudio(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const speedOptions = [
    { value: 0.5, label: 'Very Slow', icon: '🐢' },
    { value: 0.6, label: 'Slow', icon: '🚶' },
    { value: 0.75, label: 'Normal', icon: '🏃' },
    { value: 1.0, label: 'Fast', icon: '🚀' }
  ];

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
      setPermissionError('');
      return true;
    } catch (error: any) {
      console.error('Microphone permission error:', error);
      setMicPermission('denied');

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionError('Microphone access denied. Please allow microphone access in your browser settings.');
      } else if (error.name === 'NotFoundError') {
        setPermissionError('No microphone found. Please connect a microphone and try again.');
      } else if (error.name === 'NotSupportedError') {
        setPermissionError('Microphone access is not supported. Please use HTTPS or localhost.');
      } else {
        setPermissionError(`Microphone error: ${error.message}`);
      }
      return false;
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    if (s1 === s2) return 100;

    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;

    if (longer.length === 0) return 100;

    const editDistance = (s1: string, s2: string): number => {
      const costs = [];
      for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
          if (i === 0) {
            costs[j] = j;
          } else if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    };

    const distance = editDistance(longer, shorter);
    return Math.round((1 - distance / longer.length) * 100);
  };

  const startRecording = async (wordKey: string, targetWord: string, index: number) => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (micPermission !== 'granted') {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        return;
      }
    }

    setRecording(wordKey);
    setRecognitionResult(prev => ({ ...prev, [wordKey]: { score: 0, text: '' } }));
    setPermissionError('');

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const score = calculateSimilarity(transcript, targetWord);

      setRecognitionResult(prev => ({ ...prev, [wordKey]: { score, text: transcript } }));
      setRecording(null);

      if (score >= 80) {
        setTimeout(() => {
          if (index < lesson.content.length - 1) {
            setCurrentWordIndex(index + 1);
            const nextCard = document.getElementById(`word-card-${index + 1}`);
            if (nextCard) {
              nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }, 1500);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setRecording(null);

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setPermissionError('Microphone access denied. Please allow microphone access and try again.');
        setMicPermission('denied');
      } else if (event.error === 'no-speech') {
        setRecognitionResult(prev => ({ ...prev, [wordKey]: { score: 0, text: 'No speech detected. Please try again.' } }));
      } else if (event.error === 'audio-capture') {
        setPermissionError('No microphone detected. Please check your microphone connection.');
      } else if (event.error === 'network') {
        setPermissionError('Network error. Please check your internet connection.');
      } else {
        setPermissionError(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionRef.current.onend = () => {
      setRecording(null);
    };

    try {
      recognitionRef.current.start();
    } catch (error: any) {
      console.error('Failed to start recognition:', error);
      setRecording(null);
      setPermissionError('Failed to start speech recognition. Please try again.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setRecording(null);
  };

  const handleAnswerSelect = (exerciseIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [exerciseIndex]: optionIndex }));
  };

  const checkAnswer = (exerciseIndex: number) => {
    setShowResults(prev => ({ ...prev, [exerciseIndex]: true }));
  };

  const isCorrect = (exerciseIndex: number) => {
    return selectedAnswers[exerciseIndex] === lesson.exercises[exerciseIndex].correctAnswer;
  };

  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setCameraLoading(false);
    } else {
      setCameraLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
              .then(() => {
                setCameraActive(true);
                setCameraLoading(false);
              })
              .catch(err => {
                console.error('Video play error:', err);
                setCameraLoading(false);
              });
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraLoading(false);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        alert(`Could not access camera: ${errorMessage}\n\nPlease check:\n1. Camera permissions\n2. Camera not used by another app\n3. Using HTTPS or localhost`);
      }
    }
  };

  const startVoiceAnswer = async (exerciseIndex: number) => {
    if (!exerciseRecognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (micPermission !== 'granted') {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        return;
      }
    }

    setRecordingExercise(exerciseIndex);
    setPermissionError('');

    exerciseRecognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();

      const correctOption = lesson.exercises[exerciseIndex].options[lesson.exercises[exerciseIndex].correctAnswer];
      const matchIndex = lesson.exercises[exerciseIndex].options.findIndex(
        (option: string) => option.toLowerCase().includes(transcript) || transcript.includes(option.toLowerCase())
      );

      if (matchIndex !== -1) {
        handleAnswerSelect(exerciseIndex, matchIndex);
        setTimeout(() => checkAnswer(exerciseIndex), 500);
      }
      setRecordingExercise(null);
    };

    exerciseRecognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setRecordingExercise(null);

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setPermissionError('Microphone access denied. Please allow microphone access and try again.');
        setMicPermission('denied');
      } else if (event.error === 'no-speech') {
        setPermissionError('No speech detected. Please speak clearly and try again.');
      } else if (event.error === 'audio-capture') {
        setPermissionError('No microphone detected. Please check your microphone connection.');
      } else if (event.error === 'network') {
        setPermissionError('Network error. Please check your internet connection.');
      } else {
        setPermissionError(`Speech recognition error: ${event.error}`);
      }
    };

    exerciseRecognitionRef.current.onend = () => {
      setRecordingExercise(null);
    };

    try {
      exerciseRecognitionRef.current.start();
    } catch (error: any) {
      console.error('Failed to start recognition:', error);
      setRecordingExercise(null);
      setPermissionError('Failed to start speech recognition. Please try again.');
    }
  };

  const stopVoiceAnswer = () => {
    if (exerciseRecognitionRef.current) {
      exerciseRecognitionRef.current.stop();
    }
    setRecordingExercise(null);
  };

  const handleTextAnswerChange = (exerciseIndex: number, value: string) => {
    setTextAnswers(prev => ({ ...prev, [exerciseIndex]: value }));
  };

  const submitTextAnswer = (exerciseIndex: number) => {
    const userText = textAnswers[exerciseIndex]?.toLowerCase().trim();
    if (!userText) return;

    const matchIndex = lesson.exercises[exerciseIndex].options.findIndex(
      (option: string) => option.toLowerCase().includes(userText) || userText.includes(option.toLowerCase())
    );

    if (matchIndex !== -1) {
      handleAnswerSelect(exerciseIndex, matchIndex);
      setTimeout(() => checkAnswer(exerciseIndex), 500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/learn/free')}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Modules</span>
        </button>

        {permissionError && (
          <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div className="flex-1">
                <h3 className="text-red-900 font-bold text-lg mb-2">Microphone Error</h3>
                <p className="text-red-700 mb-3">{permissionError}</p>
                <button
                  onClick={() => {
                    setPermissionError('');
                    setMicPermission('prompt');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`bg-gradient-to-r ${lesson.color} rounded-3xl shadow-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${
              lesson.id === 'alphabet' || lesson.id === 'numbers' ? 'text-5xl font-bold' : 'text-6xl'
            }`}>{lesson.icon}</div>
            <h1 className="text-4xl font-bold">{lesson.title}</h1>
          </div>
          <p className="text-white/90 text-lg">
            Master {lesson.title.toLowerCase()} with interactive exercises and pronunciation practice
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('reading')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 font-semibold transition ${
                activeTab === 'reading'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Reading</span>
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 font-semibold transition ${
                activeTab === 'exercises'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Dumbbell className="w-5 h-5" />
              <span>Exercises</span>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'reading' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Vocabulary & Examples</h2>
                  <div className="flex items-center space-x-2 bg-white rounded-xl p-2 shadow-md border border-gray-200">
                    <Gauge className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Speed:</span>
                    {speedOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSpeechRate(option.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                          speechRate === option.value
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title={option.label}
                      >
                        {option.icon}
                      </button>
                    ))}
                  </div>
                </div>
                {lesson.content.map((item, idx) => {
                  const audioKey = `${lesson.id}-${idx}`;
                  const isPlaying = playingAudio === audioKey;
                  const isRecording = recording === audioKey;
                  const result = recognitionResult[audioKey];

                  return (
                    <div
                      key={idx}
                      id={`word-card-${idx}`}
                      className={`bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                        idx === currentWordIndex
                          ? 'border-blue-500 shadow-lg scale-105'
                          : result && result.score >= 80
                          ? 'border-green-500'
                          : 'border-blue-100'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-2xl font-bold text-gray-900">{item.word}</h3>
                          <button
                            onClick={() => speakWord(item.word, audioKey)}
                            disabled={isPlaying}
                            className={`p-2 rounded-full transition ${
                              isPlaying
                                ? 'bg-blue-200 text-blue-700'
                                : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                            }`}
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => isRecording ? stopRecording() : startRecording(audioKey, item.word, idx)}
                          className={`p-3 rounded-full transition ${
                            isRecording
                              ? 'bg-red-500 text-white animate-pulse'
                              : result && result.score >= 80
                              ? 'bg-green-500 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                          }`}
                        >
                          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                      </div>

                      {result && (
                        <div className={`mb-3 p-3 rounded-lg ${
                          result.score >= 80
                            ? 'bg-green-50 border border-green-300'
                            : result.score >= 60
                            ? 'bg-yellow-50 border border-yellow-300'
                            : 'bg-red-50 border border-red-300'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold ${
                              result.score >= 80 ? 'text-green-700' : result.score >= 60 ? 'text-yellow-700' : 'text-red-700'
                            }`}>
                              {result.score >= 80 ? '✓ Excellent!' : result.score >= 60 ? '~ Good Try!' : '✗ Try Again'}
                            </span>
                            <span className={`text-lg font-bold ${
                              result.score >= 80 ? 'text-green-700' : result.score >= 60 ? 'text-yellow-700' : 'text-red-700'
                            }`}>
                              {result.score}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">You said: <span className="font-medium">{result.text}</span></p>
                          {result.score >= 80 && idx < lesson.content.length - 1 && (
                            <p className="text-sm text-green-600 mt-2">Moving to next word...</p>
                          )}
                        </div>
                      )}

                      <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold text-blue-600">Translation:</span> {item.translation}
                      </p>
                      {item.pronunciation && (
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Pronunciation:</span> {item.pronunciation}
                        </p>
                      )}
                      {item.example && (
                        <div className="mt-4 bg-white rounded-xl p-4 border-l-4 border-blue-500">
                          <p className="text-gray-900 font-medium mb-1">{item.example}</p>
                          <p className="text-gray-600 italic">"{item.exampleTranslation}"</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'exercises' && (
              <div className="relative">
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/learn/free')}
                    className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className={`px-6 py-3 rounded-full shadow-lg font-bold text-lg ${
                    exerciseTime <= 30 ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500/90 text-white'
                  }`}>
                    {formatTime(exerciseTime)}
                  </div>

                  <button
                    onClick={toggleCamera}
                    disabled={cameraLoading}
                    className={`p-3 rounded-full shadow-lg transition ${
                      cameraLoading
                        ? 'bg-gray-300 text-gray-500 cursor-wait'
                        : cameraActive
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cameraLoading ? (
                      <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : cameraActive ? (
                      <VideoOff className="w-6 h-6" />
                    ) : (
                      <Video className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {cameraActive && (
                  <div className="fixed bottom-24 right-6 z-50 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-900 relative group">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform scale-x-[-1]"
                      onLoadedMetadata={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(err => console.error('Video play error:', err));
                      }}
                    />
                    <div className="absolute top-2 left-2 flex items-center space-x-2 bg-red-500/80 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-semibold">REC</span>
                    </div>
                    <button
                      onClick={toggleCamera}
                      className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition opacity-0 group-hover:opacity-100"
                      title="Close camera"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="space-y-6 mt-24">
                  {lesson.exercises.map((exercise, idx) => {
                    const hasAnswered = showResults[idx];
                    const userAnswer = selectedAnswers[idx];
                    const correct = isCorrect(idx);
                    const isRecordingThis = recordingExercise === idx;

                    return (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl p-8 shadow-xl border-2 border-blue-100">
                        <div className="flex items-start justify-between mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 flex-1">
                            <span className="text-blue-600">Q{idx + 1}.</span> {exercise.question}
                          </h3>
                          <button
                            onClick={() => speakWord(exercise.question, `exercise-${idx}`)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition ml-4"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mb-6 flex items-center justify-center space-x-3 bg-white rounded-2xl p-4 shadow-sm">
                          <button
                            onClick={() => setAnswerMode('voice')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition ${
                              answerMode === 'voice'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Mic className="w-5 h-5" />
                            <span>Voice</span>
                          </button>
                          <button
                            onClick={() => setAnswerMode('text')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition ${
                              answerMode === 'text'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Keyboard className="w-5 h-5" />
                            <span>Text</span>
                          </button>
                        </div>

                        {answerMode === 'voice' && !hasAnswered && (
                          <div className="mb-6 flex justify-center">
                            <button
                              onClick={() => isRecordingThis ? stopVoiceAnswer() : startVoiceAnswer(idx)}
                              className={`p-8 rounded-full shadow-2xl transition transform hover:scale-105 ${
                                isRecordingThis
                                  ? 'bg-red-500 text-white animate-pulse'
                                  : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                              }`}
                            >
                              {isRecordingThis ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                            </button>
                          </div>
                        )}

                        {answerMode === 'text' && !hasAnswered && (
                          <div className="mb-6">
                            <div className="flex space-x-3">
                              <input
                                type="text"
                                value={textAnswers[idx] || ''}
                                onChange={(e) => handleTextAnswerChange(idx, e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && submitTextAnswer(idx)}
                                placeholder="Type your answer..."
                                className="flex-1 px-6 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-lg"
                              />
                              <button
                                onClick={() => submitTextAnswer(idx)}
                                disabled={!textAnswers[idx]?.trim()}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="space-y-3 mb-6">
                          {exercise.options.map((option, optIdx) => {
                            const isSelected = userAnswer === optIdx;
                            const isCorrectOption = optIdx === exercise.correctAnswer;
                            const showCorrect = hasAnswered && isCorrectOption;
                            const showWrong = hasAnswered && isSelected && !isCorrectOption;

                            return (
                              <button
                                key={optIdx}
                                onClick={() => !hasAnswered && handleAnswerSelect(idx, optIdx)}
                                disabled={hasAnswered}
                                className={`w-full text-left p-5 rounded-2xl font-semibold transition border-2 text-lg ${
                                  showCorrect
                                    ? 'bg-green-50 border-green-500 text-green-900 shadow-md'
                                    : showWrong
                                    ? 'bg-red-50 border-red-500 text-red-900 shadow-md'
                                    : isSelected
                                    ? 'bg-blue-100 border-blue-500 text-blue-900'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                                  {showWrong && <span className="text-red-600 text-2xl">✗</span>}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {!hasAnswered && userAnswer !== undefined && answerMode !== 'voice' && answerMode !== 'text' && (
                          <button
                            onClick={() => checkAnswer(idx)}
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                          >
                            Check Answer
                          </button>
                        )}

                        {hasAnswered && (
                          <div className={`mt-6 p-6 rounded-2xl shadow-md ${
                            correct ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
                          }`}>
                            <div className="flex items-center space-x-3 mb-3">
                              {correct ? (
                                <CheckCircle className="w-8 h-8 text-green-600" />
                              ) : (
                                <X className="w-8 h-8 text-red-600" />
                              )}
                              <p className={`font-bold text-xl ${correct ? 'text-green-900' : 'text-red-900'}`}>
                                {correct ? 'Excellent!' : 'Not Quite'}
                              </p>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Lightbulb className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                              <p className="text-gray-700 text-lg">{exercise.explanation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { BookOpen, CheckCircle, Lock, Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

interface LessonContentProps {
  skillType: string;
  level: string;
}

interface Lesson {
  id: string;
  title: string;
  lesson_number: number;
  content: any;
  exercises: any[];
}

interface UserProgress {
  lesson_id: string;
  completed: boolean;
  score: number | null;
}

export function LessonContent({ skillType, level }: LessonContentProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    loadLessonsAndProgress();
  }, [skillType, level, user]);

  const loadLessonsAndProgress = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Check if user has access (free level or paid subscription)
      if (level === 'beginner') {
        setHasAccess(true);
      } else {
        const { data: subscription } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('skill_type', skillType)
          .eq('level', level)
          .eq('is_active', true)
          .maybeSingle();

        setHasAccess(!!subscription);
      }

      // Load lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('skill_type', skillType)
        .eq('level', level)
        .order('lesson_number');

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);

      // Load user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('skill_type', skillType)
        .eq('level', level);

      if (progressError) throw progressError;
      setUserProgress(progressData || []);

      // Select first incomplete lesson or first lesson
      if (lessonsData && lessonsData.length > 0) {
        const firstIncomplete = lessonsData.find(
          (lesson) =>
            !progressData?.some((p) => p.lesson_id === lesson.id && p.completed)
        );
        setSelectedLesson(firstIncomplete || lessonsData[0]);
      }
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string, score?: number) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        skill_type: skillType,
        level: level,
        lesson_id: lessonId,
        completed: true,
        score: score || null,
        completed_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Reload progress
      loadLessonsAndProgress();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <Lock className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-8">
            You need to purchase this level to access the lessons.
          </p>
          <button
            onClick={() => navigate('/learn/free')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Lessons Available Yet
          </h2>
          <p className="text-gray-600 mb-8">
            Lessons for this level are being prepared. Check back soon!
          </p>
          <button
            onClick={() => navigate('/learn/free')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = lessons.findIndex((l) => l.id === selectedLesson?.id);
  const isLessonComplete = userProgress.some(
    (p) => p.lesson_id === selectedLesson?.id && p.completed
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/learn/free')}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Levels</span>
        </button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Lesson List Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lessons</h3>
            <div className="space-y-2">
              {lessons.map((lesson) => {
                const progress = userProgress.find((p) => p.lesson_id === lesson.id);
                const isComplete = progress?.completed;
                const isSelected = selectedLesson?.id === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-semibold opacity-75 mb-1">
                          Lesson {lesson.lesson_number}
                        </div>
                        <div className="font-semibold">{lesson.title}</div>
                      </div>
                      {isComplete && (
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ml-2 ${isSelected ? 'text-white' : 'text-green-500'}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson Content Area */}
          <div className="lg:col-span-3">
            {selectedLesson && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-8">
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    Lesson {selectedLesson.lesson_number}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {selectedLesson.title}
                  </h1>
                  {isLessonComplete && (
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full border-2 border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-semibold">Completed</span>
                    </div>
                  )}
                </div>

                <div className="prose max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed text-lg">
                    {selectedLesson.content?.text || 'Lesson content will be available soon.'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t">
                  <button
                    onClick={() => {
                      if (currentLessonIndex > 0) {
                        setSelectedLesson(lessons[currentLessonIndex - 1]);
                      }
                    }}
                    disabled={currentLessonIndex === 0}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>

                  {!isLessonComplete && (
                    <button
                      onClick={() => markLessonComplete(selectedLesson.id)}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
                    >
                      Mark as Complete
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (currentLessonIndex < lessons.length - 1) {
                        setSelectedLesson(lessons[currentLessonIndex + 1]);
                      }
                    }}
                    disabled={currentLessonIndex === lessons.length - 1}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

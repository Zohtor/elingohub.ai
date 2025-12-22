import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';
import { useLanguage } from '../contexts/LanguageContext';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/profile');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {t('subscriptionSuccessful')} Pro Plan!
        </h1>

        <p className="text-gray-600 mb-8">
          شكراً لاشتراكك! تم تفعيل حسابك بنجاح وأصبح بإمكانك الآن الوصول إلى جميع الميزات المتميزة.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            سيتم توجيهك إلى صفحة الملف الشخصي خلال 5 ثوانٍ...
          </p>
        </div>

        <button
          onClick={() => navigate('/profile')}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
        >
          {t('myProfile')}
        </button>
      </div>
    </div>
  );
}

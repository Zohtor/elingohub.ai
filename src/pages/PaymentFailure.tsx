import { XCircle } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';
import { useLanguage } from '../contexts/LanguageContext';

export function PaymentFailure() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-6">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          فشلت عملية الدفع
        </h1>

        <p className="text-gray-600 mb-8">
          عذراً، لم نتمكن من إتمام عملية الدفع. يرجى التحقق من معلومات البطاقة والمحاولة مرة أخرى.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            إذا استمرت المشكلة، يرجى التواصل مع دعم العملاء أو استخدام بطاقة أخرى.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/pricing')}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            المحاولة مرة أخرى
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            {t('about')}
          </button>
        </div>
      </div>
    </div>
  );
}

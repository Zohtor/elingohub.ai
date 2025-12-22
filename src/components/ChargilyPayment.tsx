import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChargilyPaymentProps {
  amount: number;
  planName: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function ChargilyPayment({ amount, planName, onSuccess, onError }: ChargilyPaymentProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/chargily-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'dzd',
          description: `${planName} Subscription`,
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          cardholderName: cardDetails.cardholderName,
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess?.(data);
      } else {
        onError?.(data.message || 'فشلت عملية الدفع');
      }
    } catch (error) {
      onError?.('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{t('securePayment')}</h2>
      <p className="text-center text-gray-600 mb-6 flex items-center justify-center">
        <Lock className="w-4 h-4 mr-2" />
        {t('paymentEncrypted')}
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">{planName}</span>
          <span className="text-2xl font-bold text-blue-600">{amount} DZD</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{t('billedMonthly')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('cardNumber')}
          </label>
          <input
            type="text"
            value={cardDetails.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('cardholderName')}
          </label>
          <input
            type="text"
            value={cardDetails.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            placeholder="محمد أحمد"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('expiryDate')}
            </label>
            <input
              type="text"
              value={cardDetails.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cardDetails.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg transform hover:scale-105"
        >
          {loading ? t('processing') : t('subscribeNow')}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          {t('termsAgreement')}
        </p>

        <div className="flex items-center justify-center mt-4">
          <span className="text-xs text-gray-400">مدعوم من Chargily</span>
        </div>
      </form>
    </div>
  );
}

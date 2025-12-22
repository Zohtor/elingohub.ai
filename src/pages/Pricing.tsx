import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../hooks/useNavigate';
import { useLanguage } from '../contexts/LanguageContext';
import { ChargilyPayment } from '../components/ChargilyPayment';

export function Pricing() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleSubscribe = () => {
    if (!profile) {
      navigate('/signup');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (data: any) => {
    setShowPaymentModal(false);
    window.location.href = data.checkoutUrl;
  };

  const handlePaymentError = (error: string) => {
    alert(error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Free Plan</h2>
            <div className="text-4xl font-bold text-blue-600 mb-6">€0<span className="text-lg text-gray-500">/month</span></div>

            <ul className="space-y-4 mb-8">
              {['Basic lessons (Alphabet, Numbers, etc.)', 'Limited AI chat support', 'Community access (view only)'].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleGetStarted}
              disabled={profile?.subscription_type === 'free'}
              className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {profile?.subscription_type === 'free' ? 'Current Plan' : 'Get Started'}
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold">Pro Plan</h2>
              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">POPULAR</span>
            </div>
            <div className="text-4xl font-bold mb-6">€14.99<span className="text-lg opacity-90">/month</span></div>

            <ul className="space-y-4 mb-8">
              {[
                'All Free features',
                'Unlimited AI Writing Correction',
                'Advanced Reading Comprehension',
                'Voice & Pronunciation Analysis',
                'Full Community access',
                'Live events & group sessions',
                'Priority support',
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              disabled={profile?.subscription_type === 'pro'}
              className="w-full py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
            >
              {profile?.subscription_type === 'pro' ? 'Current Plan' : t('subscribeNow')}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">All plans include a 7-day money-back guarantee</p>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <ChargilyPayment
              amount={14990}
              planName="Pro Plan"
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      )}
    </div>
  );
}

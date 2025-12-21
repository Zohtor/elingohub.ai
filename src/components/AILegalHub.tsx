import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText, GraduationCap, Scale, CreditCard, X, Lock, Mic, Send, Bot, User, MicOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HubItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  icon: 'invoice' | 'courses' | 'governance';
  featureKeys: string[];
}

const hubItems: HubItem[] = [
  {
    id: 'invoice',
    titleKey: 'smartInvoiceAI',
    descriptionKey: 'smartInvoiceDesc',
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'invoice',
    featureKeys: [
      'automatedInvoice',
      'multiCurrency',
      'taxCompliance',
      'paymentTracking'
    ]
  },
  {
    id: 'courses',
    titleKey: 'aiCoursesSpec',
    descriptionKey: 'aiCoursesSpecDesc',
    image: 'https://images.pexels.com/photos/8349272/pexels-photo-8349272.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'courses',
    featureKeys: [
      'expertCurriculum',
      'handsOnProjects',
      'industryCerts',
      'careerGuidance'
    ]
  },
  {
    id: 'governance',
    titleKey: 'aiGovernance',
    descriptionKey: 'aiGovernanceDesc',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'governance',
    featureKeys: [
      'complianceMonitoring',
      'riskAssessment',
      'policyFrameworks',
      'auditTrails'
    ]
  }
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AILegalHub() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAIChatModal, setShowAIChatModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hubItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hubItems.length) % hubItems.length);
  };

  const handleGoProClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowPaymentModal(true);
  };

  const handleLearnMoreClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowAIChatModal(true);
    setMessages([{
      id: Date.now().toString(),
      text: `${t('welcomeMessage')}`,
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setSelectedService('');
  };

  const handleCloseChatModal = () => {
    setShowAIChatModal(false);
    setMessages([]);
    setInputMessage('');
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ar-SA';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    alert(`${t('subscriptionSuccessful')} ${selectedService}!`);
    setIsProcessing(false);
    handleCloseModal();
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert(t('speechNotSupported'));
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    const responses: { [key: string]: string[] } = {
      'Smart Invoice AI': [
        'Our Smart Invoice AI can automatically generate professional invoices in seconds. It supports multiple currencies and handles tax calculations automatically.',
        'The invoice system integrates with major payment gateways and provides real-time payment tracking. You can customize templates to match your brand.',
        'We offer automated reminders for overdue invoices and detailed analytics to help you understand your cash flow better.',
      ],
      'AI Courses and Specializations': [
        'Our AI courses are designed by industry experts and cover everything from basics to advanced topics. Each course includes hands-on projects.',
        'You will receive industry-recognized certifications upon completion. Our courses cover Machine Learning, Deep Learning, NLP, and Computer Vision.',
        'We provide lifetime access to course materials and regular updates. Our community of learners and mentors is always ready to help.',
      ],
      'AI Governance': [
        'AI Governance ensures your AI systems comply with regulations and ethical standards. We provide comprehensive compliance monitoring.',
        'Our framework includes risk assessment tools, policy templates, and audit trails to maintain transparency in AI operations.',
        'We help organizations implement responsible AI practices with continuous monitoring and reporting capabilities.',
      ],
    };

    const serviceResponses = responses[selectedService] || [
      'I can help you with any questions about our services. Feel free to ask about features, pricing, or implementation details.',
      'Our platform is designed to make AI accessible and practical for businesses of all sizes. What specific aspect interests you?',
      'We offer comprehensive support and training to ensure you get the most out of our solutions.',
    ];

    return serviceResponses[Math.floor(Math.random() * serviceResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAITyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse = await getAIResponse(inputMessage);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setIsAITyping(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'invoice':
        return <FileText className="w-8 h-8 text-white" />;
      case 'courses':
        return <GraduationCap className="w-8 h-8 text-white" />;
      case 'governance':
        return <Scale className="w-8 h-8 text-white" />;
      default:
        return <FileText className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-600/10 to-blue-600/10 rounded-full mb-6 border border-slate-300">
            <Scale className="w-5 h-5 text-slate-700 mr-2" />
            <span className="text-sm font-bold text-slate-700">{t('professionalSolutions')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('aiLegalHub')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aiLegalHubDesc')}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {hubItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-80 md:h-auto overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
                            {getIcon(item.icon)}
                          </div>
                        </div>
                      </div>

                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {t(item.titleKey)}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                          {t(item.descriptionKey)}
                        </p>

                        <div className="space-y-4 mb-8">
                          {item.featureKeys.map((featureKey, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-gray-700">{t(featureKey)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-4">
                          <button
                            onClick={() => handleLearnMoreClick(t(item.titleKey))}
                            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <Bot className="w-5 h-5" />
                            {t('learnMore')}
                          </button>
                          <button
                            onClick={() => handleGoProClick(t(item.titleKey))}
                            className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-5 h-5" />
                            {t('goPro')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-50 transition-all z-10 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-50 transition-all z-10 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>

          <div className="flex justify-center mt-8 space-x-3">
            {hubItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {t('trustedOrganizations')}
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-50 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-blue-700 font-semibold">{t('enterpriseReady')}</span>
          </div>
        </div>
      </div>

      {showAIChatModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full h-[80vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Bot className="w-6 h-6" />
                    {t('aiAssistant')}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">{selectedService}</p>
                </div>
                <button
                  onClick={handleCloseChatModal}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                        : 'bg-gradient-to-br from-green-600 to-green-700'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isAITyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white shadow-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200 rounded-b-3xl">
              <div className="flex gap-2">
                <button
                  onClick={toggleRecording}
                  className={`p-3 rounded-xl transition-all ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  title={isRecording ? t('stopRecording') : t('startVoiceInput')}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('typeMessagePlaceholder')}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {isRecording && (
                <p className="text-xs text-red-600 mt-2 text-center animate-pulse">
                  {t('recordingSpeakNow')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    {t('goPro')}
                  </h3>
                  <p className="text-red-100 text-sm mt-1">{selectedService}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-4 rounded-xl border border-red-200">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <Lock className="w-5 h-5" />
                  <span className="font-semibold">{t('securePayment')}</span>
                </div>
                <p className="text-sm text-gray-600">{t('paymentEncrypted')}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('cardNumber')}
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('cardholderName')}
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t('expiryDate')}
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">{t('monthlySubscription')}</span>
                  <span className="font-bold text-gray-900">$49.99/month</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{t('billedMonthly')}</span>
                  <span>{t('cancelAnytime')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {t('processing')}
                  </span>
                ) : (
                  t('subscribeNow')
                )}
              </button>

              <p className="text-xs text-center text-gray-500">
                {t('termsAgreement')}
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

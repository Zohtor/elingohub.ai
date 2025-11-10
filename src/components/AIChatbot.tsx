import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{ text: 'Tere! How can I help you learn Estonian today?', isUser: false }]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Great question! I can help you with Estonian pronunciation, grammar, and vocabulary.', isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50 animate-bounce"
        >
          <MessageCircle className="w-8 h-8 mx-auto" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-5 flex justify-between items-center rounded-t-3xl">
            <span className="font-bold">AI Estonian Tutor</span>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow ${msg.isUser ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4 bg-white rounded-b-3xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button onClick={sendMessage} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-2xl hover:shadow-lg transition">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Limited to 50 tokens per response</p>
          </div>
        </div>
      )}
    </>
  );
}

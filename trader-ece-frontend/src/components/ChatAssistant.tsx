import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Merhaba! Ben Trader Ece AI. Size nasıl yardımcı olabilirim?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    const userMsg = { role: 'user', content: message };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { 
              role: "system", 
              content: "Sen Trader Ece asistanısın. KESİN KURALLAR: 1- Türkiye Cumhuriyeti vatandaşları (nerede yaşarlarsa yaşasınlar) HFM üzerinden hesap açamazlar. HFM soran Türklere 'HFM, T.C. vatandaşları için hesap açılışı yapmamaktadır' de ve offshore lisanslı Tickmill (Classic/MT5) öner. 2- Sadece offshore lisans altında işlem yapan kurumlarla çalışıyoruz. 3- Diğer dillerde ve yabancı ülke vatandaşlarına HFM serbesttir. 4- Sadece bizim sitemizdeki linkleri kullananlar gruba alınır. Açıklayıcı ve profesyonel konuş." 
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMsg.content }
          ]
        })
      });
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hata oluştu, lütfen tekrar deneyin.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isOpen ? <X color="black" /> : <MessageSquare color="black" />}
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', bottom: '70px', right: '0', width: '320px', height: '480px', backgroundColor: '#000', border: '1px solid #D4AF37', borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #222', color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={20} /> Trader Ece Asistan
          </div>
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
                background: msg.role === 'user' ? '#D4AF37' : '#1a1a1a', 
                color: msg.role === 'user' ? 'black' : 'white', 
                padding: '10px', borderRadius: '10px', fontSize: '13px', 
                maxWidth: '85%', whiteSpace: 'pre-line' 
              }}>
                {msg.content}
              </div>
            ))}
            {isLoading && <Loader2 className="animate-spin" color="#D4AF37" size={18} />}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ padding: '15px', borderTop: '1px solid #222', display: 'flex', gap: '5px' }}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Yazın..." style={{ flex: 1, background: '#111', border: 'none', padding: '10px', color: 'white', borderRadius: '8px' }} />
            <button type="submit" style={{ background: '#D4AF37', border: 'none', borderRadius: '8px', padding: '10px' }}><Send size={16} /></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
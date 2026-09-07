import { useState } from 'react';
import { MessageCircle, Send, Smartphone, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatAssistantProps {
  elevated?: boolean;
}

const ChatAssistant = ({ elevated = false }: ChatAssistantProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: elevated ? '144px' : '24px', right: '24px', zIndex: 9999, transition: 'bottom 220ms ease' }}>
      <button onClick={() => setIsOpen(!isOpen)} aria-label={t('chat.title')} title={t('chat.title')} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isOpen ? <X color="black" /> : <MessageCircle color="black" />}
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', bottom: '70px', right: '0', width: 'min(320px, calc(100vw - 32px))', backgroundColor: '#000', border: '1px solid #D4AF37', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #222', color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={20} /> {t('chat.title')}
          </div>
          <div style={{ padding: '18px', display: 'grid', gap: '14px', color: 'white' }}>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.65 }}>{t('chat.status')}</p>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#c2c2c2' }}>{t('chat.contactIntro')}</p>
            <a href="https://t.me/tradereceteam" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px 14px', background: '#D4AF37', color: '#000', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
              <Send size={16} /> {t('chat.telegramAction')}
            </a>
            <a href="https://wa.me/905456462353" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', textDecoration: 'none', fontSize: '13px' }}>
              <Smartphone size={17} color="#25d366" /> {t('chat.whatsappTurkey')}
            </a>
            <a href="https://wa.me/38267494040" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', textDecoration: 'none', fontSize: '13px' }}>
              <Smartphone size={17} color="#25d366" /> {t('chat.whatsappMontenegro')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
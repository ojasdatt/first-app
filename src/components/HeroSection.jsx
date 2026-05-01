import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import SearchModal from './SearchModal';

export default function HeroSection() {
  const { chatMsgs, callAI, addMsg } = useApp();
  const [openSearch, setOpenSearch] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    const text = message.trim();
    if (!text) return;
    addMsg('user', text);
    setMessage('');
    setSending(true);
    try {
      const reply = await callAI(text);
      addMsg('bot', reply || 'Sorry, I could not answer that.');
    } finally {
      setSending(false);
    }
  }, [message, addMsg, callAI]);

  const visibleMessages = useMemo(() => chatMsgs.slice(-8), [chatMsgs]);

  return (
    <main className="hero-section">
      <div className="hero-banner">
        <h1>Welcome to AI CineVerse</h1>
        <p>Search for movies or chat with CineBot to get recommendations and details.</p>
        <div className="hero-actions">
          <button className="btn btn-warning" onClick={() => setOpenSearch(true)}>
            <i className="bi bi-search me-2" /> Search Movies
          </button>
        </div>
      </div>

      <section className="chat-panel">
        <div className="chat-panel-header">
          <h2>Chat with CineBot</h2>
          <p>Ask about movies, recommendations, or pick a movie from search.</p>
        </div>

        <div className="chat-list">
          {visibleMessages.length === 0 ? (
            <div className="chat-empty">
              <p>No chat yet. Start by typing a message below or opening movie search.</p>
            </div>
          ) : (
            visibleMessages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="chat-role">{msg.role === 'user' ? 'You' : 'CineBot'}</div>
                <div className="chat-content">{typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}</div>
              </div>
            ))
          )}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask CineBot anything..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={sending}
          />
          <button className="btn btn-primary" onClick={handleSend} disabled={sending || !message.trim()}>
            {sending ? 'Sending…' : 'Send'}
          </button>
        </div>
      </section>

      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
    </main>
  );
}

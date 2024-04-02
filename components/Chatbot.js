import React, { useState } from 'react';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => setUserMessage(e.target.value);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    const messageToSend = userMessage;
    setUserMessage('');
    setConversation([...conversation, { from: 'user', message: messageToSend }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const { reply } = await response.json();

      setConversation(conversation => [...conversation, { from: 'bot', message: reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setConversation(conversation => [...conversation, { from: 'bot', message: "Sorry, I couldn't understand that." }]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        fontSize: '24px',
        cursor: 'pointer',
        backgroundColor: '#006aff',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
      }}>
        {isOpen ? '✕' : '💬'}
      </button>
      {isOpen && (
        <div style={{
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '15px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}>
          <div style={{ overflowY: 'auto', marginBottom: '10px' }}>
            {conversation.map((msg, index) => (
              <div key={index} style={{
                textAlign: msg.from === 'user' ? 'right' : 'left',
                margin: '5px 0',
              }}>
                <span style={{
                  backgroundColor: msg.from === 'user' ? '#006aff' : '#e9e9eb',
                  color: msg.from === 'user' ? 'white' : 'black',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  display: 'inline-block',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}>
                  {msg.message}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ width: '80%', marginRight: '5px', padding: '10px', borderRadius: '15px', border: '1px solid #ccc' }}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} style={{
              backgroundColor: '#006aff',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '10px 15px',
              cursor: 'pointer',
            }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

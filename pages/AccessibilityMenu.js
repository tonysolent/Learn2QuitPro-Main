import React, { useState, useEffect } from 'react';

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [readerFriendlyFont, setReaderFriendlyFont] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = `${textSize}px`;
  }, []);

  const increaseTextSize = () => handleTextSizeChange(2);
  const decreaseTextSize = () => handleTextSizeChange(-2);

  const handleTextSizeChange = (sizeChange) => {
    setTextSize(currentSize => {
      const newSize = Math.max(12, currentSize + sizeChange);
      document.body.style.fontSize = `${newSize}px`;
      return newSize;
    });
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  const handleReaderFriendlyFontToggle = () => {
    setReaderFriendlyFont(!readerFriendlyFont);
    document.body.classList.toggle('reader-friendly-font');
  };

  useEffect(() => {
    if (highContrast) {
      document.body.style.backgroundColor = '#000';
      document.body.style.color = '#FFF';
    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }

    if (readerFriendlyFont) {
      document.body.style.fontFamily = 'Arial, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
  }, [highContrast, readerFriendlyFont]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        fontSize: '24px',
        cursor: 'pointer',
        backgroundColor: '#0052cc', 
        color: 'white', 
        border: 'none',
        borderRadius: '50%', 
        padding: '10px',
        }}>
        {isOpen ? '✖️' : '♿'} 
      </button>
      {isOpen && (
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '15px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '10px', 
        }}>
          
        
          <button onClick={handleReaderFriendlyFontToggle}>{readerFriendlyFont ? 'Disable Reader-Friendly Font' : 'Enable Reader-Friendly Font'}</button>
          
        </div>
      )}
    </div>
  );
}

export default AccessibilityMenu;

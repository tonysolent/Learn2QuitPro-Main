import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../components/firebase';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showTerms, setShowTerms] = useState(false); 
  const [showFAQ, setShowFAQ] = useState(false); 

  const auth = getAuth();

  const handleLogin = () => {
   
    if (username === 'admin' && password === 'admin') {
      onLogin({ username: 'admin', isAdmin: true });
    } else if (username === 'user' && password === 'user') {
      onLogin({ username: 'user', isAdmin: false });
    } else if (username === 'admin@gmail.com') { 
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          onLogin({ username: userCredential.user.email, isAdmin: true }); 
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            setErrorMessage("Sorry, you are having difficulty logging in. Please contact Learn2QuitPro@gmail.com.");
          } else {
            alert(error.message);
          }
        });
    } else if (!isRegistering) {
      
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
         
          onLogin({ username: userCredential.user.email, isAdmin: false });
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          onLogin({ username: userCredential.user.email, isAdmin: false });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  };

  
  const TermsModal = () => (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: '1000',
      maxWidth: '80%',
      maxHeight: '80%',
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: '5px',
    }}>
      <h2>Terms and Conditions</h2>
      <p>Your Terms and Conditions content goes here...</p>
      <button onClick={toggleTerms} style={{
        backgroundColor: '#0052cc', color: 'white', padding: '10px 15px',
        border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s'
      }}>Close</button>
    </div>
  );

  
  const FAQSection = () => (
    <div>
     
      <h2>FAQ</h2>
      <p>Frequently Asked Questions content goes here...</p>
      <button onClick={toggleFAQ} style={{
        backgroundColor: '#0052cc', color: 'white', padding: '10px 15px',
        border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s'
      }}>Close FAQ</button>
    </div>
  );



 return (
  <div style={{ textAlign: 'center', margin: '20px' }}>
    <h2>{isRegistering ? 'Register' : 'Login'}</h2>
    <input
      type="text"
      placeholder="Email"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{ padding: '10px', width: '60%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ padding: '10px', width: '60%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
    />
    <button
      onClick={handleLogin}
      style={{ backgroundColor: '#0052cc', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}
    >
      {isRegistering ? 'Register' : 'Login'}
    </button>
    <p
      onClick={() => setIsRegistering(!isRegistering)}
      style={{ cursor: 'pointer', color: '#0052cc', marginTop: '10px' }}
    >
      {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
    </p>
    <p onClick={toggleTerms} style={{ cursor: 'pointer', color: '#0052cc', marginTop: '10px', fontWeight: 'bold' }}>
      Terms and Conditions
    </p>
    {showTerms && <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: '1000',
      maxWidth: '600px', 
      maxHeight: '80%',
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: '5px',
    }}>
      <strong><h2>Terms and Conditions</h2></strong>
      <p><strong>Terms and Conditions for Learn2Quit Pro</strong></p>
      <p>Welcome to Learn2Quit Pro. These terms and conditions outline the rules and regulations for the use of Learn2Quit Pro's Website.</p>
      <p><strong>Content Moderation:</strong></p>
      <p>Learn2Quit Pro is dedicated to providing a supportive, respectful, and informative environment for individuals seeking information and support for quitting smoking. To ensure our community remains a safe space, we strictly prohibit the following:</p>
      <ul>
        <li><strong>Spamming:</strong> Publishing irrelevant, unsolicited, and repetitive content is strictly prohibited.</li>
        <li><strong>Racist Comments:</strong> We have a zero-tolerance policy for racism.</li>
        <li><strong>Political Views:</strong> Learn2Quit Pro is not the platform for political debates.</li>
        <li><strong>Use of Bad Words:</strong> The use of profanity, obscenities, or derogatory language is strictly forbidden.</li>
      </ul>
      <p><strong>Consequences:</strong></p>
      <p>Violating these content moderation guidelines may result in a range of actions, including a warning, temporary suspension of account privileges, or a permanent ban from Learn2Quit Pro for severe or persistent violations.
      <p><strong>Contact:</strong> Learn2QuitPro@gmail.com for queries.</p>
      </p>
      <button onClick={toggleTerms} style={{
        backgroundColor: '#0052cc', color: 'white', padding: '10px 15px',
        border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s'
      }}>Close</button>
    </div>}
    
    <p onClick={() => setShowFAQ(!showFAQ)} style={{ cursor: 'pointer', color: '#0052cc', marginTop: '10px', fontWeight: 'bold' }}>
  FAQ
</p>
{showFAQ && <div style={{
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  zIndex: '1000',
  maxWidth: '600px', 
  maxHeight: '80%',
  overflowY: 'auto',
  border: '1px solid #ccc',
  borderRadius: '5px',
}}>
  <strong><h2>Frequently Asked Questions (FAQ)</h2></strong>
  <p><strong>Q: What is Learn2Quit Pro?</strong></p>
  <p>A: Learn2Quit Pro is a platform dedicated to helping individuals quit smoking by providing support, resources, and community.</p>

  <p><strong>Q: How do I login?</strong></p>
  <p>A: To login, enter your email and password in the fields provided and click on the "Login" button.</p>

  <p><strong>Q: How do I register for an account?</strong></p>
  <p>A: To register for an account, click on the "Need an account? Register" link, enter your email and desired password, and click on the "Register" button.</p>

  <p><strong>Q: I forgot my password. What should I do?</strong></p>
  <p>A: If you forgot your password, please contact us at Learn2QuitPro@gmail.com for assistance.</p>

  <p><strong>Q: How can I contact support?</strong></p>
  <p>A: For any queries or support, please email us at Learn2QuitPro@gmail.com.</p>

  <button onClick={() => setShowFAQ(false)} style={{
    backgroundColor: '#0052cc', color: 'white', padding: '10px 15px',
    border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s'
  }}>Close</button>
    </div>}
   
  </div>
);

  
  
}

export default Login;
